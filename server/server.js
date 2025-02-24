//Import Statements
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { connectDb } from './database/configuration/Configuration.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import chatRoutes from './routes/chatRoute.js'
import 'colors'
import passport from 'passport'
import session from 'express-session'
import faceBookAuth from './middlewares/oauth/facebookAuth.js'
import GoogleAuth from './middlewares/oauth/googleAuth.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { socketInit } from './socketIo/SocketIo.js'
import http from 'http'

//Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename)

//Dotenv Configuration
dotenv.config()

//Express Object
const app = express();

//Middlewares
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(faceBookAuth)
app.use(GoogleAuth)

//Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'middlewares/multer/uploads')));

//Database Connection
connectDb();

//Creating server
const server = http.createServer(app)
socketInit(server);

//Routes
app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/post',postRoutes)
app.use('/api/v1/chat',chatRoutes)

//Port
const PORT = process.env.PORT || 8080

//Listening Server
server.listen(PORT, () => {
    console.log(`Welcome Server Successfully Running On Port ${PORT}`.bgYellow.white)
})