import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/login";
import Register from "../../screens/register";

const Stack = createStackNavigator();

export default function Auth() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false, animationEnabled: false }}
		>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
		</Stack.Navigator>
	);
}
