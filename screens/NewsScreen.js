import * as React from "react";
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Text,
  Button
} from "native-base";
import HotNewsScreen from "./HotNewsScreen"

export default class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  

  render() {
    return (
      <Container>
        <Header hasTabs style={{height: 20}} />
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <Text>Tin nổi bật</Text>
              </TabHeading>
            }
          >
            <HotNewsScreen onPress={this.readNews} navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Other</Text>
              </TabHeading>
            }
          >
            <></>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

NewsScreen.navigationOptions = {
  header: null
};
