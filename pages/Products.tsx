import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FloatingButton from "../components/FloatingButton";
import ProductDisplay from "../components/ProductDisplay";
import { get } from "../utils/apiCalls";

type Props = DrawerContentComponentProps & {};

const Products = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      console.log("Report");
      getProducts();
    }, [])
  );

  async function getProducts() {
    const res = await get("products?per_page=100");
    setIsLoading(false);
    console.log("Duzina res " + res?.data.length);
    setProducts(res?.data);
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
            {products.map((product, index) => {
              return (
                <ProductDisplay
                  key={index}
                  name={product.name}
                  source={{
                    uri: product.images[0].src,
                    width: 200,
                    height: 200,
                  }}
                  description={product.description}
                  price={product.price}
                />
              );
            })}
          </ScrollView>
          <FloatingButton
            onPress={() => {
              props.navigation.navigate("AddProduct");
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

export default Products;
