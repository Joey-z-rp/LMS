import * as path from 'path';
import * as express from 'express';
import expressPromiseRouter from 'express-promise-router';
import * as bodyParser from 'body-parser';
import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as session from 'express-session';
import sessionFileStore from 'session-file-store';
import mongoose from 'mongoose';
import { renderTemp } from './htmlTemplate';
import { getCourses, getCourse, createCourse, saveCourse, deleteCourse } from './api/courses';
import { getLecturers } from './api/lecturers';
import { getStudents, searchStudents, getStudent, saveStudent, registerStudent, deleteStudent } from './api/students';
import { getEnrolData, enrolStudent, getWithdrawData, withdrawStudent } from './api/enrolAndWithdraw';
import { login } from './api/login';

const app = express();
const PORT = 3000;

const FileStore = sessionFileStore(session);
const store = process.env.NODE_ENV !== 'production'
    ? new FileStore({ path: '../sessions/' })
    : undefined;

// File upload
cloudinary.config({
    cloud_name: 'dhp4arhke',
    api_key: '517648199243368',
    api_secret: 'tdF4SrJLf6fK1PaqHhQcGCqZO1k',
});
const storage = cloudinaryStorage({
    cloudinary,
    folder: 'lms',
    allowedFormats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 300, height: 300, crop: 'scale' }],
});
const parser = multer({ storage });

// Router
const router = expressPromiseRouter({
    caseSensitive: true,
    strict:        true,
});

app.use(router);

app.listen(process.env.PORT || PORT);

console.info(`Server is running on port ${PORT}`);

router.use(compression());
router.use('/app.js', express.static(path.join(__dirname, './public/js/app.js')));
router.use(cookieParser());
router.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
router.use(bodyParser.json({ limit: '1mb' }));
router.use(session({
    store,
    name: 'lms',
    secret: 'olms',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 72000000,
    },
}));

// Authentication

router.use('/*', (req, res, next) => {
    const whiteList = [/\/login(\?redirect=.*)?$/, /\/api\/login/];

    if (whiteList.some(regex => regex.test(req.originalUrl))
        || (req.session.user && req.session.user.email && req.session.user.admin)) {
        return next();
    }

    res.redirect(`/login?redirect=${encodeURIComponent(req.originalUrl)}`);
});

router.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) return next(err);

        return res.redirect('/login');
    })
});

// DB connection

const CONNECTION_STRING = 'mongodb://admin:password1@ds157923.mlab.com:57923/lms';

router.use('/api/*', (req, res, next) => {
    mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true });
    const db = mongoose.connection;
    req.app.locals.db = db;

    if (db.listeners('error').length < 1) {
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }

    next();
});

// APIs

router.post('/api/login', login);
router.get('/api/courses', getCourses);
router.get('/api/students', getStudents);
router.get('/api/students/search/:search', searchStudents);
router.post('/api/student/register', parser.single('file'), registerStudent);
router.delete('/api/student/delete/:id', deleteStudent);
router.get('/api/student/:id', getStudent);
router.post('/api/student/:id/save', parser.single('file'), saveStudent);
router.post('/api/course/create', parser.single('file'), createCourse);
router.delete('/api/course/delete/:id', deleteCourse);
router.get('/api/course/:id', getCourse);
router.post('/api/course/:id/save', parser.single('file'), saveCourse);
router.get('/api/lecturers', getLecturers);
router.get('/api/enrol', getEnrolData);
router.get('/api/withdraw', getWithdrawData);
router.post('/api/enrol', enrolStudent);
router.post('/api/withdraw', withdrawStudent);

// Delegate request to client side code
router.get('/*', (req, res) => {
    const html = renderTemp();
    res.send(`<!doctype html>${html}`);
});

// Error handling

router.use((err, req, res, next) => {
    if (err && req.accepts('application/json')) {
        return res.status(err.status || 500).json({
            message: err.message || 'Server error',
            name:    err.name || 'Error',
            stack:   (err.stack || '').split('\n'),
        });
    }

    if (err && req.accepts('html')) {
        return res.status(err.status || 500).send(err.message || 'Server error');
    }

    return next();
});
