import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Welcome1, Welcome2, Welcome3 } from "../../screens/welcome";

const Stack = createStackNavigator();

export default function WelcomeStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{ headerShown: false, animationEnabled: false }}
			>
				<Stack.Screen name="Welcome1" component={Welcome1} />
				<Stack.Screen name="Welcome2" component={Welcome2} />
				<Stack.Screen name="Welcome3" component={Welcome3} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
