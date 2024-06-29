# TicTacToe
This project is a simple implementation of the classic TicTacToe game, built using React.js. The project follows the tutorial from the official React documentation, with additional features added to enhance functionality and user experience.

# Introduction
TicTacToe is a popular two-player game where the objective is to get three of your marks in a row on a 3x3 grid. This project serves as a beginner-friendly introduction to React, demonstrating fundamental concepts such as state, props, and component-based architecture.

# Features
Player vs Player Mode: Two players can play the game on the same device.
State Management: Utilizes React's state management to track the game state.
Winner Detection: Identifies and highlights the winning combination.
Responsive Design: Adaptable to different screen sizes for a better user experience.

# Installation

To run this project locally, follow these steps:

Clone the repository

bash
Copy code
git clone https://github.com/yourusername/tictactoe.git
cd tictactoe
Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run start
Usage
Once the development server is running, open your browser and navigate to the link shown on the terminal which should usually be 'http://localhost:3000' to start playing the game

# Game Features
In addition to the basic functionality covered in the React documentation, the following features have been implemented:
Move Tracker: The current move is now displayed with a message "You are at move #..." instead of using a button.
Dynamic Board Creation: The Board component has been refactored to use loops for generating the squares dynamically, rather than hardcoding them.
Move Sorting Toggle: A toggle button has been added to sort the move history in either ascending or descending order.
Winning Highlights: When a player wins, the three squares that contributed to the win are highlighted. If the game ends in a draw, a message is displayed indicating the result.
Move Location Display: The location of each move is now displayed in the format (row, col) in the move history list.