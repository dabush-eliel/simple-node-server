const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cookie = require('koa-cookie').default;
const app = new Koa();

// Middleware to allow CORS
app.use(async (ctx, next) => {
  const allowedOrigins = ['https://tassets.tier2.prod.li.dikdik.io']; // Add more origins if needed
  const origin = ctx.headers.origin;

  if (allowedOrigins.includes(origin)) {
    ctx.set('Access-Control-Allow-Origin', origin);
  }

  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  ctx.set('Access-Control-Allow-Credentials', 'true');

  await next();
});

// Parse request bodies as JSON
app.use(bodyParser());

// Parse cookies
app.use(cookie());

// Endpoint to handle POST requests to /ws
app.use(async (ctx, next) => {
  if (ctx.path === '/wa' && ctx.method === 'POST') {
    // Log the request cookies
    console.log('Request Cookies:', ctx.cookies);

    // Log the request credentials
    console.log('Request Credentials:', ctx.get('cookie') !== undefined);

    // Handle the request body
    console.log('Request Body:', ctx.request.body);

    // Send a response
    ctx.body = { message: 'Request received successfully' };
  } else {
    await next();
  }
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  