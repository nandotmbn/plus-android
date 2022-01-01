import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Account from "../../screens/account";
import HomeStack from "../home-stack";
import EncyclopediaStack from "../encyclopedia-stack";

const Tab = createMaterialBottomTabNavigator();

export default function Active() {
	return (
		<Tab.Navigator shifting={true}>
			<Tab.Screen
				name="HomeTab"
				component={HomeStack}
				options={{
					tabBarLabel: "Beranda",
					tabBarColor: "#2b463c",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="home" size={24} color="white" />
					),
				}}
			/>
			<Tab.Screen
				name="EncyclopediaTab"
				component={EncyclopediaStack}
				options={{
					tabBarLabel: "Ensiklopedia",
					tabBarColor: "#118f4e",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="book" size={24} color="white" />
					),
				}}
			/>
			<Tab.Screen
				name="SettingTab"
				component={Account}
				options={{
					tabBarLabel: "Account",
					tabBarColor: "#688f4e",
					tabBarIcon: ({ color }) => (
						<MaterialIcons name="account-circle" size={24} color="white" />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
