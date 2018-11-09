import * as React               from 'react';
import {
    Redirect,
    Route,
    Switch,
    withRouter,
}                               from 'react-router-dom';
import CoursesPage from './pages/Courses';
import CoursePage from './pages/Course';
import NewCoursePage from './pages/NewAndEditCourse';

const App = () => (
    <Switch>
        <Redirect exact from="/" to="/courses/" />
        <Route component={CoursesPage} exact path="/courses/" />
        <Route component={NewCoursePage} exact path="/course/new" />
        <Redirect exact strict from="/course/:id" to="/course/:id/" />
        <Route component={CoursePage} exact strict path="/course/:id/" />
        <Route component={NewCoursePage} exact path="/course/:id/edit" />
    </Switch>
);

export default withRouter(App);
