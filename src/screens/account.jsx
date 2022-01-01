import React, { useContext, useEffect, useState } from "react";
import { Button, View, Text, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../controllers/context";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

function Account({ navigation }) {
	const { signOut } = useContext(AuthContext);
	const [accountData, setAccountData] = useState({
		username: "",
		email: "",
	});

	const getData = async () => {
		AsyncStorage.getItem("token").then((token) => {
			const header = {
				Authorization: `Bearer ${token}`,
			};
			axios
				.get("https://plus-api.herokuapp.com/api/user/", { headers: header })
				.then((res) => {
					setAccountData({
						username: res.data.username,
						email: res.data.email,
					});
				})
				.catch((ex) => alert(ex.response.data));
		});
	};

	const confirmLogout = () => {
		Alert.alert(
			"Logout?",
			"Apakah anda ingin keluar dari akun anda?",
			[
				{
					text: "Keluar",
					onPress: () => handleLogout(),
					style: "default",
				},
				{
					text: "Batal",
					style: "cancel",
				},
			],
			{
				cancelable: true,
			}
		);
	};

	const handleLogout = async () => {
		AsyncStorage.getItem("fcm_token").then((token) => {
			console.log(token);
			axios
				.delete(`https://plus-api.herokuapp.com/api/notification/${token}`)
				.finally(() => {
					AsyncStorage.removeItem("deviceID", () => {
						signOut();
					});
				});
		});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#688f4e",
			}}
		>
			<View
				style={{
					alignItems: "center",
				}}
			>
				<Image
					source={require("../assets/img/logo.png")}
					style={{ width: 150, height: 150 }}
				/>
				<Text style={{ fontWeight: "bold", color: "lightgray" }}>Nama</Text>
				<Text style={{ fontSize: 20, color: "lightgray" }}>
					{accountData.username}
				</Text>
				<Text style={{ fontWeight: "bold", color: "lightgray" }}>Email</Text>
				<Text style={{ fontSize: 20, color: "lightgray" }}>
					{accountData.email}
				</Text>
				<TouchableOpacity
					onPress={confirmLogout}
					style={{
						backgroundColor: "salmon",
						marginTop: 16,
						paddingVertical: 10,
						paddingHorizontal: 20,
						borderRadius: 4,
					}}
				>
					<Text style={{ fontSize: 16, color: "white" }}>Logout</Text>
				</TouchableOpacity>
				<Text
					style={{ fontWeight: "bold", color: "lightgray", marginTop: 150 }}
				>
					app version : 1.0.0
				</Text>
				<Text style={{ fontWeight: "bold", color: "lightgray" }}>
					&#169;2021 plus
				</Text>
			</View>
		</SafeAreaView>
	);
}

export default Account;
