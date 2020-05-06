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
  Footer,
  FooterTab,
  Text,
  Content,
  Card,
} from "native-base";
import MapView, { Marker, Callout } from "react-native-maps";
import { DrawerActions } from "@react-navigation/native";

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      address: [
        { name: "Cơ sở Minh Khai", latitude: 20.99574, longitude: 105.865596 },
        { name: "Cơ sở Lĩnh Nam", latitude: 20.980320, longitude: 105.876209 },
        { name: "Cơ sở Nam Định", latitude: 20.430520, longitude: 106.171630 },
      ],
    };
  }

  onCarouselItemChange = (index) => {
    let location = this.state.address[index];

    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    });

    this.state.markers[index].showCallout();
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Bản đồ</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <View style={styles.container}>
            <MapView
              style={styles.mapStyle}
              ref={(map) => (this._map = map)}
              region={{
                latitude: 20.99574,
                longitude: 105.865596,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              {this.state.address.map((marker, index) => (
                <Marker
                  key={marker.name}
                  ref={(ref) => (this.state.markers[index] = ref)}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                >
                  <Callout>
                    <Text>{marker.name}</Text>
                  </Callout>
                </Marker>
              ))}
            </MapView>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => this.onCarouselItemChange(0)}>
              <Text>Cs. Minh Khai</Text>
            </Button>
            <Button onPress={() => this.onCarouselItemChange(1)}>
              <Text>Cs. Lĩnh Nam</Text>
            </Button>
            <Button onPress={() => this.onCarouselItemChange(2)}>
              <Text>Cs. Nam Định</Text>
            </Button>
          </FooterTab>
        </Footer>
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
