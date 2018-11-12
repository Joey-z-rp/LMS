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
    Checkbox,
    Modal,
    Icon,
    Progress,
} from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getStudent, deleteStudent } from '../actions';
import PersonLabel from '../components/PersonLabel';

const mapStateToProps = (state) => ({
    student: state.students.student,
    isFetching: state.students.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
    load: (id) => dispatch(getStudent(id)),
    delete: (id) => dispatch(deleteStudent(id)),
});

export class StudentPage extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            showConfirm: false,
            isDeleting: false,
        };
    }

    componentDidMount() {
        this.props.load(this.props.match.params.id);
    }

    delete() {
        this.props.delete(this.props.match.params.id).then((redirect) => {
            if (redirect) this.props.history.push('/students');
        });
    }

    render() {
        const { student, isFetching } = this.props;

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
                <Header size="huge" textAlign="center">
                    <Header.Content>
                        <Icon name='student' size="small" />
                        Student Details
                    </Header.Content>
                </Header>
                <Grid stackable>
                    <Grid.Column width={4}>
                        <MediaQuery maxWidth={768}>
                            <Image rounded centered size="small" src={student.image} />
                        </MediaQuery>
                        <MediaQuery minWidth={768}>
                            <Image rounded src={student.image} />
                        </MediaQuery>
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <Divider />
                        <Table basic='very' celled unstackable>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell width={2}>
                                        <Header as='h4' disabled>
                                            Name
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header>{student.name}</Header>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' disabled>
                                            <Header.Content>
                                                Email
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header>{student.email}</Header>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' disabled>
                                            <Header.Content>
                                                Phone Number
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header>{student.phone}</Header>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' disabled>
                                            <Header.Content>
                                                Registered
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header>
                                            {student.registered}
                                        </Header>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' disabled>
                                            <Header.Content>
                                                Enrolled Courses
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header>
                                            {student.enrolledCourse && student.enrolledCourse.length}
                                            </Header>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' disabled>
                                            <Header.Content>
                                                Attendance
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Progress
                                            value={`${student.attendance}`}
                                            total='100'
                                            progress='percent'
                                            color={student.attendance > 75 ? 'green' : 'yellow'}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' disabled>
                                            <Header.Content>
                                                Premium Plan
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Checkbox toggle disabled checked={student.premium} />
                                    </Table.Cell>
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
                                Enrolled Courses
                            </Header.Content>
                        </Header>
                        <List divided selection>
                            {
                                (student.enrolledCourse || []).map((course, index) => {
                                    return (
                                        <List.Item key={index}>
                                            <PersonLabel
                                                src={`/course/${course.id}/`}
                                                name={course.name}
                                                image={course.image}
                                                size="large"
                                            />
                                        </List.Item>
                                    );
                                })
                            }

                        </List>
                    </Grid.Column>
                </Grid>
                <Modal size="tiny" open={this.state.showConfirm}>
                    <Modal.Header>Delete Student</Modal.Header>
                    <Modal.Content>
                        <p>
                            Are you sure you want to DELETE this student?
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
                                this.delete();
                            }}
                        />
                    </Modal.Actions>
                </Modal>
            </Layout>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentPage);
