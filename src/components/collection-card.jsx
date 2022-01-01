import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
	ActivityIndicator,
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import CollectStyle from "../styles/collect-card";

export default function CollectionCard({ data, collection, navigation }) {
	const [isLoading, setLoading] = useState(false);
	const [isEdit, setEdit] = useState(false);
	const [isEditLoading, setEditLoading] = useState(false);
	const [customName, setCustomName] = useState("");

	const handleEdit = async () => {
		setEditLoading(true);
		AsyncStorage.getItem("token").then((token) => {
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			axios
				.put(
					`https://plus-api.herokuapp.com/api/user/edit`,
					{
						deviceID: data.deviceID,
						customName,
					},
					{ headers }
				)
				.then((res) => {
					collection.setCollectionData({
						...collection.collectionData,
						monitor: res.data.monitor,
					})
					setEdit(false);
				})
				.catch(ex => alert(ex.response.data.message))
				.finally(() => setEditLoading(false))
		});
	};

	const removeAlert = () => {
		Alert.alert(
			"Hapus?",
			"Apakah anda yakin untuk menghapus dari daftar monitoring tanaman?",
			[
				{
					text: "Hapus",
					onPress: () => handleRemove(),
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
	const handleRemove = async () => {
		setLoading(true);
		AsyncStorage.getItem("token").then((token) => {
			const header = {
				Authorization: `Bearer ${token}`,
			};
			axios
				.put(
					"https://plus-api.herokuapp.com/api/user/remove",
					{ deviceID: data.deviceID },
					{ headers: header }
				)
				.then((res) =>
					collection.setCollectionData({
						...collection.collectionData,
						monitor: res.data.monitor,
					})
				)
				.catch((ex) => alert(ex.response.data))
				.finally(() => setLoading(false));
		});
	};
	return (
		<View style={CollectStyle.container}>
			<View>
				<Text style={CollectStyle.subtitle}>Device ID :</Text>
				<Text style={CollectStyle.entity}>{data.deviceID}</Text>
			</View>
			<View style={{ marginTop: 4 }}>
				<Text style={CollectStyle.subtitle}>Custom Name :</Text>
				<View>
					{!isEdit ? (
						<View style={CollectStyle.customNameWrapper}>
							<Text style={CollectStyle.entity}>{data.customName}</Text>
							<TouchableOpacity onPress={() => setEdit(true)}>
								<FontAwesome5 name="edit" size={18} color="maroon" />
							</TouchableOpacity>
						</View>
					) : (
						<View style={CollectStyle.customNameWrapper}>
							<TextInput
								style={CollectStyle.textInput}
								placeholder="Contoh : Sawi Pot 2"
								onChangeText={(text) => setCustomName(text)}
							/>
							<View style={{ flexDirection: "row", flex: 1, marginLeft: 4 }}>
								<TouchableOpacity
									style={CollectStyle.cancel}
									onPress={() => setEdit(false)}
								>
									<Text style={CollectStyle.fontButton}>Batal</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={CollectStyle.doneButton}
									onPress={handleEdit}
								>
								{
									isEditLoading ? (
										<ActivityIndicator size="small" color="white" style={{paddingVertical: 4, paddingHorizontal: 16}}/>
									) : (
										<Text style={CollectStyle.fontButton}>Selesai</Text>
									)
								}
								</TouchableOpacity>
							</View>
						</View>
					)}
				</View>
			</View>
			<View style={CollectStyle.buttonContainer}>
				<TouchableOpacity onPress={removeAlert} style={CollectStyle.delete}>
					{!isLoading ? (
						<Text style={{ color: "white" }}>Hapus</Text>
					) : (
						<ActivityIndicator size="small" color="white" />
					)}
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("Monitor", { deviceID: data.deviceID })
					}
					style={CollectStyle.open}
				>
					<Text style={{ color: "white" }}>Buka</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
