# Changelog

## [1.2.0] - 2024-07-04

### Added
- Idle game detection: After 3 player rotations without moves, a popup asks if players are still playing
- Automatic game closure: If no response to idle popup after 120 seconds, the game closes
- Background image: Added a JFIF file as a semi-transparent background for the game

### Changed
- Game container now has a background image with 25% transparency
- Idle timer resets after each successful move or correct answer submission

## [1.1.0] - 2024-07-03

### Added
- Scoreboard to keep track of wins for each player
- Reset button to start a new game and reset scores
- Game board now resets after a player wins
- Submit button stops the clock if the answer is correct
- Color differentiation for X (green) and O (red) on the game board

### Changed
- Timer now resets correctly after each move
- Game correctly switches to the opposing player's turn after a correct move
- Updated game logic to handle new features

### Fixed
- Bug where timer didn't reset once a player made their move
- Bug where it didn't switch to the opposing player's turn after a correct move

## [1.0.0] - 2024-07-02

### Added
- Initial release of Tic Tac Toe Math game
- Basic game logic including board, players, and math questions
- Timer for each turn
- Simple UI for game board, math questions, and messages