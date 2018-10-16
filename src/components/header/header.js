import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="text-center">Address Book</h1>
                </Jumbotron>
            </div>
        )
    }
}

export default Header;