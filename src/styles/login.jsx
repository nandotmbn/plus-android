import { StyleSheet } from "react-native";

const LoginStyle = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginTop: 100,
	},
	container2: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginTop: 40,
	},
	inputContainer: {
		width: "90%",
		marginTop: 12,
		flexDirection: "row",
		backgroundColor: "#f5c265",
		alignItems: "center",
		borderRadius: 10,
	},
	inputContainer2: {
		width: "90%",
		marginVertical: 12,
		flexDirection: "row",
		backgroundColor: "#f5c265",
		alignItems: "center",
		borderRadius: 10,
	},
	textButton: {
		width: "100%",
		textAlign: "center",
		fontWeight: "bold",
		color: "white",
	},
	buttonContainer: {
		width: "100%",
		backgroundColor: "#f5c265",
		marginTop: 24,
		padding: 12,
		borderRadius: 10,
	},
	inputBox: {
		alignItems: "center",
		width: "100%",
		backgroundColor: "#f4f1e9",
		borderRadius: 20,
	},
	googleButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	googleButtonContainer: {
		width: "100%",
		backgroundColor: "#fff",
		marginTop: 24,
		padding: 12,
		borderRadius: 10,
	},
	textGoogleButton: {
		textAlign: "center",
		fontWeight: "bold",
		color: "gray",
		fontSize: 12,
	},
	noAccount: {
		marginTop: 150,
		marginBottom: 30,
		flexDirection: "row",
		alignItems: "center",
	}
});

export default LoginStyle;
