import "react-native-gesture-handler";
import React, { useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../controllers/context";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeStack from "./stack/welcome";
import Active from "./stack/active";
import Auth from "./stack/auth";
import Loader from "../components/loader";

function Navigator(props) {
	const [state, dispatch] = useReducer(
		(prevState, action) => {
			switch (action.type) {
				case "SIGN_IN":
					return {
						...prevState,
						token: action.token,
						isLoading: false,
					};
				case "SIGN_OUT":
					return {
						...prevState,
						token: null,
					};
				case "LOG_FIRST":
					return {
						...prevState,
						isFirst: action.isFirst,
						isLoadingFirst: false,
					};
				case "LOADING":
					return {
						...prevState,
						isLoading: true,
					};
			}
		},
		{
			isLoadingFirst: true,
			isLoading: true,
			token: null,
			isFirst: null,
		}
	);

	const bootstrapAsync = async () => {
		let token, isFirst;
		try {
			isFirst = await AsyncStorage.getItem("isFirst");
			dispatch({ type: "LOG_FIRST", isFirst });
			token = await AsyncStorage.getItem("token");
			dispatch({ type: "SIGN_IN", token: token });
		} catch (e) {
			dispatch({ type: "SIGN_IN", token: null });
		}
	};

	useEffect(() => {
		bootstrapAsync();
	}, []);

	const authContext = React.useMemo(
		() => ({
			markFirst: async (_isFirst) => {
				if (!_isFirst) {
					await AsyncStorage.removeItem("isFirst");
				} else {
					await AsyncStorage.setItem("isFirst", _isFirst);
				}
				dispatch({ type: "LOG_FIRST", isFirst: _isFirst });
			},
			signIn: async (data) => {
				await AsyncStorage.setItem("token", data.token);
				dispatch({ type: "SIGN_IN", token: data.token });
			},
			signOut: async () => {
				await AsyncStorage.removeItem("token");
				dispatch({ type: "SIGN_OUT" });
			},
		}),
		[]
	);

	if (state.isLoadingFirst || state.isLoading) {
		return <Loader />
	}
	return (
		<AuthContext.Provider value={authContext}>
			{!state.isFirst ? (
				<WelcomeStack />
			) : (
				<NavigationContainer>
					{state.token ? (
						<Active />
					) : (
						<Auth />
					)}
				</NavigationContainer>
			)}
		</AuthContext.Provider>
	);
}

export default Navigator;
