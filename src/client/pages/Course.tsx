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
    Modal,
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

export class CoursePage extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            showConfirm: false,
            isDeleting: false,
        };
    }

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
                            <Image rounded src={course.image} />
                        </MediaQuery>
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <Divider />
                        <Table basic='very' celled unstackable>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell width={2}>
                                        <Header as='h4' disabled>
                                            Description
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p>{course.description}</p>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' disabled>
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
                                        <Header as='h4' disabled>
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
                                            rating={course.lecturer && course.lecturer.rating}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' disabled>
                                            <Header.Content>
                                                Enrolment Status
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Statistic horizontal size="mini">
                                            <Statistic.Label>{course.students && course.students.length}</Statistic.Label>
                                            <Statistic.Label>/</Statistic.Label>
                                            <Statistic.Label>{course.capacity}</Statistic.Label>
                                        </Statistic>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' disabled>
                                            <Header.Content>
                                                Curriculum
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell><Button primary disabled>Download</Button></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                        <Divider />
                        <MediaQuery minWidth={1000}>
                            {(matches) => {
                                const size = matches ? 'large' : 'small';
                                return (
                                    <React.Fragment>
                                        <Button size={size} primary as={Link} to="enrol">
                                            Enrol
                                        </Button>
                                        <Button size={size} primary as={Link} to="withdraw">
                                            Withdraw
                                        </Button>
                                        <Button
                                            size={size}
                                            color="red"
                                            floated="right"
                                            onClick={() => this.setState({ showConfirm: true })}
                                        >
                                            Delete
                                        </Button>
                                        <Button as={Link} to="edit" size={size} primary floated="right">
                                            Edit
                                        </Button>
                                    </React.Fragment>
                                );
                            }}
                        </MediaQuery>
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
                                            src={`/student/${student.id}/`}
                                            name={student.name}
                                            image={student.image}
                                            size="large"
                                        />
                                    </List.Item>
                                ))
                            }
                        </List>
                    </Grid.Column>
                </Grid>
                <Modal size="tiny" open={this.state.showConfirm}>
                    <Modal.Header>Delete Course</Modal.Header>
                    <Modal.Content>
                        <p>
                            Are you sure you want to DELETE this course?
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            negative
                            onClick={() => this.setState({ showConfirm: false })}
                            disabled={this.state.isDeleting}
                        >
                            No
                        </Button>
                        <Button
                            positive
                            icon="checkmark"
                            labelPosition="right"
                            content="Yes"
                            disabled={this.state.isDeleting}
                            loading={this.state.isDeleting}
                            onClick={() => {
                                this.setState({ isDeleting: true });
                            }}
                        />
                    </Modal.Actions>
                </Modal>
            </Layout>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
