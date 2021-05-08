import React from "react";
import { Image, ImageProps, StyleSheet, View, Text } from "react-native";
import WebView from "react-native-webview";

type Props = ImageProps & {
  name: string;
  description?: string;
  price?: string;
};

const ProductDisplay = (props: Props) => {
  return (
    <View style={styles.wrapper}>
      <Image {...props} style={{ marginBottom: 5 }} />
      <View style={{ alignSelf: "center" }}>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.price}>{props.price}€</Text>
        <Text style={styles.description}>{props.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flex: 1,
    marginBottom: 10,
    backgroundColor: "white",
    padding: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  price: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },

  description: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default ProductDisplay;
