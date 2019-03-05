# 🚀 QuickNotes-API

An API for storing notes for users. it can be integrated in any platform (android, iOS or web apps).

## Requirements
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
**Register a user**
Make a POST request to http://localhost:3000/users/signup with the following fields
* Email
* Name
* Password

**User Login**
Make a POST request to http://localhost:3000/users/login with the following fields
* Name
* Password
NOTE: a token will be generated for every login and its lasts for **One Hour(1H)** only. The token will be required when doing some operations like **Editing a User**, **Changing a User's DP** and **Deleting a User**.

**Delete a User**
Make a DELETE request to http://localhost:3000/users/USERID where USERID is the ID of the user that you want to delete.

**Edit a User**
Send a PATCH request to http://localhost:3000/users/USERID with the following field in thre request body
* Email
* Name
* Password

**To set or change a user's Profile Picture**
Sent a PATCH request to http://localhost:3000/users/USERID with a muiltipart body and the following fields
* Email
* Name
* Password
* DP IMAGE (Only JPG and PNG are supported)

**To get a particular user information**
Sent a GET request to http://localhost:3000/users/USERID.



## ⚡️ Disclaimer
This code is only intended for learning purposes, i am not responsible for anything you use it for.

Pardon my Bad English 😔.

Enjoy if you like what you see😃