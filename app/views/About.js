import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Text, View } from "native-base";

import { BackHeader, Hyperlink } from "../components/Components";

function About(props) {
  const { history } = props;

  return (
    <Container>
      <BackHeader history={history} />
      <Content contentContainerStyle={styles.content}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>
            CloseCans is an app created by{" "}
            <Hyperlink underline to="https://github.com/keshprad">
              @keshprad
            </Hyperlink>
            ,{" "}
            <Hyperlink underline to="https://github.com/ddanj">
              @ddanj
            </Hyperlink>
            ,{" "}
            <Hyperlink underline to="https://github.com/ammuiyer">
              @ammuiyer
            </Hyperlink>{" "}
            as a submission for LAHacks! {"\n\n"}
            We want this project to promote proper disposal of waste and hope to
            encourage the community to add trash bins.
          </Text>
          <View style={styles.socialsContainer}>
            <Hyperlink to="https://github.com/keshprad/CloseCans">
              GitHub
            </Hyperlink>
            <Text> | </Text>
            <Hyperlink to="https://devpost.com">Devpost</Hyperlink>
            <Text> | </Text>
            <Hyperlink to="https://lahacks.com">LAHacks</Hyperlink>
          </View>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  socialsContainer: {
<<<<<<< HEAD
    flexDirection: "row",
=======
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
>>>>>>> 77907e9d390f5e3b1c2a8fed9db37dc9f6da9ba0
  },
  text: {
    textAlign: "center",
  },
});

export default About;
