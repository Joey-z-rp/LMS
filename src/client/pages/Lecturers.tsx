import * as React from 'react';
import { connect } from 'react-redux';
import {
    Divider,
    Header,
    List,
    Icon,
    Segment,
    Comment,
    Rating
} from 'semantic-ui-react';
import Layout from '../components/Layout'
import { getLecturers } from '../actions';

const mapStateToProps = (state) => ({
    lecturers: state.lecturers.lecturers,
    isFetching: state.lecturers.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
    load: () => dispatch(getLecturers()),
});

export class LecturersPage extends React.Component<any> {
    componentDidMount() {
        this.props.load();
    }

    render() {
        const { lecturers, isFetching } = this.props;

        return (
            <Layout>
                <Header size="huge" icon textAlign="center">
                    <Icon name='users' circular />
                    <Header.Content>Lecturers</Header.Content>
                </Header>
                <Divider hidden />
                <Segment loading={isFetching}>
                    <List divided relaxed>
                        {
                            lecturers.map((lecturer, index) => {
                                return (
                                    <List.Item key={index}>
                                        <Comment.Group size="huge">
                                            <Comment>
                                                <Comment.Avatar
                                                    src={lecturer.image}
                                                />
                                                <Comment.Content>
                                                    <Comment.Author>
                                                        {lecturer.name}
                                                    </Comment.Author>
                                                    <Comment.Metadata>
                                                        <div>
                                                            <Icon name='phone square' />
                                                            Phone: {lecturer.phone}
                                                        </div>
                                                        <div>
                                                            <Icon name='mail' />
                                                            Email: {lecturer.email}
                                                        </div>
                                                        <div>
                                                            <Icon name='book' />
                                                            Teaching Courses: {lecturer.coursesTeaching && lecturer.coursesTeaching.length}
                                                        </div>
                                                        <div>
                                                            <Icon name='star outline' />
                                                            Rating: <Rating icon='star' disabled rating={lecturer.rating} maxRating={5} />
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
                </Segment>
            </Layout>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LecturersPage);
