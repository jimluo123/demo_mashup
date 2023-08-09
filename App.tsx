import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
import { InitalSongs, SetupService } from "./src/services";
import * as Progress from "react-native-progress";
import { AnimatedCircularProgress } from "react-native-circular-progress";
export default function App() {
  const isPlayerReady = useSetupPlayer();
  const width = Dimensions.get("screen").width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [sp, setSP] = useState(false);

  const progress = useProgress();
  const playbackState: any = usePlaybackState();

  useEffect(() => {
    if (!!playbackState && State.Playing == playbackState) {
      if (progress.position.toFixed(0) == progress.duration.toFixed(0)) {
        if (currentIndex < songsList.length) {
          setCurrentIndex(currentIndex + 1);
        }
      }
    }
  }, [progress]);

  useEffect(() => {
    function deepLinkHandler(data: { url: string }) {
      console.log("deepLinkHandler", data.url);
    }

    // This event will be fired when the app is already open and the notification is clicked
    const subscription = Linking.addEventListener("url", deepLinkHandler);

    // When you launch the closed app from the notification or any other link
    Linking.getInitialURL().then((url) => console.log("getInitialURL", url));

    return () => {
      subscription.remove();
    };
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Progress.Bar progress={0.3} width={200} />
      <AnimatedCircularProgress
        size={120}
        width={1}
        fill={30}
        rotation={0}
        tintColor="#00e0ff"
        onAnimationComplete={() => console.log("onAnimationComplete")}
        backgroundColor="black"
      >
        {() => <Text>{30}</Text>}
      </AnimatedCircularProgress>
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
        onClose={setSP}
      />
      <Loading visible={show} setVisible={setShow} />
    </SafeAreaView>
  );
}

function useSetupPlayer() {
  const [playerReady, setPlayerReady] = useState(false);
  useEffect(() => {
    let unmounted = false;
    (async () => {
      await SetupService();
      if (unmounted) return;
      setPlayerReady(true);
      const queue = await TrackPlayer.getQueue();
      if (unmounted) return;
      if (queue.length <= 0) {
        await InitalSongs();
      }
    })();
    return () => {
      unmounted = true;
    };
  }, []);
  return playerReady;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(128,128,128)",
    alignItems: "center",
    justifyContent: "center",
  },
});
