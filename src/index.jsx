import React, { useRef, useState } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Animated,
  Image,
  Text,
  View,
} from "react-native";
import { Images } from "./constants";
//---------
import HomeScreen from "./drawerScreens/home";
import ProfileScreen from "./drawerScreens/profile";
import SettingScreen from "./drawerScreens/settings";
import NotificationScreen from "./drawerScreens/notifications";
import SearchScreen from "./drawerScreens/search";
//---------

const App = () => {
  const [currentTab, setCurrentTab] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  const ToggleIt = (justClose = false) => {
    Animated.timing(scaleValue, {
      toValue: justClose ? 1 : showMenu ? 1 : 0.88,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(offsetValue, {
      toValue: justClose ? 0 : showMenu ? 0 : 230,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(closeButtonOffset, {
      toValue: justClose ? 0 : !showMenu ? -30 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setShowMenu(justClose ? false : !showMenu);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: "flex-start", padding: 15 }}>
        <Pressable
          onPress={() => {
            ToggleIt(true);
            setCurrentTab("Profile");
          }}
        >
          <Image
            source={Images.profile}
            style={{
              width: 60,
              height: 60,
              borderRadius: 10,
              marginTop: 8,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              marginTop: 20,
            }}
          >
            Jenna Ezarik
          </Text>
          <Text
            style={{
              marginTop: 6,
              color: "white",
            }}
          >
            View Profile
          </Text>
        </Pressable>
        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {["Home", "Search", "Notifications", "Settings"].map(
            (item, index) => (
              <TabButton
                key={"_DrawerBtn" + index}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                title={item}
                image={Images[item.toLowerCase()]}
                closeIt={() => {
                  ToggleIt(true);
                }}
              />
            )
          )}
        </View>
        <TabButton
          key={"_DrawerBtnForLogOut"}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          title="LogOut"
          image={Images.logout}
        />
      </View>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "white",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          paddingVertical: 20,
          borderRadius: showMenu ? 15 : 0,
          transform: [{ scale: scaleValue }, { translateX: offsetValue }],
        }}
      >
        <Animated.View
          style={{
            flex:1,
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          }}
        >
          {currentTab === "Home" && (
            <HomeScreen
              setShowMenu={() => {
                ToggleIt();
              }}
              showMenu={showMenu}
            />
          )}
          {currentTab === "Search" && (
            <SearchScreen
              setShowMenu={() => {
                ToggleIt();
              }}
              showMenu={showMenu}
            />
          )}
          {currentTab === "Notifications" && (
            <NotificationScreen
              setShowMenu={() => {
                ToggleIt();
              }}
              showMenu={showMenu}
            />
          )}
          {currentTab === "Settings" && (
            <SettingScreen
              setShowMenu={() => {
                ToggleIt();
              }}
              showMenu={showMenu}
            />
          )}
          {currentTab === "Profile" && (
            <ProfileScreen
              setShowMenu={() => {
                ToggleIt();
              }}
              showMenu={showMenu}
            />
          )}
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

// For multiple Buttons...
const TabButton = ({
  currentTab,
  setCurrentTab,
  title,
  image,
  closeIt = () => {},
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (title == "LogOut") {
          // Do your Stuff...
        } else {
          setCurrentTab(title);
          closeIt();
        }
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          backgroundColor: currentTab == title ? "white" : "transparent",
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15,
        }}
      >
        <Image
          source={image}
          style={{
            width: 25,
            height: 25,
            tintColor: currentTab == title ? "#5359D1" : "white",
          }}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            paddingLeft: 15,
            color: currentTab == title ? "#5359D1" : "white",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5359D1",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});

export default App;
