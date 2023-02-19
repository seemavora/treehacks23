import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from './styles';

class FrontPage extends React.Component {
    state = {
        index:0,
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
export default FrontPage;