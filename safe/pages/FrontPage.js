import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Communication from 'react-native-communications';
// import SendSMS from 'react-native-sms';
// const [mobileNumber, setMobileNumber] = useState('4087074456');
// const [bodySMS, setBodySMS] = useState(
//   'Please follow https://aboutreact.com',
// );
// import styles from './styles';
// const initiateSMS = () => {
//     // Check for perfect 10 digit length
//     if (mobileNumber.length != 10) {
//       alert('Please insert correct contact number');
//       return;
//     }

//     SendSMS.send(
//       {
//         // Message body
//         body: 'testing123',
//         // Recipients Number
//         recipients: [4087074456],
//         // An array of types 
//         // "completed" response when using android
//         successTypes: ['sent', 'queued'],
//       },
//       (completed, cancelled, error) => {
//         if (completed) {
//             console.log('SMS Sent Completed');
//           } else if (cancelled) {
//             console.log('SMS Sent Cancelled');
//           } else if (error) {
//             console.log('Some error occured');
//           }
//       },
//     );
//   };
class FrontPage extends React.Component {
	state = {
		index: 0,
	}


	constructor(props) {
		super(props);
		this.goBookingPressed = this.goBookingPressed.bind(this);
        // this.goGiftPressed = this.goGiftPressed.bind(this);
        // this.goHelpPressed = this.goHelpPressed.bind(this);
	}
 
	goBookingPressed = () => {
		this.props.navigation.navigate("FriendInvite");
	};

    goGiftPressed = () => {
		Alert.alert('send gift to?', 'based on your selection a trip vouchers will be sent.', [
            {
              text: 'Mom',
            onPress: () => Communication.phonecall('14087074456', true),
            style: 'cancel',
            },
            {text: 'Dad', 
            onPress: () => Communication.phonecall('15103098997', true),
        },
          ]);
	};

    goHelpPressed = () => {
        Alert.alert('are you sure you want to file a help ticket?', '', [
            {
              text: 'Yes',
              onPress: () => Communication.text('4087074456','I am in trouble, please send help.'),   
            },
            {text: 'No', 
            onPress: () => console.log('cancelled request'),
            style: 'cancel',
        },
          ]);
	
	};
	render() {

		return (
			<View style={styles.fpBackground}>
				<View style={styles.titles}>
					<Text style={styles.topText}>make local bookings! ✈️ </Text>
					<Text style={styles.step}>book instantaneously</Text>
				</View>
				<View style={styles.featureGroup}>
					<TouchableOpacity style={[this.state.index === 1 ? styles.selectedButton : styles.featureButton]} onPress={this.goBookingPressed}>
						<Text style={styles.textFrontpage}><Icon name="paper-plane" size={20} color='black' />  submit a booking request </Text>
					</TouchableOpacity>
					<TouchableOpacity style={[this.state.index === 2 ? styles.selectedButton : styles.featureButton]} onPress={this.goGiftPressed}>
						<Text style={styles.textFrontpage}><Icon name="gem" size={20} color='black' />  gift a friend </Text>
					</TouchableOpacity>
					<TouchableOpacity style={[this.state.index === 3 ? styles.selectedButton : styles.featureButton]} onPress={this.goHelpPressed}>
						<Text style={styles.textFrontpage}><Icon name="question-circle" size={20} color='black' />  help + support </Text>
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
		backgroundColor: "#fff",
	},
	buttonGroup: {
		marginTop: '50%',
		alignSelf: "flex-end",
		bottom: 20,
		right: 15,
		backgroundColor: "#b7e4ff",

	},
	titles: {
		textAlign: "center",
		marginTop: "20%",
		width: "100%",
		backgroundColor: "#fff",

	},
    step:{
        textAlign: "center",
        fontWeight: "100",
		color: "black",
        marginRight: "10%",
		fontSize: 30
    },
	topText: {
		fontWeight: "190",
		color: "black",
		textAlign: "center",
		fontSize: 35,

	},
	button: {
		height: 12,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		shadowRadius: 2, //IOS
		backgroundColor: "#b7e4ff",
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
		backgroundColor: "#b7e4ff",
		marginLeft: 35,
		marginRight: 35,
		marginTop: 40,
		shadowColor: "#002560",
		shadowOffset: { height: 6, width: 4 }, // IOS
		shadowOpacity: .1, // IOS
		shadowRadius: 2, //IOS
        borderRadius:5,
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
		shadowColor: "#b7e4ff",
		shadowOffset: { height: 6, width: 4 }, // IOS
		shadowOpacity: .1, // IOS
		shadowRadius: 2, //IOS
		fontFamily: (Platform.OS === "ios") ? "Avenir-Medium" : "serif"
	},

	featureGroup: {
		marginTop: Dimensions.get("window").height * .04,
	},
	textFrontPage: {
		fontSize: 25,
		fontWeight: "200",
		color: "black",
		fontFamily: (Platform.OS === "ios") ? "Avenir-Medium" : "serif"
	},
});
export default FrontPage;