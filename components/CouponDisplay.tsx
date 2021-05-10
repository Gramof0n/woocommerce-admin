import React from "react";
import { Text, View, StyleSheet } from "react-native";

type Props = {
  code: string;
  discount_type?: string;
  amount: string;
  individual_use?: boolean;
  exclude_sale_items?: boolean;
  minimum_amount: string;
};

const CouponDisplay = (props: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Code: </Text>
      <Text style={styles.price}>{props.code}</Text>
      <Text style={styles.title}>Amount available: </Text>
      <Text style={styles.price}>{props.amount}</Text>
      <Text style={styles.title}>Minimum amount spent: </Text>
      <Text style={styles.price}>{props.minimum_amount}€</Text>
      {typeof props.discount_type !== "undefined" ? (
        <View>
          <Text style={styles.title}>Discount type: </Text>
          <Text style={styles.price}>{props.discount_type}</Text>
        </View>
      ) : null}

      {typeof props.individual_use !== "undefined" ? (
        <View>
          <Text style={styles.title}>Individual use: </Text>
          <Text style={styles.price}>
            {JSON.stringify(props.individual_use)}
          </Text>
        </View>
      ) : null}

      {typeof props.exclude_sale_items !== "undefined" ? (
        <View>
          <Text style={styles.title}>Exclude sale items: </Text>
          <Text style={styles.price}>
            {JSON.stringify(props.exclude_sale_items)}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    marginBottom: 10,
    backgroundColor: "white",
    padding: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  price: {
    fontSize: 16,
    marginBottom: 5,
  },

  description: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default CouponDisplay;
