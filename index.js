/* 
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app); // Создаем HTTP сервер
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Замените на URL вашего клиента
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

app.use(errorHandler);

let userMessages = {};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('sendMessage', (data) => {
        console.log(`Message from ${data.username}: ${data.message}`);

        if (!userMessages[data.username]) {
            userMessages[data.username] = [];
        }
        userMessages[data.username].push(data.message);

        io.emit('newMessage', { username: data.username, message: data.message });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        server.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // Используем server.listen вместо app.listen
    } catch (e) {
        console.log(e);
    }
}

start();

*/

require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()
