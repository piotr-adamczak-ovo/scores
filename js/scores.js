$(function(){

  //parse
  //piotr.adamczak@ovoenergy.com
  //hacking123

  //3fylp3uAd1wEzLRFcli2X1lo2iizN5LX7nwRJZaz

  $('#startgame').on('click', function(e){
    e.preventDefault();
  
     var username = $('#playername').val();
     getPlayers();

  });

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
  

function getPlayers() {

  parseGet("players", function(players) {

      console.log(players);
      players.forEach(function(player) {
        alert(player.username);
      });
  });
}

function parseGet(url, callback) {
      fullUrl = "https://api.parse.com/1/classes/"+url
      $.ajax({
                contentType:"application/json",
                dataType:"json",
                url:fullUrl,         
                processData:false,
                headers: {
                    "X-Parse-Application-Id": "HCOLmSAQu05uzLqdbKov2BKbH4ZJOhZ0wKmgjm03",
                    "X-Parse-REST-API-Key": "jmSIOJza3LSjvdv69laBl7AhyzD73ata9XEFWAFX"
                },
                type:"GET",
                error:function(e) { alert('error: '+e);},
            }).done(function(e,status) {
                callback(e["results"]);
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
});