import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av'

export default function App() {
  const [started, setStarted] = useState(false)
  // const [results, setResults] = useState([])
  // let recording = new Audio.Recording()
  const [recording, setRecording] = useState()
  const [recordings, setRecordings] = useState([])

  useEffect(() => {
    // Voice.onSpeechError = onSpeechError
    // Voice.onSpeechResults = onSpeechResults

    // return() => {
    //   Voice.destroy().then(Voice.removeAllListeners)
    // }
  }, [])

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        })

        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await recording.startAsync();
        setStarted(true)
      } else {
        setMessage('perms not granted')
      }
    } catch (err) {
      console.log('ig there wa s an error', JSON.stringify(err))
    }
    // setStarted(true)
  }

  const stopRecording = async () => {
    // setRecording(undefined)
    setStarted(false)
    const { s } = await recording.getStatusAsync();
    console.log(s)

    try {
      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()
      console.log(uri)
    } catch (e) {
      // if (e.message.includes("Un")) {
      //   await Audio.unloadAudioRecorder();
      //   await recording._cleanupForUnloadedRecorder({durationMillis: 0});
      // } else {
      //   await handleError(e, {userMessage: "An error occurred stopping the recording."});
      // }
    } finally {
      recording = undefined;
      // timerStop();
      success = true;
    }
    let updatedRecordings = [...recordings];
    const { sound, status } = recording.createdNewLoadedSoundAsync()
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    })

    setRecordings(updatedRecordings)

  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  // const onSpeechResults = (result) => {
  //   setResults(result.value)
  //   console.log(result)
  // }

  // const onSpeechError = (error) => {
  //   console.log(error)
  // }

  return (
    <View style={styles.container}>
      <Button
        title={started ? 'stopRecording' : 'startRecoding'}
        onPress={started ? stopRecording : startRecording}
      />
      {/* {results.map((result, index) => <Text>{result}</Text>)} */}
      <Text>Open up App.js to start working on your app!</Text>
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
