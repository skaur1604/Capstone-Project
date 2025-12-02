# Capstone Project – Pre-Milestone Proposal

# Student:"Sukhpreet Kaur"
# Course:"Back-End Development"

## Project Concept:-

Project Name: RecipeHub API
Theme: Recipe Management and Sharing Platform

Overview:
RecipeHub API is a back-end app that lets users create, share, and manage their favorite cooking recipes. Each recipe has a title, description, list of ingredients, and 
an optional image. Other users can also leave reviews and give ratings for the recipes they’ve tried.

Purpose:
This project shows my ability to build a full back-end system using Node.js, TypeScript, Firebase, and Express. It also helps me learn how to use Multer for uploading 
images, making the app more fun and realistic.

## Scope and Functionality:-

The API will include the following main resources:-
Users – Handles user registration, login, and roles.
Recipes – Main content created and managed by users.
Ingredients – Details of each recipe’s ingredients.
Reviews – Users’ ratings and comments on recipes.

## Endpoints:-

|Endpoint |	Method | Description|
------------------------------------
|/auth/signup | POST | Register a new user|
|/auth/login  | POST | Log in user|
|/users/:id	  | GET	 | Get user profile|
|/recipes	  | GET	 | Get all recipes|
|/recipes/:id |	GET	 | Get single recipe|
|/recipes	  | POST | Create a new recipe|
|/recipes/:id | PUT	 | Update recipe|
|/recipes/:id | DELETE |Delete recipe|
|/recipes/:id/ingredients |	POST | Add ingredients to a recipe|
|/recipes/:id/ingredients | GET  | Get ingredients for a recipe|
|/recipes/:id/reviews	  | POST | Add a review for a recipe|
|/recipes/:id/reviews	  | GET	 | Get all reviews for a recipe|
|/recipes/:id/upload	  | POST | Upload an image for a recipe (Multer)|

## Data Needs:-

The API will store the following data in Firebase Firestore:
Users: name, email, password, and role.
Recipes: title, description, category, image URL, creator ID, and timestamp.
Ingredients: linked to recipes with ingredient name and quantity.
Reviews: linked to recipes with rating, comment, and reviewer ID.

## Course Content Alignment:-

|Course Topic            | How It’s Used in RecipeHub API|
----------------------------------------------------------
|Node.js +               | Express Builds the main server and routes|
|TypeScript              | Adds strong typing and clean code structure|
|Firebase Firestore      | Cloud database to store users, recipes, and reviews|
|Firebase Authentication | Manages user registration and login|
|Joi	                 | Validates request data|
|Swagger/OpenAPI	     | Creates live API documentation|
|Jest	                 | For unit testing CRUD operations|
|dotenv	                 | For managing environment variables|
|helmet.js & CORS     	 | Adds extra security layers|
|GitHub	                 | Used for version control and project tracking|

## New Component: Multer:-

Chosen Component: Multer (for file uploads)

Purpose:
Multer will allow users to upload recipe images, adding a more realistic and user-friendly element to the API.

## GitHub Project Setup:-

Repository Name: Capstone_Project
Visibility: Public
Reo LInk:-https://github.com/skaur1604/Capstone-Project

Branch Structure:
main – final, production-ready code
development – for ongoing updates
feature/* – for specific features (e.g., feature/recipes-crud)

## Project Board:-

Milestone 1: Project Setup & Initial CRUD
Goals: Set up project and database, basic CRUD
Issues: Environment setup, database design, user CRUD, resource CRUD, tests, API docs

Milestone 2: Sprint Demo & Component Integration
Goals: Add components, refine MVP
Issues: Integrate components, refine CRUD, update tests, prepare demo, conduct demo

Milestone 3: Finalization & Advanced Features
Goals: Add advanced features, authentication, finalize project
Issues: Advanced features, authentication, final tests, update docs, code cleanup, final demo