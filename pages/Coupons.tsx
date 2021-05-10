import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CouponDisplay from "../components/CouponDisplay";
import FloatingButton from "../components/FloatingButton";
import { get } from "../utils/apiCalls";

type Props = DrawerContentComponentProps & {};

const Coupons = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [coupons, setCoupons] = useState<any[]>([]);

  useEffect(() => {
    getCoupons();
  }, [isLoading]);
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getCoupons();
    }, [])
  );

  function getCoupons() {
    get("coupons").then((res) => {
      setCoupons(res?.data);
      setIsLoading(false);
    });
  }
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            {coupons.length === 0 ? (
              <View style={styles.container}>
                <Text>No coupons to show</Text>
              </View>
            ) : (
              coupons.map((coupon, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      props.navigation.navigate("CouponDetails", { coupon });
                    }}
                  >
                    <CouponDisplay
                      amount={coupon.amount}
                      minimum_amount={coupon.minimum_amount}
                      code={coupon.code}
                    />
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
          <FloatingButton
            icon="plus"
            bottom={15}
            right={15}
            onPress={() => {
              props.navigation.navigate("AddCoupon", { coupons });
            }}
          />
        </View>
      )}
    </View>
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

export default Coupons;
