import React from "react";
import { Dimensions } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

function Circle({data}) {
    const chartConfig = {
		backgroundGradientFrom: "gray",
		backgroundGradientFromOpacity: 1,
		backgroundGradientTo: "gray",
		backgroundGradientToOpacity: 1,
		color: (opacity = 1) => `rgba(0,255,255, ${opacity})`,
		strokeWidth: 3, // optional, default 3
		barPercentage: 0.5,
		useShadowColorFromDataset: false, // optional
	};

	return (
		<ProgressChart
			data={data}
			width={screenWidth}
			height={150}
			strokeWidth={12}
			radius={52}
			chartConfig={chartConfig}
			hideLegend={true}
		/>
	);
}

export default Circle;
