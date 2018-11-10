import * as React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Divider,
    Dimmer,
    Icon,
    Loader,
    Grid,
    Header,
    List,
    Modal,
    Image,
    Table,
    Select,
    Statistic,
} from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import Layout from '../components/Layout';
import { getEnrolData, enrolStudent, getWithdrawData, withdrawStudent } from '../actions';
import PersonLabel from '../components/PersonLabel';

const mapStateToProps = (state) => ({
    courses: state.enrolOrWithdraw.courses,
    students: state.enrolOrWithdraw.students,
    isFetching: state.enrolOrWithdraw.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
    loadEnrolData: (courseId?, studentId?) => dispatch(getEnrolData(courseId, studentId)),
    loadWithdrawData: (courseId?, studentId?) => dispatch(getWithdrawData(courseId, studentId)),
    enrol: (courseId, studentId) => dispatch(enrolStudent(courseId, studentId)),
    withdraw: (courseId, studentId) => dispatch(withdrawStudent(courseId, studentId)),
});

export class EnrolOrWithdrawPage extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            isSaving: false,
            showConfirm: false,
            courseSelected: '',
            studentSelected: '',
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const courseId = this.courseInitiated() ? id : undefined;
        const studentId = !this.courseInitiated() ? id : undefined;

        if (this.enrolMode()) {
            this.props.loadEnrolData(courseId, studentId);
        } else {
            this.props.loadWithdrawData(courseId, studentId);
        }
    }

    componentDidUpdate() {
        if (this.courseInitiated()
            && this.props.courses.length > 0
            && this.state.courseSelected !== this.props.courses[0].id
        ) {
            this.setState({ courseSelected: this.props.courses[0].id });
        }

        if (!this.courseInitiated()
            && this.props.students.length > 0
            && this.state.studentSelected !== this.props.students[0].id
        ) {
            this.setState({ studentSelected: this.props.students[0].id });
        }
    }

    enrolMode() {
        return !!this.props.history.location.pathname.match(/^.*\/enrol$/);
    }

    courseInitiated() {
        return !!this.props.history.location.pathname.match(/^\/course\/.*$/);
    }

    redirectURL () {
        return `/${this.courseInitiated() ? 'course' : 'student'}/${this.props.match.params.id}/`;
    }

    handleSubmit() {
        const submit = () => {
            if (this.enrolMode()) {
                return this.props.enrol(this.state.courseSelected, this.state.studentSelected)
            }
            return this.props.withdraw(this.state.courseSelected, this.state.studentSelected)
        };

        submit().then((redirect) => {
            if (redirect) this.props.history.push(this.redirectURL());
        });
    }

    render() {
        const { courses, students, isFetching } = this.props;
        const coursesOptions = (courses || []).map((course) => {
            return {
                text: course.name,
                value: course.id,
            };
        });

        const studentsOptions = (students || []).map((student) => {
            return {
                text: student.name,
                value: student.id,
                image: { avatar: true, src: student.image },
            };
        });

        const course = courses.find(course => course.id === this.state.courseSelected) || {};
        const student = students.find(student => student.id === this.state.studentSelected) || {};

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
                <Header size="large" icon textAlign="center">
                    <Icon name={this.enrolMode() ? 'handshake' : 'undo'} />
                    <Header.Content>
                        {this.enrolMode() ? 'Enrol' : 'Withdraw'}
                    </Header.Content>
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
                                            {
                                                this.courseInitiated()
                                                    ? 'Course'
                                                    : (this.enrolMode() ? 'Enrol Course' : 'Withdraw Course')
                                            }
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Select
                                            options={coursesOptions}
                                            value={this.state.courseSelected}
                                            disabled={this.courseInitiated()}
                                            onChange={(event, data) => this.setState({ courseSelected: data.value })}
                                        />
                                    </Table.Cell>
                                </Table.Row>
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
                                                Enrolment Status
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Statistic horizontal size="mini">
                                            <Statistic.Label>
                                                {course.students && course.students.length}
                                            </Statistic.Label>
                                            <Statistic.Label>/</Statistic.Label>
                                            <Statistic.Label>{course.capacity}</Statistic.Label>
                                        </Statistic>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' disabled>
                                            <Header.Content>
                                                {
                                                    !this.courseInitiated()
                                                        ? 'Student'
                                                        : (this.enrolMode() ? 'Enrol Student' : 'Withdraw Student')
                                                }
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Select
                                            options={studentsOptions}
                                            value={this.state.studentSelected}
                                            disabled={!this.courseInitiated()}
                                            onChange={(event, data) => this.setState({ studentSelected: data.value })}
                                        />
                                        <MediaQuery minWidth={768}>
                                            <Image inline circular size="mini" spaced="left" src={student.image}/>
                                        </MediaQuery>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell width={2}>
                                        <Header as='h4' disabled>
                                            Student Email
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header>{student.email}</Header>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell width={2}>
                                        <Header as='h4' disabled>
                                            Student Ph.
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header>{student.phone}</Header>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                        <Divider />
                        <Button size="large" primary onClick={() => this.setState({ showConfirm: true })}>
                            {this.enrolMode() ? 'Enrol' : 'Withdraw'}
                        </Button>
                        <Button
                            as={Link}
                            to={this.redirectURL()}
                            size="large"
                            floated="right"
                        >
                            Cancel
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
                    <Modal.Header>{this.enrolMode() ? 'Enrol' : 'Withdraw'} Student</Modal.Header>
                    <Modal.Content>
                        <p>
                            Are you sure you want to {this.enrolMode() ? 'enrol' : 'withdraw'} student <em>
                            {student.name}</em> {this.enrolMode() ? 'to' : 'from'} course <em>{course.name}</em>
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            negative
                            onClick={() => this.setState({ showConfirm: false })}
                            disabled={this.state.isSaving}
                        >
                            No
                        </Button>
                        <Button
                            positive
                            icon="checkmark"
                            labelPosition="right"
                            content="Yes"
                            disabled={this.state.isSaving}
                            loading={this.state.isSaving}
                            onClick={() => {
                                this.setState({ isSaving: true });
                                this.handleSubmit();
                            }}
                        />
                    </Modal.Actions>
                </Modal>
            </Layout>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnrolOrWithdrawPage);
