## Starting for the first time

1. npm install
2. cd client
3. npm install
4. cd ..
5. npm run dev <-- boots up entire project (front-end on localhost:3000, back-end on localhost:5001)

OPTIONAL

1. Mess around with the form (open developer console) (its no good atm, but gives you a rough idea on how the whole stack talks)
2. Want to see the api results directly? Log into the form, then go to localhost:5001/api/current_user on your browser

#### Good Coding Practices/Recommendations

1. Install Prettier on your IDE. Make sure to enable "format on save", "semicolons", and "single-quote" settings.

### Important Stuff

ALL front-end work is in the client folder.

There are now TWO SETS of node_modules.

#### Need Information from the database?

1. Check out routes/authRoutes.js or routes/apiRoutes.js <-- contains ALL endpoints for the database (liable to change)
2. "models" defines ALL database schemas. Modify classes and attributes here.
3. The services/passport.js file handles user login
