import * as React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Divider,
    Dimmer,
    Loader,
    Grid,
    Header,
    List,
    Image,
    Table,
    Statistic,
} from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import Layout from '../components/Layout';
import { getCourse } from '../actions';
import PersonLabel from '../components/PersonLabel';

const mapStateToProps = (state) => ({
    course: state.course.course,
    isFetching: state.course.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
    loadCourse: (id) => dispatch(getCourse(id)),
});

export class CoursePage extends React.Component<any> {
    componentDidMount() {
        this.props.loadCourse(this.props.match.params.id);
    }

    render() {
        const { course, isFetching } = this.props;

        return (
            <Layout>
                {
                    isFetching
                        ? (
                            <Dimmer active inverted>
                                <Loader inverted>Loading</Loader>
                            </Dimmer>
                        )
                        : null
                }
                <Header size="huge" icon textAlign="center">
                    <Header.Content>{course.name}</Header.Content>
                </Header>
                <Grid stackable>
                    <Grid.Column width={4}>
                        <MediaQuery maxWidth={768}>
                            <Image rounded centered size="small" src={course.image} />
                        </MediaQuery>
                        <MediaQuery minWidth={768}>
                            <Image rounded src={course.img} />
                        </MediaQuery>
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <Divider />
                        <Table basic='very' celled unstackable>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell width={2}>
                                        <Header as='h4'>
                                            Description
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p>{course.description}</p>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>
                                                Duration
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Statistic horizontal size="mini">
                                            <Statistic.Label>{course.from}</Statistic.Label>
                                            <Statistic.Label>To</Statistic.Label>
                                            <Statistic.Label>{course.to}</Statistic.Label>
                                        </Statistic>
                                        <MediaQuery minWidth={768}>
                                            <Calendar
                                                value={[new Date(course.from || null), new Date(course.to || null)]}
                                                selectRange
                                            />
                                        </MediaQuery>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>
                                                Lecturer
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <PersonLabel
                                            src="/"
                                            name={course.lecturer && course.lecturer.name}
                                            image={course.lecturer&& course.lecturer.image}
                                            size="huge"
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>
                                                Enrolled Students
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>{course.students && course.students.length}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>
                                                Curriculum
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell><Button primary>Download</Button></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                        <Divider />
                        <Button size="large" primary>
                            Enrol / Withdraw
                        </Button>
                        <Button as={Link} to="edit" size="large" primary floated="right">
                            Edit
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header as='h3'>
                            <Header.Content>
                                Enrolled Students
                            </Header.Content>
                        </Header>
                        <List divided selection>
                            {
                                (course.students || []).map((student, index) => (
                                    <List.Item key={index}>
                                        <PersonLabel
                                            src="/"
                                            name={student.name}
                                            image={student.image}
                                            size="huge"
                                        />
                                    </List.Item>
                                ))
                            }
                        </List>
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
