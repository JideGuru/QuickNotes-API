# 🚀 QuickNotes-API [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Only 32 Kb](https://badge-size.herokuapp.com/Naereen/StrapDown.js/master/strapdown.min.js)](https://github.com/JideGuru/QuickNotes-API/blob/master) [![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/JideGuru) [![Build Status](https://travis-ci.com/JideGuru/QuickNotes-API.svg?branch=master)](https://travis-ci.com/JideGuru/QuickNotes-API) [![Website lbesson.bitbucket.org](https://img.shields.io/website-up-down-green-red/http/lbesson.bitbucket.org.svg)](https://quick-notes-api.herokuapp.com/)

An API for storing notes for users. it can be integrated in any platform (android, iOS or web apps).

Test here: https://quick-notes-api.herokuapp.com/

## ✨ Requirements
* Nodejs and Mongodb
* A little knowledge of Nodejs
* A brain to think 🤓🤓


## 🎖 Installing
To install all dependencies run the following command in terminal
```
npm install
```

Open ```nodemon.json``` file and edit the fields to your taste
After all is setup run ```npm start``` to start the server. Make sure mongodb server is opened


## 🎮 How To Use

### User Related Endpoints
**Register a user**

Make a POST request to http://localhost:3000/users/signup with the following fields
* email
* name
* password

Example:
```
{
   "name":"UserName", 
   "email":"email@mail.com", 
   "password":"password"
}
```

**User Login**

Make a POST request to http://localhost:3000/users/login with the following fields
* email
* password

Example:
{"email":"email@mail.com", "password":"password"}

NOTE: a token will be generated for every login and its lasts for **One Hour(1H)** only. The token will be required when doing some operations like **Editing a User**, **Changing a User's Display Picture** and **Deleting a User**.

**Delete a User**

Make a DELETE request to http://localhost:3000/users/USERID where USERID is the ID of the user that you want to delete.

**Edit a User**

Send a PATCH request to http://localhost:3000/users/USERID with the following field in thre request body
* email
* name
* password

Example:
{"name":"NewName", "email":"email@mail.com", "password":"Newpassword"}

**To set or change a user's Profile Picture**

Sent a PATCH request to http://localhost:3000/users/USERID with a muiltipart body and the following fields
* email
* name
* password
* dp (Only JPG and PNG are supported)

Example:
{"name":"UserName", "email":"email@mail.com", "password":"password", "dp":"MultiPart Image"}

**To get a particular user information**

Sent a GET request to http://localhost:3000/users/USERID.

### Note Related Endpoints
**Add a note**

Make a POST request to http://localhost:3000/notes with the following fields
* title
* content
* user(UserId of the note's owner)

Example:
{"title":"Note1", "content":"Note content", "user":"USERID"}


**List all notes for a particular user**

Make a GET request to http://localhost:3000/notes/user/USERID.



**Get a particular note**

Make a GET request to http://localhost:3000/notes/NOTEID.



**Edit a Note**

Send a PATCH request to http://localhost:3000/notes/NOTEID with the following field in thre request body
* title
* content
* user(UserId of the note's owner)
Example:
{"title":"NewTitle", "content":"NewContent", "user":"USERID"}

**Delete a Note**

Make a DELETE request to http://localhost:3000/notes/NOTEID 


## 🐛 Bugs/Requests
If you encounter any problems feel free to open an issue. If you feel the API is
missing a feature, please raise a ticket on Github and I'll look into it.
Pull request are also welcome.




## ⚡️ Disclaimer
This code is only intended for learning purposes, i am not responsible for anything you use it for.

Pardon my Bad English 😔.

Enjoy if you like what you see😃