import React, { Component } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Container, Header, Left, Icon, View } from "native-base";
import { DrawerActions } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

export default class MapScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <View style={{backgroundColor: "#fff", height: 18 }}></View>
        <Header style={{backgroundColor: "#fff", height: 40,  flexDirection: "row"}}>
            <TouchableOpacity
              style={{flex: 1,marginLeft: 10, marginTop: 10}}
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <Icon name="menu" />
            </TouchableOpacity>
        </Header>
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            region={{
              latitude: 20.99574,
              longitude: 105.865596,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121
            }}
          >
            <Marker
              coordinate={{
                latitude: 20.99574,
                longitude: 105.865596
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
    height: Dimensions.get("window").height
  }
});
