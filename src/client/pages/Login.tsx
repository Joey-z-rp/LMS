import * as React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Button, Container, Form, Grid, Header, Message, Input, Image, Segment } from 'semantic-ui-react';
import { login, clearLogin } from '../actions';
import * as s from './login/Login.css';

const mapStateToProps = (state) => ({
    isLogging: state.login.isLogging,
    failed: state.login.failed,
    err: state.login.err,
});

const mapDispatchToProps = (dispatch) => ({
    doLogin: (email, password) => dispatch(login(email, password)),
    clear: () => dispatch(clearLogin()),
});

export class LoginPage extends React.Component<any> {
    state = {
        email: '',
        password: '',
    };

    componentDidMount() {
        document.getElementById('app')!.style.height = '100%';
        this.props.clear();
    }

    componentWillUnmount() {
        document.getElementById('app')!.style.height = null;
    }

    render() {
        const { isLogging, failed, err } = this.props;

        return (
            <Container className={s.height}>
                <Grid centered  verticalAlign="middle" textAlign="center" className={s.height}>
                    <Grid.Column className={s.maxWidth}>
                        <Header as="h3" textAlign="center" color="blue">
                            <Image src="https://www.agreenium.fr/sites/default/files/default_images/learn.png" /> Log-in to Learning Management System
                        </Header>
                        <Form size="large" error={failed} loading={isLogging}>
                            <Segment stacked>
                                <Form.Field>
                                    <Input
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='E-mail address'
                                        value={this.state.email}
                                        onChange={(event, data) => this.setState({ email: data.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input
                                        type="password"
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        value={this.state.password}
                                        onChange={(event, data) => this.setState({ password: data.value })}
                                    />
                                </Form.Field>
                                <Message
                                    error
                                    header={err.name ? err.name : 'Invalid Credentials'}
                                    content={
                                        err.message
                                            ? err.message
                                            : 'Please make sure the email and / or password are correct.'
                                    }
                                />
                                <Button
                                    size="large"
                                    fluid
                                    color="blue"
                                    onClick={() => this.props.doLogin(this.state.email, this.state.password)
                                        .then((redirect) => {
                                            if (redirect) {
                                                const query = queryString.parse(this.props.location.search);
                                                this.props.history.push(query.redirect || '/')
                                            }
                                        })}
                                >
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            Do not have an account yet?  <a href="#">Contact</a> our support team to create one
                        </Message>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
