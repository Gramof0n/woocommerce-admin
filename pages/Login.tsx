import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import InputField from "../components/InputField";

interface Props {
  navigation: any;
}

const Login = (props: Props) => {
  useEffect(() => {
    AsyncStorage.getItem("isLoggedin").then((res) => {
      console.log(JSON.parse(res!));
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WP-Admin</Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={({ username, password }, { setErrors }) => {
          let good = true;
          if (username.toLowerCase() !== "admin") {
            setErrors({ username: "Wrong username" });
            good = false;
          } else if (password != "1002447275") {
            setErrors({ password: "Wrong password" });
            good = false;
          }

          if (good) {
            AsyncStorage.setItem("isLoggedin", JSON.stringify(true));
            props.navigation.dispatch(StackActions.replace("Home"));
            props.navigation.navigate("Home");
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <InputField
              name="username"
              label="Username:"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            <InputField
              name="password"
              label="Password:"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
              keyboardType="number-pad"
            />

            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
              style={styles.button}
            >
              <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  button: {
    marginTop: 10,
    backgroundColor: "#284785",
    padding: 7,
    maxWidth: 70,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default Login;
