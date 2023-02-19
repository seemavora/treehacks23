import React from "react";
import { View, Image, Platform, Button, Text, TouchableOpacity } from "react-native";
import { Configuration, OpenAIApi } from "openai";
import "react-native-url-polyfill/auto";
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

// console.log("we are here", configuration);
export default function FriendInvite() {
	const { Configuration, OpenAIApi } = require("openai");

	const configuration = new Configuration({
		apiKey: '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',
	});
	const openai = new OpenAIApi(configuration);
	const [result, setResult] = React.useState("");
	//const [greeting, setGreeting] = React.useState("");

	const options = {
		voice: "com.apple.speech.synthesis.voice.Fred",
		pitch: 1.5,
		rate: 0.7
	};

	function sleep() {
		return new Promise(resolve => setTimeout(resolve, 5000));
	}

	var questionList = ["What have you been up to?", "How is that going?", "I am also super hungry. Can you make some pasta?", "Sounds good. Are you at home? I am 10 minutes away"]
	var answerList = ["Just doing household chores and cleaning and grocery", "Its fun but I am getting kind of hungry and sleepy", "Yeah, I would absolutely love that. I will even make some garlic bread", "Yes, I am at home. See you!"]

	const response = async () => {

		try {
			for (var i = 0; i < questionList.length; i++) {
				var curPrompt = questionList[i] + "\n" + answerList[i]
				console.log("curPrompt", curPrompt)
				const res = await openai.createCompletion({
					model: "text-davinci-003",
					prompt: curPrompt,
					temperature: 0.5,
					max_tokens: 60,
					top_p: 1.0,
					frequency_penalty: 0.5,
					presence_penalty: 0.0,
					stop: ["You:"],

				})
				setResult(res);
				sleep()
				console.log("printing the res", res.data.choices[0]["text"]);
				speakGreeting(res.data.choices[0]["text"])
			}

		}
		catch (e) {
			console.log(e);
		}
	}

	const speakGreeting = (greeting) => {
		Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
		Speech.speak(greeting, options)
	};

	// const generateImage = async () => {
	//     try {
	//         onChangePrompt(`Search ${prompt}..`);
	//         setLoading(true);
	//         const res = await openai.createImage({
	//             prompt: prompt,
	//             n: 1,
	//             size: "256x256",
	//         });
	//         setResult(res.data.data[0].url);
	//     } catch (e) {
	//         console.error(e);
	//     } finally {
	//         setLoading(false);
	//     }
	// };
	return (
		<View>
			<TouchableOpacity onPress={response}>
				<Text>Speak</Text>
			</TouchableOpacity>
			<Text>result</Text>

		</View>
	)
}
