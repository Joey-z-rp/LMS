import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Message } from 'semantic-ui-react';
import { hideMessage } from '../actions';
import * as s from './messageComponent/MessageComponent.css';


const mapStateToProps = (state) => ({
    showMessage: state.message.showMessage,
    title: state.message.title,
    content: state.message.content,
    type: state.message.type,
});

function mapDispatchToProps(dispatch) {
    return {
        hide: () => dispatch(hideMessage()),
    };
}

export class MessageComponent extends React.Component<any> {

    render() {
        const { showMessage, title, content, type, hide } = this.props;

        if ( showMessage && type === 'success') {
            setTimeout(() => hide(), 2000);
        }

        return (
            <Message
                positive={type === 'success'}
                negative={type === 'error'}
                hidden={!showMessage}
                className={s.fixUp}
            >
                <Message.Header>
                    {type === 'error' ? 'SORRY, AN ERROR JUST HAPPENED' : title}
                </Message.Header>
                <p>
                    {content}
                </p>
                <Button
                    size="small"
                    onClick={() => hide()}
                >
                    Close
                </Button>
            </Message>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageComponent));
