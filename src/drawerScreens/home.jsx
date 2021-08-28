import React from "react";
import { View } from "react-native";
import { Headers } from "../components";
const screen = ({ showMenu = false, setShowMenu = () => {} }) => {
  return (
    <View style={{ flex: 1 }}>
      <Headers.header1
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        title={"Home"}
      />
      <View style={{flex:1,}}></View>
    </View>
  );
};
export default screen;
