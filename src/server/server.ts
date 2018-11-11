import * as path from 'path';
import * as express from 'express';
import expressPromiseRouter from 'express-promise-router';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as session from 'express-session';
import mongoose from 'mongoose';
import { renderTemp } from './htmlTemplate';
import { getCourses, getCourse, createCourse, saveCourse } from './api/courses';
import { getLecturers } from './api/lecturers';
import { getStudents, searchStudents, getStudent, saveStudent, registerStudent } from './api/students';
import { getEnrolData, enrolStudent, getWithdrawData, withdrawStudent } from './api/enrolAndWithdraw';

const app = express();
const PORT = 3000;

const router = expressPromiseRouter({
    caseSensitive: true,
    strict:        true,
});

app.use(router);

app.listen(process.env.PORT || PORT);

console.info(`Server is running on port ${PORT}`);

app.use(compression());
app.use('/app.js', express.static(path.join(__dirname, './public/js/app.js')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(session({
    secret: 'olms',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// DB connection

const CONNECTION_STRING = 'mongodb://admin:password1@ds157923.mlab.com:57923/lms';

app.use('/api/*', (req, res, next) => {
    mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true });
    const db = mongoose.connection;
    req.app.locals.db = db;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    next();
});

// APIs

app.get('/api/courses', getCourses);
app.get('/api/students', getStudents);
app.get('/api/students/search/:search', searchStudents);
app.post('/api/student/register', registerStudent);
app.get('/api/student/:id', getStudent);
app.post('/api/student/:id/save', saveStudent);
app.post('/api/course/create', createCourse);
app.get('/api/course/:id', getCourse);
app.post('/api/course/:id/save', saveCourse);
app.get('/api/lecturers', getLecturers);
app.get('/api/enrol', getEnrolData);
app.get('/api/withdraw', getWithdrawData);
app.post('/api/enrol', enrolStudent);
app.post('/api/withdraw', withdrawStudent);

app.use('/api/*', (req, res, next) => {
    console.log(req.app.locals.db.readyState)

    next();
});

// Delegate request to client side code
app.get('/*', (req, res) => {
    const html = renderTemp();
    res.send(`<!doctype html>${html}`);
});