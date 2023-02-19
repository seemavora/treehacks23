import { View, Image, Platform, Button, Text, StyleSheet } from "react-native";
import * as Speech from 'expo-speech';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const greeting = "my name is rishi sunak";
const options = {
	voice: "com.apple.speech.synthesis.voice.Fred",
	pitch: 1.5,
	rate: 0.7
};

class FriendInvite extends React.Component {

	speakGreeting = () => {
		Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
		Speech.speak(greeting, options)
	};

	render() {
		return (
			<View style={styles.container}>
				<Button title="Speak" onPress={this.speakGreeting} />
			</View>
		);
	}


}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
export default FriendInvite;