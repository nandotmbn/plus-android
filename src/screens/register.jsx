import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import LoginStyle from "../styles/login";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Feather } from "@expo/vector-icons";
import axios from "axios";

function Register({ navigation }) {
	const [isVisible, setVisible] = useState(true);
	const [isVisible2, setVisible2] = useState(true);
	const [isLoading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");

	const handleRegister = async () => {
		setMessage("");
		setLoading(true);
		if (!username || !email || !password || !rePassword) {
			setLoading(false);
			return setMessage("Isian tidak boleh kosong")
		}
		if(username.length < 3) {
			setLoading(false);
			return setMessage("Nama pengguna sekurangnya memiliki 3 panjang karakter")
		}
		if(password.length < 8) {
			setLoading(false);
			return setMessage("Kata sandi sekurangnya memiliki 8 panjang karakter")
		}
		if(password !== rePassword) {
			setLoading(false);
			return setMessage("Kata sandi tidak valid")
		}
		axios.post("https://plus-api.herokuapp.com/api/auth/signup/common", {
			username,
			email,
			password,
		}).then(res => {
			setMessage("Berhasil daftar, dialihkan...");
			setTimeout(() => {
				setLoading(false)
				navigation.replace("Login");
			}, 5000);
		}).catch(ex => {
			setMessage(ex.response.data.message)
			setLoading(false)
		})
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<LinearGradient
				colors={["#2b463c", "#688f4e"]}
				style={{ flex: 1, alignItems: "center" }}
			>
				<KeyboardAwareScrollView>
					<View style={LoginStyle.container2}>
						<View style={{ alignItems: "center", width: "100%" }}>
							<Image
								source={require("../assets/img/logo.png")}
								style={{ width: 150, height: 150 }}
							/>
						</View>
						<View style={LoginStyle.inputBox}>
							<View style={LoginStyle.inputContainer}>
								<TextInput
									style={{ width: "100%", padding: 12, color: "white" }}
									placeholder="Nama pengguna"
									placeholderTextColor="white"
									onChangeText={(e) => setUsername(e)}
								/>
							</View>
							<View style={LoginStyle.inputContainer}>
								<TextInput
									style={{ width: "100%", padding: 12, color: "white" }}
									placeholder="E-mail"
									placeholderTextColor="white"
									keyboardType="email-address"
									onChangeText={(e) => setEmail(e)}
								/>
							</View>
							<View style={LoginStyle.inputContainer}>
								<TextInput
									style={{ width: "90%", padding: 12, color: "white" }}
									placeholder="Kata Sandi"
									placeholderTextColor="white"
									onChangeText={(e) => setPassword(e)}
									secureTextEntry={isVisible}
								/>
								<View>
									<TouchableOpacity onPress={() => setVisible(!isVisible)}>
										{!isVisible ? (
											<Feather name="eye" size={24} color="white" />
										) : (
											<Feather name="eye-off" size={24} color="white" />
										)}
									</TouchableOpacity>
								</View>
							</View>
							<View style={LoginStyle.inputContainer2}>
								<TextInput
									style={{ width: "90%", padding: 12, color: "white" }}
									placeholder="Ulangi Kata Sandi"
									placeholderTextColor="white"
									secureTextEntry={isVisible2}
									onChangeText={(e) => setRePassword(e)}
								/>
								<View>
									<TouchableOpacity onPress={() => setVisible2(!isVisible2)}>
										{!isVisible2 ? (
											<Feather name="eye" size={24} color="white" />
										) : (
											<Feather name="eye-off" size={24} color="white" />
										)}
									</TouchableOpacity>
								</View>
							</View>
						</View>
						<View
							style={{
								marginTop: 8,
								alignItems: "flex-end",
								justifyContent: "flex-end",
								width: "90%",
							}}
						>
							{message ? (
								<Text
									style={{ textAlign: "right", width: "100%", color: "salmon" }}
								>
									{message}
								</Text>
							) : (
								<Text style={{ textAlign: "right", width: "100%" }}></Text>
							)}
						</View>
						<TouchableOpacity
							style={LoginStyle.buttonContainer}
							onPress={handleRegister}
						>
							{isLoading ? (
								<ActivityIndicator size="small" color="loghtblue" />
							) : (
								<Text style={LoginStyle.textButton}>Daftar</Text>
							)}
						</TouchableOpacity>
						<View style={LoginStyle.noAccount}>
							<Text style={{ color: "white", paddingHorizontal: 8 }}>
								Sudah memiliki akun?
							</Text>
							<TouchableOpacity onPress={() => navigation.replace("Login")}>
								<Text style={{ color: "#f5c265" }}>Masuk</Text>
							</TouchableOpacity>
						</View>
					</View>
				</KeyboardAwareScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
}

export default Register;
