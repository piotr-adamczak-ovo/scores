# scoresHome

Scenario: Viewing options
Given I am on the homepage
Then I should see the option to set up a new game
And I should see the option to view the hall of fame
And I should see the option to view player

Scenario: Player selects to record a game
Given I am on the homepage
When I select to record a game
Then I should be navigated to the record a new game page
