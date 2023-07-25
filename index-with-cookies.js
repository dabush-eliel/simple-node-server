const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();


const allowedOrigins = [
    'https://www.google.com',
    'https://tassets.tier2.prod.li.dikdik.io',
    'http://ingraphs.prod.linkedin.com',
]; // Add more origins if needed

// app.use(bodyParser.text({ type: 'text/plain' }));
app.use(express.text());
// app.use(express.json());

app.use(cookieParser());

// app.use(cors());

// Enable CORS for all routes and allow credentials
// app.use(cors({ 
//     origin: function(origin, callback){
//       // Allow requests with no origin 
//       // (like mobile apps or curl requests)
//       if(!origin) return callback(null, true);
//       // Selectively allow these origins
//       if([TEST_WEBSITE].indexOf(origin) !== -1){
//         return callback(null, true)
//       } else {
//         return callback(new Error('Not allowed by CORS'))
//       }
//     },
//     credentials: true,
// }));

app.use(function(req, res, next) {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Credentials', 'true');

    // change body parser to get JSON and validate if these headers are needed
    // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

     // Check if the 'cookie' header is present in the request
    // const withCredentials = req.get('cookie') !== undefined;
    // console.log('Request withCredentials:', withCredentials);
    // console.log('Request cookie:', req.headers.cookie);
    
    next();
});


let lastBodyReceived = null;

// Endpoint to handle POST requests to /ws
app.post('/wa', (req, res) => {
    console.log('Req body type', typeof req.body);
    // console.log('Req body', JSON.parse(req.body));

    lastBodyReceived = JSON.parse(req.body);
    
    // console.log('Req cookies', req.cookies);
    // console.log('Req signed cookies: ', req.signedCookies)
    
    runCode();

    res.cookie('testCookie', 'testValue');
    res.status(204).send();
});

// Endpoint to set cookies on the client-side
app.get('/', (req, res) => {
    res.status(200).json({ body: lastBodyReceived });
});

app.get('/set-cookie', (req, res) => {
    // Set cookies in the response
    res.cookie('cookieName1', 'value1', { maxAge: 3600000, httpOnly: true });
    res.cookie('cookieName2', 'value2', { maxAge: 3600000, httpOnly: true });

    res.status(200).send('Cookies set successfully on the client-side');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});


async function runCode() {
    console.log('runCode');
}