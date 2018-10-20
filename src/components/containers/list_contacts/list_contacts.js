import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

import { selectContact } from '../../../actions';
import './list_contacts.css';

class ListContacts extends Component {
    constructor(props) {
        super(props);
        this.forcingUpdate = this.forcingUpdate.bind(this);
        this.renderContactList = this.renderContactList.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.editForm = this.editForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateContact = this.updateContact.bind(this);

        this.state = {
            contacts: [],
            show: false,
            indexOfContact: '',
            firstName: "",
            lastName: "",
            email: '',
            number: '',
            address: {
                addressOne: '',
                addressTwo: '',
                city: '',
                state: '',
                zip: ''
            }
        }
    }

    handleHide() {
        this.setState({ show: false });
    }

    forcingUpdate() {
        this.forceUpdate();
    }

    componentWillReceiveProps(props) {
        this.forcingUpdate();
    }

    componentDidMount() {
        this.setState({
            contacts: []
        }, () => {
            this.setState({
                contacts: this.state.contacts.concat(this.props.contacts)
            })
        })
    }

    deleteContact(data) {
        this.props.deleteContact(data);
    }

    editContact(data) {
        const index = this.props.contacts.indexOf(data);

        const {
            firstName,
            lastName,
            email,
            number,
            address: {
                addressOne,
                addressTwo,
                state,
                city,
                zip
            }
        } = data

        this.setState({
            show: true,
            indexOfContact: index,
            firstName: firstName,
            lastName: lastName,
            email: email,
            number: number,
            address: {
                addressOne: addressOne,
                addressTwo: addressTwo,
                city: city,
                state: state,
                zip: zip
            }
        });
    }

    updateContact() {
        this.handleHide();
        const {
            firstName,
            lastName,
            email,
            number,
            address: {
                addressOne,
                addressTwo,
                state,
                city,
                zip
            }
        } = this.state;

        const NEW_CONTACT_VALUES = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            number: number,
            address: {
                addressOne: addressOne,
                addressTwo: addressTwo,
                state: state,
                city: city,
                zip: zip
            }
        }
        this.props.editContact(NEW_CONTACT_VALUES, this.state.indexOfContact)
    }

    handleInputChange(event) {
        const { name, value } = event.target;

        const fields = [
            'firstName',
            'lastName',
            'email',
            'number',
            'addressOne',
            'addressTwo',
            'city',
            'state',
            'zip'
        ];


        var index = fields.indexOf(name);
        if (index <= 3) {
            this.setState({
                [name]: value,
            })
            // console.log(`index: ${index} field: ${fields[index]}`)
        } else if (index !== -1){
            this.setState({
                address: {
                    [name]: value,
                }
            })
        }
    }

    editForm() {
        return (
            <div>
                <Form inline>
                    <FormGroup controlId="formInlineName" className='mr-2 ml-4'>
                        <ControlLabel>First Name</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} value={this.state.firstName} name='firstName' type="text" placeholder="Jane" />
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlineName" className='mr-2'>
                        <ControlLabel>Last Name</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} value={this.state.lastName} name='lastName' type="text" placeholder="Doe" />
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlineEmail" className='mr-2'>
                        <ControlLabel>Email</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} value={this.state.email} name='email' type="email" placeholder="jane.doe@example.com" />
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlineEmail" className='mr-2'>
                        <ControlLabel>Phone Number</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} value={this.state.number} name='number' type="text" placeholder="123-345-5432" />
                    </FormGroup>{' '}
                </Form>

                <br />

                <Form inline>
                    <FormGroup controlId="formInlineName" className='mr-2 ml-4'>
                        <ControlLabel>Address</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} value={this.state.address.addressOne} name='addressOne' type="text" placeholder="123 main street" />
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlineName" className='mr-2'>
                        <ControlLabel>Address</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} value={this.state.address.addressTwo} name='addressTwo' type="text" placeholder="apt 4A" />
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlineEmail" className='mr-2'>
                        <ControlLabel>City</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} value={this.state.address.city} name='city' type="text" placeholder="San Francisco" />
                    </FormGroup>{' '}
                </Form>

                <br />

                <Form inline>
                    <FormGroup controlId="formInlineEmail" className='ml-4 mr-2'>
                        <ControlLabel>State</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} value={this.state.address.state} name='state' type="text" placeholder="CA" />
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlineEmail" className='mr-2'>
                        <ControlLabel>Zip Code</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} value={this.state.address.zip} name='zip' type="text" placeholder="94016" />
                    </FormGroup>{' '}
                </Form>

                <div className="form-row text-center">
                    <div className="col-12">
                        <Button
                            bsStyle="primary"
                            bsSize="large"
                            onClick={this.updateContact}
                            className='mt-3'
                            type='submit'
                        >
                            Update Contact
                            </Button>
                    </div>
                </div>

            </div>
        )
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
                                    onClick={() => this.deleteContact(element)}
                                    className='ml-1'
                                    bsStyle="danger">Delete</Button>
                                <Button
                                    onClick={() => this.editContact(element)}
                                    className='ml-1'
                                    bsStyle="success">Edit</Button>
                            </div>

                            <div>

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

                <div>
                    <div>
                        <Modal
                            show={this.state.show}
                            onHide={this.handleHide}
                            bsSize="large"
                            container={this}
                            aria-labelledby="contained-modal-title"
                        >
                            <Modal.Header>
                                <Modal.Title id="contained-modal-title" className='text-center ml-0'>
                                    Edit Contact
                                        </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.editForm()}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.handleHide} bsStyle='danger'>Cancel</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectContact: selectContact }, dispatch)
}

export default connect(null, mapDispatchToProps)(ListContacts);