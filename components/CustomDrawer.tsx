import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StackActions } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

type Props = DrawerContentComponentProps<DrawerContentOptions> & {};

export const CustomDrawer = (props: Props) => {
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        display: "flex",
        flex: 1,
      }}
      {...props}
    >
      <DrawerItemList {...props} />
      <View
        style={{
          display: "flex",
          flexGrow: 1,
          flex: 1,
          flexDirection: "column-reverse",
        }}
      >
        <DrawerItem
          label="Logout"
          onPress={async () => {
            props.navigation.closeDrawer();
            await AsyncStorage.setItem("isLoggedin", JSON.stringify(false));
            props.navigation.dispatch(StackActions.replace("Login"));
          }}
          icon={({ focused, size, color }) => {
            return <Icon name="logout" size={20} />;
          }}
          style={{}}
        />
      </View>
    </DrawerContentScrollView>
  );
};
