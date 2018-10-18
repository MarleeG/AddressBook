import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
// import { Link, BrowserRouter as Router } from 'react-router-dom';


class ContactView extends Component {

    // componentWillReceiveProps(props){
    //     console.log('contact view :: ', props)
    // }
    renderSelectedContact() {
        //  const { firstName } = this.props.contact
        if (!this.props.contact) {
            return (
                <Alert bsStyle="info" className="text-center" onDismiss={this.handleDismiss}>
                    <p>
                        Select a contact for more info
                    </p>
                </Alert>
            )
        }

        return (
            <div>
                <div className="card border-info mb-3">
                    <div className="card-header">
                        <h5 className="card-title">
                            Contact Details
                        </h5>
                        <strong>{this.props.contact.firstName} {this.props.contact.lastName}</strong>
                    </div>
                    
                    <div className="card-body text-info">
                        <p className="card-text">Number: {this.props.contact.number}</p>
                        <p className="card-text">Email: {this.props.contact.email}</p>
                        <p className="card-text">Address: {this.props.contact.address.addressOne} {this.props.contact.address.addressTwo}</p>
                        <p className="card-text">City: {this.props.contact.address.city}</p>
                        <p className="card-text">State: {this.props.contact.address.state}</p>
                        <p className="card-text">Zip: {this.props.contact.address.zip}</p>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h3 className="text-center">View Contact</h3>
                {this.renderSelectedContact()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log('Active Contact: ', state.activeContact)

    return {
        contact: state.activeContact,
    }
}

export default connect(mapStateToProps)(ContactView);

