import React from "react";
import { View, Text } from "react-native";

function Header(props) {
	return (
		<View
			style={{
				height: 44,
				backgroundColor: "salmon",
				justifyContent: "center",
				paddingHorizontal: 12,
			}}
		>
			<Text
				style={{
					fontFamily: "Monotype Corsiva",
					fontSize: 32,
					color: "#FFDAC7",
				}}
			>
				Plus
			</Text>
		</View>
	);
}

export default Header;
