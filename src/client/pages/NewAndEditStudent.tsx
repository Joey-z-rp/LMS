import * as React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Divider,
    Form,
    Header,
    Icon,
    Segment,
    Checkbox,
} from 'semantic-ui-react';
import "react-datepicker/dist/react-datepicker.css";
import Layout from '../components/Layout';
import { getStudent, saveStudent, registerStudent } from '../actions';

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
});

export class NewOrEditStudentPage extends React.Component<any, any> {
    private name;
    private email;
    private phone;
    private image;

    constructor(props) {
        super(props);

        this.state = {
            premium: props.premium || false,
        };
    }


    componentDidMount() {
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
        const student = {
            name: this.name.value,
            email: this.email.value,
            phone: this.phone.value,
            image: this.image.value,
            premium: this.state.premium,
        };
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

    render() {
        const { isLoading, name, email, phone, image } = this.props;

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
                    <Form size="huge">
                        <Form.Field>
                            <label>Student Name</label>
                            <input
                                placeholder='Course Name'
                                ref={e => this.name = e}
                                defaultValue={this.editMode() ? name : ''}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input
                                placeholder='Email'
                                ref={e => this.email = e}
                                defaultValue={this.editMode() ? email : ''}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Phone Number</label>
                            <input
                                placeholder='Phone Number'
                                ref={e => this.phone = e}
                                defaultValue={this.editMode() ? phone : ''}
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
                        <Divider hidden />
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
