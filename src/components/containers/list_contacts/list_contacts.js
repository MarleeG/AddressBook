import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap'

import { selectContact } from '../../../actions';
import './list_contacts.css';


class ListContacts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: this.props.contacts,
            // renderContacts: this.props.renderContacts,
            contactsLength: []
        }

        // console.log('Contact list: ', this.state.contacts);
    }

    componentWillReceiveProps(props) {
        console.log('receiving props... ', props)
    }

    // componentDidMount() {
    //     this.setState({
    //         contactsLength: [
    //             ...this.state.contactsLength, this.state.contacts.length
    //         ]
    //     }, () => {
    //         // console.log('length: ', this.state.contactsLength);
    //     });
    // }


    deleteContact(data, index) {
        console.log('DELETE BUTTON CLICKED');
        console.log('data: ', data);
        console.log('index: ', index);
        console.log(this.props.contacts);
        console.log('--------------------------------------------');

        // var index = this.props.contacts.indexOf(data.email);

        // console.log('index of: ', index)
        // console.log('this.props', this.props.contacts);

        // const deleteContact = this.props.contacts[index];
        // console.log('delete: ', deleteContact);
    }

    shouldComponentUpdate() {
        alert('COMPONENT UPDATED');
        console.log('Contact list contacts....', this.state.contacts)
        return true;
    }

    renderContactList() {
        return this.props.contacts.map((element, index) => {
            return (
                <div key={index}>
                    <li className='contacts_list'>
                        <div className="card">
                            <div className="card-header">
                                <h4>{element.firstName} {element.lastName}</h4>
                            </div>
                            <div className="card-body">
                                <p className="card-text">Number: {element.number}</p>
                                <p className="card-text">Email: {element.email}</p>
                                <Button
                                    bsStyle="primary"
                                    onClick={() => {
                                        this.props.selectContact(element)
                                    }}
                                >More Details</Button>
                                <Button
                                    onClick={() => this.deleteContact(element, index)}
                                    className='ml-1'
                                    bsStyle="danger">Delete</Button>
                            </div>
                        </div>
                    </li>
                    <br />
                </div>
            );
        });
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        // console.log('Will Update');
        // console.log('nextProps: ', nextProps);
        // console.log('nextState: ', nextState);
        // console.log('--------------------------------------------');

        // if (nextProps.contacts.length !== nextState.contacts.length) {
        //     this.render();
        // }
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     // If we have a snapshot value, we've just added new items.
    //     // Adjust scroll so these new items don't push the old ones out of view.
    //     // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    //     console.log('Component Did Update');
    //     console.log('listed contacts: ', this.state.contacts);
    //     console.log('PrevProps: ', prevProps);
    //     console.log('prevState: ', prevState);
    //     console.log('snapshot: ', snapshot);
    //     console.log('--------------------------------------------');
    //     this.render();
    // }

    // componentWillReceiveProps(newProps) {
    //     console.log('newProps: ', newProps);
    //     // this.setState({name: newProps.name});
    // }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     console.log('nextProps: ', nextProps);
    // }

    render() {
        // this.randomFunction();
        
        return (
            <div>
                <h3 className="text-center">Contact List</h3>
                <ul>
                    {this.renderContactList()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state.renderContacts)
    return {
        contacts: state.contacts,
        // renderContacts: state.renderContacts
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectContact: selectContact }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContacts);