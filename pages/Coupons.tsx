import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Coupons = () => {
  useFocusEffect(
    React.useCallback(() => {
      console.log("Kupon");
    }, [])
  );
  return (
    <View style={styles.container}>
      <Text>Coupons</Text>
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
