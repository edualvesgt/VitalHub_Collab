import React from "react";
import { Button, View } from "react-native";

export const Navigation = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Home"
        onPress={() => navigation.navigate("Home")}
      />
      <Button
        title="FormDoctor"
        onPress={() => navigation.navigate("FormDoctor")}
      />
      <Button
        title="Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="VerifyEmail"
        onPress={() => navigation.navigate("VerifyEmail")}
      />
      <Button
        title="ForgotPassword"
        onPress={() => navigation.navigate("ForgotPassword")}
      />
      <Button
        title="CreateAccount"
        onPress={() => navigation.navigate("CreateAccount")}
      />
      <Button
        title="ChangePassword"
        onPress={() => navigation.navigate("ChangePassword")}
      />
      <Button
        title="EditFormDoctor"
        onPress={() => navigation.navigate("EditFormDoctor")}
      />
      <Button
        title="ChooseClinic"
        onPress={() => navigation.navigate("ChooseClinic")}
      />
      <Button
        title="ChooseDoctor"
        onPress={() => navigation.navigate("ChooseDoctor")}
      />
      <Button
        title="ChooseData"
        onPress={() => navigation.navigate("ChooseData")}
      />
      <Button
        title="LocalClinic"
        onPress={() => navigation.navigate("LocalClinic")}
      />
    </View>
  );
};
