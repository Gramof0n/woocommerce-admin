import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
type Props = TouchableOpacityProps & {};

const FloatingButton = (props: Props) => {
  return (
    <TouchableOpacity {...props} style={styles.button}>
      <Icon name="plus" size={40} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 15,
    right: 15,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    width: 70,
    height: 70,
    borderRadius: 2 * 70 * Math.PI,
    backgroundColor: "#424242",
  },
});
export default FloatingButton;
