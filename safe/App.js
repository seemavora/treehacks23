import React, { useState, useRef } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { Audio } from "expo-av";

export default function App() {

  const AudioRecorder = useRef(new Audio.Recording());
  const AudioPlayer = useRef(new Audio.Sound());

  const [audioURI, setAudioURI] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const startRecording = async () => {
    const permission = await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true
    })

    try {
      await AudioRecorder.current.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      )

      await AudioRecorder.current.startAsync()
      setIsRecording(true)

    } catch (error) {
      console.log(error)
    }
  }

  const stopRecording = async () => {
    try {
      await AudioRecorder.current.stopAndUnloadAsync();
      const uri = AudioRecorder.current.getURI();
      if (uri) 
        setAudioURI(uri);
      AudioRecorder.current = new Audio.Recording();
      setIsRecording(false);
    } catch (error) { 
      console.log(error)
    }
  }

  const playRecording = async () => {
    try {
      await AudioPlayer.current.loadAsync({ uri: audioURI }, {}, true);
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          AudioPlayer.current.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) { 
      console.log(error)
    }
  }

  const stopPlaying = async () => {
    try {
      const playerStatus = await AudioPlayer.current.getStatusAsync();
      if (playerStatus.isLoaded === true)
        await AudioPlayer.current.unloadAsync();
      setIsPlaying(false);
    } catch (error) { 
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        color={isRecording ? "red" : "purple"}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <Button
        title={isPlaying ? "Stop Sound" : "Play Sound"}
        color={isPlaying ? "red" : "orange"}
        onPress={isPlaying ? stopPlaying : playRecording}
      />
      <Text>{audioURI}</Text>
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

// source that finally worked: using refs to recording obj: https://stackoverflow.com/questions/67207450/how-can-i-play-a-sound-after-recording-in-react-native-expo
