import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Header, List, Icon, Input, Segment, Comment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout'
import MediaQuery from 'react-responsive';
import { getStudents, searchStudents, clearStudent } from '../actions';

const mapStateToProps = (state) => ({
    students: state.students.list,
    isFetching: state.students.isFetching,
    searchText: state.students.search,
});

const mapDispatchToProps = (dispatch) => ({
    loadStudents: () => dispatch(getStudents()),
    search: search => dispatch(searchStudents(search)),
    clear: () => dispatch(clearStudent()),
});

export class StudentsPage extends React.Component<any> {
    private search;

    componentDidMount() {
        this.props.clear();
        this.props.loadStudents();
    }

    render() {
        const { students, isFetching, searchText } = this.props;
        const noSearchResult = searchText && students.length < 1;

        return (
            <Layout>
                <Header size="huge" icon textAlign="center">
                    <Icon name='student' circular />
                    <Header.Content>Students</Header.Content>
                </Header>
                <Divider hidden />
                <Input
                    icon='search'
                    ref={e => this.search = e}
                    disabled={isFetching}
                    placeholder='Search students...'
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            this.props.search(this.search.inputRef.value);
                        }
                    }}
                />
                <MediaQuery maxWidth={700}>
                    {(matches) => {
                        const floated = matches ? undefined : 'right';

                        return (
                            <React.Fragment>
                                {matches ? <p />: null}
                                <Button
                                    primary
                                    floated={floated}
                                    as={Link}
                                    to="/student/new"
                                >
                                    Register New Student
                                </Button>
                            </React.Fragment>
                        );
                    }}
                </MediaQuery>
                <Segment loading={isFetching} placeholder={!!noSearchResult}>
                    {
                        noSearchResult
                            ? (
                                <Header icon>
                                    <Icon name='search' />
                                    We don't have any students matching your query.
                                </Header>
                            )
                            : (
                                <List divided relaxed>
                                    {
                                        students.map((student, index) => {
                                            return (
                                                <List.Item key={index}>
                                                    <Comment.Group size="huge">
                                                        <Comment>
                                                            <Comment.Avatar
                                                                as={Link}
                                                                to={`/student/${student.id}/`}
                                                                src={student.image}
                                                            />
                                                            <Comment.Content>
                                                                <Comment.Author
                                                                    as={Link}
                                                                    to={`/student/${student.id}/`}
                                                                >
                                                                    {student.name}
                                                                </Comment.Author>
                                                                <Comment.Metadata>
                                                                    <div>
                                                                        <Icon name='registered' />
                                                                        Registered: {student.registered}
                                                                    </div>
                                                                    <div>
                                                                        <Icon name='mail' />
                                                                        Email: {student.email}
                                                                    </div>
                                                                    <div>
                                                                        <Icon name='book' />
                                                                        Enrolled Course: {student.enrolledCourse}
                                                                    </div>
                                                                </Comment.Metadata>
                                                            </Comment.Content>
                                                        </Comment>
                                                    </Comment.Group>
                                                </List.Item>
                                            );
                                        })
                                    }
                                </List>
                            )
                    }
                </Segment>
            </Layout>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsPage);
