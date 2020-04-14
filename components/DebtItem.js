import * as React from "react";
import { ListItem, Text, Left, Right } from "native-base";

export default class DebtItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <ListItem>
        <Left>
          <Text style={{ fontSize: 14 }}>{data.noiDung}{" ("+data.trangThai+")"} :</Text>
        </Left>
        <Right>
          <Text style={{ fontSize: 14 }}>{data.congNo}</Text>
        </Right>
      </ListItem>
    );
  }
}