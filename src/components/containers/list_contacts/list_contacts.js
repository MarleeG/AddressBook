import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap'

import { selectContact } from '../../../actions';
import './list_contacts.css';


class ListContacts extends Component {
    constructor(props) {
        super(props);
        this.forcingUpdate = this.forcingUpdate.bind(this);
        this.renderContactList = this.renderContactList.bind(this);

        this.state = {
            contacts: [],
        }
    }

    forcingUpdate() {
        this.forceUpdate();
    }

    componentWillReceiveProps(props) {
        // console.log('receiving props... ', props)
        this.forcingUpdate();
        this.render();
    }

    // componentWillMount() {
    //     console.log('Will mount :: ' , this.state.contacts);
    // }

    componentDidMount() {
        this.setState({
            contacts: []
        }, () => {
            this.setState({
                contacts: this.state.contacts.concat(this.props.contacts)
            })
        })
    }

    deleteContact(data, index) {
        // console.log('DELETE BUTTON CLICKED');
        // console.log('data: ', data);
        // console.log('index: ', index);
        // console.log(' this.props:', this.props.contacts);
        // console.log('--------------------------------------------');
        this.props.deleteContact(data);
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

    render() {

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


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectContact: selectContact }, dispatch)
}

export default connect(null, mapDispatchToProps)(ListContacts);