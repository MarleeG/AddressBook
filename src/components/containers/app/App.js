import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { renderingContacts } from '../../../actions';

import './App.css';
import Header from '../../header/header';
import AddContact from '../add_contact/add_contact';
import ContactView from '../contact_view/contact_view';
import ListContacts from '../list_contacts/list_contacts';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateContacts = this.updateContacts.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.editContact = this.editContact.bind(this);

    this.state = {
      contacts: [],
      initialData: 0
    }
  }

  componentDidMount() {
    this.updateContacts();
    
  }

  deleteContact(data) {
    var index = this.state.contacts.indexOf(data);
    var newUpdatedContacts = [];
    this.state.contacts.forEach((element, i) => {
      if (i !== index) {
        newUpdatedContacts.push(element);
      }
    })
    this.setState({
      contacts: newUpdatedContacts
    })
  }

  updateContacts(data) {
    if (this.state.initialData === 0) {
      this.setState({
        contacts: this.state.contacts.concat(this.props.contacts),
        initialData: this.state.initialData + 1
      });
    } else if (this.state.initialData > 0 && data) {
      this.setState({
        contacts: [data, ...this.state.contacts]
      });
    }
  }

  editContact(data, index) {
    const editedContact = [];
    this.state.contacts.forEach((element) => {
      editedContact.push(element);
    });

    editedContact[index] = data;

    this.setState({
      contacts: editedContact
    })
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>

        <div>
          <Grid>
            <Row className="show-grid">
              <Col xs={6} md={4}>
                <AddContact updateMyContacts={this.updateContacts} contacts={this.state.contacts} />
              </Col>
              <Col xs={6} md={4}>
                <ContactView />
              </Col>
              <Col xsHidden md={4}>
                <ListContacts editContact={this.editContact} deleteContact={this.deleteContact} contacts={this.state.contacts} />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contacts: state.contacts,
    renderContacts: state.renderContacts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ renderingContacts: renderingContacts }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
