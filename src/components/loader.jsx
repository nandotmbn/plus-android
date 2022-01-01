import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native"

export default function Loader() {
	return (
		<SafeAreaView
			style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
		>
			<ActivityIndicator size="large" color="blue" />
		</SafeAreaView>
	);
}
