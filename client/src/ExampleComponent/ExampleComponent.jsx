import React, { PureComponent } from "react";
import { Button, Form, Item, Segment } from 'semantic-ui-react'
import { searchAction } from "./exampleActions";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import socket from '../socket'
import store from "../root/store";

class ExampleComponent extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            message:''
        }
    }
    componentDidMount(){
        socket.on('message',({message})=>this.setState({
            message
        }))
    }

    onSearchChange=(e, {value})=>{
        this.setState({
            searchValue:value
        })
    }

    render(){
        return (
            <Segment>
            <Form>
                <Form.Input value={this.state.message} onChange={this.onSearchChange} label='Received value' />
                <Button onClick={() => socket.emit('button-clicked',{message: "clicked"})} type='submit'>Submit</Button>
            </Form>
            <Item>
                <Item.Content>
                    <Item.Header>{this.props.foundData}</Item.Header>
                </Item.Content>
            </Item>
            </Segment>
        )
    }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			searchAction
		},
		dispatch,
	);
}

function mapStateToProps(state) {
	return {
		foundData: state.exampleReducer.foundData
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleComponent);