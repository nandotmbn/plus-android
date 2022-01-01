import { StyleSheet } from "react-native";

const AddStyle = StyleSheet.create({
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
	container: {
		backgroundColor: "white",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	codeInput: {
		borderWidth: 2,
		width: "90%",
		borderRadius: 8,
		marginTop: 8,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderColor: '#5a6e5a'
	},
	connectButton: {
		width: 100,
		marginTop: 4,
		backgroundColor: '#688f4e',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
	},
	message: {
		color: 'salmon',
		width: '90%',
		textAlign: 'right'
	}
});

export default AddStyle;
