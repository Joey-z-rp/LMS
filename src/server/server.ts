import * as path from 'path';
import * as express from 'express';
import expressPromiseRouter from 'express-promise-router';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as session from 'express-session';
import { renderTemp } from './htmlTemplate';
import { getCourses, getCourse, createCourse, saveCourse } from './api/courses';
import { getLecturers } from './api/lecturers';

const app = express();

const router = expressPromiseRouter({
    caseSensitive: true,
    strict:        true,
});

app.use(router);

app.listen(3000);

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

// APIs

app.get('/api/courses', getCourses);
app.post('/api/course/create', createCourse);
app.get('/api/course/:id', getCourse);
app.post('/api/course/:id/save', saveCourse);
app.get('/api/lecturers', getLecturers);

// Delegate request to client side code
app.get('/*', (req, res) => {
    const html = renderTemp();
    res.send(`<!doctype html>${html}`);
});