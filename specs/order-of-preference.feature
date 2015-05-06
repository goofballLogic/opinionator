Feature: Order of preference
  As a someone organising a meetup
  I want to allow people to indicate date preferences
  So that I can organise it for the best day

Background:
  Given a new opinionation "My meetup"
  And it has description "Welcome to my meetup! Please select the dates which work best for you."
  And it has date options:
    | 2015-03-01 |
    | 2015-05-02 |
    | 2015-05-03 |
    | 2015-06-01 |

  Scenario: Display possible dates
    Given I follow the responder link
    Then I should see the title "My meetup"
    And I should see the description "Welcome to my meetup! Please select the dates which work best for you."
    And I should see the 4 date options:
      | 2015-03-01 |
      | 2015-05-02 |
      | 2015-05-03 |
      | 2015-06-01 |

  Scenario: Move an option up
    Given I follow the responder link
    When I set the second item's order to 1
    And I submit the form
    Then I should see a new top item "2015-05-02"

  Scenario: Move an option up
    Given I follow the responder link
    When I set the first item's order to 2
    And I submit the form
    Then I should see a new top item "2015-05-02"