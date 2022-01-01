import React, { useState } from "react";
import { Text, View, LogBox, TextInput, ActivityIndicator } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import AddStyle from "../../styles/add";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Add({ route, navigation }) {
	const [deviceID, setDeviceID] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setLoading] = useState(false);
	LogBox.ignoreLogs([
		"Non-serializable values were found in the navigation state",
	]);
	const { collectionData, setCollectionData } = route.params;

	const handleConnect = () => {
		setMessage("");
		setLoading(true);
		if (!deviceID) {
			setLoading(false);
			return setMessage("DeviceID tidak boleh kosong")
		}
		if(deviceID.length !== 16) {
			setLoading(false);
			return setMessage("Device ID memiliki 16 panjang karakter")
		}
		AsyncStorage.getItem("token").then((token) => {
			const header = {
				Authorization: `Bearer ${token}`,
			};
			axios
				.put(
					"https://plus-api.herokuapp.com/api/user/add",
					{ deviceID },
					{ headers: header }
				)
				.then((res) => {
					setCollectionData({
						...collectionData,
						monitor: res.data.monitor,
					})
					setMessage("Device berhasil ditambahkan")
					setTimeout(() => {
						navigation.pop();
					}, 3000);
				})
				.catch((ex) =>{
					setMessage(ex.response.data.message)
					setLoading(false)
				})
		});
	}

	return (
		<SafeAreaView style={{flex: 1}}>
			<View style={AddStyle.header}>
				<TouchableOpacity
					style={{ paddingHorizontal: 16 }}
					onPress={() => navigation.pop()}
				>
					<FontAwesome5 name="arrow-left" size={24} color="whitesmoke" />
				</TouchableOpacity>
                <Text style={AddStyle.headerTitle}>Tambahkan Tumbuhan</Text>
			</View>
			<View style={AddStyle.container}>
				<Text style={{fontSize: 16, color: '#5a6e5a'}}>Masukkan device ID</Text>
				<TextInput style={AddStyle.codeInput} onChangeText={e => setDeviceID(e)} />
				{
					message ? (
						<Text style={AddStyle.message}>{message}</Text>
					) : (
						<Text></Text>
					)
				}
				<TouchableOpacity style={AddStyle.connectButton} onPress={handleConnect}>
					{
						isLoading ? (
							<ActivityIndicator size='small' color='white' />
						) : (
							<Text style={{color: '#fffff9', textAlign: 'center'}}>Sambung</Text>
						)
					}
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
