# monolith-todos

This repo shows how to build a simple todo bubble with monolith-frontend and monolith-backend.

## Installation

1. Clone this repository: `git clone https://github.com/or-bit/monolith-todos.git`
2. Enter in it: `cd monolith-todos`
3. Install dependencies: `npm i`
4. Running example: `npm start`
Browse `http://localhost:5000` to see the result.

## Structure

### Backend = monolith-todos package

Backend just consists of only a simple `index.js` script.

In this script, we required `monolith-backend` module and stored it in the object `backend`.

Next we took the `Server` property and invoked the `create` function in order to initialize the Server object. This object takes care of:
1. node http server
2. express framework
3. socket-io framework

In order to actually start the server, we invoked the `open` method on the `server` object, passing in a port (5000).

Last but not least, we told the `server` object to serve the static bundle containing our app's frontend.

### Frontend = monolith-todos/frontend package

Frontend is a package created with `create-react-app`.

Details here: https://github.com/facebookincubator/create-react-app


#### Frontend dev process

After writing our simple backend, we ran these commands:

1. Install `create-react-app` globally: `npm i -g create-react-app`
2. Run `create-react-app`:
`create-react-app frontend`

We then installed our `monolith-frontend` package:
`npm i -S monolith-frontend`.

In `src/` we created a `TodoBubble.jsx` file: this file describes the frontend of our bubble.
Additional components were created in order to keep the project clean and organized.
The additional components can be found in `src/components`:
-  `TodoForm` is the component responsible for the creation of the task insertion form
-  `TodoList` is the component responsible for the rendering of all the tasks in bubble's memory
-  `TodoItem` is the component which represents a single task in the todo list

For more info, check the files out.
