import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import AppNavigator from './navigation/AppNavigator'
import { NavigationContainer } from "@react-navigation/native";
import FriendInvite from './pages/FriendInvite'
import React, { useState, useEffect } from 'react';
// const goFriendPressed = () => {
//   this.props.navigation.navigate("FriendInvite");
// };
export default function App() {

	return (

		<View style={styles.container}>
			<NavigationContainer>
				<AppNavigator />
				{/* <HomeScreen/> */}
			</NavigationContainer>

			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		display: "flex",
		// justifyContent: "center",
		// alignItems: "center"
	},
});

// const HomeScreen = ({navigation}) => {
//   return (
//     <Button
//       title="Go to Jane's profile"
//       onPress={() =>
//         navigation.navigate('Profile', {name: 'Jane'})
//       }
//     />
//   );
// };
