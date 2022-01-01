import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
	DataSetCreator,
	GraphDataBuilder,
	chartConfig,
} from "../helpers/graph-databuilder";
const screenWidth = Dimensions.get("window").width;
const { io } = require("socket.io-client");

function Graph({ setRingData, deviceID }) {
	const [dataSet, setDataSet] = useState({
		labels: [""],
		datasets: [
			{
				data: [0],
				color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`, // optional
				strokeWidth: 1, // optional
			},
		],
		legend: ["Histories"], // optional
	});

	const getData = async () => {
		const result = await axios.get(
			`https://plus-api.herokuapp.com/api/device/history/${deviceID}`
		);
		const [fineData, currentTime] = GraphDataBuilder(result);
		const [label, value] = DataSetCreator(fineData, currentTime);
		setDataSet({
			labels: label.reverse().slice(value.length - 10, value.length),
			datasets: [
				{
					data: value.reverse().slice(value.length - 10, value.length),
					color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
					strokeWidth: 1,
				},
			],
			legend: [`${currentTime.toDateString()} / ${currentTime.toTimeString()}`], // optional
		});
	};

	const activateSocket = () => {
		const socket = io("wss://plus-api.herokuapp.com");
		socket.on(deviceID, async (data) => {
			const result = { data };
			const [fineData, currentTime] = GraphDataBuilder(result);
			const [label, value] = DataSetCreator(fineData, currentTime);
			setRingData({
				labels: "",
				data: [result.data.device.waterLevel / 100],
			});
			setDataSet({
				labels: label.reverse().slice(value.length - 10, value.length),
				datasets: [
					{
						data: value.reverse().slice(value.length - 10, value.length),
						color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
						strokeWidth: 1,
					},
				],
				legend: [
					`${currentTime.toDateString()} / ${currentTime.toTimeString()}`,
				],
			});
		});
	};

	useEffect(() => {
		getData();
		activateSocket();
	}, []);
	return (
		<LineChart
			data={dataSet}
			width={screenWidth}
			height={160}
			chartConfig={chartConfig}
			bezier
		/>
	);
}

export default Graph;
