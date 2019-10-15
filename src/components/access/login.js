import React from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import Auth from '../../lib/Auth';

class Login extends React.Component {
  constructor() {
    super();
    this.state = { credentials: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const credentials = { ...this.state.credentials, [e.target.name]: e.target.value };
    this.setState({ credentials, error: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post('/api/login', this.state.credentials)
      .then( res => {
        Auth.setToken(res.data.token);

        this.props.history.push('/');
      })
      .catch(() => this.setState({error: 'Invalid credentials'}));
  }

  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log in
        </Button>
      </Form>
    );
  }
}

export default Login;
