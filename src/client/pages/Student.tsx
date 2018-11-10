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
    Icon,
    Progress,
} from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getStudent } from '../actions';
import PersonLabel from '../components/PersonLabel';

const mapStateToProps = (state) => ({
    student: state.students.student,
    isFetching: state.students.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
    load: (id) => dispatch(getStudent(id)),
});

export class StudentPage extends React.Component<any> {
    componentDidMount() {
        this.props.load(this.props.match.params.id);
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
            </Layout>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentPage);
