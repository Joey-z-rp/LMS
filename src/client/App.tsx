import * as React               from 'react';
import {
    Redirect,
    Route,
    Switch,
    withRouter,
}                               from 'react-router-dom';
import CoursesPage from './pages/Courses';
import StudentsPage from './pages/Students';
import StudentPage from './pages/Student';
import CoursePage from './pages/Course';
import NewOrEditCoursePage from './pages/NewAndEditCourse';
import NewOrEditStudentPage from './pages/NewAndEditStudent';
import EnrolOrWithdrawPage from './pages/EnrolOrWithdraw';
import LoginPage from './pages/Login';
import LecturersPage from './pages/Lecturers';
import PageNotFound from './pages/404Page';

const App = () => (
    <Switch>
        <Route component={LoginPage} exact path="/login" />
        <Redirect exact from="/" to="/courses/" />
        <Route component={CoursesPage} exact path="/courses/" />
        <Route component={StudentsPage} exact path="/students/" />
        <Route component={NewOrEditStudentPage} exact path="/student/new" />
        <Redirect exact strict from="/student/:id" to="/student/:id/" />
        <Route component={StudentPage} exact strict path="/student/:id/" />
        <Route component={NewOrEditStudentPage} exact path="/student/:id/edit" />
        <Route component={EnrolOrWithdrawPage} exact path="/student/:id/enrol" />
        <Route component={EnrolOrWithdrawPage} exact path="/student/:id/withdraw" />
        <Route component={NewOrEditCoursePage} exact path="/course/new" />
        <Redirect exact strict from="/course/:id" to="/course/:id/" />
        <Route component={CoursePage} exact strict path="/course/:id/" />
        <Route component={NewOrEditCoursePage} exact path="/course/:id/edit" />
        <Route component={EnrolOrWithdrawPage} exact path="/course/:id/enrol" />
        <Route component={EnrolOrWithdrawPage} exact path="/course/:id/withdraw" />
        <Route component={LecturersPage} exact path="/lecturers" />
        <Route component={PageNotFound} />
    </Switch>
);

export default withRouter(App);
