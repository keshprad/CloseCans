import React, { Component, useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
import {
  Container,
  Content,
  Input,
  Item,
  Label,
  Text,
  View,
} from 'native-base';

// My Imports
import { ButtonHeader, CheckButton } from '../components/Components';
import { _getLocation } from '../helpers/Helper';

const Form = t.form.Form;

export default class AddBin extends Component {
  state = {
    location: {},
    errMsg: '',
    strLocation: 'Loading...',
  };

  constructor(props) {
    super(props);
    this.form = null;
    this.setForm = (element) => {
      this.form = element;
    };

    this.submitBin = () => {
      const response = this.form.getValue(); // use that ref to get the form value
      console.log('value: ', response);
    };
  }

  async componentDidMount() {
    const { location, errMsg } = await _getLocation();

    // Set state
    this.setState({
      strLocation: `(${location.coords.latitude}, ${location.coords.longitude})`,
      errMsg,
      location,
    });
  }

  render() {
    return (
      <Container>
        <ButtonHeader history={this.props.history} title="Add Bin" />
        <Content contentContainerStyle={styles.formContainer}>
          <Form type={Bin} ref={this.setForm} />
          <Button title="Add Bin" onPress={this.submitBin} />
        </Content>
      </Container>
    );
  }
}

const Bin = t.struct({
  location: t.String,
  username: t.String,
  password: t.String,
  terms: t.Boolean,
});

const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
  },
  submitButton: {
    margin: 10,
  },
});

// <Form>
//   <Item stackedLabel>
//     <Label>Current Location</Label>
//     <Input placeholder={strLocation} disabled />
//   </Item>
//   <Item stackedLabel>
//     <Label>Types of bins:</Label>
//     <CheckButton btnDesc="Garbage" />
//     <CheckButton btnDesc="Recycling" />
//     <CheckButton btnDesc="Compost" />
//   </Item>
//   <Button block style={styles.submitButton} action="Submit">
//     <Text>Submit</Text>
//   </Button>
// </Form>;
