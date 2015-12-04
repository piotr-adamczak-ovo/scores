Selecting player
Given I have set up a player
When I am on the player page
Then I will be able to search 
And I will be able to select the player 

Viewing player
Given I have set up a player
And I am on the player page
When I select a player
Then I will see the player name
And I will see the avatar
And I will see their game stats
And I will see the result of the last game that they played

Viewing game stats
Given a player has been set up
When I select the player option
Then I will see their league ranking
And I will see the total number of games played
And I will see the total number of points 
And I will see the total number of wins as a number
And I will see the total number of draws as a number
And I will see the total number of defeats as a number

Viewing game stats as a percentage
Given a player has been set up
When I select the player option
Then I will see their league ranking
And I can select to see the total number of wins as a percentage
And I can select to see the total number of draws as a percentage
And I can select to see the total number of defeats as a percentage

Searching for a player
Given I am on the game page
When I start typing a player name 
Then the player names that matched the searched query will appear
And I will be able to select a player name

Searching for a player that does not exist
Given a player has not been set up
When I am on the player page
And I enter a player name that does not exist
Then there will be no player name displayed to select
And I will see a message explaining how to set up a new player 

Creating a new player
Given I am on the player page
When I have not selected a player
Then I will see a message telling me to set up a new player

Scenario: Returning to Homepage
Given I am on the score page
When I select the image in the header
Then I will be returned to the home page
