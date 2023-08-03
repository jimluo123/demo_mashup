import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import Animated from "react-native-reanimated";
import WebView from "react-native-webview";
import { useAssets } from "expo-asset";
import { readAsStringAsync } from "expo-file-system";
import { StatusBar } from "expo-status-bar";

type LoadingProps = {
  visible: boolean;
  setVisible: (n: boolean) => void;
};

const Loading = (props: LoadingProps) => {
  const [html, setHtml] = useState("");
  const [index, indexLoadingError] = useAssets(
    require("./assets/animated_icons/index.html")
  );

  if (index) {
    readAsStringAsync(index[0].localUri as string).then((data) => {
      setHtml(data);
    });
  }

  //   useEffect(() => {
  //     console.log(html);
  //     console.log("aaa");
  //   }, [html]);

  return (
    <Modal visible={props.visible} animationType="fade">
      <StatusBar />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        {html.length > 0 && (
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
            }}
          >
            <WebView
              style={{ flex: 1 }}
              //   onLoad={() => console.log("loading")}
              //   onLoadEnd={() => console.log("finish")}
              source={{ html }}
              javaScriptEnabled
              originWhitelist={["*"]}
            />
          </View>
        )}
        <TouchableOpacity
          onPress={() => props.setVisible(false)}
          style={{ marginBottom: 60 }}
        >
          <Text style={{ color: "white" }}>Hide</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({});
