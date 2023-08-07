import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { CircularPacking } from "./CircularPacking";
import { data } from "./data";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Player from "./Player";
import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import { songsList } from "./songs";
import {
  AppKilledPlaybackBehavior,
  Capability,
  State,
} from "react-native-track-player/lib/constants";
export default function App() {
  const width = Dimensions.get("screen").width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [sp, setSP] = useState(false);

  const progress = useProgress();
  const playbackState: any = usePlaybackState();

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        // Media controls capabilities

        android: {
          // This is the default behavior
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        alwaysPauseOnInterruption: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
          Capability.Stop,
        ],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.JumpBackward,
          Capability.JumpForward,
        ],

        // Icons for the notification on Android (if you don't like the default ones)
      });
      await TrackPlayer.add(songsList);
    } catch (e) {}
  };

  useEffect(() => {
    setupPlayer();
  }, []);

  useEffect(() => {
    if (!!playbackState && State.Playing == playbackState) {
      if (progress.position.toFixed(0) == progress.duration.toFixed(0)) {
        if (currentIndex < songsList.length) {
          setCurrentIndex(currentIndex + 1);
        }
      }
    }
  }, [progress]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CircularPacking data={data} width={width} height={width} />
      <View
        style={{
          marginTop: "auto",
          display: "flex",
          marginBottom: 40,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity onPress={() => setShow(true)}>
          <Text>anime</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSP(true)}>
          <Text>player</Text>
        </TouchableOpacity>
      </View>
      <Player
        isVisible={sp}
        songsList={songsList}
        currentIndex={currentIndex}
        playbackState={playbackState}
        progress={progress}
        onChange={(x: number) => {
          setCurrentIndex(x);
        }}
        onClose={() => {
          setSP(false);
        }}
      />
      <Loading visible={show} setVisible={setShow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
