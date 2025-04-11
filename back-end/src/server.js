import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine.js';
import initWebRoutes from './routes/web.js';
import testConnectDB from './config/connectDB.js';
import dotenv from 'dotenv';

let app = express();
dotenv.config();

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('src/uploads'));



viewEngine(app);
initWebRoutes(app);

// test connect to DB
testConnectDB();

// port undefined means port = 4444
let port = process.env.PORT || 4444;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
