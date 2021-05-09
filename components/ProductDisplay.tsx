import React from "react";
import {
  Image,
  ImageProps,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import WebView from "react-native-webview";

type Props = ImageProps & {
  name: string;
  description: string;
  price: string;
  short_description?: string;
  categories?: Array<{ id?: number; name?: string; slug?: string }>;
};

const ProductDisplay = (props: Props) => {
  return (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Image {...props} style={{ marginBottom: 5 }} />
      <View>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.price}>{props.price}€</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Description: </Text>
        <Text style={[styles.description]}>{props.description}</Text>
        {typeof props.short_description !== "undefined" ? (
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Short description:{" "}
          </Text>
        ) : null}
        {typeof props.short_description !== "undefined" ? (
          <Text>
            <Text style={styles.description}>{props.short_description}</Text>
          </Text>
        ) : null}
        {typeof props.categories !== "undefined" ? (
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Categories:{" "}
            </Text>
            {props.categories.map((category, index) => {
              return <Text key={index}>{category.name}</Text>;
            })}
          </View>
        ) : null}
      </View>
    </ScrollView>
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
