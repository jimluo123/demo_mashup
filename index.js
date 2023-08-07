// import { AppRegistry } from "react-native";
import { registerRootComponent } from "expo";
import App from "./App";
import { name as appName } from "./app.json";
import TrackPlayer from "react-native-track-player";

export const onRegisterPlayback = async () => {
  try {
    TrackPlayer.addEventListener("remote-play", () => {
      TrackPlayer.play();
    });

    TrackPlayer.addEventListener("remote-pause", () => {
      TrackPlayer.pause();
    });

    TrackPlayer.addEventListener("remote-next", () => {
      TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener("remote-previous", () => {
      TrackPlayer.skipToPrevious();
    });

    TrackPlayer.addEventListener("remote-stop", () => {
      TrackPlayer.destroy();
    });
  } catch (error) {
    console.log(error.message);
  }
};

// AppRegistry.registerComponent("main", () => App);
registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => onRegisterPlayback);
