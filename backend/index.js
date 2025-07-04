const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());

app.get("/auth/github", (req, res) => {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`;
  res.redirect(redirectUrl);
});

app.get("/auth/github/callback", async (req, res) => {
    const code = req.query.code;
    const {data} = await axios.post("https://github.com/login/oauth/access_token", {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code:code,
    },{
        headers:{
            accept:"application/json"
        }
    })     
    const AccessToken = data.access_token;
    const userResponse = await axios.get("https://api.github.com/user",{
        headers:{
            Authorization: `token ${AccessToken}`
        }
    })

    const emailResponse = await axios.get("https://api.github.com/user/emails",{
        headers:{
            Authorization: `token ${AccessToken}`
        }
    })

    const emailObject=emailResponse.data.find(email=>email.primary && email.verified)

    const userData = {
        ...userResponse.data,
        email:emailObject?.email
    }
    res.redirect(`http://localhost:5173/?user=${encodeURIComponent(JSON.stringify(userData))}`);
})  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
