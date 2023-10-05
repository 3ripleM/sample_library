[![Deployment](https://github.com/3ripleM/blazesoft_interview/actions/workflows/main.yml/badge.svg?branch=master)](https://github.com/3ripleM/blazesoft_interview/actions/workflows/main.yml)

# Bookstore React App

This is a single-page application developed using React, Redux, and other technologies to create a bookstore. The application allows users to view a list of books, add new books, modify book details, and delete books.

## Stack

- **React**: JavaScript library for building user interfaces.
- **Redux**: State management library for managing application state.
- **Tailwind CSS**: Utility-first CSS framework for rapidly building custom designs.
- **DaisyUI**: Tailwind CSS component library.
- **Webpack**: Module bundler for optimizing and bundling application code.
- **Express**: Minimal and flexible Node.js web application framework used for serverless deployment, showcasing configuration skills.
- **TypeScript**: Typed superset of JavaScript for enhanced code quality and maintainability.

## CI/CD

- **GitHub Actions**: Continuous Integration (CI) workflow for automating the build and deployment process.
- **Vercel**: Serverless deployment platform for deploying the application to a public domain.

## Additional Libraries and Tools

- **io-ts**: Library for runtime type checking of JSON payloads.
- **fp-ts**: Functional programming library for TypeScript.
- **ts-pattern**: Library for pattern matching in TypeScript.
- **eslint**: Linting tool for identifying and fixing code style issues.
- **prettier**: Code formatter for maintaining a consistent code style.
- **react-hook-form**: Library for efficient form handling in React.

## Elm-style Coding

The application uses a simplified `useElm` library to implement Elm-style architecture (Model-View-Controller) in TypeScript and React. This approach separates the model, view, and controller for better testing and maintainability.

## Form Validation

- **io-ts**: Utilized for form validation to ensure input and output JSONs have the correct schema, enhancing data integrity and consistency.

## Application Deployment

The application is hosted on a public domain: [blazesoft.medy.dev](https://blazesoft.medy.dev).

## Why Express for Serverless

- **Express**: Chose Express over frameworks like Next.js to demonstrate skills in configuring webpack and serverless architecture. This choice allows for custom server configurations and showcases proficiency in advanced setups.

## How to Run the Application

1. Clone the repository.

```bash
git clone https://github.com/3ripleM/blazesoft_interview
cd blazesoft_interview
```

2. install dependencies

```bash
yarn install
```

3. build and run the applicatin

```bash
yarn build
yarn start
```
