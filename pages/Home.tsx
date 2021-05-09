import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Coupons from "./Coupons";
import Products from "./Products";
import IconOct from "react-native-vector-icons/Feather";
import IconFont from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomDrawer } from "../components/CustomDrawer";
import { useFocusEffect } from "@react-navigation/core";
import { categoriesArray } from "../utils/mapCategoriesToArray";

type Props = DrawerContentComponentProps<DrawerContentOptions> & {};

const Home = (props: Props) => {
  useEffect(() => {
    isLoggedIn();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        isLoggedIn();
      };
    }, [isLoggedIn])
  );

  async function isLoggedIn() {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedin");

    if (!JSON.parse(isLoggedIn!)) {
      props.navigation.navigate("Login");
    }
  }
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: true }}
      drawerType="slide"
      drawerContent={(props) => {
        return <CustomDrawer {...props} />;
      }}
    >
      <Drawer.Screen
        name="Products"
        component={Products}
        options={{
          drawerIcon: (props) => {
            return <IconOct name="box" size={20} />;
          },
        }}
      />
      <Drawer.Screen
        name="Coupons"
        component={Coupons}
        options={{
          drawerIcon: () => {
            return <IconFont name="sticky-note-o" size={20} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
