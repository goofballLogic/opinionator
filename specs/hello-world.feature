Feature: Hello world
  As a user of this cukey nonesense
  I want to load the home page
  So that I prove the damn thing works

  Scenario: Loading the home page
    Given I am on the home page
    When I fetch the body text
    Then I should find "hello world"