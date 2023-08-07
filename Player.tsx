import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { songsList } from "./songs";
import Slider from "@react-native-community/slider";
import TrackPlayer, {
  Progress,
  State,
  useProgress,
} from "react-native-track-player";

type PlayerProps = {
  isVisible: boolean;
  songsList: any;
  currentIndex: number;
  playbackState: State;
  progress: Progress;
  onChange: (n: number) => void;
  onClose: (n: boolean) => void;
};

const Player = (props: PlayerProps) => {
  const process = useProgress();
  const [currentSongIndex, setCurrentSongIndex] = useState(props.currentIndex);
  const format = (seconds: number) => {
    let mins = parseInt((seconds / 60).toString())
      .toString()
      .padStart(2, "0");
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };
  const [cur, setCur] = useState(props.progress.position);

  const pressToJump = async (value: number) => {
    if (State.Playing == props.playbackState) {
      await TrackPlayer.seekTo(value);
    } else {
      process.position = value;
      setCur(value);
    }
  };
  useEffect(() => {
    setCurrentSongIndex(props.currentIndex);
  }, [props.currentIndex]);

  return (
    <Modal visible={props.isVisible} animationType="fade">
      <StatusBar />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Image
          source={{ uri: songsList[currentSongIndex].artwork }}
          style={{
            width: "80%",
            height: "35%",
            alignSelf: "center",
            marginTop: 20,
            borderRadius: 5,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            color: "white",
            fontWeight: "600",
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          {songsList[currentSongIndex].title}
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "white",
            fontWeight: "600",
            marginLeft: 20,
          }}
        >
          {songsList[currentSongIndex].artist}
        </Text>

        <Slider
          style={{ width: "90%", height: 40, alignSelf: "center" }}
          minimumValue={0}
          maximumValue={props.progress.duration}
          value={props.progress.position}
          onSlidingComplete={pressToJump}
          step={2}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#fff"
        />

        <View
          style={{
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "white" }}>
            {format(props.progress.position)}
          </Text>
          <Text style={{ color: "white" }}>
            {format(props.progress.duration)}
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
            alignSelf: "center",
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              if (currentSongIndex > 0) {
                await TrackPlayer.skip(currentSongIndex - 1);
                await TrackPlayer.play();
                setCurrentSongIndex(currentSongIndex - 1);
                props.onChange(currentSongIndex - 1);
              }
            }}
          >
            <Text style={{ width: 35, height: 35, color: "white" }}>
              上一曲
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={async () => {
              if (State.Playing == props.playbackState) {
                await TrackPlayer.pause();
                setCur(props.progress.position);
              } else {
                await TrackPlayer.skip(props.currentIndex);
                await TrackPlayer.seekTo(cur);
                await TrackPlayer.play();
              }
            }}
          >
            <Text style={{ width: 30, height: 30 }}>
              {State.Playing == props.playbackState ? "暂停" : "播放"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await TrackPlayer.skip(currentSongIndex + 1);
              await TrackPlayer.play();
              setCurrentSongIndex(currentSongIndex + 1);
              props.onChange(currentSongIndex + 1);
            }}
          >
            <Text style={{ width: 35, height: 35, color: "white" }}>
              下一曲
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => props.onClose}
          style={{ marginBottom: 60 }}
        >
          <Text style={{ color: "white" }}>Hide</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Player;

const styles = StyleSheet.create({});
