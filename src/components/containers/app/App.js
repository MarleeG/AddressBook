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
    console.log('App Props: ', this.props)
    this.state = {
      status: 0,
      contacts: this.props.contacts
    }
    console.log('App.js all contacts: ', this.state.contacts);

    setTimeout(() => {
      this.setState({
        status: 1
      })
    }, 3000);
  }

  componentWillMount() {
    console.log('Component Will Mount');
    console.log('----------------------------------');
  }

  componentDidMount() {
    console.log('Component Did Mount')
    console.log('----------------------------------');
  }

  componentWillReceiveProps(nextProps) {
    console.log('Component will receive props');
    console.log('nextProps', nextProps);
    console.log('----------------------------------');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should component Update');
    console.log('nextProps: ', nextProps);
    console.log('nextState: ', nextState);
    console.log('----------------------------------');
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('Component Will update');
    console.log('nextProps: ', nextProps);
    console.log('nextState: ', nextState);
    console.log('----------------------------------');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component Did Update');
    console.log('prevProps: ', prevProps);
    console.log('prevState: ', prevState);
    console.log('----------------------------------');
  }

  componentWillUnmount() {
    console.log('Component Will Unmount')
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
                <AddContact renderParent={this.render}/>
              </Col>
              <Col xs={6} md={4}>
                <ContactView />
              </Col>
              <Col xsHidden md={4}>
                <ListContacts renderParent={this.render}/>
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
