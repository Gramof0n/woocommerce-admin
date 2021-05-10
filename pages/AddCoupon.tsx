import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ComboBox from "../components/ComboBox";
import InputField from "../components/InputField";
import { post } from "../utils/apiCalls";

type Props = DrawerContentComponentProps<DrawerContentOptions> & {
  route: any;
};

const AddCoupon = (props: Props) => {
  const coupons = props.route.params.coupons;
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ScrollView style={{ padding: 15 }}>
      <Formik
        initialValues={{
          code: "",
          discount_type: "fixed_cart",
          amount: "",
          individual_use: true,
          exclude_sale_items: true,
          minimum_amount: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          setIsLoading(true);
          let good = true;

          for (let c of coupons) {
            if (c.code == values.code) {
              good = false;
              return setErrors({ code: "Code already exists" });
            }
          }

          if (values.code === "") {
            good = false;
            setErrors({ code: "Code must not be empty" });
          } else if (values.code == coupons.code) {
            good = false;
            console.log(coupons.code);
            setErrors({ code: "Coupon code already exists" });
          } else if (
            parseInt(values.amount) <= 0 ||
            !isFinite(parseInt(values.amount))
          ) {
            good = false;
            setErrors({ amount: "Amount must be a number larger than 0" });
          } else if (
            parseInt(values.minimum_amount) <= 0 ||
            !isFinite(parseInt(values.minimum_amount))
          ) {
            good = false;
            setErrors({
              minimum_amount: "Minimum amount must be a number larger than 0",
            });
          }

          if (good) {
            const res = await post("coupons", values);
            setIsLoading(false);
            if (Platform.OS === "android") {
              ToastAndroid.show("Successfully added", ToastAndroid.SHORT);
            }

            props.navigation.goBack();
          }
        }}
      >
        {({ handleChange, handleSubmit, handleBlur, values }) => (
          <View>
            <InputField
              name="code"
              label="Code: "
              onChangeText={handleChange("code")}
              onBlur={handleBlur("code")}
              value={values.code}
            />
            <ComboBox
              name="discount_type"
              label="Discount type: "
              parameters={[
                { label: "Percent", value: "percent" },
                { label: "Fixed cart", value: "fixed_cart" },
                { label: "Fixed product", value: "fixed_product" },
              ]}
              onValueChange={(value, _) => {
                values.discount_type = value.toString();
              }}
              selectedValue={values.discount_type}
            />
            <InputField
              name="amount"
              label="Amount of coupons: "
              keyboardType="numeric"
              onChangeText={handleChange("amount")}
              onBlur={handleBlur("amount")}
              value={values.amount}
            />

            <ComboBox
              name="individual_use"
              label="Individual use: "
              parameters={[
                { label: "True", value: true },
                { label: "False", value: false },
              ]}
              onValueChange={(value, _) => {
                values.individual_use = JSON.parse(value.toString());
              }}
              selectedValue={JSON.stringify(values.individual_use)}
            />
            <ComboBox
              name="exclude_sale_items"
              label="Exclude sale items: "
              parameters={[
                { label: "True", value: true },
                { label: "False", value: false },
              ]}
              onValueChange={(value, _) => {
                values.exclude_sale_items = JSON.parse(value.toString());
              }}
              selectedValue={JSON.stringify(values.exclude_sale_items)}
            />
            <InputField
              name="minimum_amount"
              label="Minimum amount spent: "
              keyboardType="numeric"
              onChangeText={handleChange("minimum_amount")}
              onBlur={handleBlur("minimum_amount")}
              value={values.minimum_amount}
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

export default AddCoupon;
