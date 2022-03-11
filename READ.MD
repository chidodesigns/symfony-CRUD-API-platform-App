# Symfony MoviesOnDemand App

A Symfony 4.4 CRUD functionality application that allows you search for movies and add them to your database.

## Running the App

- `composer install`
- Start Symfony Server: `symfony console server:run`
- `npm install`
- Start Client Side: `npm run-script watch`
- Go to server url created by Symfony Server and you can access the frontend React Project.

## Test Suite

- Set up database URL in `env.test` 
- USE FIXTURES CLASS TO LOAD DUMMY DATA: `php bin/console --env=test doctrine:fixtures:load`
- Run Test: `php ./vendor/bin/phpunit` [all tests are running using in memory DB]

## Bugs & Issues
- Error routing: /search/<searchTerm> [Hit Enter] directly into the URL creates a HTTP not found error . This is connected to controller routing wiring, and how that is handled from Symfony to React.
- Clearout the search form logically .
- Add a reset state function in App Context, with a setTimeout function used within component to trigger resetting states.
-  Add a loading state for movie search, sometimes API will take a little while to respond with data - could add a loading state for better user experience.
- Format Release Date (using a tool like Carbon ) - On Single Movie Listing Page
- Add Movie Plot as a field on the Movie Entity 
- Provide more ORM context around Movie Entity properties [like data type annotations on Class properties]
- A cleaner homepage view - search for and add three movies to the DB

## Improvements
- Single Movie Page View [Movies that are saved to DB, should have a single view, reuse the movie listing component.
- Add a DELETE movie Button -> client side function is partially inlace.
- The Search functionality could have an advanced search, whereby you can search within the Database collection as well.
- Clean Up Test Suite Backend Test Suite, remove unnecessary tests and redundant code.
- Add frontend testing (for React using Jest or something similar)

## ENV Vars
- Added the ability to expose ENV vars to frontend via web pack encore 
- Create an .env.local file root level
- Add IMDB Api key
- Add Api Server Url (whatever Symfony server throws up)