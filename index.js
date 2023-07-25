const express = require('express');
const app = express();


const allowedOrigins = [
    'https://www.google.com',
    'https://tassets.tier2.prod.li.dikdik.io',
    'http://ingraphs.prod.linkedin.com',
]; // Add more origins if needed

// app.use(express.text());
app.use(express.json());

app.use(function(req, res, next) {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Credentials', 'true');

    // change body parser to get JSON and validate if these headers are needed
    // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});


let lastBodyReceived = null;

// Endpoint to handle POST requests to /wa
app.post('/wa', (req, res) => {
    console.log('Req body type', typeof req.body);
    lastBodyReceived = req.body; // when using express.json()
    // lastBodyReceived = JSON.parse(req.body); // when using express.text()
    
    runCode();

    res.cookie('testCookie', 'testValue');
    res.status(204).send();
});

// GET the last body received
app.get('/', (req, res) => {
    res.status(200).json({ body: lastBodyReceived });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


async function runCode() {
    console.log('runCode');
}