import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CollectionCard from "../../components/collection-card";
import { FontAwesome } from "@expo/vector-icons";
import OverviewStyle from "../../styles/overview";
import NotificationHandler from '../../helpers/NotificationHandler'

function Overview({ navigation }) {
	const [isCollectLoading, setCollectLoading] = useState(true);
	const [isExist, setExist] = useState(false);
	const [collectionData, setCollectionData] = useState({});
	const [uname, setUname] = useState("");

	const getData = async () => {
		AsyncStorage.getItem("token").then((token) => {
			const header = {
				Authorization: `Bearer ${token}`,
			};
			axios
				.get("https://plus-api.herokuapp.com/api/user/", { headers: header })
				.then(async(res) => {
					AsyncStorage.getItem("fcm_token")
						.then(token => {
							axios.post("https://plus-api.herokuapp.com/api/notification/",{token}, { headers: header })
						})
					setUname(res.data.username);
					if (res.data.monitor.length < 1) setExist(false);
					else {
						setCollectionData(res.data);
						setExist(true);
					}
				})
				.catch((ex) => console.log(ex.response.data))
				.finally(() => {
					setCollectLoading(false);
				});
		});
	};

	useEffect(() => {
		if(collectionData.monitor) {
			if(collectionData.monitor.length > 0)
				return setExist(true);
		}
		setExist(false);
	}, [collectionData])

	useEffect(() => {
		getData();
	}, []);

	return (
		<ScrollView>
			<SafeAreaView style={OverviewStyle.safe}>
				<View style={OverviewStyle.container}>
					<Text style={{ fontSize: 16, color: "#2b463c" }}>Halo! {uname}</Text>
				</View>
				<View style={OverviewStyle.container}>
					<Text style={OverviewStyle.subtitle}>Koleksi Tanaman</Text>
					{isCollectLoading ? (
						<View style={{ height: 81, justifyContent: "center" }}>
							<ActivityIndicator size="large" color="#f5c265" />
						</View>
					) : (
						<View>
							{isExist ? (
								<View>
									{collectionData.monitor.map((data, index) => (
										<CollectionCard
											data={data}
											key={index}
											navigation={navigation}
											collection={{ collectionData, setCollectionData }}
										/>
									))}
								</View>
							) : (
								<Text>Kamu tidak memiliki koleksi tanaman</Text>
							)}
						</View>
					)}
				</View>
				<TouchableOpacity
					style={OverviewStyle.add}
					onPress={() =>
						navigation.navigate("Add", {
							collectionData,
							setCollectionData,
						})
					}
				>
					<FontAwesome name="plus-square-o" size={44} color="#f5c265" />
					<Text style={{ color: "#f5c265" }}>Tambahkan Tanaman</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</ScrollView>
	);
}

export default Overview;
