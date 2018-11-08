import * as React                               from 'react';
import { connect }                              from 'react-redux';
import { Card, Header, Icon, Image, Segment, Placeholder }   from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout'
import { getCourses } from '../actions';

const mapStateToProps = (state) => ({
    courses: state.courses.list,
    isFetching: state.courses.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
    loadCourses: () => dispatch(getCourses()),
});

export class CoursesPage extends React.Component<any> {
    componentDidMount() {
        this.props.loadCourses();
    }

    render() {
        const { courses, isFetching } = this.props;

        return (
            <Layout>
                <Header size="huge" icon textAlign="center">
                    <Icon name='book' circular />
                    <Header.Content>Available Courses</Header.Content>
                </Header>
                <Segment loading={isFetching}>
                    <Card.Group centered>
                        {
                            isFetching
                                ? (
                                    <Card>
                                        <Card.Content>
                                            <Placeholder>
                                                <Placeholder.Image rectangular />
                                            </Placeholder>
                                        </Card.Content>
                                    </Card>
                                )
                                : null
                        }
                        {
                            courses.map((course) => (
                                <Link to={`/course/${course.id}`} className="ui card">
                                    <Image src={course.img} />
                                    <Card.Content>
                                        <Card.Header>{course.name}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>{`${course.from} to ${course.to}`}</span>
                                        </Card.Meta>
                                        <Card.Description>{course.description}</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Icon name='user' />
                                        {`${course.students} students`}
                                    </Card.Content>
                                </Link>
                            ))
                        }
                    </Card.Group>
                </Segment>
            </Layout>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
