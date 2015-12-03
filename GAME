Game
Scenario: New player enters player name
Given I am on the record a game screen
When I select the input field name
Then the alphanumerical keyboard should display
And I should have the option to set up a new player

Scenario: Existing player enters their name
Given I have previously recorded a result
And I am recording a new result
When I start entering my name
Then my player name should display
And I should have the option to select my player

Scenario: Setting up an opponent 
Given I have entered my name
When I select the player two field
Then the alphanumerical keyboard will display
And I will be able to enter my opponent’s player



Scenario: Selecting opponent who does not exist
Given I have entered the name of my opponent
When no results show for their name
Then I will be able to set up a new player for them
And I will be able to enter the name of my opponent’s player

Scenario: Selecting opponent who does exist
Given I have entered the name of my opponent
When results show for their player
Then I will be able to select their player 

Scenario: Entering my result
Given the game has finished
When I select the score input field next to my player
Then a numerical keyboard will appear
And I will be able to select the number of goals scored

Scenario: Entering opponents result
Given the game has finished
When I select the score input field next to my opponent's player
Then a numerical keyboard will appear
And I will be able to select the number of goals my opponent scored

Scenario: Saving a result
Given I have entered my score
And I have entered the number of goals scored by my opponent
Then there will be the option to save the result
And there will be a confirmation message congratulating the winner

Scenario: Returning to Homepage after saving a score
Given I have receive a confirmation message that the score has been saved
When I select home
Then I will be returned to the homepage

Scenario: Returning to Homepage
Given I am on the score page
When I select the image in the header
Then I will be returned to the home page
