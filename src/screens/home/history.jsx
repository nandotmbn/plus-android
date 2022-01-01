import axios from "axios";
import React, { useState, useEffect } from "react";
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import timeBuilder from "../../helpers/time-builder";

export default function History({ route, navigation }) {
	const { deviceID } = route.params;
	const [data, setData] = useState(true);
	const [isLoading, setLoading] = useState(true);

	const getData = () => {
		axios
			.get(`https://plus-api.herokuapp.com/api/device/history/${deviceID}`)
			.then((res) => {
				setData(res.data.histories.reverse());
				setLoading(false);
			})
			.catch((ex) => alert(ex.response.data.message));
	};

	useEffect(() => {
		getData();
	}, []);

	if (isLoading) {
		return (
			<SafeAreaView
				style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
			>
				<ActivityIndicator size="large" color="#688f4e" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={{paddingBottom: 80}}>
			<View style={styles.header}>
				<TouchableOpacity
					style={{ paddingHorizontal: 16 }}
					onPress={() => navigation.pop()}
				>
					<FontAwesome5 name="arrow-left" size={24} color="whitesmoke" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Riwayat Monitoring</Text>
			</View>

			<View style={styles.headerTableContainer}>
				<View style={styles.headerTable}>
					<Text style={styles.headerTableText}>Tanggal</Text>
				</View>
				<View style={styles.headerTable}>
					<Text style={styles.headerTableText}>Waktu</Text>
				</View>
				<View style={styles.headerTable}>
					<Text style={styles.headerTableText}>Tingkat Air</Text>
				</View>
			</View>

			<ScrollView>
				{data.map((datum, index) => {
					const time = timeBuilder(datum.time);
					return (
						<View style={styles.bodyTableContainer} key={index}>
							<View style={styles.bodyTable}>
								<Text
									style={styles.bodyTableText}
								>{`${time.day}, ${time.date} ${time.month} ${time.year}`}</Text>
							</View>
							<View style={styles.bodyTable}>
								<Text
									style={styles.bodyTableText}
								>{`${time.hour}:${time.minutes}:${time.second}`}</Text>
							</View>
							<View style={styles.bodyTable}>
								<Text style={styles.bodyTableText}>{datum.value}%</Text>
							</View>
						</View>
					);
				})}
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
	headerTableContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		backgroundColor: "black",
	},
	headerTable: {
		width: 100,
		paddingVertical: 12,
	},
	headerTableText: {
		color: "white",
		fontWeight: "700",
        textAlign: "center",
		fontSize: 10,
	},
	bodyTableContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		backgroundColor: "lightgray",
	},
	bodyTable: {
		width: 100,
		paddingVertical: 12,
	},
	bodyTableText: {
		textAlign: "center",
		fontSize: 10,
	},
});
