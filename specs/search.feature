Feature: Search
  As an admin of the site
  I want to search for an existing opinionation
  So that I can view metadata for the opinionator

  Scenario: View opinionations
    Given An opinionation named "Favaourite colour"
    When I search for "colour" on the search page
    Then I should find a link on text "Favourite colour"