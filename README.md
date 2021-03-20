# Node JSNSD notes
* ### 3 -  **Creating a Web Server**
   - #### *3.1 - With Express*
   - #### *3.2 - with Fastify*
* ### 4 -  **Serving Web Content**
    - #### *4.1 - Express*
    - ##### *4.1.1 - Serving Static Content*
    - ##### *4.1.2 - Using Templates*
    - ##### *4.1.3 - Streaming Content*
    - #### *4.2 - Fastify*
    - ##### *4.2.1 - Serving Static Content*
    - ##### *4.2.2 - Using Templates*
    - ##### *4.2.3 - Streaming Content*
* ### 5 -  **Creating RESTful JSON Services**
    - #### *5.1 - Coventions*
    - #### *5.2 - Implementing a RESTful JSON GET with Express*
    - #### *5.3 - Implementing a RESTful JSON GET with Fastify*
* ### 6 -  **Manipulating Data with RESTful Services**
   - #### *6.1 - Implementing POST,PUT and DELETE with Express*
   - #### *6.2 - Implementing POST,PUT and DELETE with Fastify*
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
    - #### *9.3 - Route Validation with Fastify*
* ### 10 - **Web Security: Mitigating Attacks**
     - #### *10.1 - Block an Attackers IP Address with Express*
     - #### *10.2 - Block an Attackers IP Address with Fastify*

&nbsp;

## 3 - Creating a Web Server
Node gives us various options in creating a Web Server, we can use the built in HTTP module (not receommended), Express, Hapi, Koa or Fastify to name a few.

For brevity will focus on Express and Fastify.

Express is the most widely used, however it does posses some limitations, whilst Fastify is the new kid on the block and benefits being able to handle promises and its faster.

#### *3.1 - Creating a Web Server with Express*
#### *3.2 - Creating a Web Server with Fastify*


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


Task:-

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

console.log('im here now');

app.use((err, req, res, next) => {
  console.log("this is err: ",err);
  console.dir(err);
  res.status(err.status || 500);
  res.send(err.message);
});





app.listen(PORT, () => console.log(`listening on port ${PORT}...`));

```


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