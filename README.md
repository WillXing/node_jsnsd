# Node JSNSD notes
* ### 3 -  **Creating a Web Server**
* ### 4 -  **Serving Web Content**
    - ##### *4.1.2 - Using Templates for static content*
    - ##### *4.1.3 - Streaming Content*
* ### 5 -  **Creating RESTful JSON Services**
* ### 6 -  **Manipulating Data with RESTful Services**
   - #### *6.1 - Implementing POST,PUT and DELETE **
* ### 7 -  **Consuming and Aggregating Services**
    - #### *7.1 - Convention and Service Discovery*
    - #### *7.2 - Mock Services*
    - #### *7.3 - Fetching Data*
    - #### *7.4 - Combining Data*
    - #### *7.5 - Managing Status Codes*
* ### 8 -  **Proxying HTTP Requests**
    - #### *8.1 - Single-Route, Multi-Origin Proxy*
    - #### *8.2 - Single-Origin, Multi-Route Proxy*
* ### 9 -  **Web Security: Handling User Input**
    - #### *9.1 - Avoiding Parameter Pollution Attacks*
    - #### *9.2 - Route Validation with Express*
* ### 10 - **Web Security: Mitigating Attacks**
     - #### *10.2 - Block an Attackers IP Address with Fastify*

### res.render() function compiles the template (ie html & any evaluated expressions), and returns the rendered html string to the client.

&nbsp;

## 3 - Creating a Web Server
Node gives us various options in creating a Web Server, we can use the built in HTTP module (not receommended), Express, Hapi, Koa or Fastify to name a few.

For brevity will focus on Express and Fastify.

Express is the most widely used, however it does posses some limitations, whilst Fastify is the new kid on the block and benefits being able to handle promises and its faster.

#### *3.1 - Creating a Web Server with Express*

## Express 101

Express is a fast, unopinionated, minimalist web framework, for Node.JS. It helps us build web applications.

The current version is v4.17.1 (it was published over 2 years ago), but its downloaded over 17 million times in the last week.
Their is a Beta version 5, but this has been in development for over a year.

Express helps us..
1. - start up a server to listen for requests
2. - parse incoming requests
3. - match those requests to particular routes
4. - craft our http response and associated content

aside:- we need to parse incoming requests, as they are just text strings.

### A Basic setup
$exp101 // create a folder (not capital name)
$cd exp101 // go into it
$npm init -y // set up the package.json file
$npm i express // install the latest express package
$touch index.js

'''js
// index.js

const express = require("express");
const app = express();

'''

Express returns a function which we invoke, thus returns an object which we assign to const app.
The app Object has a lot of methods on it which we can use.
note: to view the object just do $console.dir(app)



### Getting our web server to start listening

To start our web server, we use the listen method, into which as the first argument we pass the port to listen on for incoming requests, we can pass a second argument, which is a callback that just tells us in the terminal that we are listening.

It's good practice to set up a variable called PORT which is either an environment variable or by default a local port we specify.

'''js
// index.js
const PORT = process.env.PORT || 3000


app.listen(PORT, () => console.log(`listening on port ${PORT} ....`))

'''



A HTTP object is not a javascript object it is text, it is not particular to any programming language, but Express takes the HTTP Object and turns it into a Javascript object which is known as the request object, Express also creates a Javascript returning objects known as response object.

The request and response objects have a number of methods & properties on each of them, which we can use.

res.send("yo hello dude!") --> Express will automatically set the Headers `Content-Type` to text/html
res.send('\<h6>This is me!!\</h6>) --> Express will automatically set the Headers `Content-Type` to text/html
res.send({name: 'Bob'})  --> Express will automatically set the Headers `Content-Type` to application/json.




### Routing

Taking incoming requests, namely a path that is being requested and passing that to the relevant function to ultimately give the appropriate response.

We are `routing` some incoming request to some out going response.

### Path parameters (ie variables)

Express add to the req object a property called params, which is an object that contains any path params.
Note: the property name is taken from the route path and the value is from the URL.




### Query string
A query string is a portion of the url that comes after a question mark.
Express has a query property on the request object, by default its blank, but if the url contains a query string the request object is populated with its key/values pairs. 

```
localhost:3000/search?q=dogs&color=red&car=ford
```

The key points are:-
1. `?` denotes the start of a query string.
2. `&` separates each query key/value pair.


The req.query object would look like:-

```js
{ q: 'dogs', color: 'red', cars: 'ford'}
```


### Serving up web content

view templating engine, ejs, handlebars etc
we use res.render
What happens is, when its time to render the template file, ejs takes the template file and evaluates it, ie in any places its see's javascript it runs the javascript and returns the html.

ejs, where it sees any js renders it and return

we what to make our templates as stupid as possible, ie they should just display things, ie  not used to calculate and present the result, just display the result. Thus we should do any calculation etc outside of the template and only pass the template the result.

conditional EJS

emded js, think of ejs their to control the flow.

using a loop

### Serving static files
ie serving css, html and Javascript (the js will need to run in the browser)

we need to use express.static

### practice

1. Build a simple web server that:-
   contains an array of dog names,
   i) responds with the specified name of a dog
   ii) responds with an array of dog names
   for each of the above a html string or json object should be returned.

2. Modify the above to include a resource that mimicks an async call, timeout function will do,

3. Build a web simple web server that:-
    return web content, ie public files such as css, html and JS to run in the browser

5. RESTful routing

### notes
3 - create a basic web server
    - routes directory
      - index.js
      - hello.js
    - bin directory
      - www file
        -  require app & http, declare port and listen
    - app.js (main file)
      - require express, assign to app, export app

install express (v4) and http-errors@1

start vai package.json to wwww


The checklist: basic express set up



| No | Description                             | What to do  |
| -- | --------------------------------------- | ----------- |
| 1  | Create the folder                       | $mkdir testFolder |
| 2  | Go into folder                          | $cd testFolder |
| 3  | Create up package.json file             | $npm init -y |
| 4  | Install express & other packages        | $npm install express@4 http-errors@1 |
| 5  | Create main file                        | $touch app.js |
| 6  | Get server up  - app.js file | const express = require('express'); |
|  |                                         | const app = express(); |
|  |                                         | const PORT = process.env.PORT || 3000; |
|  |                                         | app.listen(PORT, () => console.log(\`listening on port ${PORT}..`)); |
|7| app start via "start" package.json  | "start": "node app.js"; |
|8 | make sure web server spins up | $npm start |


                -----------------------------------------------------------------------------


### 3.0 Task:-

A. Create a webserver that:-
1. Returns specific error messages for :-
   1. method not allowed
   2. non valid resource requested
   3. internal server error.
2. Keep the main file clean resources should be separated away.
3. users should be able to to request:
   1. GET/index  --> returns a html page with a tag href to the hello resource
   2. GET/hello --> returns  a html page with hello world tag


Thoughts:-
Need to use a specific error npm package, ie http-errors
Set up a routes directory, to contain index.js & hello.js


notes: 
`error 404` is the standard error response to a non valid resource request.
`error 405` is the standard error response to a method not allowed request.
`error 500` is the standard error response to a internal server error.


To do

| No | Description                             | What to do  |
| -- | --------------------------------------- | ----------- |
| 1  | Create the folder                       | $mkdir testFolder |
| 2  | Go into folder                          | $cd testFolder |
| 3 | Bring in http error package | $npm http-errors@1 |
| 4 | Create the routes directory and files | $mkdir |


```
TERMINAL 

$mkdir testFolder
$cd testFolder
$npm i http-errors@1  // bring in the http package
$mkdir routes routes/index.js routes/hello.js
$
```

<table >
    <tbody ><tr><td><details><summary>
    <sub>
        <b>Click: for full description of app.js</b>
    </sub>
    <h6> Given blah blah</h6>
    -  this is a test
    -  of what it can do
    </summary><hr>

```js
// app.js

'use strict'
const express = require('express');
const createError = require('http-errors');
const indexRoutes = require('./routes');
const helloRoutes = require('./routes/hello');

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/', indexRoutes);
app.use('/hello', helloRoutes);


app.use((req, res, next) => {
  if(req.method !== 'GET') {
    next(createError(405));
    return;
  }
  next(createError(404));
});

app.use((err, req, res, next) => {
    console.log('error status: ', err.status);
  res.status(err.status || 500);
  res.send(err.message);
});


app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
```

In the above for our web server we accept two routes `'/'` and `'/hello'` both of which must be `GET` methods.
If a non `GET` method is sent then it is picked up and a `405` error is created, else any other non valid request is given a `404` error. In both cases the error middleware picks up the error and responds to the client with it.
In the above example we have no way of ever replying with a `500` error, it is however good practice to include a default option.


</details></td></tr></tbody>
</table>



<table >
    <tbody ><tr><td><details>
    <sub>
        <b>Click: for full description of index.js</b>
    </sub>


```js
// index.js

'use strict'
const { Router } = require('express');
const router = Router();

const root = `<html>
<head>
  <style>
    body { background: #333; margin: 1.25rem }
    a { color: yellow; font-size: 2rem; font-family: sans-serif }
  </style>
</head>
<body>
  <a href='/hello'>Hello</a>
</body>
</html>
`

router.get('/', (req, res) => {
  res.send(root);
});

module.exports = router;

```
</details></td></tr></tbody>
</table>


<table >
    <tbody ><tr><td><details>
    <sub>
        <b>Click: for full description of hello.js</b>
    </sub>

```js
// hello.js

'use strict'
const { Router } = require('express');
const router = Router();

const hello = `<html>
  <head>
    <style>
      body { background: #333; margin: 1.25rem }
      h1 { color: #EEE; font-family; sans-serif }
    </style>
  </head>
    <body>
      <h1>Hello World</h1>
    </body>
</html>`

router.get('/', (req, res) => {
  res.send(hello);
});

module.exports = router;

```
</details></td></tr></tbody>
</table>


                -----------------------------------------------------------------------------

### 3.1 Task:- Deliver Data from a Library API

A. Create a webserver that:-

1. listens on localhost
2. listens on port 3000.
3. Responds to HTTP GET requests to / with data from the data function as exported from the data.js file.
4. Responds with a 404 to GET to any other route.
5. Responds with a 405 to any non GET method, else responds to anything else with a 500.
6. The package.json start script must contain a command to start the server. 


Note: data.js file exports a function that returns a promise (ie async function), also no other resources thus no need to use routes.

the todo:-

1. - create folder & go into it
2. - create the app.js & data.js files
3. - copy across data.js below
4. - create package.json (make sure in main folder)
5. - bring in express @4 & http-errors@1
6. - set "start" in package.json
7. - set up app.js file and spin up server
8. - set up the catch all error middleware
9. - set up the route handler and correctly handle the async ie `res.send(await data());`






```js
// data.js 

'use strict'
const { promisify } = require('util');
const { randomBytes } = require('crypto');
const timeout = promisify(setTimeout);

async function data() {
    await timeout(50);
    return randomBytes(10).toString('base64');
}

module.exports = data;
```

Thoughts:-
The data.js file exports a function that returns a promise (ie async function), so will have to correctly handle any errors that may give.


```js
// app.js

const express = require('express');
const createError = require('http-errors');

const data = require('./data');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', async function(req, res, next) {
  try {
    res.send(await data());
  } catch {
     next(createError(500))
  }})

  app.use((req, res, next) => {
    if(req.method !== 'GET') {
      next(createError(405));
      return;
    }
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500)
  res.send(err.message)
})


app.listen(PORT, () => console.log(`Listening on port....${PORT}..`));

```





                -----------------------------------------------------------------------------


### 3.2 Task:- Implement a Status Code Response

A. Create a webserver that:-

1. listens on localhost
2. listens on port 3000.
3. Responds to HTTP GET requests to / with a 200 OK HTTP status (content is irrelevant)
4. Responds to HTTP POST requests to / with a 405 Method Not Allowed HTTP status
5. The package.json start script must contain a command to start the server.


Thoughts:-
Seems pretty straight forward.


the todo:-

1. - create folder & go into it
2. - create the app.js file
3. - create package.json (make sure in main folder)
4. - bring in express @4 & http-errors@1
5. - set "start" in package.json
6. - set up app.js file and spin up server
7. - set up the catch all error middleware


```js
// app.js

const express = require('express');
const createError = require('http-errors');

const app = express();

const PORT = process.env.PORT || 3000;


app.get('/', function(req, res, next) {
  res.send('<h1>Hello</h1>')
});

app.use((req, res, next) => {
  if(req.method !== 'GET') {
    next(createError(405));
    return;
  }
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500)
res.send(err.message)
})

app.listen(PORT, console.log(`Listening on port ${PORT}.....`));
```


----

### 4 -  **Serving Web Content**
Generally static assets should not be served by Node, it can be done, but Node is best used for dynamic content.
That said we can serve static content but in reality you wouldn't really do it.

### Serving Static content

### Streaming data

### Generating dynamic content with templating engine


---

### 5 -  **Creating RESTful JSON Services**
GET

---

### 6 -  **Manipulating Data with RESTful Services**
POST,PUT, DELETE
---





                -----------------------------------------------------------------------------


### 0 - Handling errors
This is pivotable in Express so have include first.

If somethings goes wrong, Express will respond with an error, usually the `500 Internal Server Error` with the corresponding stack trace and it will crash our app (note: in production no stack trace will be given out).

We can define our own error handling middleware, which function in the same way as other middleware functions, except error-handling functions have four arguments instead of three: (err, req, res, next).

As in any middleware if we don't call next() then no more middleware is called. 

If we have a catch all middleware error function it should go at the end of the chain of middleware functions.

`next()` will pass us onto the next middleware function
`next(err)` will pass us onto the next error handling middleware, if we haven't built one then it will be the inbuilt Express error handler (which as we have seen returns the stack trace). Note if we have generated an error then it is our error that will be passed on.


```js
// below is an extract
// createError is from the npm package http-errors
// it allows us to create an error.

app.use((req, res, next) => {
    if(req.method !== 'GET') {
        next(createError(405))
    return
  }
  next(createError(404))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
  res.send(err.message)
})
```

Our First middleware function just checks to see if the request method is a `GET` if it isn't then it creates an error with a 405 error status code. We invoke `next()` with the actual error generated, so we are now going to invoke the next error middleware.

Note:- we `return` out of the `if block` and the function, if we didn't then `next(createError(404))` would run.

The error middleware (which we know is error middleware as it has 4 parameters the first one being err) in this case receives the error we generated and responds out to the user the status code of 405 and the error message generated.

This error middleware is a catch all for errors, ie if an error occurred and we don't generate an error status etc, then here we will see no error status has been generated and we will give it a error status of 500 and send it on its way.

Its very important we do this, without it the app would crash!!.


#### Async Errors

handling errors with async functions, the current version of Express v4, doesn't handle `Promises` the next version Express version 5 will, however that is still to be released.

The recommended way per the docs is to use a if block.

```js
app.get('/' function(req, res, next) {
    fs.readFile('file-does-not-exist', function(err, data) {
        if(err) {
            next(err) // Pass errors to Express
        } else {
            res.send(data)
        }
    })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
  res.send(err.message)
})
```


An alternative, a maybe better as its a catch all, is to use a try/catch block.

```js
app.get('/' async function(req, res, next) {
    try {
        await fs.readFile('file-does-not-exist', function(err, data) {
            res.send(data);
        } catch (err) {
            next(err);
        }
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
  res.send(err.message)
})
```

So we are in effect catching the error and passing it onto a the specific error catcher middleware.

