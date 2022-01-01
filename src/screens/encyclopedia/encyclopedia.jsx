import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DATA from "../../helpers/encyclopedia.json";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Encyclopedia({navigation}) {
	return (
		<SafeAreaView>
			<ScrollView>
				{DATA.map((datum, index) => {
					return (
						<TouchableOpacity key={index} style={styles.header} onPress={() => navigation.navigate("Detail", {index})}>
							<View>
								<Text style={styles.headerTitle}>{datum.name}</Text>
							</View>
							<MaterialIcons
								name="keyboard-arrow-right"
								size={24}
								color="black"
							/>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "white",
		marginVertical: 4,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 8,
	},
	headerTitle: {
		fontSize: 20,
		paddingLeft: 10,
		fontWeight: "700",
		color: "#707070",
	},
});
