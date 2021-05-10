import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import { Formik } from "formik";
import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  Platform,
  ActivityIndicator,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ComboBox from "../components/ComboBox";
import InputField from "../components/InputField";
import { post } from "../utils/apiCalls";

type Props = DrawerContentComponentProps<DrawerContentOptions> & {};

const AddProduct = (props: Props) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("categories").then((res) => {
        setCategories(JSON.parse(res!));
      });
    }, [])
  );
  return (
    <ScrollView style={{ padding: 15 }}>
      <Formik
        initialValues={{
          name: "",
          categories: [] as any,
          type: "simple",
          regular_price: "",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi`,
          short_description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
          images: [
            {
              src:
                "http://www.cre8a.biz/images/shop/placeholder-product-image-500x500.png",
            },
          ],
        }}
        onSubmit={async (values, { setErrors }) => {
          setIsLoading(true);
          let good = true;
          if (values.name === "") {
            setErrors({ name: "Name must not be empty" });
            good = false;
          } else if (
            parseInt(values.regular_price) <= 0 ||
            !isFinite(parseInt(values.regular_price))
          ) {
            setErrors({ regular_price: "Price must a number larger than 0" });
            good = false;
          }

          if (good) {
            console.log(values);
            const res = await post("products", values);
            setIsLoading(false);
            if (Platform.OS === "android") {
              ToastAndroid.show("Successfully added", ToastAndroid.SHORT);
            }

            props.navigation.goBack();
            console.log(res);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <InputField
              name="name"
              label="Name:"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            <ComboBox
              name="type"
              label="Type: "
              parameters={[{ label: "Simple", value: "simple" }]}
              onValueChange={(value, _) => {
                values.type = value.toString();
              }}
              selectedValue={values.type}
            />
            <ComboBox
              name="categories"
              label="Categories: "
              parameters={categories}
              onValueChange={(value, _) => {
                console.log(value);
                const val = { id: value };
                values.categories[0] = val;
              }}
              selectedValue={values.categories[0]}
            />
            <InputField
              name="regular_price"
              label="Price:"
              keyboardType="decimal-pad"
              onChangeText={handleChange("regular_price")}
              onBlur={() => {
                handleBlur("regular_price");
              }}
            />
            <InputField
              name="description"
              label="Description:"
              multiline
              onChangeText={handleChange("description")}
              onBlur={() => {
                handleBlur("description");
              }}
            />
            <InputField
              name="short_description"
              label="Short description:"
              multiline
              onChangeText={handleChange("short_description")}
              onBlur={() => {
                handleBlur("short_description");
              }}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleSubmit();
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{ color: "white" }}>Add</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#284785",
    padding: 7,
    maxWidth: 70,
    alignItems: "center",
  },
  error: {
    color: "red",
    fontWeight: "300",
    marginBottom: 5,
    fontSize: 12,
  },
});

export default AddProduct;
