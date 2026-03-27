# Six-seven quizzes Frontend 
An interactive, educational web experience designed to make learning fun through gamified challenges the 
- **Brain Bank Heist**
- **Knowlegde Escape Room**
- **Quickfire Academy**

## Project Vision
We aim to provide an enjoyable and learning environnement so students can have fun while learning. Our main game is called **Brain bank Heist**

## Tech stack
- HTML: to build the pages
- CSS & Boostrap/ Vanilla : To make the website look good 
- JavaScript: DOM manipulations to make the game work

## Component Architecture 
We organised the code into folders so it easy to find everything

- assets/scripts: Contains the JavaScript logic for different pages ( Login, Signup, Game Logics)
- assets/Styles: Contains the CSS files to make each page look good (e.g, homestyle.css, gamestyle.css)
- assets/images: Stores the pictures used in the app.
- Root Files: The main HTML pages like HomePage.html, gameselection.html and gamerules.html

## Testing
For our frontend, we test the following parts: 

- Login & Signup: To check if users can create accounts and log in correctly.
- Game Selection: To make sure the user can pick a game without errors.

## 🎮 Games Overview: Brain Bank Heist 
In this game, you are a "thief" trying to open a safe. You must answer questions correctly to win. 
- Levels: You answer a set of 5 questions to progress through layers: 
    - 2 easy questions 
    - 2 medium questions
    - 1 hard question

- The Two-Strike Rule: If you get one answer wrong, you can try again. If you get two answers wrong on the same question, the game is over!

## User flow
1. Sign up: User enters credentials
2. Sign in: Authenticated access to the game selection homepage 
3. Homepage: Selection screen for the Brain Bank Heist
4. The Game: Answer questions to progess through vault layers (before play you can read the game instructions)
5. Results: View your score, replay or return to the main page game selection