import React, { useContext, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Button,
	ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import LoginStyle from "../styles/login";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../controllers/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

function Login({ navigation }) {
	const [isVisible, setVisible] = useState(true);
	const [cred, setCred] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setLoading] = useState(false);
	const { signIn, markFirst } = useContext(AuthContext);
	const [message, setMessage] = useState("");

	const [request, response, promptAsync] = Google.useAuthRequest({
		expoClientId:
			"1014573839996-mb7hd7lshb34i4p5bhhf22mo9c4ubogl.apps.googleusercontent.com",
		// iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
		androidClientId:
			"1014573839996-r05hpuj24ammqs8djidcntikhp5p7r2h.apps.googleusercontent.com",
		// webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
		scopes: ["profile", "email"],
	});

	React.useEffect(() => {
		if (response?.type === "success") {
			setLoading(true);
			const { authentication } = response;
			axios
				.get(
					"https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
						authentication.accessToken
				)
				.then(function (response) {
					const userDetails = response.data;
					axios
						.post("https://plus-api.herokuapp.com/api/auth/google", {
							email: userDetails.email,
							password: userDetails.sub,
							username: userDetails.name,
						})
						.then((res) => {
							AsyncStorage.setItem("uname", res.data.username).then(() => {
								signIn({
									token: res.headers["x-auth-token"],
								});
							});
						})
						.catch((ex) => console.log(ex.response.data.message))
						.finally(() => setLoading(false));
				});
		}
	}, [response]);

	const handleLogin = async () => {
		setMessage("");
		setLoading(true);
		axios
			.post("https://plus-api.herokuapp.com/api/auth/signin/common", {
				cred,
				password,
			})
			.then((res) => {
				AsyncStorage.setItem("uname", res.data.username).then(() => {
					signIn({
						token: res.headers["x-auth-token"],
					});
				});
			})
			.catch((ex) => setMessage(ex.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<LinearGradient
				colors={["#2b463c", "#688f4e"]}
				style={{ flex: 1, alignItems: "center" }}
			>
				<KeyboardAwareScrollView>
					<View style={LoginStyle.container}>
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
									placeholder="Nama pengguna atau E-mail"
									placeholderTextColor="white"
									keyboardType="email-address"
									onChangeText={(e) => setCred(e)}
								/>
							</View>
							<View style={LoginStyle.inputContainer2}>
								<TextInput
									style={{ width: "90%", padding: 12, color: "white" }}
									placeholder="Kata Sandi"
									placeholderTextColor="white"
									secureTextEntry={isVisible}
									onChangeText={(e) => setPassword(e)}
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
							onPress={handleLogin}
						>
							{isLoading ? (
								<ActivityIndicator size="small" color="loghtblue" />
							) : (
								<Text style={LoginStyle.textButton}>Masuk</Text>
							)}
						</TouchableOpacity>
						<TouchableOpacity
							style={LoginStyle.googleButtonContainer}
							onPress={() => promptAsync()}
							disabled={!request}
						>
							<View style={LoginStyle.googleButton}>
								<Image
									source={require("../assets/logo/g.png")}
									style={{ width: 20, height: 20, marginHorizontal: 8 }}
								/>
								<Text style={LoginStyle.textGoogleButton}>
									Login with your google account
								</Text>
							</View>
						</TouchableOpacity>
						{/* <Button title="Reset" onPress={() => markFirst()} /> */}
						<View style={LoginStyle.noAccount}>
							<Text style={{ color: "white", paddingHorizontal: 8 }}>
								Belum memiliki akun?
							</Text>
							<TouchableOpacity onPress={() => navigation.replace("Register")}>
								<Text style={{ color: "#f5c265" }}>Daftar</Text>
							</TouchableOpacity>
						</View>
					</View>
				</KeyboardAwareScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
}

export default Login;
