import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator'
import { NavigationContainer } from "@react-navigation/native";

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
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});