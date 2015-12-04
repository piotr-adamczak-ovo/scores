Scenario: Option to compare player stats
Given a player has been set up
When I am on the player page
Then I will be able to select the option to compare results

Scenario: selecting compare player
Given I am on a player page
When I have selected to compare player
Then I will have the option to select a player that I want to compare stats
And I will be navigated to compare player page

Scenario: Comparing stats with another player
Given I am on the compare a player page
Then I will see a table of both players league history 
And I will see the league ranking for both players
And I will see the total number of games played for each player
And I will see the total number of points for each player
And I will see the total number of wins for each player
And I will see the total number of draws for each player
And I will see the total number of losses for each player

Scenario: Comparing one on one stats with another player
Given I am comparing stats with player I have recorded results against previously
When I am on the compare a player page
Then I will see a table comparing the stats of previous games between the players
And I will see the total games played between the players
And I will see the wins between the players
And I will see the draws between the players
And I will see the losses between the players

Scenario: Not history between players - Comparing one on one stats
Given I have selected to compare stats with a player that I have never played before
When I am on the compare player stats page
Then I will see a comparison table of the total league stats
And I will see a message saying that these players have not played 
And there will be an option to start a game

