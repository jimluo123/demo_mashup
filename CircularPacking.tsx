import React, { useMemo } from "react";
import * as d3 from "d3";
import { Tree } from "./data";
import Svg, { Circle, Text } from "react-native-svg";

type CircularPackingProps = {
  width: number;
  height: number;
  data: Tree;
};

export const CircularPacking = ({
  width,
  height,
  data,
}: CircularPackingProps) => {
  const hierarchy = d3
    .hierarchy(data)
    .sum((d) => d.value)
    .sort((a, b) => b.value! - a.value!);

  const packGenerator = d3.pack<Tree>().size([width, height]).padding(4);
  const root = packGenerator(hierarchy);

  return (
    <Svg width={width} height={height} style={{ backgroundColor: "black" }}>
      {root
        .descendants()
        .slice(1)
        .map((node) => (
          <Circle
            key={node.data.name}
            cx={node.x}
            cy={node.y}
            r={node.r}
            // stroke="#553C9A"
            stroke="white"
            strokeWidth={2}
            // fill="#B794F4"
            fill="rgb(0,0,0)"
            fillOpacity={1}
          />
        ))}
      {root
        .descendants()
        .slice(1)
        .map((node) => (
          <Text
            key={node.data.name}
            x={node.x}
            y={node.y}
            fontSize={13}
            fontWeight={0.4}
            textAnchor="middle"
            alignmentBaseline="middle"
            stroke={"white"}
            fill={"white"}
          >
            {node.data.name}
          </Text>
        ))}
    </Svg>
  );
};
