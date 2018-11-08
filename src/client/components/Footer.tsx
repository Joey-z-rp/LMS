import * as React                   from 'react';
import { Container, Menu, Segment } from 'semantic-ui-react';
import * as s from './footer/Footer.css';

const Footer: React.StatelessComponent = () => (
    <Segment className={s.fixDown} vertical>
        <Container textAlign="center">
            <div>
                <Menu.Item>
                    Copyright © {new Date().getFullYear()} Joey Zheng
                </Menu.Item>
                <Menu.Item>
                    v 0.x
                </Menu.Item>
            </div>
        </Container>
    </Segment>
);

export default Footer;
