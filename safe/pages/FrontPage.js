import React from "react";
import { View, Text, Button } from "react-native";

class FrontPage extends React.Component {

	constructor(props) {
		super(props);
		this.goFriendPressed = this.goFriendPressed.bind(this);

	}
	goFriendPressed = () => {
		this.props.navigation.navigate("FriendInvite");
	};
	render() {

		return (
			<View>
				<Button
					onPress={this.goFriendPressed}
					title="Learn More"
					color="#841584"
				/>
			</View>
		);
	}
}
export default FrontPage;