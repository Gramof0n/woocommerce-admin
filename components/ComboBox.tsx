import { Picker } from "@react-native-picker/picker";
import { PickerProps } from "@react-native-picker/picker/typings/Picker";
import { useField } from "formik";
import React, { useState } from "react";
import { TextareaHTMLAttributes } from "react";
import { View, Text, StyleSheet } from "react-native";

type PickerItem = {
  label?: string;
  value?: any;
};

type ArrayOfObjects = Array<PickerItem>;

type Props = PickerProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    parameters: ArrayOfObjects;
    label: string;
    name: string;
  };

const ComboBox = (props: Props) => {
  const [item, setItem] = useState();
  const [field, { error }] = useField(props);

  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <Picker
        {...props}
        style={{
          height: 50,
        }}
      >
        {props.parameters.map((param, index) => {
          return (
            <Picker.Item label={param.label} value={param.value} key={index} />
          );
        })}
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    marginTop: 10,
    paddingLeft: 5,
    fontSize: 16,
  },

  label: {
    fontSize: 18,
    marginTop: 10,
  },

  error: {
    color: "red",
    fontWeight: "300",
    marginBottom: 5,
    fontSize: 12,
  },
});

export default ComboBox;
