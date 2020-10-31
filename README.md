## IOU APPLICATION
The purpose of this application is to keep track of small favours among friends and groups. 

## Link
The deployed link of the application: [http://ec2-18-232-69-252.compute-1.amazonaws.com:3000/](http://ec2-18-232-69-252.compute-1.amazonaws.com:3000/)

### Functionality
Users are able to:
- View favours they owe other people
- View favours that are owed
- View uploaded photo proof that a favour has been completed
- Record a favour owing to another person
- Record a favour as complete
- Create a public favour, displayed on the home page
- Add/Delete Friends
- Detect a loop of favours and recommend a "party" favour

Note: This app does not allow monetary transactions.

## Architecture 
The application was developed using a MERN (MongoDB, Express, React and Node.js) tech stack with Docker to contanerize the application and an AWS EC2 instance for deployment. The application was designed using a three tier architecture which would follow the princple known as separation of concerns. This means that the front end components were separated from the data and business components. The client folder contains all front end and user interface (UI) components which would be handled by React. Whereas routes, services contains and models contains the business and data logic of the application. The connection between the mongoDB database and front end is through a middleware called Mongoose. The routes and models folder is responsible for handling application programming interfaces (API) requests, responses and performing CRUD (Create, Read, Update and Delete) operations to the database. The services folder is for configuring the stack for registration and login as it is using a middleware called Passport for user authentication.


## Innovation 
- Utilises skeleton loading for components
- Easy to use interface
- Has transitions, animations and micro interactions which was created using SVGs, CSS and HTML Canvas elements 
- Filters and prevents usage of profanity or inappropriate words
- Deployed application using Docker and AWS EC2 instance with an NGINX Load Balancer


## Starting the application locally:

```lua
1. npm install
2. cd client
3. npm install
4. cd ..
5. npm run dev 

Client launches on localhost:3000, Server on localhost:5001
```
