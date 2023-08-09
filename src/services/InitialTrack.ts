import TrackPlayer from "react-native-track-player";
import { songsList } from "../../songs";

export const InitalSongs = async () => {
  await TrackPlayer.add(songsList);
};
