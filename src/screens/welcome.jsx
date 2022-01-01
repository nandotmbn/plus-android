import React, { useState, useEffect, useContext } from "react";
import {
	Button,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../controllers/context";
import { TouchableOpacity } from "react-native-gesture-handler";

export function Welcome1({navigation}) {
	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={require("../assets/img/welcome1.png")}
				resizeMode="cover"
				style={styles.imageBg}
			>
				<View style={styles.botNav}>
					<TouchableOpacity style={{ width: 64 }}>
						<Text style={{ color: "darkgrey", textAlign: "center" }}>
							Previous
						</Text>
					</TouchableOpacity>
					<View
						style={{ flexDirection: "row", justifyContent: "space-around" }}
					>
						<View style={styles.bulletActive}></View>
						<View style={styles.bulletInactive}></View>
						<View style={styles.bulletInactive}></View>
					</View>
					<TouchableOpacity style={{ width: 64 }} onPress={() => navigation.navigate('Welcome2')}>
						<Text style={{ color: "white", textAlign: "center" }}>Next</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
}

export function Welcome2({navigation}) {
	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={require("../assets/img/welcome2.png")}
				resizeMode="cover"
				style={styles.imageBg}
			>
				<View style={styles.botNav}>
					<TouchableOpacity style={{ width: 64 }} onPress={() => navigation.navigate('Welcome1')}>
						<Text style={{ color: "white", textAlign: "center" }}>
							Previous
						</Text>
					</TouchableOpacity>
					<View
						style={{ flexDirection: "row", justifyContent: "space-around" }}
					>
						<View style={styles.bulletInactive}></View>
						<View style={styles.bulletActive}></View>
						<View style={styles.bulletInactive}></View>
					</View>
					<TouchableOpacity style={{ width: 64 }} onPress={() => navigation.navigate('Welcome3')}>
						<Text style={{ color: "white", textAlign: "center" }}>Next</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
}

export function Welcome3({navigation}) {
	const { markFirst } = useContext(AuthContext);
	const nextHandler = () => {
	    markFirst("CHECKED");
	}
	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={require("../assets/img/welcome3.png")}
				resizeMode="cover"
				style={styles.imageBg}
			>
				<View style={styles.botNav}>
					<TouchableOpacity style={{ width: 64 }} onPress={() => navigation.navigate('Welcome2')}>
						<Text style={{ color: "white", textAlign: "center" }}>
							Previous
						</Text>
					</TouchableOpacity>
					<View
						style={{ flexDirection: "row", justifyContent: "space-around" }}
					>
						<View style={styles.bulletInactive}></View>
						<View style={styles.bulletInactive}></View>
						<View style={styles.bulletActive}></View>
					</View>
					<TouchableOpacity style={{ width: 64 }} onPress={nextHandler}>
						<Text style={{ color: "white", textAlign: "center" }}>Start</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	imageBg: {
		flex: 1,
		width: "100%",
	},
	botNav: {
		backgroundColor: "transparent",
		width: "100%",
		position: "absolute",
		bottom: 20,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	bulletActive: {
		backgroundColor: "white",
		borderRadius: 100,
		width: 10,
		height: 10,
		marginHorizontal: 10,
	},
	bulletInactive: {
		backgroundColor: "lightgrey",
		borderRadius: 100,
		width: 10,
		height: 10,
		marginHorizontal: 10,
	},
});
