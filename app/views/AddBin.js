import React, { useEffect, useState } from 'react';
import { Container, Content, Form, Input, Item, Label } from 'native-base';

// My Imports
import { ButtonHeader } from '../components/Components';
import { _getLocation } from '../helpers/Helper';

function AddBin(props) {
  const [location, setLocation] = useState({});
  const [errMsg, setErrMsg] = useState('');
  const [strLocation, setStrLocation] = useState('Loading...');
  const { history } = props;

  useEffect(() => {
    (async () => {
      // Get user's location
      const { location, errMsg } = await _getLocation();

      // Set state
      setStrLocation(
        `(${location.coords.latitude}, ${location.coords.longitude})`
      );
      setErrMsg(errMsg);
      setLocation(location);
    })();
  }, []);

  return (
    <Container>
      <ButtonHeader history={history} title="Add Bin" />
      <Content>
        <Form>
          <Form>
            <Item stackedLabel>
              <Label>Current Location</Label>
              <Input placeholder={strLocation} disabled />
            </Item>
            <Item last stackedLabel>
              <Label></Label>
              <Input placeholder="Password" />
            </Item>
          </Form>
        </Form>
      </Content>
    </Container>
  );
}

export default AddBin;
