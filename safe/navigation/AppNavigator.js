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
					name="FrontPage"
					component={FrontPage}
					options={{ headerShown: false }}
				/>
        <Stack.Screen
					name="FriendInvite"
					component={FriendInvite}
					options={{ headerShown: false }}
				/>
        </Stack.Navigator>
		);
	}
}

export default AppNavigator;