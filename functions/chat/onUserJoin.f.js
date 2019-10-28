const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports = module.exports = functions.database.ref('/roomUsers/{addedUser}')
  .onCreate(async (createdChild, context) => {
    console.log("A user joined the chat: ", context.params.addedUser, createdChild.val());

    const newUser = createdChild.val();
    admin.database().ref('/messages').push({
      text: `${newUser.email} joined the chat`,
      userUid: 'ADMIN',
    });
  });
