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
const axios = require('axios');

// My Imports
import { ButtonHeader, CheckButton } from '../components/Components';
import { _getLocation, backend_domain } from '../helpers/Helper';

const Form = t.form.Form;

export default class AddBin extends Component {
  state = {
    location: {},
    errMsg: '',
    formValues: { location: 'Loading...' },
    binImg: '',
  };

  constructor(props) {
    super(props);
    this.form = null;
    this.setForm = (element) => {
      this.form = element;
    };
  }

  async componentDidMount() {
    const { location, errMsg } = await _getLocation();

    // Set state
    this.setState({
      formValues: {
        location: `(${location.coords.latitude}, ${location.coords.longitude})`,
      },
      errMsg,
      location,
    });
  }

  submitBin = async () => {
    const formData = this.form.getValue(); // use that ref to get the form value
    const usr_loc = {
      latitude: this.state.location.coords.latitude,
      longitude: this.state.location.coords.longitude,
    };
    const bin_types = {
      trash: formData.trash,
      recycling: formData.recycling,
      compost: formData.compost,
    };
    // const res = await axios.post(`${backend_domain}/add-bin`, {
    //   usr_loc: usr_loc,
    //   bin_types: bin_types,
    // });
    this.props.history.push('/');
  };

  render() {
    return (
      <Container>
        <ButtonHeader history={this.props.history} title="Add Bin" />
        <Content contentContainerStyle={styles.formContainer}>
          <Form
            type={BinFormStructure}
            ref={this.setForm}
            options={formOptions}
            value={this.state.formValues}
          />
          <Button title="Submit Form" onPress={this.submitBin} />
        </Content>
      </Container>
    );
  }
}

const BinFormStructure = t.struct({
  location: t.String,
  trash: t.Boolean,
  recycling: t.Boolean,
  compost: t.Boolean,
});

const formOptions = {
  fields: {
    location: {
      editable: false,
    },
  },
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
  },
  submitButton: {
    margin: 10,
  },
});
