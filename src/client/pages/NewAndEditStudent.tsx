import * as React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Divider,
    Form,
    Header,
    Icon,
    Segment,
    Checkbox, Image, Message,
} from 'semantic-ui-react';
import "react-datepicker/dist/react-datepicker.css";
import Layout from '../components/Layout';
import { getStudent, saveStudent, registerStudent, clearStudent } from '../actions';

const mapStateToProps = (state) => ({
    name: state.students.student.name,
    email: state.students.student.email,
    phone: state.students.student.phone,
    image: state.students.student.image,
    premium: state.students.student.premium,
    isLoading: state.students.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
    loadStudent: id => dispatch(getStudent(id)),
    register: student => dispatch(registerStudent(student)),
    save: (student, id) => dispatch(saveStudent(student, id)),
    clear: () => dispatch(clearStudent()),
});

export class NewOrEditStudentPage extends React.Component<any, any> {
    private file;

    constructor(props) {
        super(props);

        this.state = {
            name: props.name || '',
            email: props.email || '',
            phone: props.phone || '',
            premium: props.premium || false,
            image: props.image || '',
            validationError: false,
        };
    }


    componentDidMount() {
        this.props.clear();
        if (this.editMode()) {
            this.props.loadStudent(this.props.match.params.id);
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
        let validationError = false;
        const data = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
        } as any;

        Object.keys(data).forEach((key) => {
            if (!data[key]) validationError = true;
        });

        if (!this.editMode() && !this.file.files[0]) validationError = true;

        this.setState({ validationError });

        if (validationError) return;

        const student = new FormData();

        data.premium = this.state.premium;
        Object.keys(data).forEach(key => student.append(key, data[key]));

        if (this.file.files && this.file.files[0]) {
            student.append('file', this.file.files[0]);
        }

        if (this.editMode()) {
            const id = this.props.match.params.id;
            this.props.save(student, id).then((redirect) => {
                if (redirect) this.props.history.push(`/student/${id}/`);
            });
        } else {
            this.props.register(student).then((redirect) => {
                if (redirect) this.props.history.push('/students/');
            });
        }
    }

    handleChange(event, field) {
        this.setState({ [field]: event.target.value });
    }

    render() {
        const { isLoading, name, email, phone } = this.props;

        return (
            <Layout>
                <Header size="huge" icon textAlign="center">
                    <Icon name='student' circular />
                    <Header.Content>
                        {
                            this.editMode() ? 'Edit Student' : 'Register New Student'
                        }
                    </Header.Content>
                </Header>
                <Segment size="tiny" loading={isLoading}>
                    <Form size="huge" error={!!this.state.validationError}>
                        <Form.Field error={!this.state.name}>
                            <label>Student Name</label>
                            <input
                                type="text"
                                placeholder='Name'
                                onChange={event => this.handleChange(event, 'name')}
                                defaultValue={this.editMode() ? name : ''}
                            />
                        </Form.Field>
                        <Form.Field error={!this.state.email}>
                            <label>Email</label>
                            <input
                                placeholder='Email'
                                onChange={event => this.handleChange(event, 'email')}
                                defaultValue={this.editMode() ? email : ''}
                            />
                        </Form.Field>
                        <Form.Field error={!this.state.phone}>
                            <label>Phone Number</label>
                            <input
                                placeholder='Phone Number'
                                onChange={event => this.handleChange(event, 'phone')}
                                defaultValue={this.editMode() ? phone : ''}
                            />
                        </Form.Field>
                        <Divider hidden />
                        <Form.Field>
                            <Checkbox
                                fitted
                                toggle
                                checked={this.state.premium}
                                onChange={() => this.setState({ premium: !this.state.premium })}
                                label="Premium Plan"
                            />
                        </Form.Field>
                        <Form.Group widths="equal">
                            <Form.Field error={!this.editMode() && (!this.file || !this.file.files[0])}>
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
                        <Divider hidden />
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

export default connect(mapStateToProps, mapDispatchToProps)(NewOrEditStudentPage);
