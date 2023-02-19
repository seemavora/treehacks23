import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
// import styles from './styles';

class FrontPage extends React.Component {
	state = {
		index: 0,
	}


	constructor(props) {
		super(props);
		this.goFriendPressed = this.goFriendPressed.bind(this);

	}
	goFriendPressed = () => {
		this.props.navigation.navigate("FriendInvite");
	};
	render() {

		return (
			<View style={styles.fpBackground}>
				<View style={styles.titles}>
					<Text style={styles.topText}>Choose one!</Text>
					<Text style={styles.step}>Select a Feature</Text>
				</View>
				<View style={styles.featureGroup}>
					<TouchableOpacity style={[this.state.index === 1 ? styles.selectedButton : styles.featureButton]} onPress={this.setFriendButton}>
						<Text style={styles.textFrontpage}><Icon name="users" size={20} color='black' />  Submit Text Request for Tickets</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[this.state.index === 2 ? styles.selectedButton : styles.featureButton]} onPress={this.setStudyButton}>
						<Text style={styles.textFrontpage}><Icon name="book" size={20} color='black' />  Gift to Friend </Text>
					</TouchableOpacity>
					<TouchableOpacity style={[this.state.index === 3 ? styles.selectedButton : styles.featureButton]} onPress={this.setStudyButton}>
						<Text style={styles.textFrontpage}><Icon name="book" size={20} color='black' />  Help + Support </Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	fpBackground: {
		width: "100%",
		height: "100%",
		backgroundColor: "orange",
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
export default FrontPage;