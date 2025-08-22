require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session") (session);
const bodyParser = require("body-parser");
const routes = require("./routes/auth");
const db = require("./config/db");

// initialize express app
const app = express();

// Configure the session store
const sessionStore = new MySQLStore({}, db);

// Set up session middleware 
app.use(
    session({
        key: "user_id",
        secret: process.env.SESSION_SECRET, 
        store: sessionStore, //use the MySQL store for session
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 24, // 1 day
        }
    })
);

// Middleware

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/")));
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/auth", routes);

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/register', (request, response) => {
    response.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/login', (request, response) => {
    response.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/dashboard', (request, response) => {
    response.sendFile(path.join(__dirname, 'dashboard.html'));
});

//log out route


// Start the server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Server runinng on http://localhost:${PORT}`)
);


