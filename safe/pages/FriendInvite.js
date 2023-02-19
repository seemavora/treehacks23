import React from "react";
import { View, Image, Platform, Button, Text, TouchableOpacity } from "react-native";
import { Configuration, OpenAIApi } from "openai";
import "react-native-url-polyfill/auto";
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

const configuration = new Configuration({
	apiKey: '',
});
// console.log("we are here", configuration);
export default function FriendInvite() {
	const { Configuration, OpenAIApi } = require("openai");

	const configuration = new Configuration({
		apiKey: '',
	});
	const openai = new OpenAIApi(configuration);
	const [result, setResult] = React.useState("");
	const [greeting, setGreeting] = React.useState("");

	const options = {
		voice: "com.apple.speech.synthesis.voice.Fred",
		pitch: 1.5,
		rate: 0.7
	};
	const response = async () => {
		try {
			const res = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: "You: What have you been up to?\nFriend: Watching old songs.\nYou: Did you watch anything interesting?\nFriend:",
				temperature: 0.5,
				max_tokens: 60,
				top_p: 1.0,
				frequency_penalty: 0.5,
				presence_penalty: 0.0,
				stop: ["You:"],

			})
			setResult(res);
			// console.log("printing the res", res.data.choices[0]["text"]);
			setGreeting(res.data.choices[0]["text"])
		}
		catch (e) {
			console.log(e);
		}
	}

	const speakGreeting = () => {
		Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
		Speech.speak(greeting, options)
	};

	return (
		<View>
			<TouchableOpacity onPress={response}>
				<Text>Generate</Text>
			</TouchableOpacity>
			<Text>result</Text>
			<Button title="Speak" onPress={speakGreeting()} />


		</View>
	)
}
