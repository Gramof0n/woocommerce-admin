import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
type Props = TouchableOpacityProps & {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  icon: "plus" | "trash-can-outline" | "update";
};

const FloatingButton = ({ top, bottom, left, right, ...props }: Props) => {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.button, { top: top, bottom: bottom, left, right }]}
    >
      <Icon name={props.icon} size={40} color="white" />
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
    width: 50,
    height: 50,
    borderRadius: 2 * 70 * Math.PI,
    backgroundColor: "rgba(52, 52, 52, 0.3)",
  },
});
export default FloatingButton;
