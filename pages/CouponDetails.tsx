import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import React from "react";
import { Alert, Platform, ToastAndroid, View } from "react-native";
import CouponDisplay from "../components/CouponDisplay";
import FloatingButton from "../components/FloatingButton";
import { remove } from "../utils/apiCalls";

type Props = DrawerContentComponentProps<DrawerContentOptions> & {
  route: any;
};

const CouponDetails = (props: Props) => {
  const coupon = props.route.params.coupon;
  console.log(coupon.id);
  return (
    <View style={{ flex: 1 }}>
      <CouponDisplay
        amount={coupon.amount}
        minimum_amount={coupon.minimum_amount}
        code={coupon.code}
        discount_type={coupon.discount_type}
        exclude_sale_items={coupon.exclude_sale_items}
      />
      <FloatingButton
        icon="update"
        bottom={15 * 5}
        right={15}
        onPress={() => {
          props.navigation.navigate("UpdateCoupon", { coupon });
        }}
      />
      <FloatingButton
        icon="trash-can-outline"
        bottom={15}
        right={15}
        onPress={() => {
          Alert.alert(
            "Delte coupon",
            "Are you sure you want to delete this coupon?",
            [
              {
                text: "Yes",
                onPress: async () => {
                  const res = await remove(`coupons/${coupon.id}`);
                  if (res) {
                    if (Platform.OS === "android") {
                      ToastAndroid.show(
                        "Deleted successfully",
                        ToastAndroid.SHORT
                      );
                    }
                    props.navigation.goBack();
                  } else {
                    if (Platform.OS === "android") {
                      ToastAndroid.show("Couldn't delete", ToastAndroid.SHORT);
                    }
                  }
                },
              },
              {
                text: "No",
                style: "cancel",
              },
            ]
          );
        }}
      />
    </View>
  );
};

export default CouponDetails;
