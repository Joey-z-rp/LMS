import * as React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import {Button, Container, Icon, Menu, Sidebar, Segment, Image} from 'semantic-ui-react';
import { toggleSidebar } from '../actions';
import * as s from './layout/Layout.css';
import Footer from './Footer';
import MessageComponent from './MessageComponent';

const mapStateToProps = (state) => ({
    showSidebar: state.nav.showSidebar,
});

function mapDispatchToProps(dispatch) {
    return {
        toggle: () => dispatch(toggleSidebar()),
    };
}

export class Layout extends React.Component<any> {

    render() {
        const { children, showSidebar, toggle } = this.props;

        return (
            <Sidebar.Pushable as={Segment} className={`${s.fullHeight} ${s.flex} ${s.inheritBg}`}>
                <MessageComponent />
                <Sidebar
                    as={Menu}
                    animation='push'
                    icon='labeled'
                    inverted
                    vertical
                    visible={showSidebar}
                    width='thin'
                >
                    <Menu.Item as={NavLink} to="/courses">
                        <Icon name='book' />
                        Courses
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/students">
                        <Icon name='student' />
                        Students
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/lecturers">
                        <Icon name='users' />
                        Lecturers
                    </Menu.Item>
                    <Menu.Item as="a" href="/logout">
                        <Icon name='log out' />
                        Sign Out
                    </Menu.Item>
                </Sidebar>
                <MediaQuery minWidth={768}>
                    <Menu color="blue" inverted className={s.noMarginTop} size="huge">
                        <Menu.Item as={Link} to="/">
                            <Image
                                src="http://www.pvhc.net/img106/toefgidjglxqxyppbilx.png"
                                size="mini"
                                spaced="right"
                            />
                            LMS
                        </Menu.Item>
                        <Menu.Menu  position="right">
                            <Menu.Item as={NavLink} to="/courses">
                                <Icon name='book' />
                                Courses
                            </Menu.Item>
                            <Menu.Item as={NavLink} to="/students">
                                <Icon name='student' />
                                Students
                            </Menu.Item>
                            <Menu.Item as={NavLink} to="/lecturers">
                                <Icon name='users' />
                                Lecturers
                            </Menu.Item>
                            <Menu.Item as="a" href="/logout">
                                <Icon name='log out' />
                                Sign Out
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </MediaQuery>
                <Sidebar.Pusher
                    className={`${s.flex} ${s.flexGrow}`}
                    onClick={() => { if (showSidebar) toggle() }}
                >
                    <MediaQuery maxWidth={768}>
                        <Menu color="blue" inverted className={s.noMarginTop}>
                            <Button
                                primary
                                onClick={(event) => {
                                    event.stopPropagation();
                                    toggle();
                                }}
                            >
                                <Icon name="bars" />
                            </Button>
                        </Menu>
                    </MediaQuery>
                    <Container>
                        {children}
                    </Container>
                    <Footer />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
