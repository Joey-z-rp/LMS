import * as React                               from 'react';
import { connect }                              from 'react-redux';
import { Button, Card, Divider, Grid, Header, Icon, Image, Segment, Table, Placeholder }   from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
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

export class CoursePage extends React.Component<any> {
    componentDidMount() {
        this.props.loadCourses();
    }

    render() {
        const { courses, isFetching } = this.props;

        return (
            <Layout>
                <Header size="huge" icon textAlign="center">
                    <Header.Content>Web Full Stack</Header.Content>
                </Header>
                <Grid stackable>
                    <Grid.Column width={4}>
                        <MediaQuery maxWidth={768}>
                            <Image rounded centered size="small" src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                        </MediaQuery>
                        <MediaQuery minWidth={768}>
                            <Image rounded src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
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
                                        <p>
                                            React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
                                        </p>
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
                                        2018-12-01 to 2018-12-31
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
                                    <Table.Cell>11</Table.Cell>
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
                            Edit
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
