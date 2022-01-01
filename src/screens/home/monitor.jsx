import axios from "axios";
import React, { useState, useEffect } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	Alert,
	ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Circle from "../../components/circle";
import Graph from "../../components/graph";
import { FontAwesome5 } from "@expo/vector-icons";
const { io } = require("socket.io-client");

export default function Monitor({ route, navigation }) {
	const { deviceID } = route.params;
	const [isResetLoading, setResetLoading] = useState(false);
	const [isRefillLoading, setRefillLoading] = useState(false);
	const [isRefill, setRefill] = useState(false);
	const [ringData, setRingData] = useState({
		labels: "",
		data: [0],
	});

	const handleRefill = () => {
		setRefillLoading(true);
		if (isRefill) {
			return axios
				.post(`https://plus-api.herokuapp.com/api/device/state/${deviceID}/0`)
				.finally(() => setRefillLoading(false));
		}
		axios
			.post(`https://plus-api.herokuapp.com/api/device/state/${deviceID}/1`)
			.finally(() => setRefillLoading(false));
	};

	const resetAlert = () => {
		Alert.alert(
			"Reset?",
			"Apakah anda yakin untuk mengulangi data monitoring tanaman?",
			[
				{
					text: "Hapus",
					onPress: () => handleReset(),
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

	const handleReset = async () => {
		setResetLoading(true);
		axios
			.delete(`https://plus-api.herokuapp.com/api/device/history/${deviceID}`)
			.finally(() => setResetLoading(false));
	};

	const getID = async () => {
		axios
			.get(`https://plus-api.herokuapp.com/api/device/${deviceID}`)
			.then((res) => {
				setRingData({
					labels: "",
					data: [res.data.waterLevel / 100],
				});
			})
			.catch((ex) => alert(ex.response.data.message));
		axios
			.get(`https://plus-api.herokuapp.com/api/device/state/${deviceID}`)
			.then((res) => {
				setRefill(res.data);
			})
			.catch((ex) => alert(ex.response.data.message));
	};

	const socketInit = async () => {
		const socket = io("wss://plus-api.herokuapp.com");
		socket.on(`state:${deviceID}`, async (data) => {
			const result = { data };
			setRefill(result.data);
		});
	};

	useEffect(() => {
		getID();
		socketInit();
	}, []);

	return (
		<SafeAreaView
			style={{ flex: 1, alignItems: "center", backgroundColor: "gray" }}
		>
			<View style={styles.header}>
				<TouchableOpacity
					style={{ paddingHorizontal: 16 }}
					onPress={() => navigation.pop()}
				>
					<FontAwesome5 name="arrow-left" size={24} color="whitesmoke" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Monitoring and Control</Text>
			</View>
			<Circle data={ringData} />
			<Text style={styles.percentageText}>
				{Math.round(ringData.data[0] * 100) || 0}%
			</Text>
			<Graph setRingData={setRingData} deviceID={deviceID} />
			<Text style={{ color: "aqua", fontSize: 12 }}>menit</Text>

			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.resetButton} onPress={resetAlert}>
					{isResetLoading ? (
						<ActivityIndicator size="small" color="white" />
					) : (
						<Text style={{ textAlign: "center", color: "white" }}>Reset</Text>
					)}
				</TouchableOpacity>
				<TouchableOpacity style={styles.waterButton} onPress={handleRefill}>
					<Text style={{ textAlign: "center", color: "darkblue" }}>
						{isRefillLoading ? (
							<ActivityIndicator size="small" color="white" />
						) : !isRefill ? (
							"Isi Ulang"
						) : (
							"Hentikan Isi Ulang"
						)}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate("Riwayat", {deviceID})}>
					<Text style={{ textAlign: "center", color: "white" }}>Riwayat</Text>
				</TouchableOpacity>
			</View>
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
	percentageText: {
		color: "aqua",
		fontWeight: "bold",
		position: "relative",
		bottom: 97,
		fontSize: 30,
	},
	buttonContainer: {
		width: "90%",
		flexDirection: "row",
		marginTop: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	resetButton: {
		marginHorizontal: 10,
		width: 100,
		height: 60,
		justifyContent: "center",
		borderRadius: 5,
		backgroundColor: "red",
	},
	waterButton: {
		marginHorizontal: 10,
		width: 100,
		height: 60,
		justifyContent: "center",
		borderRadius: 5,
		backgroundColor: "aqua",
	},
	historyButton: {
		marginHorizontal: 10,
		width: 100,
		height: 60,
		justifyContent: "center",
		borderRadius: 5,
		backgroundColor: "green",
	},
});
