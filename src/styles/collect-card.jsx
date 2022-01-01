import { StyleSheet } from "react-native";

const CollectStyle = StyleSheet.create({
	container: {
		backgroundColor: "#b1d182",
		padding: 8,
		borderRadius: 16,
		marginBottom: 8,
	},
	subtitle: { color: "#679d90", fontSize: 12 },
	customNameWrapper: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	entity: { color: "#2b463c", fontSize: 20 },
	textInput: {
		backgroundColor: "white",
		flex: 2,
		padding: 0,
		paddingHorizontal: 4,
		color: "maroon",
	},
	cancel: {
		backgroundColor: "#eed202",
		marginHorizontal: 2,
		borderRadius: 2,
	},
	fontButton: { padding: 6, fontSize: 12, color: "black" },
	doneButton: {
		backgroundColor: "#00AB06",
		marginHorizontal: 2,
		borderRadius: 2,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		marginTop: 16,
	},
	delete: {
		paddingHorizontal: 16,
		paddingVertical: 4,
		marginRight: 8,
		borderRadius: 8,
		backgroundColor: "red",
	},
    open: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        marginRight: 8,
        borderRadius: 8,
        backgroundColor: "green",
    }
});

export default CollectStyle;
