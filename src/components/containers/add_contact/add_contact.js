import React, { Component } from 'react';
import { Form, FormControl, FormGroup, ControlLabel, Modal, Button } from 'react-bootstrap';

import './add_contact.css';

class AddContact extends Component {
    constructor(props) {
        super(props);
        this.handleHide = this.handleHide.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            contacts: this.props.contacts,
            show: false,
            firstName: '',
            lastName: '',
            number: '',
            email: '',
            addressOne: '',
            addressTwo: '',
            city: '',
            state: '',
            zip: ''
        }
    }

    handleHide() {
        this.setState({ show: false });
    }

    handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        const { firstName, lastName, number, email, addressOne, addressTwo, city, state, zip } = this.state

        const NEW_CONTACT = {
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
        }
        this.addContact(NEW_CONTACT);
    }

    addContact(newContact) {
        this.handleHide();
        this.props.updateMyContacts(newContact);
    }

    form() {
        return (
            <div>
                <Form inline>
                    <FormGroup controlId="formInlineName" className='mr-2 ml-4'>
                        <ControlLabel>First Name</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} name='firstName' type="text" placeholder="Jane" />
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlineName" className='mr-2'>
                        <ControlLabel>Last Name</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} name='lastName' type="text" placeholder="Doe" />
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlineEmail" className='mr-2'>
                        <ControlLabel>Email</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} name='email' type="email" placeholder="jane.doe@example.com" />
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlineEmail" className='mr-2'>
                        <ControlLabel>Phone Number</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} name='number' type="text" placeholder="123-345-5432" />
                    </FormGroup>{' '}
                </Form>

                <br />

                <Form inline>
                    <FormGroup controlId="formInlineName" className='mr-2 ml-4'>
                        <ControlLabel>Address</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} name='addressOne' type="text" placeholder="123 main street" />
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlineName" className='mr-2'>
                        <ControlLabel>Address</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} name='addressTwo' type="text" placeholder="apt 4A" />
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlineEmail" className='mr-2'>
                        <ControlLabel>City</ControlLabel>{' '}
                        <FormControl onChange={this.handleInputChange} name='city' type="text" placeholder="San Francisco" />
                    </FormGroup>{' '}
                </Form>

                <br />

                <Form inline>
                    <FormGroup controlId="formInlineEmail" className='ml-4 mr-2'>
                        <ControlLabel>State</ControlLabel>{' '}
                        <FormControl type="text" onChange={this.handleInputChange} name='state' placeholder="CA" />
                    </FormGroup>{' '}
                    <FormGroup controlId="formInlineEmail" className='mr-2'>
                        <ControlLabel>Zip Code</ControlLabel>{' '}
                        <FormControl type="text" name='zip' onChange={this.handleInputChange} placeholder="94016" />
                    </FormGroup>{' '}
                </Form>

                <div className="form-row text-center">
                    <div className="col-12">
                        <Button
                            bsStyle="primary"
                            bsSize="large"
                            onClick={this.handleSubmit}
                            className='mt-3'
                        >
                            Add Contact
                    </Button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h3 className="text-center">Add a contact</h3>

                <div className="modal-container" style={{ height: 200 }}>
                    <div className="form-row text-center">
                        <div className="col-12">
                            <Button
                                bsStyle="primary"
                                bsSize="large"
                                onClick={() => this.setState({ show: true })}
                            >
                                Add Contact
                            </Button>
                        </div>
                    </div>
                    <Modal
                        show={this.state.show}
                        onHide={this.handleHide}
                        bsSize="large"
                        container={this}
                        aria-labelledby="contained-modal-title"
                    >
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title" className='text-center ml-0'>
                                Add Contact
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.form()}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleHide} bsStyle='danger'>Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default AddContact;

