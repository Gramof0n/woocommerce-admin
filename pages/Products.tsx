import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ProductDisplay from "../components/ProductDisplay";
import { get } from "../utils/apiCalls";

const Products = () => {
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
    const res = await get("products");
    setIsLoading(false);
    //console.log(res?.data);

    setProducts(res?.data);
  }
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          {products.map((product, index) => {
            return (
              <ProductDisplay
                key={index}
                name={product.name}
                source={{ uri: product.images[0].src, width: 200, height: 200 }}
                description={product.description}
                price={product.price}
              />
            );
          })}
        </ScrollView>
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
