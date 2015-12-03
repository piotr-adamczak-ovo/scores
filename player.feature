Selecting player
Given I have set up a player
When I select the player option 
Then I will see the option to select a player name

Viewing player
Given I have set up a player
And I am on the player page
When I select a player
Then I will see the player name
And I will see the avatar
And I will see the league standing

Viewing game stats
Given a player has been set up
When I select the player option
And I will see the total number of games played
And I will see the total number of points 
And I will see the total number of wins as a number
And I will see the total number of wins as a percentage
And I will see the total number of draws as a number
And I will see the total number of draws as a percentage
And I will see the total number of defeats as a number
And I will see the total number of defeats as a percentage
And I will see the result of the last game that I played

Searching for a player that does not exist
Given a player has not been set up
When I am on the player page
And I enter a player name that does not exist
Then there will be no player name displayed to select

Searching for a player
Given I am on the game page
When I start typing a player name 
Then the player names that matched the searched query will appear
And I will be able to select a player name

Creating a new player
Given I am on the player page
When I have not selected a player
Then I will see a message telling me to set up a new player by recording a game result

Scenario: Returning to Homepage
Given I am on the score page
When I select the image in the header
Then I will be returned to the home page
