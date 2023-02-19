// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, Button, View } from 'react-native';
// import React, { useRef, useEffect, useState } from 'react';
// import { Audio } from 'expo-av'

// export default function App() {
//   const [started, setStarted] = useState(false)
//   const [results, setResults] = useState([])
//   let recording = new Audio.Recording()
//   // const [recording, setRecording] = useState()
//   const AudioRecorder = useRef(new Audio.Recording())
//   const AudioPlayer = useRef(new Audio.Sound())
//   const [RecordedURI, SetRecordedURI] = useState<string>("");
//   const [AudioPermission, SetAudioPermission] = useState<boolean>(false);
//   const [IsRecording, SetIsRecording] = useState<boolean>(false);
//   const [IsPLaying, SetIsPLaying] = useState<boolean>(false);


//   const [recordings, setRecordings] = useState([])

//   useEffect(() => {
//     // Voice.onSpeechError = onSpeechError
//     // Voice.onSpeechResults = onSpeechResults

//     // return() => {
//     //   Voice.destroy().then(Voice.removeAllListeners)
//     // }
//   }, [])

//   const startRecording = async () => {
//     try {
//       const permission = await Audio.requestPermissionsAsync();

//       if (permission.status === 'granted') {
//         await Audio.setAudioModeAsync({
//           allowsRecordingIOS: true,
//           playsInSilentModeIOS: true
//         })

//         const recording = new Audio.Recording();
//         await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
//         await recording.startAsync(); 
//         setRecording(recording);
//         setStarted(true)
//       } else {
//         setMessage('perms not granted')
//       }
//     } catch (err) {
//       console.log('ig there wa s an error', JSON.stringify(err))
//     }
//     // setStarted(true)
//   }

//   const stopRecording = async () => {
//     // setRecording(undefined)
//     setStarted(false)

//     try {
//       await recording.stopAndUnloadAsync()
//       const uri = recording.getURI()
//       console.log(uri, '???')
//     } catch (e) {
//       console.log(e)
//       // if (e.message.includes("Un")) {
//       //   await Audio.unloadAudioRecorder();
//       //   await recording._cleanupForUnloadedRecorder({durationMillis: 0});
//       // } else {
//       //   await handleError(e, {userMessage: "An error occurred stopping the recording."});
//       // }
//     } 
//     let updatedRecordings = [...recordings];
//     const { sound, status } = recording.createdNewLoadedSoundAsync()
//     updatedRecordings.push({
//       sound: sound,
//       duration: getDurationFormatted(status.durationMillis),
//       file: recording.getURI()
//     })

//     setRecordings(updatedRecordings)

//   }

//   function getDurationFormatted(millis) {
//     const minutes = millis / 1000 / 60;
//     const minutesDisplay = Math.floor(minutes);
//     const seconds = Math.round((minutes - minutesDisplay) * 60);
//     const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
//     return `${minutesDisplay}:${secondsDisplay}`;
//   }

//   // const onSpeechResults = (result) => {
//   //   setResults(result.value)
//   //   console.log(result)
//   // }

//   // const onSpeechError = (error) => {
//   //   console.log(error)
//   // }

//   return (
//     <View style={styles.container}>
//       <Button
//         title={started ? 'stopRecording' : 'startRecoding'}
//         onPress={started ? stopRecording : startRecording}
//       />
//       {/* {results.map((result, index) => <Text>{result}</Text>)} */}
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
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
