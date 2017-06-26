const backend = require('monolith-backend');

const mongoLabUrl = 'mongodb://orbit:orbit@ds139122.mlab.com:39122/monolith-todos';

const db = new backend.DataBase(process.env.MONGO || mongoLabUrl);
const server = backend.Server.create();
const port = process.env.PORT || 5000;

server.onConnection((socket) => {
    socket.on('todos', () => {
        db.findOne('todos', {})
            .then(todos => socket.emit('todosResponse', todos.todos))
            .catch(error => console.error(error));
    });
	socket.on('update', (todos) => {
        db.updateOne('todos', {}, { todos: todos }, true)
        	.then(() => {
                console.log('updated');
                server.broadcast('updatedTodos', todos);
            })
            .catch(error => console.error(error));
	});
});

server.open(port);
server.serveStaticFiles('/', 'public');
