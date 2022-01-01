import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import Navigator from "./src/routes/navigator";

export default function App() {
	let [fontsLoaded] = useFonts({
		"Monotype Corsiva": require("./assets/fonts/MonotypeCorsiva.ttf"),
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return <Navigator />;
	}
}
