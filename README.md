# React Challenge

## Instructions

This repository includes a naive implementation of a React application designed to search for, and display, information about countries (using https://restcountries.com/).

Your task is to refactor and improve the application.

Focus on clean, maintainable code and your proficiency with components, state management, and API integration.

Commit your changes as you go & submit your work via a GitHub repository link.

Update this `README` with anything that you'd like to do if you had more time.

### Things to consider

1. Accessibility
2. Robust error handling
3. Testing
4. Responsiveness
5. Ease of updating the data source
6. Appearance: Style is secondary; however, a basic, user-friendly UI is appreciated
7. Anything else: You are welcome to add any features that highlight your capabilities

## Getting Started

### Scripts

1. Install packages

```sh
npm install
```

2. Run locally

```sh
npm run dev
```

### Features Added

1. Search Options: Added the ability to search by different criteria (name, capital, or region).
2. Infinite Scrolling: Implemented infinite scrolling to dynamically load more countries as the user scrolls.
3. Dark/Light Theme: Integrated a theme toggle that allows users to switch between light and dark modes.
4. Autocomplete: Enhanced the search input with autocomplete functionality when searching by name.
5. Debouncing: Applied debouncing to the search input to improve performance and user experience.
6. Country Details Modal: Added a feature where users can click on a country to display more detailed information, fetching additional data dynamically.

### Additional Enhancements

1. Accessibility Improvements: Ensured better keyboard navigation, screen reader support, and general accessibility enhancements.
2. Responsive Design: Made the application responsive to different screen sizes.
3. Error Handling: Implemented robust error handling to gracefully handle API errors and provide user feedback.
4. Unit and Integration tests
5. Improved Code Quality: Refined the codebase by enforcing stricter ESLint rules to improve maintainability and catch potential issues early.
