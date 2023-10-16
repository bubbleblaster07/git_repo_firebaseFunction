const express = require('express');
const admin = require('firebase-admin');

const serviceAccount = require('./gomasjid-4a35a-firebase-adminsdk-mfmz2-c611c39fc8.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://gomasjid-4a35a.web.app/login',
});

const app = express();
const port = 3000;
app.use(express.json());

app.post('/sendNotification', async (req, res) => {
  try {
    let topic;
    const type = req.body.type || '';
    const title = req.body.title || ''; 
    const body = req.body.body || ''; 
    const masjidId =req.body.masjid || '';
    const masjidName=req.body.masjidName || '';
    let proceed=false;  
    console.log('Request Body:', req.body);



    switch (type) {
      case 'announcement':
        topic = '/topics/masjid' + (masjidId || '');
        proceed=true
        break;



      default:
        console.error('Unknown type:', type);
        return res.status(400).json({ error: 'Invalid type' });
    }
    if(proceed){
      const message = {
        notification: {
          title: title, 
          body: `${masjidName}:${body}`, 
          // body:body  
        },
        topic: topic,
      };

      const response = await admin.messaging().send(message);
      console.log('Notification sent successfully:', response);

      res.status(200).json({ message: 'Notification sent successfully' });
    }} catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).json({ error: 'Failed to send notification' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


















// const admin = require('firebase-admin');
// admin.initializeApp();
// const messaging = admin.messaging();
// const express = require("express");
// const app = express();
// const port = 3000;

// // Define a route that sends data to the client
// app.get("/sendNotification",async (req, res)=> {
//   const dataToSend = {
//     title: "Hello from the server",
//     body: "This is the data sent from the server to the client.",
//     to:"topics/all"
//   };
//   // const {title, to, data} = req.body;
//   // const message = {
//   //   data: {
//   //     title: title,
//   //     body: data,
//   //   },
//   //   topic: to,
//   // };
//   // try {
//   //   await messaging().send(message);
//   //   console.log('Notification sent successfully');
//   //   return res.status(200).json({message: 'Notification sent successfully'});
//   // } catch (error) {
//   //   console.error('Error sending notification:', error);
//   //   return res.status(500).json({error: 'Failed to send notification'});
//   // }

//   // Send the data as JSON to the client
//   res.json(dataToSend);
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });













// const admin = require('firebase-admin');
// admin.initializeApp();
// const messaging = admin.messaging();


// exports.sendNotification = functions.https.onRequest(async (req, res) => {



//   const { title, to ,data} = req.body;

 
//   const message = {
//     data: {
//       title: title,
//       body: data,
//     },
//     topic: to,
//   };
//   console.log(message);

//   try {
//     // Send the notification using Firebase Admin SDK
//     await messaging().send(message);
//     console.log('Notification sent successfully');
//     return res.status(200).json({ message: 'Notification sent successfully' });
//   } catch (error) {
//     console.error('Error sending notification:', error);
//     return res.status(500).json({ error: 'Failed to send notification' });
//   }
// });
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const axios = require('axios'); // Import the axios library

// admin.initializeApp();
// const messaging = admin.messaging();

// // Define your Firebase Cloud Function
// exports.sendNotification = functions.https.onRequest(async (req, res) => {
//   const { title, to, data } = req.body;

//   const message = {

//       title: title,
//       body: data,
   
//     topic: to,
//   };
//   console.log(message);

//   try {

//     await messaging.send(message);
//     console.log('Notification sent successfully');


//     const localApiUrl = 'http://localhost:3000/sendNotification'; // Replace with your local API URL
//     const localApiResponse = await axios.post(localApiUrl, {
//       title: "title",
//       to: "to",
//       data: "data",
//     });

//     return res.status(200).json({ message: 'Notification sent successfully', localApiResponse: localApiResponse.data });
//   } catch (error) {
//     console.error('Error sending notification:', error);
//     return res.status(500).json({ error: 'Failed to send notification' });
//   }

// });
//   const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

