import { StyleSheet, Dimensions } from "react-native";
const styles = StyleSheet.create({
	container: {
		// width: "38%",
		// margin: "5%",
	},
	fpBackground: {
		width: "100%",
		height: Dimensions.get("window").height,
		backgroundColor: "blue",
	},
	buttonGroup: {
		marginTop: '50%',
		alignSelf: "flex-end",
		bottom: 20,
		right: 15,
		backgroundColor: "blue",

	},
	titles: {
		textAlign: "center",
		marginTop: "20%",
		width: "100%",
		backgroundColor: "blue",

	},
	topText: {
		fontWeight: "300",
		color: "blue",
		textAlign: "center",
		marginLeft: "10%",
		marginRight: "10%",
		fontSize: 38,

	},
	button: {
		height: 12,
		borderRadius: 2,
		justifyContent: "center",
		alignItems: "center",
		shadowRadius: 2, //IOS
		backgroundColor: "blue",
		shadowColor: "#002560",
		shadowOffset: { height: 6, width: 4 }, // IOS
		shadowOpacity: .2, // IOS
		width: 160,
	},
	text: {
		fontSize: 15,
		fontWeight: "400",
	},
	featureButton: {
		height: Dimensions.get("window").height * .1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "blue",
		marginLeft: 35,
		marginRight: 35,
		marginTop: 40,
		shadowColor: "#002560",
		shadowOffset: { height: 6, width: 4 }, // IOS
		shadowOpacity: .1, // IOS
		shadowRadius: 2, //IOS
		fontFamily: (Platform.OS === "ios") ? "Avenir-Medium" : "serif"
	},
	selectedButton: {
		height: Dimensions.get("window").height * .1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "orange",
		marginLeft: 35,
		marginRight: 35,
		marginTop: 40,
		shadowColor: "blue",
		shadowOffset: { height: 6, width: 4 }, // IOS
		shadowOpacity: .1, // IOS
		shadowRadius: 2, //IOS
		fontFamily: (Platform.OS === "ios") ? "Avenir-Medium" : "serif"
	},

	featureGroup: {
		marginTop: Dimensions.get("window").height * .04,
	},
	textFrontPage: {
		fontSize: 17,
		fontWeight: "400",
		color: "black",
		fontFamily: (Platform.OS === "ios") ? "Avenir-Medium" : "serif"
	},
});