const express = require("express");
const path = require("path");
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

dotenv.config();
app.use(express.json());

app.use(session({
    secret: 'dnvTravel.com-design-by-thangtm-13',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: 'auto',
        httpOnly: true,
        maxAge: 3600000 // hết hạn trong: 3600 000 -> 60 phút // 60000 -> 1 phút 
    }
}));

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.set("PORT", process.env.PORT || 4000);
app.listen(app.get("PORT"), () => console.log('SERVER RUNNING IN PORT::', app.get("PORT")));