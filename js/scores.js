  //parse
  //piotr.adamczak@ovoenergy.com
  //hacking123

  //3fylp3uAd1wEzLRFcli2X1lo2iizN5LX7nwRJZaz

  var firstPlayer;
  var secondPlayer;

  var firstUsername;
  var secondUsername;

  var firstScore;
  var secondScore;

  var firstUserId;
  var secondUserId;

  var allPlayers;

  var alreadySend = false;

  $(function() {

      $('#startgame').on('click', function (e) {
          e.preventDefault();

          var username = $('#playername').val();
          getPlayers();

      });

      $('#savegame').on('click', function (e) {
          e.preventDefault();

          alreadySend = false;

          firstUsername = $('#first_player-ddi').val();
          secondUsername = $('#second_player-ddi').val();

          firstScore = parseInt($('#player_one_score').val(), 10);
          secondScore = parseInt($('#player_two_score').val(), 10);

          var firstPlayer = findPlayerWithUsername(firstUsername);
          var secondPlayer = findPlayerWithUsername(secondUsername);

          if (firstPlayer == null) {
              createPlayer(firstUsername, function (newUser) {
                  firstUserId = newUser.objectId;
                  updateScores();
              });
          } else {
              firstUserId = firstPlayer.objectId;
              updateScores();
          }

          if (secondPlayer == null) {
              createPlayer(secondUsername, function (newUser) {
                  secondUserId = newUser.objectId;
                  updateScores();
              });
          } else {
              secondUserId = secondPlayer.objectId;
              updateScores();
          }
      });
  });

  function findPlayerWithUsername(username) {
      for (var i = 0; i < allPlayers.length; i++) {
          if (allPlayers[i].text == username) {
              return allPlayers[i];
          }
      }
      return null;
  }

  function updateScores() {

    if (firstUserId && secondUserId && !alreadySend) {

        alreadySend = true;

        if (firstScore == secondScore) {
          incrementValueForUserId(firstUserId,"draws");
          incrementValueForUserId(secondUserId,"draws");
        } else if (firstScore > secondScore) {
          incrementValueForUserId(firstUserId,"wins");
          incrementValueForUserId(secondUserId,"losses");
        } else {
          incrementValueForUserId(firstUserId,"losses");
          incrementValueForUserId(secondUserId,"wins");
        }

        saveGame(function(result) {
           console.log(result);
        });
    }
  }

  $('#ghsubmitbtn').on('click', function(e){
    e.preventDefault();
    $('#ghapidata').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

    var username = $('#ghusername').val();
    var requri   = 'https://api.github.com/users/'+username;
    var repouri  = 'https://api.github.com/users/'+username+'/repos';

    requestJSON(requri, function(json) {
      if(json.message == "Not Found" || username == '') {
        $('#ghapidata').html("<h2>No User Info Found</h2>");
      }

      else {
        // else we have a user and we display their info
        var fullname   = json.name;
        var username   = json.login;
        var aviurl     = json.avatar_url;
        var profileurl = json.html_url;
        var location   = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum     = json.public_repos;

        if(fullname == undefined) { fullname = username; }

        var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
        outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
        outhtml = outhtml + '<div class="repolist clearfix">';

        var repositories;
        $.getJSON(repouri, function(json){
          repositories = json;
          outputPageContent();
        });

        function outputPageContent() {
          if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
          else {
            outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
            $.each(repositories, function(index) {
              outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
            });
            outhtml = outhtml + '</ul></div>';
          }
          $('#ghapidata').html(outhtml);
        } // end outputPageContent()
      } // end else statement
    }); // end requestJSON Ajax call
  }); // end click event handler


function setupPlayers() {
    firstPlayer = new STComboBox();
    secondPlayer = new STComboBox();

    firstPlayer.Init('first_player');
    secondPlayer.Init('second_player');
    getPlayers();
}

function getPlayers() {

  parseGet("players", null,function(players) {

      allPlayers = [];

      for(var i=0; i < players.length; i++) {
          allPlayers.push({id: i, text: players[i].username, objectId: players[i].objectId});
      }

     firstPlayer.populateList(allPlayers);
     secondPlayer.populateList(allPlayers);
  });
}

function createPlayer(nick, callback) {
  parsePost("players", '{"username":"'+nick+'","wins":0, "losses":0,"draws":0}', callback)
}

function getPlayerWithUsername(username, callback) {
  parseGet("players", 'where={"username":"'+username+'"}', callback);
}

function incrementValueForUserId(userId, param) {
  parsePut("players/"+userId, '{"'+param+'":{"__op":"Increment","amount":1}}', function(players) {
      //console.log(players);
  });
}

function saveGame(callback) {
    parsePost("games", '{"player_one":"'+firstUsername+'","player_two":"'+secondUsername+'", "score_one":'+firstScore+',"score_two":'+secondScore+'}', callback);
}

function parseGet(url, params, callback) {
  parseRequest("GET",url, params, function(result) {
      callback(result["results"]);
  });
}

function parsePost(url, params, callback) {
  parseRequest("POST", url, params, callback);
}

function parsePut(url, params, callback) {
  parseRequest("PUT", url, params, function(result) {
      callback(result["results"]);
  });
}

function parseRequest(method, url,data, callback) {
      fullUrl = "https://api.parse.com/1/classes/"+url
      $.ajax({
                contentType:"application/json",
                dataType:"json",
                url:fullUrl,
                data: data,
                processData:false,
                headers: {
                    "X-Parse-Application-Id": "HCOLmSAQu05uzLqdbKov2BKbH4ZJOhZ0wKmgjm03",
                    "X-Parse-REST-API-Key": "jmSIOJza3LSjvdv69laBl7AhyzD73ata9XEFWAFX",
                    "Content-Type" : "application/json" ,
                },
                type:method,
                error:function(e) { alert('error: '+e);},
            }).done(function(e,status) {
                callback(e);
            });
  }

 function postJSON(url, params, callback) {

    $.post( "ajax/test.html",params, function( data ) {
      $( ".result" ).html( data );
    });
  }

  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }