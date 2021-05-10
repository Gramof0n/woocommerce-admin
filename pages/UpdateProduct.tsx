import AsyncStorage from "@react-native-async-storage/async-storage";
import { ItemValue } from "@react-native-picker/picker/typings/Picker";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import {
  DrawerActions,
  StackActions,
  useFocusEffect,
} from "@react-navigation/native";
import { Formik } from "formik";
import React, { useCallback, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ComboBox from "../components/ComboBox";
import InputField from "../components/InputField";
import { post, update } from "../utils/apiCalls";

type Props = DrawerContentComponentProps<DrawerContentOptions> & {
  route: any;
};

const UpdateProduct = (props: Props) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const product = props.route.params.product;

  console.log("ID " + product.id);
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
          name: product.name,
          categories: product.categories,
          type: product.type,
          regular_price: product.regular_price,
          description: product.description,
          short_description: product.short_description,
          images: product.images,
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
            const res = await update(`products/${product.id}`, values);
            setIsLoading(false);
            if (Platform.OS === "android") {
              ToastAndroid.show("Successfully updated", ToastAndroid.SHORT);
            }

            props.navigation.navigate("Products");
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
                console.log(values.categories[0].id);
                values.categories[0] = { id: value };
              }}
              selectedValue={values.categories[0].id}
            />
            <InputField
              name="regular_price"
              label="Price:"
              keyboardType="decimal-pad"
              onChangeText={handleChange("regular_price")}
              onBlur={() => {
                handleBlur("regular_price");
              }}
              value={values.regular_price}
            />
            <InputField
              name="description"
              label="Description:"
              multiline
              onChangeText={handleChange("description")}
              onBlur={() => {
                handleBlur("description");
              }}
              value={values.description}
            />
            <InputField
              name="short_description"
              label="Short description:"
              multiline
              onChangeText={handleChange("short_description")}
              onBlur={() => {
                handleBlur("short_description");
              }}
              value={values.short_description}
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
                <Text style={{ color: "white" }}>Update</Text>
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

export default UpdateProduct;
