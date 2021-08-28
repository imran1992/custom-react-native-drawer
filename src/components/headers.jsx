import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { Images } from "../constants";
const header1 = ({ setShowMenu = () => {}, showMenu = false, title = "" }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal:20,
        height: 56,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        onPress={setShowMenu}
        style={{
          width: "15%",
          height: 20,
        }}
      >
        <Image
          source={showMenu ? Images.close : Images.menu}
          style={{
            width: 20,
            height: 20,
            tintColor: "black",
          }}
        />
      </TouchableOpacity>

      {title !== "" && (
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 18,
            color: "black",
          }}
        >
          {title}
        </Text>
      )}
      <View
        style={{
          width: "15%",
          height: 20,
          flexDirection: "row-reverse",
        }}
      />
    </View>
  );
};
export default { header1 };
