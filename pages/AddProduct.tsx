import { Formik } from "formik";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import InputField from "../components/InputField";

interface Props {}

const AddProduct = (props: Props) => {
  return (
    <ScrollView>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <InputField name="name" label="Name:" />
            <InputField
              name="price"
              label="Price:"
              keyboardType="decimal-pad"
            />
            <InputField name="description" label="Description:" multiline />
            <InputField
              name="shortDescription"
              label="Short description:"
              multiline
            />
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
});

export default AddProduct;
