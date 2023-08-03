import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { songsList } from "./songs";

type PlayerProps = {
  isVisible: boolean;
  songsList: any;
  currentIndex: number;
  playbackState: any;
  progress: any;
  onChange: (n: number) => void;
  onClose: (n: boolean) => void;
};

const Player = (props: PlayerProps) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(props.currentIndex);
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
