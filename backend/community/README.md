# Community Section
This is a code for the *Backend* both API and Socket to be used for **Limkokwing Community Feature.**

### Features
- Support for One-to-One chat
- Support for Many-to-Many chat
- File Sharing
- JWT Authentication
- History chat (Store chat)
- Mark a message as Read
- Unsubscribe & Subscribe to the specific 

**Table of Contents**

[TOCM]

[TOC]

#Important
- Please keep in mind the data ***might be changed*** when its to connected to the ERP and the flow ***might be changed***  but overall flow will keep the same.
- Postman Collection: https://github.com/rzkccc/community_section/blob/develop/Community%20Section%20(CCC).postman_collection.json
##How to Use
Please use Postman Collection for details of the Requests. The flow of the API and socket can be found here.
###REST API
1. Users:
	1. Create User: Use this API to create a User to be used for ***Testing Purposes Only***
	2. Get User By Id: To fetch specific user info based on the Id
	3. Get Users: Fetch all of the data of the users
	4. Delete User: If need to delete a user.
2. Authentication:
	1. Login: Must be used before using **Chat Room API**
3. Chat Room:
	1. Mark as Read: To mark if the chat has been read
	2. Get Chat Room: To get all of the rooms
	3. Initiate Chat: **This must be called before starting a chat**
	4. Get Chat Room by Id: Get the info regarding the chat
	5. Get Message by Room Id: Get the messages in the chat room
	6. New Message: **This API must be called to send the message"**
	7. Get File: To get the file sent in the chat
###Socket
For information can refer to `utils/websocket.js` .
	- identity: **MUST** be called after the **Login API** is called
	- subscribe: The user(s) that are going to be chatting **MUST** must be subscribe with the `room_id` and the `user_id`