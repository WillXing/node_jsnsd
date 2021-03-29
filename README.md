# Node JSNSD notes
* ### 3 -  **Creating a Web Server**
    -  #### *return data from a Library API / set status codes*
* ### 4 -  **Serving Web Content**
    - ##### *4.0.1 - uses templates*
    - ##### *4.0.2 - servers static content using templates*
    - ##### *4.1 - render a view*
    - ##### *4.2 - stream content*
* ### 5 -  **Creating RESTful JSON Services**
    - ##### *5.0 - return JSON for a GET*
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
    - #### Avoiding Parameter Pollution Attacks*
    - #### Route Validation with Express*
* ### 10 - **Web Security: Mitigating Attacks**
     - #### Block an Attackers IP Address with Express
     - #### Rate limiting with Express

### res.render() function compiles the template (ie html & any evaluated expressions), and returns the rendered html string to the client.


&nbsp;


                -----------------------------------------------------------------------------

### A) Node echo terminal commands:-

GET Methods
`node -e "................"`

`node -e " URL, function... "`

URL -------> "http.get('http.get('http://localhost:3000/1',  
function --> (res) => console.log(res.statusCode))"  


Non-GET methods
`node -e "................"`

`node -e " URL, { ...} , function... "`

---

### B) Express TLTR:-


### Express response

Whenever the Express application receives an HTTP request it provides the developer with a `res` (response) object, which is an enhanced version of the Node response object.

Express gives us many ways to send responses:-

1. `res.send( [body] )` 
  - Body can be any of:- Buffer, String, Object, Array 
  - Based on the body type we use, Express will automatically set the appropriate `Content-Type`


2. `res.json()`
    Why do we need this when we can just use res.send to return json????
     - the reason as you might have guessed is that res.json gives us access to some specific methods around formatting, if we don't need them then just use res.send(). In Express under the hood when we are sending back JSON either with `res.json()` or `res.send({ object })` express uses the native `JSON.stringify()` method to serialize the given value which has the optional parameters of `replacer & space`.  
     - `JSON.stringify(object, replacer, space)`.  

3. `res.end()`
    This is automatically built into res.send() amd res.json(). But we might have then scenario where we don't want to send either of those two, we just want to end things now, then we would use it as follows:-

    `res.status(404).end()` 

### Express Scaffolding with the Global Express Package

The key express package is the global express-generator which we can use to scaffold out an express server for us.

`$sudo install -g express-generator@4`.


If we use the Express generator and it asks us to only allow static hosting in development and production static hosting is left as a deployment infrastructure problem then in app,js file we need to change static to:-

```js
if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
}
```

Also if we are to render a static view then in app.js we need to set the view engine and the directory that will hold the views (note the view files must have the relevant extension ie handlebars --> .hbs, ejs --> .ejs etc)

```js
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
```


### Path parameters (ie variables in the URL)

Express add to the req object a property called params, which is an object that contains any path params.
Note: the property name is taken from the route path and the value is from the URL.

```
localhost:3000/api/tours/5/21
```
The Express req.params object would look like:-


```js
{ location: '5', route: '21' }
```

```js
app.get('/api/tours/:location/:route', (req, res) => {
....
})
```

The thing to note with params, is that unlike the query string, we tell Express, in the route handler what the key's are the URL is just passing in the values.

Note: numeric values are converted to a string when passed in.

#### Optional params
we put in a `?` to denote that the parameter is optional, so if we didn't include group (ie 2) then it would still work.

```
localhost:3000/api/tours/5/21/2
```
The Express req.params object would look like:-


```js
{ location: '5', route: '21', group: '2' }
```

if we didn't include the 2 then the Express req.params object would look like:-

```js
{ location: '5', route: '21', group: undefined }
``` 

```js
app.get('/api/tours/:location/:route/:group?', (req, res) => {
....
})
```

#### The Key Express modules to include/use:-
`var helmet = require('helmet');`
`app.use(helmet());` ---> sets security http headers

`var logger = require('morgan');`
`app.use(logger('dev'));`   --> needed if we want to log reqs to the command line  

`app.use(express.json());`  
---> required if using put/patch/post methods, the we need this to read the data body into req.body (body parser)  

`app.use(express.urlencoded({ extended: false }));` -->

`app.use(express.static(DIRECTORY));` --> required if we are serving static assets


                -----------------------------------------------------------------------------

### Query string
A query string is a portion of the url that comes after a question mark.
Express has a query property on the request object, by default its blank, but if the url contains a query string the request object is populated with its key/values pairs. 

```
localhost:3000/search?q=dogs&color=red&car=ford
```

The key points are:-
1. `?` denotes the start of a query string.
2. `&` separates each query key/value pair.


The Express req.query object would look like:-

```js
{ q: 'dogs', color: 'red', cars: 'ford'}
```

---

### C) HTTP TLTR:-

#### Error codes  

`error 404` is the standard error response to a non valid resource request.  
`error 405` is the standard error response to a method not allowed request.  
`error 500` is the standard error response to a internal server error.  



                -----------------------------------------------------------------------------



## 3 - Creating a Web Server
Node gives us various options in creating a Web Server, we can use the built in HTTP module (not recommended), Express, Hapi, Koa or Fastify to name a few.

For brevity will focus on Express and Fastify.

Express is the most widely used, however it does posses some limitations, whilst Fastify is the new kid on the block and benefits being able to handle promises and its faster.

#### *3.1 - Creating a Web Server with Express*

## Express 101

Express is a fast, un-opinionated, minimalist web framework, for Node.JS. It helps us build web applications.

The current version is v4.17.1 (it was published over 2 years ago), but its downloaded over 17 million times in the last week.
Their is a Beta version 5, but this has been in development for over a year.

Express helps us..
1. - start up a server to listen for requests
2. - parse incoming requests
3. - match those requests to particular routes
4. - craft our http response and associated content

aside:- we need to parse incoming requests, as they are just text strings.

### A Basic setup (not using the express generator)

```js
$exp101 // create a folder (not capital name)
$cd exp101 // go into it
$npm init -y // set up the package.json file
$npm i express // install the latest express package
$touch index.js
```


```js
// index.js

const express = require("express");
const app = express();

```

Express returns a function which we invoke, thus returns an object which we assign to const app.
The app Object has a lot of methods on it which we can use.
note: to view the object just do `$console.dir(app)`.



### Getting our web server to start listening

To start our web server, we use the listen method, into which as the first argument we pass the port to listen on for incoming requests, we can pass a second argument, which is a callback that just tells us in the terminal that we are listening.

It's good practice to set up a variable called PORT which is either an environment variable or by default a local port we specify.

```js
// index.js
const PORT = process.env.PORT || 3000


app.listen(PORT, () => console.log(`listening on port ${PORT} ....`))

```



A HTTP object is not a javascript object it is text, it is not particular to any programming language, but Express takes the HTTP Object and turns it into a Javascript object which is known as the request object, Express also creates a Javascript returning objects known as response object.

The request and response objects have a number of methods & properties on each of them, which we can use.

- res.send("yo hello dude!") --> Express will automatically set the Headers `Content-Type` to text/html.  
- res.send('\<h6>This is me!!\</h6>) --> Express will automatically set the Headers `Content-Type` to text/html.  
- res.send({name: 'Bob'})  --> Express will automatically set the Headers `Content-Type` to application/json.  


### Routing

Taking incoming requests, namely a path that is being requested and passing that to the relevant function to ultimately give the appropriate response.

We are `routing` some incoming request to some out going response.


### Serving up web content

view templating engine, ejs, handlebars etc
we use res.render
What happens is, when its time to render the template file, ejs takes the template file and evaluates it, ie in any places its see's javascript it runs the javascript and returns the html.

ejs, where it sees any js renders it and return

we what to make our templates as stupid as possible, ie they should just display things, ie  not used to calculate and present the result, just display the result. Thus we should do any calculation etc outside of the template and only pass the template the result.

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
3. - create a basic web server
    - routes directory
      - index.js
      - hello.js
    - bin directory
      - www file
        -  require app & http, declare port and listen
    - app.js (main file)
      - require express, assign to app, export app

`install express (v4) and http-errors@1`

`start via package.json to wwww`


#### The checklist: basic express set up



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

**A. Create a webserver that:-**

1. listens on localhost
2. listens on port 3000.
3. Responds to HTTP GET requests to / with data from the data function as exported from the data.js file.
4. Responds with a 404 to GET to any other route.
5. Responds with a 405 to any non GET method, else responds to anything else with a 500.
6. The package.json start script must contain a command to start the server. 


***Note: data.js file exports a function that returns a promise (ie async function), also no other resources thus no need to use routes.***

#### To do:-

1. - create folder & go into it
2. - create the app.js & data.js files
3. - copy across data.js below
4. - create package.json (make sure in main folder)
5. - bring in express @4 & http-errors@1
6. - set script "start" in package.json `"start": "node app.js"`
7. - set up app.js file and spin up server
8. - set up the catch all error middleware
9. - set up the route handler and correctly handle the async ie `res.send(await data());`






```js
// data.js 
// result of invoking data will be a random string after a delay

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
// we use http-errors package to generate an
// error message based on the status code


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


Results:-

`GET/ http://localhost:3000` ---> random string of digits (html output) - status of: 200 OK
`GET/ http://localhost:3000/blarg` --->  Not Found (html output) - status of: 404 Not Found
`POST/ http://localhost:3000` ---> Method Not Allowed (html output) - status of: 405 Method Not Allowed




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




Results:-

`GET/ http://localhost:3000` ---> \<h1>Hello\</h1> (html output) - status of: 200 OK
`GET/ http://localhost:3000/blarg` --->  Not Found (html output) - status of: 404 Not Found
`POST/ http://localhost:3000` ---> Method Not Allowed (html output) - status of: 405 Method Not Allowed


----

### 4 -  **Serving Web Content**
Generally static assets should not be served by Node, it can be done, but Node is best used for dynamic content.
That said we can serve static content but in reality you wouldn't really do it.

Fastify the alternative to Express is more around serving RESTful JSON services, whereas Express is geared more towards template rendering (and serving static content), thus Express has these features built into its core.

#### serving static content using template engine

Create a web server that will use any templating engine of choice to render content, the key is we need to tell Express what engine we are using and where to find the folder that contains the templates(views) etc to be rendered.


1. - create folder & go into it
2. - create the app.js file
3. - create package.json (make sure in main folder)
4. - bring in express @4 & http-errors@1
5. - set "start" in package.json
6. - set up app.js file and spin up server
7. - set up the catch all error middleware

8. - create a routes folder with index & hello files
9. - install a templating engine of choice (ejs)
10. - set up a view folder with index.ejs & hello.ejs files (populate as below)
11. - tell express we are using ejs and join to the views folder
12. - set up the routes files as per below
13. - set the paths for `'/'` and `'/hello'` in app.js file (ie to routes)
14. - `require` in the routes files into app
15. - create a `public` folder and within it a `layout.css` file & populate with html styles
16. - link to styles file in ejs files
17. - tell express about the public folder and set an absolute path to it


Aside ejs
`<%= evaluates js and returns a result %>`
`<% just says ignore I'm doing some JS stuff>`

example:-  
\<h1>Your random number is : <%= num %></h1>  
<% if(num % 2 === 0) { %>  
\<h2>That is an even number!</h2>  
<% } else { %>  
\<h2>That is an odd number!</h2>  
<% } %>  
\<h3>The number is: <%= num % 2 === 0 ? 'EVEN' : 'ODD' %></h3>  



### Streaming data

1. Install hn-latest-stream package (its a package for getting hacker news)
2. In the routes directory create a new route called articles.js
3. Bring in the new file (articles.js) to app.js
4. Register the articles route (ie `app.use('/articles', articlesRoute);` )
5. Populate articles.js file as below.

```js

// articles.js
'use strict'
const express = require('express');
const router = express.Router();
const hnLatestStream = require('hn-latest-stream');
const finished = require('stream').finished;


router.get('/', function(req, res, next) {
  const { amount = 10, type = 'html'} = req.query;

  if (type === 'html') res.type('text/html');
  if (type === 'json') res.type('application/json');

  const stream = hnLatestStream(amount, type)

  stream.pipe(res, { end: false});
  
  finished(stream, (err) => {
    if(err) {
      next(err)
      return
    }
    res.end()
  })
});

module.exports = router;

```



```js
// app.js

'use strict'
const express = require('express');
const createError = require('http-errors');
const path = require('path');

const indexRoutes = require('./routes');
const helloRoutes = require('./routes/hello');
const articlesRoutes = require('./routes/articles');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/hello', helloRoutes);
app.use('/articles', articlesRoutes);


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


app.listen(PORT, () => console.log(`stream listening on port ${PORT}...`));

```



                -----------------------------------------------------------------------------



### 4.1 Task:- Render a view






                -----------------------------------------------------------------------------



### 4.2 Challenge:- Steam some content

Into the stream app done above in 4.0 Streaming data, add a file called stream.js which contains:-

```js
// stream.js

'use strict'

const { Readable, Transform } = require('stream')

function stream () {
  const readable = Readable.from([
    'this', 'is', 'a', 'stream', 'of', 'data'
  ].map((s) => s + '<br>'))
  const delay = new Transform(({
    transform (chunk, enc, cb) {
      setTimeout(cb, 500, null, chunk)
    }
  }))
  return readable.pipe(delay)
}

module.exports = stream
```

Create a new route path `/data` and send data from this stream function as a response when the `/data` route is requested.

1. - In routes directory create data.js file
2. - Set up data.js and require in the data.js file 
3. - In app.js bring in data route.


---






### 5 -  **Creating RESTful JSON Services**
GET


### 5.1 Task:- Implement a RESTful JSON GET

A. Create a webserver that:-

1. We have two files, model.js & package.json (detailed below)
2. Use Express to implement a RESTful HTTP server so that when the command **npm start** is executed it starts a server that listens on **process.env.PORT**.
3. The server should support a **GET** request to a single route: **/boat/{id}** where **{id}** is a placeholder for any given ID - for instance **/boat/2**.
4. The **GET /boat/{id}** route should respond with a JSON payload. The route should also respond with the correct headers for a JSON response **(Content-Type: application/json)**.
   
   The server should support this GET route. That means that any other routes or any other verbs should be handled according to the HTTP specification. Thankfully Express will do most of this for us.

   The following cases must be successfully handled:
   * - A successful request should respond with a 200 status code, Express will do this automatically. 
   * - The response should have the correct mime type header. In this case we need to make sure the **Content-Type** header is set to **application/json**.
   * - A GET request to a route that does not exist should respond with a **404** status code. The Express configuration handles this by default.
   * - If a given boat ID isn't found in the model the server should respond with a **404** status code. The response body can contain anything, but it's important that the response status is set to 404.
   * - Unexpected errors in the model should cause the server to respond with a **500** status code. This means that if the **read** method of the model passed an Error object to the callback that was unexpected or unrecognised, that error needs to be propagated to the framework we're using in some way so that the framework can automatically generate a 500 response.
   * - In HTTP specification there is some ambiguity over how to handle unsupported HTTP methods. Any HTTP method other than a **GET** should respond with either a **400, 404** or **405** status code. Again Express will respond to unsupported methods with one of these status codes.

Do not edit the **model.js** file, it will be overwritten by the validation process any way. The **model.js** file is deliberately noisy, providing methods that we don't need for this exercise. This reflects real world scenarios.


files:-

```json
// package.json
{
  "name": "labs-1",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "echo \"Error: start script not specified\" && exit 1",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

```js
'use strict'

  module.exports = {
    boat: boatModel()
  }
  
  function boatModel () {
    const db = {
      1: { brand: 'Chaparral', color: 'red' },
      2: { brand: 'Chaparral', color: 'blue' }
    }
  
    return {
      uid,
      create,
      read,
      update,
      del
    }
  
    function uid () {
      return Object.keys(db)
        .sort((a, b) => a - b)
        .map(Number)
        .filter((n) => !isNaN(n))
        .pop() + 1 + ''
    }
  
    function create (id, data, cb) {
      if (db.hasOwnProperty(id)) {
        const err = Error('resource exists')
        err.code = 'E_RESOURCE_EXISTS'
        setImmediate(() => cb(err))
        return
      }
      db[id] = data
      setImmediate(() => cb(null, id))
    }
  
    function read (id, cb) {
      if (id === 'c060') {
        setImmediate(() => cb(Error('unknown')))
      }
      if (!(db.hasOwnProperty(id))) {
        const err = Error('not found')
        err.code = 'E_NOT_FOUND'
        setImmediate(() => cb(err))
        return
      }
      setImmediate(() => cb(null, db[id]))
    }
  
    function update (id, data, cb) {
      if (!(db.hasOwnProperty(id))) {
        const err = Error('not found')
        err.code = 'E_NOT_FOUND'
        setImmediate(() => cb(err))
        return
      }
      db[id] = data
      setImmediate(() => cb())
    }
  
    function del (id, cb) {
      if (!(db.hasOwnProperty(id))) {
        const err = Error('not found')
        err.code = 'E_NOT_FOUND'
        setImmediate(() => cb(err))
        return
      }
      delete db[id]
      setImmediate(() => cb())
    }
  }
```


Thoughts:-
Make sure the **express-generator** package is globally installed, **(npm install -g express-generator)**.
create a project, ie **express my-express-service**

1. $express 5.1attemptlab
2. cd into it
3. $npm install (install dependencies)
4. put in and populate model.js file
5. need to set up the boat route
      1. in the app.js rename default /users to boat.
      2. rename routes/users.js to routes/boat.js.
      3. rename all reference to users in app.js file to boat.
6. In the routes/boat.js need to do the following
      1. require in the model.js file
      2. change the route handler to handle id params
      3. add in logic to retrieve data from models
      4. add in error handling

key learning:
a - use express project generator
b - rename files with mv

---

### 6 -  **Manipulating Data with RESTful Services**
Previously we handled GET requests, now need to handle POST,PUT & DELETE ones.



1. $express 6.0CRUD
2. cd into it
3. $npm install (install dependencies)
4. put in and populate model.js file (as per below)
5. need to set up the bicycle route
      1. in the app.js rename default /users to bicycle.
      2. rename routes/users.js to routes/bicycle.js.
      3. rename all reference to users in app.js file to bicycle.
6. In the routes/bicycle.js need to do the following
      1. require in the model.js file
      2. 
      3. change the route handler to handle id params
      4. add in logic to retrieve data from models
      5. add in error handling

```js
// model.js

```


---


### 6.1 Task:- Implement a RESTful JSON POST



A. Create a webserver that:-

1. We have two files, model.js & package.json (detailed below)
2. Use Express to implement a RESTful HTTP server so that when the command **npm start** is executed it starts a server that listens on **process.env.PORT**.

The server should support a **POST** request to **/boat** that uses the **model.js** file to create a new entry. The route should only accept **application/json** mine-type requests and should respond with **application/json** content-type responses.

Th **POST** request should expect JSON data to be sent in the following format:

**{ data: { brand, color } }**

A successful request should respond with a 201 Created status code. Unexpected errors should result in a 500 Server Error response.

The service must also support **GET /boat/ {id}** route.


what to do:-

1. $express 6.1ImplementRestful
2. cd into it
3. $npm install (install dependencies)
4. put in and populate model.js file (as per below)
5. need to set up the boat route
      1. in the app.js rename default /users to boat.
      2. rename routes/boat.js to routes/boat.js.
      3. rename all reference to users in app.js file to boat.
6. In the routes/boat.js need to do the following
      1. require in the model.js file
      2. create the get boat/:id route and link to model
      3. create the post boat route and link to model
      4. add in error handling (updated)



                -----------------------------------------------------------------------------


* ### 8 -  **Proxying HTTP Requests**
    - #### *8.1 - Single-Route, Multi-Origin Proxy* --> clients to single server??
    - #### *8.2 - Single-Origin, Multi-Route Proxy* --> single client to multiple servers??

Route based proxity??? (fastify-htp-proxy)



Proxity definition = the authority to act on the behalf of someone else.

A proxy is an intermediate application which sits between two (or more) services and process / modifies the requests and responses in both directions.

The way to approach it, by looking at the `Direction of data exchange`. Who is the client and who is the server.

Forward Proxy (are for clients )
A Forward proxy is a server that hides the identity of a client(s), ie the server doesn't know who the client is.
Client(s) -------> Forward Proxy -------> Server


A Reverse Proxy (are for servers )
A reverse proxy is a service that hides the Service from the client(s)
Client <------- Reverse Proxy <------- Server(s)

Advantages of a reverse proxy:
- Security 
  - DDOS attack prevention
  - Firewall
  - Block bots and hackers
- Caching
- Load balancing

A route determines the path of the request

two types of proxies


                -----------------------------------------------------------------------------



### 9 -  **Web Security: Handling User Input**

For any public facing service we must consider that a user could be malicious. Therefore it is of paramount importance that any external inputs into our service are sanitized in ways to protect our backend code.


#### Avoiding parameter pollution Attacks

Parameter pollution exploits a bug that can occur when handling query string parameters. The main aim of such an attack is to cause a service to either crash or slow down. These being forms of Denial of Service attacks.

To prevent this sort of attack we need to understand how query-string parsing works.

in a URL a query string's occurrence is denoted by a `?`, so anything after the question mark is treated a query string of key/value pairs.

All mainstream Node.js frameworks (and the core **querystring** module) parse the query string into a object.

Given the URL:`http://example.com?name=fred` the query string --> `name=fred`.

The query string is actually parsed into an object so we end up with: `{ name: "fred" }`.


#### Query string and the array

The following us a legitimate query string: `?name=fred&name=dave`. --> `{ name: ["fred", "dave"] }`

Express also supports square-bracket denotation syntax in query-strings.  

So `name[]=dave` --> `{ name: [ "dave"] }`



Key takeouts:-
1. Express & Node core querystring module,parse query string into an object
2. Express (Node querystring module doesn't) supports square-bracket query-string denotation
3. We need to be aware that the query string can be a string or an array, and as such call appropriate functions.

So we need to be able to handle this is the backend, we won't be expecting an array, and thus we might be using methods that don't work with arrays and thus could crash our app.

Fortunately there is a npm package, called http parameter pollution, which clears up the query string.

```
$npm i hpp
```


```js
// app.js file

const hpp = require('hpp');

// put before our route middleware
// prevents parameter pollution

app.use(hpp());

```

However we might have some scenarios where we may want duplicate parameters, ie lets say we have a tour website, and we want customers to be able to search for tours with a duration of 9 & 5 days.

Given the URL:`http://example.com/.tours?duration=5&duration=9` the query string --> `{ duration: [ "5", "9" ] }`

so we want to allow this, ie not block it with the `hpp` package, fortunately we can include `whitelist` ie a list of things we consider to be acceptable. the whitelist is simply an array of properties for which we allow duplication.


```js
// app.js file

const hpp = require('hpp');

// put before our route middleware
// prevents parameter pollution

app.use(
  hpp({
    whitelist: [
      'duration`
    ]
  })
);

```

#### Route validation ie checking the body of something !!!!!!



                -----------------------------------------------------------------------------


### 10 - **Web Security: Mitigating Attacks**

Attacks can take various forms and have different goals. It can be about stealing information, from the server or other users, other times it can be just to cause disruption. 

The most common sort of disruption based attacks is via a Denial of Service (DOS) attack. This involves automating a large volume of machines each makes a large amount of requests to a single service. Usually this would be handled by the infrastructure around a deployed Node.js service. If we needed to use a Node.js service then we could do the following.

#### Blocking an Attackers IP Address with Express

Express is basically a middleware pattern on top of Node's core **http** (and **https**) modules. The modules use the **net** module for the TCP functionality. 

Each request and response (**req res**) object that is provided to the request listener function has a **socket** property which is the underlying TCP socket for the request and response. 

So **req.socket.remoteAddress** will contain the IP address of the client making a request to an Express service.

Express passes the **req** and **res** objects to each piece of registered middleware in sequence, in order to block an attacking IP, all we need to do is register a middleware function that checks the incoming IP address (**re.socket.remoteAddress**) before passing onto any other middleware.


Lets say we wanted to block the IP 127.0.0.1 (this is local host) in a Express application, we would include the following middleware before any other middleware.

```js
app.use(function (req, res, next) {
  if (req.socket.remoteAddress === '127.0.0.1') {
    const err = new Error ('Forbidden');
    err.status = 403;
    next(err);
    return;
  }
  next();
});
```

So if **req.socket.remoteAddress** matches our target IP address then we generate a new Error and set its error code to 403 (Forbidden) then call **next(err)** which means we pass of our generated error to our catch all error handler and we exit (return out) of this middleware function. if the IP address does not match our target then we just go to the next piece of middleware.


#### Rate limiting with Express

We may want to apply a rate limit to all incoming requests from all IP addresses, this is easy enough to do, with the following express package.

`$npm i express-rate-limit`  

We set the maximum requests (ie 100) and the duration (ie 100 over x milliseconds), in this case 1 hour. 
60mins x 60 seconds x 1000 milliseconds.  

```js
// app.js file

const rateLimit = require('express-rate-limit');

// put at the top of our middleware
// ie we want it to apply to all incoming requests


const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
})

app.use('/api', limiter);


```




---

### Catch all error handler middleware

When we generate an Express app using the express generator then it automatically includes the error handler below.
Note:- we know its an error handler as its first parameter is err, also it will be positioned after all the other middleware, so it can catch any errors.

```js

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```






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

// this is our global error handling middleware
// this one will return with a json object

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
})
```

So we are in effect catching the error and passing it onto a the specific error catcher middleware.

