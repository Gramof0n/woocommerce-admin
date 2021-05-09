import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import FloatingButton from "../components/FloatingButton";
import ProductDisplay from "../components/ProductDisplay";
import { get } from "../utils/apiCalls";
import { categoriesArray } from "../utils/mapCategoriesToArray";

type Props = DrawerContentComponentProps & {};

const Products = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    getProducts();
  }, [isLoading]);
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getProducts();
      setCategories();
    }, [])
  );
  function getProducts() {
    get("products?per_page=100").then((res) => {
      setProducts(res?.data);
      setIsLoading(false);
      //console.log("Duzina res " + res?.data.length);
    });
  }

  async function setCategories() {
    AsyncStorage.setItem("categories", JSON.stringify(await categoriesArray()));
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
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    props.navigation.navigate("ProductDetails", { product });
                  }}
                >
                  <ProductDisplay
                    name={product.name}
                    source={{
                      uri:
                        typeof product.images[0].src === "undefined"
                          ? "http://www.cre8a.biz/images/shop/placeholder-product-image-500x500.png"
                          : product.images[0].src,
                      width: 200,
                      height: 200,
                    }}
                    description={product.description}
                    price={product.price}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <FloatingButton
            bottom={15}
            right={15}
            icon="plus"
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
