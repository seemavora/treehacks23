import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Speech from 'expo-speech';
import { useEffect } from 'react';

export default function App() {

	const listAllSpeech = async () => {
		let voices = await Speech.getAvailableVoicesAsync();
		console.log(voices)
	}

	useEffect(() => {
		listAllSpeech()
	})

	const speak = () => {
		console.log("in")
		const thingToSay = 'helloooo';
		const options = {
			voice: "com.apple.speech.synthesis.voice.Junior",
			pitch: 1.5,
			rate: 0.7
		};

		Speech.speak(thingToSay, options);
	};

	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!!</Text>
			<StatusBar style="auto" />
			<Button title="Press to hear some words" onPress={speak} />

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
