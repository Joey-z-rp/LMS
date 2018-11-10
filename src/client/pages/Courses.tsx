import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Divider, Header, Icon, Image, Segment, Placeholder }   from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
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
                <Divider hidden />
                <Button primary as={Link} to="/course/new">
                    Create New Course
                </Button>
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
                            courses.map((course, index) => {
                                let labelOption = { corner: 'right' } as any;
                                if (course.students > 10) {
                                    labelOption = { ...labelOption, ...{ icon: 'hotjar', color: 'red' } };
                                } else if (Math.abs(moment().diff(moment(course.from), 'days')) < 5) {
                                    labelOption = { ...labelOption, ...{ icon: 'bullhorn', color: 'green' } };
                                } else {
                                    labelOption = undefined;
                                }

                                return (
                                    <Link key={index} to={`/course/${course.id}/`} className="ui card">
                                        <Image
                                            src={course.img}
                                            label={labelOption}
                                        />
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
                                );
                            })
                        }
                    </Card.Group>
                </Segment>
            </Layout>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
