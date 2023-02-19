import React, { useState, useRef } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from 'expo-file-system';
import axios from 'axios'

export default function App() {

  const AudioRecorder = useRef(new Audio.Recording());
  const AudioPlayer = useRef(new Audio.Sound());

  const [audioURI, setAudioURI] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [transcript, setTranscript] = useState('')

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
    getTranscription() //TODO move
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

  const getTranscription = async () => {
    setIsFetching(true)
    try {
      const  { uri }  = await FileSystem.getInfoAsync(audioURI)
      const formData = new FormData()
      formData.append('file', {
        // uri: Platform.OS === 'android' ? uri: uri.replace('file://', ''),
        uri,
        type: Platform.OS === 'ios' ? 'audio/x-wav' : 'audio/m4a',
        name: Platform.OS === 'ios' ? `${Date.now()}.wav` :`${Date.now()}.m4a`,
      })

      const { data } = await axios.post('http://localhost:3005/speech', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(res => console.log('rr'))
      .catch(err => console.log(JSON.stringify(err), 'what'))

      // const {data} = await axios.post('https://localhost:3005/speech', 'itsme', {
          
      //   }).then(res => console.log('rr'))
      //   .catch(err => console.log(JSON.stringify(err), 'what'))

      setTranscript(data.transcript)

    } catch(error) {
      console.log('error reading file',error)
    }
    setIsFetching(false)
  }

  const deleteRecordingFile = async() => {
    try {
      const info = await FileSystem.getInfoAsync(audioURI)
      await FileSystem.deleteAsync(info.uri)
    } catch(err) {

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
      <Text>
        {transcript}
      </Text>
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
