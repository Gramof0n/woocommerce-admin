import "./shim.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import UpdateProduct from "./pages/UpdateProduct";
import AddCoupon from "./pages/AddCoupon";
import CouponDetails from "./pages/CouponDetails";
import UpdateCoupon from "./pages/UpdateCoupon";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{ headerShown: true, title: "Add a new product" }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ headerShown: true, title: "Product details" }}
        />
        <Stack.Screen
          name="UpdateProduct"
          component={UpdateProduct}
          options={{ headerShown: true, title: "Update a product" }}
        />
        <Stack.Screen
          name="AddCoupon"
          component={AddCoupon}
          options={{ headerShown: true, title: "Add a new coupon" }}
        />
        <Stack.Screen
          name="CouponDetails"
          component={CouponDetails}
          options={{ headerShown: true, title: "Coupon details" }}
        />
        <Stack.Screen
          name="UpdateCoupon"
          component={UpdateCoupon}
          options={{ headerShown: true, title: "Update a coupon" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
