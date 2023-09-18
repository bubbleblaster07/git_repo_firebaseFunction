const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const messaging = admin.messaging();


exports.sendNotification = functions.https.onRequest(async (req, res) => {
  const {title, to, data} = req.body;
  const message = {
    data: {
      title: title,
      body: data,
    },
    topic: to,
  };
  try {
    await messaging().send(message);
    console.log('Notification sent successfully');
    return res.status(200).json({message: 'Notification sent successfully'});
  } catch (error) {
    console.error('Error sending notification:', error);
    return res.status(500).json({error: 'Failed to send notification'});
  }
});

