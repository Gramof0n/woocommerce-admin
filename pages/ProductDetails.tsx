import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
  ToastAndroid,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FloatingButton from "../components/FloatingButton";
import ProductDisplay from "../components/ProductDisplay";
import { remove } from "../utils/apiCalls";

type Props = DrawerContentComponentProps<DrawerContentOptions> & {
  route: any;
};

const ProductDetails = (props: Props) => {
  const product = props.route.params.product;
  return (
    <View style={{ flex: 1 }}>
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
        short_description={product.short_description}
        categories={product.categories}
      />

      <FloatingButton
        icon="update"
        bottom={15 * 5}
        right={15}
        onPress={() => {
          props.navigation.navigate("UpdateProduct", { product });
        }}
      />
      <FloatingButton
        icon="trash-can-outline"
        bottom={15}
        right={15}
        onPress={() => {
          Alert.alert(
            "Delte item",
            "Are you sure you want to delete this item?",
            [
              {
                text: "Yes",
                onPress: async () => {
                  await remove(`products/${product.id}`);
                  if (Platform.OS === "android") {
                    ToastAndroid.show(
                      "Deleted successfully",
                      ToastAndroid.SHORT
                    );
                  }
                  props.navigation.goBack();
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

export default ProductDetails;
