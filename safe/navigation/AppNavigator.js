import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FrontPage from '../pages/FrontPage';
import FriendInvite from '../pages/FriendInvite';

const Stack = createStackNavigator();

class AppNavigator extends React.Component {
	render() {
		return (
			<Stack.Navigator initialRouteName="FrontPage">
				<Stack.Screen
					name="Xirc Bookings"
					component={FrontPage}


				/>
				<Stack.Screen
					name="FriendInvite"
					component={FriendInvite}
				/>
			</Stack.Navigator>
		);
	}
}

export default AppNavigator;