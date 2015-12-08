Scenario: Viewing the hall of fame table when I have never recorded a result
Given I have never recorded a game 
When I go to the hall of fame
Then I will see the player names for all the existing players
And I will see the rankings for all the existing players
And I will see the number of games that the existing players have played
And I will see the number of point that the existing players have achieved

Scenario: Viewing the hall of fame table after I have recorded a result
Given I have saved a result
When I go to the hall of fame table
Then I will see the last recorded result 
And the time the last result was recorded
And I will see my player name in the table
And I will see where I rank on the hall of fame table
And I will see the number of games that I have played
And I will see my total number of points 
And I will see the stats for the other players
And I will be able to scroll up and down the table

Scenario: Returning to Homepage
Given I am on the score page
When I select the image in the header
Then I will be returned to the home page

