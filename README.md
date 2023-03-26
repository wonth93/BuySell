# BuySell Your Cars

A mini advertisement platform for users to sell them car.

## Final Product

Home Page

!["Home Page"](./screenshot/HomePage.png)

Single car informaion, message the owner if your are interested

!["Car Info"](./screenshot/CarInfo.png)

Create a new listing

!["Create Listing"](./screenshot/CreateListing.png)

Inbox Messages

!["Your Messages"](./screenshot/Message.png)

## Setup

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- PSQL
- Express
