import React, { Component, useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
import ImageFactory from 'react-native-image-picker-form';
import * as ImagePicker from 'expo-image-picker';
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
    binImg: '',
  };

  constructor(props) {
    super(props);
    this.form = null;
    this.setForm = (element) => {
      this.form = element;
    };
    this.binImg = '';
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

  submitBin = () => {
    const response = this.form.getValue(); // use that ref to get the form value
    console.log('value: ', response);
    console.log(binImg);
  };

  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      binImg = result.uri;
      console.log(binImg);
    }
  }

  render() {
    return (
      <Container>
        <ButtonHeader history={this.props.history} title="Add Bin" />
        <Content contentContainerStyle={styles.formContainer}>
          <Form type={BinFormStructure} ref={this.setForm} />
          <Button title="Select Image" onPress={this.pickImage}></Button>
          <Button title="Submit Form" onPress={this.submitBin} />
        </Content>
      </Container>
    );
  }
}

var binImg = '';

const BinFormStructure = t.struct({
  location: t.String,
  trash: t.Boolean,
  recycling: t.Boolean,
  compost: t.Boolean,
});

const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
  },
  submitButton: {
    margin: 10,
  },
});
