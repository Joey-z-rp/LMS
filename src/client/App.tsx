import * as React               from 'react';
import {
    Redirect,
    Route,
    Switch,
    withRouter,
}                               from 'react-router-dom';
import CoursesPage from './pages/Courses';
import CoursePage from './pages/Course';

const App = () => (
    <Switch>
        <Redirect exact from="/" to="/courses" />
        <Route component={CoursesPage} exact path="/courses" />
        <Route component={CoursePage} exact path="/course/:id" />
    </Switch>
);

export default withRouter(App);
