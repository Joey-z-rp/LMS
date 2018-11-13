import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Header, Image } from 'semantic-ui-react';
import * as s from './404Page/404Page.css';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export class PageNotFound extends React.PureComponent<any> {
    componentDidMount() {
        document.getElementById('app')!.style.height = '100%';
    }

    componentWillUnmount() {
        document.getElementById('app')!.style.height = null;
    }

    render() {

        return (
            <Container className={s.height}>
                <Grid centered stackable verticalAlign="middle" textAlign="center" className={s.height}>
                    <Grid.Column width={7}>
                        <Image src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg" />
                    </Grid.Column>
                    <Grid.Column width={7} textAlign="center">
                        <Header as="h1" textAlign="center" className={s.headerFontSize} color="grey">
                            404
                            <Header.Subheader className={s.contentFontSize}>
                                Sorry, the page could not be found
                            </Header.Subheader>
                        </Header>
                        <Button primary as={Link} to="/">
                            Back to home page
                        </Button>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageNotFound);
