import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import DATA from "../../helpers/encyclopedia.json";

export default function Detail({ navigation, route }) {
	const { index } = route.params;
	return (
		<SafeAreaView style={{ backgroundColor: "transparent" }}>
			<View style={styles.header}>
				<TouchableOpacity
					style={{ paddingHorizontal: 16 }}
					onPress={() => navigation.pop()}
				>
					<FontAwesome5 name="arrow-left" size={24} color="whitesmoke" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Detail</Text>
			</View>
			<Image
				source={{ uri: DATA[index].url }}
				style={{ width: "100%", height: 240 }}
			/>
			<ScrollView>
				<View style={{paddingHorizontal: 16}}>
					<Text style={{ color: "darkgray" }}>Nama tanaman :</Text>
					<Text style={{ fontSize: 24, fontWeight: "bold", color: "#2b463c" }}>
						{DATA[index].name}
					</Text>
					<Text style={{ color: "darkgray" }}>Deskripsi :</Text>
					<Text style={{ fontSize: 14, textAlign: 'justify', color: "#2b463c" }}>
						{DATA[index].description}
					</Text>
					<Text style={{ color: "darkgray" }}>Waktu panen :</Text>
					<Text style={{ fontSize: 14, textAlign: 'justify', color: "#2b463c" }}>
						{DATA[index].intervalDescription}
					</Text>
					<Text style={{ color: "darkgray" }}>Interval pemanenan :</Text>
					<Text style={{ fontSize: 14, textAlign: 'justify', color: "#2b463c" }}>
						{DATA[index].interval}
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: 44,
		backgroundColor: "#2b463c",
		flexDirection: "row",
		alignItems: "center",
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: "500",
		color: "whitesmoke",
	},
});
