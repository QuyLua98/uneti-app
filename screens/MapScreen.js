import React, { Component } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Left,
  View,
  Right,
  Body,
  Title,
  Button,
  Icon,
} from "native-base";
import MapView, { Marker } from "react-native-maps";
import { DrawerActions } from "@react-navigation/native";

export default class MapScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())}}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Bản đồ</Title>
          </Body>
          <Right></Right>
        </Header>
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            region={{
              latitude: 20.99574,
              longitude: 105.865596,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            <Marker
              coordinate={{
                latitude: 20.99574,
                longitude: 105.865596,
              }}
              title="Cơ sở 1"
            />
          </MapView>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
