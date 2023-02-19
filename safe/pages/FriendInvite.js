import React from "react";
import { View, Image, Platform, Button, Text, TouchableOpacity } from "react-native";
import { Configuration, OpenAIApi } from "openai";
import "react-native-url-polyfill/auto";
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

    const response = async () => {
        try {
            const res = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: "You: What have you been up to?\nFriend: Watching old movies.\nYou: Did you watch anything interesting?\nFriend:",
                temperature: 0.5,
                max_tokens: 60,
                top_p: 1.0,
                frequency_penalty: 0.5,
                presence_penalty: 0.0,
                stop: ["You:"],

            })
            setResult(res);
            console.log("printing the res", res.data.choices[0]["text"]);
        }
        catch (e) {
            console.log(e);
        }
    }

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
                <Text>Generate</Text>
            </TouchableOpacity>
            <Text>result</Text>

        </View>
    )
}
