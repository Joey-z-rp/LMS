import * as React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Form,
    Divider,
    Header,
    Icon,
    Image,
    Message,
    Segment,
    Select,
    TextArea,
} from 'semantic-ui-react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as moment from 'moment';
import Layout from '../components/Layout';
import {getLecturers, createCourse, getCourse, saveCourse, clearCourse } from '../actions';

const mapStateToProps = (state) => ({
    name: state.course.course.name,
    description: state.course.course.description,
    from: state.course.course.from,
    to: state.course.course.to,
    lecturer: state.course.course.lecturer,
    image: state.course.course.image,
    isLoading: state.course.isFetching,
    lecturers: state.lecturers.lecturers,
    capacity: state.course.course.capacity,
});

const mapDispatchToProps = (dispatch) => ({
    loadLecturers: () => dispatch(getLecturers()),
    loadCourse: (id) => dispatch(getCourse(id)),
    create: course => dispatch(createCourse(course)),
    save: (course, id) => dispatch(saveCourse(course, id)),
    clear: () => dispatch(clearCourse()),
});

export class NewOrEditCoursePage extends React.Component<any, any> {
    private file;

    constructor(props) {
        super(props);

        this.state = {
            name: props.name || '',
            description: props.description || '',
            from: props.from || moment().format('YYYY-MM-DD'),
            to: props.to || moment().format('YYYY-MM-DD'),
            capacity: props.capacity || '',
            lecturer: props.lecturer,
            image: props.image || '',
            validationError: false,
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
        // Validate
        let validationError;
        const data = {
            name: this.state.name,
            description: this.state.description,
            from: this.state.from,
            to: this.state.to,
            lecturer: this.state.lecturer && this.state.lecturer.id,
            capacity: this.state.capacity,
        };

        Object.keys(data).forEach((key) => {
            if (!data[key]) validationError = true;
        });

        if (!this.editMode() && !this.file.files[0]) validationError = true;

        this.setState({ validationError });

        if (validationError) return;

        const course = new FormData();

        Object.keys(data).forEach(key => course.append(key, data[key]));

        if (this.file.files && this.file.files[0]) {
            course.append('file', this.file.files[0]);
        }

        if (this.editMode()) {
            const id = this.props.match.params.id;
            this.props.save(course, id).then((redirect) => {
                this.props.clear();
                if (redirect) this.props.history.push(`/course/${id}/`);
            });
        } else {
            this.props.create(course).then((redirect) => {
                this.props.clear();
                if (redirect) this.props.history.push('/courses');
            });
        }
    }

    render() {
        const { lecturers, isLoading, name, capacity } = this.props;

        const options = lecturers.map((lecturer) => ({
            text: lecturer.name,
            value: lecturer.id,
            image: { avatar: true, src: lecturer.image },
        }));

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
                    <Form size="huge" error={!!this.state.validationError}>
                        <Form.Field error={!this.state.name}>
                            <label>Course Name</label>
                            <input
                                placeholder='Course Name'
                                onChange={event => this.setState({ name: event.target.value })}
                                defaultValue={this.editMode() ? name : ''}
                            />
                        </Form.Field>
                        <Form.Field error={!this.state.description}>
                            <label>Description</label>
                            <TextArea
                                autoHeight
                                placeholder='Course Description'
                                value={this.state.description}
                                onChange={(event, data) => this.setState({ description: data.value })}
                            />
                        </Form.Field>
                        <Form.Group>
                            <Form.Field error={!this.state.from}>
                                <label>Start On</label>
                                <DatePicker
                                    dateFormat="YYYY-MM-DD"
                                    selected={moment(this.state.from)}
                                    onChange={(date) => this.setState({ from: date.format('YYYY-MM-DD') })}
                                />
                            </Form.Field>
                            <Form.Field error={!this.state.to}>
                                <label>End on</label>
                                <DatePicker
                                    dateFormat="YYYY-MM-DD"
                                    selected={moment(this.state.to)}
                                    onChange={(date) => this.setState({ to: date.format('YYYY-MM-DD') })}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Divider hidden />
                        <Form.Field error={!this.state.capacity}>
                            <label>Capacity</label>
                            <input
                                placeholder='Course Capacity'
                                type="number"
                                onChange={event => this.setState({ capacity: event.target.value })}
                                defaultValue={this.editMode() ? capacity : 0}
                            />
                        </Form.Field>
                        <Form.Field error={!this.state.lecturer}>
                            <label>Lecturer</label>
                            <Select
                                value={this.state.lecturer && this.state.lecturer.id || ''}
                                options={options}
                                onChange={(event, data) => this.setState({
                                    lecturer: { id: data.value },
                                })}
                            />
                        </Form.Field>
                        <Form.Group widths="equal">
                            <Form.Field error={!this.editMode() && this.file && !this.file.files[0]}>
                                <label>Image</label>
                                <input
                                    type="file"
                                    ref={e => this.file = e}
                                    onChange={() => {
                                        if (this.file.files && this.file.files[0]) {
                                            const reader = new FileReader();

                                            reader.onload = (event) => {
                                                // @ts-ignore
                                                this.setState({ image: event.target.result });
                                            };

                                            reader.readAsDataURL(this.file.files[0]);
                                        }
                                    }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Image src={this.state.image} size="medium" />
                            </Form.Field>
                        </Form.Group>
                        <Message
                            error
                            content="Please complete all fields."
                        />
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
