import React from "react";
import { View, StyleSheet, Image, Platform, Button, Text, TouchableOpacity } from "react-native";
import { Configuration, OpenAIApi } from "openai";
import "react-native-url-polyfill/auto";
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import Icon from "react-native-vector-icons/FontAwesome5";

// console.log("we are here", configuration);
export default function FriendInvite() {
	const { Configuration, OpenAIApi } = require("openai");

	const configuration = new Configuration({
		apiKey: '',
	});
	const openai = new OpenAIApi(configuration);
	const [result, setResult] = React.useState("");
	//const [greeting, setGreeting] = React.useState("");

	const options = {
		voice: "com.apple.speech.synthesis.voice.Fred",
		pitch: 1.5,
		rate: 0.5
	};

	var questionList = ["What are you doing?", "How is that going?", "Nice, I am um glad to hear that, I am also hungry", "I am 10 minutes away. Are you are home?"]
	var answerList = ["Working on some meetings and tasks", "Very interesting, doing cs tasks and meeting many people", "Yes, me too. I can make some italian food and drinks", "Sure, um yeah of course. I will cook right now, bye"]
	function sleep() {
		return new Promise(resolve => setTimeout(resolve, 10000));
	}
	const response = async () => {
		sleep()
		try {
			for (var i = 0; i < questionList.length; i++) {
				var curPrompt = questionList[i] + "\n" + answerList[i]
				// console.log("curPrompt", curPrompt)
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
				//console.log("printing the res", res.data.choices[0]["text"]);
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
		<View style={styles.fpBackground}>
			<View style={styles.infoContainer}>
				<Text style={{ color: "white", fontSize: 15 }}>Click button to contact customer service</Text>
				<TouchableOpacity
					onPress={response}
					style={styles.roundButton1}>
					<Text style={styles.textFrontpage}><Icon name="phone-alt" size={20} color='white' /></Text>
				</TouchableOpacity>

			</View>
		</View>
	)
}

const styles = StyleSheet.create({

	roundButton1: {
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		borderRadius: 100,
		backgroundColor: 'red',
		marginLeft: "30%",
		marginTop: "10%"
	},
	textFrontPage: {
		fontSize: 25,
		fontWeight: "200",
		color: "white",
		fontFamily: (Platform.OS === "ios") ? "Avenir-Medium" : "serif"
	},
	fpBackground: {
		width: "100%",
		height: "100%",
		backgroundColor: "#055C9D",
		color: "white",

	},
	infoContainer: {
		textAlign: "center",
		marginTop: "70%",
		marginLeft: "15%",
		width: "100%",
		backgroundColor: "#055C9D",
		color: "white",

	},
});