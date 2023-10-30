const express = require("express");
const admin = require("firebase-admin");
const service = require("./firebaseAdmin.json");
admin.initializeApp({
  credential: admin.credential.cert(service),
  databaseURL: "https://gomasjid-4a35a.web.app/login",
});
const app = express();
const port = 3000;
app.use(express.json());
app.post("/sendNotification", async (req, res) => {
  try {
    let topic;
    const type = req.body.type || "";
    const title = req.body.title || ""; 
    const body = req.body.body || ""; 
    const masjidId =req.body.masjid || "";
    const masjidName=req.body.masjidName || "";
    let proceed=false;  
    console.log("Request Body:", req.body);
    switch (type) {
      case "announcement":
        topic = "/topics/masjid" + (masjidId || "");
        proceed=true;
        break;
      default:
        console.error("Unknown type:", type);
        return res.status(400).json({error: "Invalid type"});
    }
    if (proceed) {
      const message = {
        notification: {
          title: title, 
          body: `${masjidName}:${body}`, 
        },
        topic: topic,
      };
      const response = await admin.messaging().send(message);
      console.log("Notification sent successfully:", response);
      res.status(200).json({message: "Notification sent successfully"});
    }
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({error: "Failed to send notification"});
  }
});
app.post('/deleteAuthUser', async (req, res) => {
  try {
    const { uid } = req.body;
    console.log(req.body,"uid");

    await admin.auth().deleteUser(uid);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});