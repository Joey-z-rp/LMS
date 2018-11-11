import * as React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Form,
    Divider,
    Header,
    Icon,
    Segment,
    Select,
    TextArea,
} from 'semantic-ui-react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as moment from 'moment';
import Layout from '../components/Layout';
import {getLecturers, createCourse, getCourse, saveCourse } from '../actions';

const mapStateToProps = (state) => ({
    name: state.course.course.name,
    description: state.course.course.description,
    from: state.course.course.from,
    to: state.course.course.to,
    lecturer: state.course.course.lecturer,
    image: state.course.course.image,
    isLoading: state.course.isFetching,
    lecturers: state.course.lecturerList,
    capacity: state.course.course.capacity,
});

const mapDispatchToProps = (dispatch) => ({
    loadLecturers: () => dispatch(getLecturers()),
    loadCourse: (id) => dispatch(getCourse(id)),
    create: course => dispatch(createCourse(course)),
    save: (course, id) => dispatch(saveCourse(course, id)),
});

export class NewOrEditCoursePage extends React.Component<any, any> {
    private name;
    private image;
    private capacity;

    constructor(props) {
        super(props);

        this.state = {
            description: props.description || '',
            from: props.from || moment().format('YYYY-MM-DD'),
            to: props.to || moment().format('YYYY-MM-DD'),
            lecturer: props.lecturer || '',
        };
    }


    componentDidMount() {
        if (this.editMode()) {
            this.props.loadCourse(this.props.match.params.id)
                .then(() => this.props.loadLecturers());
        } else {
            this.props.loadLecturers();
        }
    }

    componentDidUpdate(prevProps) {
        Object.keys(this.state).forEach((key) => {
            if (prevProps[key] !== this.props[key]) {
                this.setState({ [key]: this.props[key] });
            }
        });
    }

    editMode() {
        return !!this.props.history.location.pathname.match(/^.*\/edit$/);
    }

    handleSubmit() {
        const course = {
            name: this.name.value,
            description: this.state.description,
            from: this.state.from,
            to: this.state.to,
            lecturer: this.state.lecturer,
            capacity: this.capacity.value,
            image: this.image.value,
        };

        if (this.editMode()) {
            const id = this.props.match.params.id;
            this.props.save(course, id).then((redirect) => {
                if (redirect) this.props.history.push(`/course/${id}/`);
            });
        } else {
            this.props.create(course).then((redirect) => {
                if (redirect) this.props.history.push('/courses');
            });
        }
    }

    render() {
        const { lecturers, isLoading, name, image, capacity } = this.props;

        const options = lecturers.map((lecturer) => ({
            text: lecturer.name,
            value: lecturer.id,
            image: { avatar: true, src: lecturer.image },
        }));

        let selected;
        if (this.state.lecturer) selected = this.state.lecturer.id;
        console.log(this.state.lecturer)

        return (
            <Layout>
                <Header size="huge" icon textAlign="center">
                    <Icon name='book' circular />
                    <Header.Content>
                        {
                            this.editMode() ? 'Edit Course' : 'Create New Course'
                        }
                    </Header.Content>
                </Header>
                <Segment size="tiny" loading={isLoading}>
                    <Form size="huge">
                        <Form.Field>
                            <label>Course Name</label>
                            <input
                                placeholder='Course Name'
                                ref={e => this.name = e}
                                defaultValue={this.editMode() ? name : ''}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <TextArea
                                autoHeight
                                placeholder='Course Description'
                                value={this.state.description}
                                onChange={(event, data) => this.setState({ description: data.value })}
                            />
                        </Form.Field>
                        <Form.Group>
                            <Form.Field>
                                <label>Start On</label>
                                <DatePicker
                                    selected={moment(this.state.from)}
                                    onChange={(date) => this.setState({ from: date.format('YYYY-MM-DD') })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>End on</label>
                                <DatePicker
                                    selected={moment(this.state.to)}
                                    onChange={(date) => this.setState({ to: date.format('YYYY-MM-DD') })}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Divider hidden />
                        <Form.Field>
                            <label>Capacity</label>
                            <input
                                placeholder='Course Capacity'
                                type="number"
                                ref={e => this.capacity = e}
                                defaultValue={this.editMode() ? capacity : 0}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Lecturer</label>
                            <Select
                                value={selected}
                                options={options}
                                onChange={(event, data) => this.setState({ lecturer: data.value })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Image URL</label>
                            <input
                                placeholder='Image URL'
                                defaultValue={image}
                                ref={e => this.image = e}
                            />
                        </Form.Field>
                        <Button
                            onClick={() => this.handleSubmit()}
                            size="large"
                            color={this.editMode() ? 'green' : 'blue'}
                        >
                            {
                                this.editMode() ? 'Save' : 'Create'
                            }
                        </Button>
                        <Button
                            size="large"
                            floated="right"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                    </Form>
                </Segment>
            </Layout>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOrEditCoursePage);
