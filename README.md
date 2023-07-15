# Memory Game

This is a web-based memory game that challenges players to match pairs of cards. The game consists of a Login Screen where users enter their username, and a Game Screen where the actual game is played.

## Login Screen

The Login Screen serves as the initial entry point for the game. It collects the username from the player and redirects them to the Game Screen.

### Features:

- The page only contains an input field for the username and a submission button.
- The username must consist of at least 3 characters.
- Upon successful login, the user is redirected to the Game Screen.
- The user remains logged in with the same name until they choose to logout.

## Game Screen

The Game Screen is where the memory game is played. It provides the necessary interface for players to interact with the game and track their progress.

### Features:

- The current username is displayed to personalize the game experience.
- Players have the option to logout, which clears the user session and redirects them to the Login Screen.
- User login persists across page refreshes unless the player explicitly logs out.
- The game presents a grid of 16 cards, all faced up, for 5 seconds before hiding them.
- Clicking on a card reveals an image.
- Players can reveal only two cards at a time.
- If the two revealed cards match, they remain faced up.
- If the two revealed cards do not match, they flip back faced down after a 2-second delay.
- When all pairs have been successfully matched, a congratulations message is displayed.
- Players can also reset the game when they want.

## Development

To run the game locally or contribute to its development, follow these steps:

1. Clone the repository
2. Install the required dependencies: `<npm install>`
3. Start the development server: `<npm start>`
4. Access the game in your browser at `http://localhost:3000`

## Technologies Used

-React
-Redux

## Credits

This memory game was created by Omar Khankan .



