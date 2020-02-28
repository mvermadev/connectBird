const express = require('express');
const path = require('path')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const userControl = require('./controller/users')
const socket = require('socket.io') //Back-End socket:

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

const port = process.env.PORT || 5555;


app.set('views', path.join(__dirname, '/views/'))

app.engine('hbs', exhbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts'
}));

app.set('view engine', 'hbs')


app.get('/', (req, res)=>{
    res.render('index', {})
})

app.use('/', userControl);

const router = require('./routes/otp')
app.use(router)

const server = app.listen(port,()=>{
    console.log('connectBird is running on port no. 5555');
})

//Socket Setup
const io = socket(server);

io.on('connection', (socket)=>{
    console.log('made socket connection ', socket.id);

    //receive data:
    socket.on('chat', (data)=>{
        io.sockets.emit('chat', data)
    })

    socket.on('Typing...', (data)=>{
        socket.broadcast.emit('Typing...', data)
    })
})
