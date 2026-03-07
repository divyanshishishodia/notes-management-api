# Notes Management API

A backend API for managing personal notes with authentication using Node.js and Express.

## Features
- User Registration
- User Login with JWT
- Create Notes
- Get Notes
- Delete Notes

## Tech Stack
- Node.js
- Express.js
- SQLite
- JWT
- bcrypt

## Installation & Setup

1. Clone the repository

git clone https://github.com/divyanshishishodia/notes-management-api.git

2. Navigate to the project folder

cd notes-management-api

3. Install dependencies

npm install

4. Run the server

node server.js

The server will start at:

http://localhost:3000

## Project Structure

notes-management-api
│
server.js
database.js
package.json
package-lock.json
README.md
.gitignore
│
screenshots

## API Endpoints

POST /register  
POST /login  
POST /notes  
GET /notes  
DELETE /notes/:id 

## Example API Requests

Register User

POST /register

Body:
{
 "username": "div",
 "password": "1234"
}

Login User

POST /login

Body:
{
 "username": "div",
 "password": "1234"
}

Create Note

POST /notes

Body:
{
 "title": "My First Note",
 "content": "Testing GDG backend project",
 "user_id": 1
}

## Testing
APIs were tested using Postman.

## API Testing (Postman)

### Register API
![Register](screenshots/register.jpeg)

### Login API
![Login](screenshots/login.jpeg)

### Create Note
![Create](screenshots/note-created.jpeg)

### Get Notes
![Get](screenshots/get-note.jpeg)

### Delete Note
![Delete](screenshots/note-deleted.jpeg)

## Future Improvements

- Add update note functionality
- Add pagination for notes
- Implement search notes feature
- Add role-based access control
