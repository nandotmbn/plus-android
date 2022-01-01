export function GraphDataBuilder(result) {
    const currentTime = new Date(
        result.data.histories[result.data.histories.length - 1].time
    );
    const lastTime = currentTime.toDateString();
    const lastHour = currentTime.getHours();
    const lastMinutes = currentTime.getMinutes();
    const data = [];
    for (let i = lastMinutes; i >= 1; i--) {
        result.data.histories.forEach((history) => {
            const historyTime = new Date(history.time);
            if (historyTime.toDateString() != lastTime) return;
            if (historyTime.getHours() != lastHour) return;
            if (historyTime.getMinutes() != i) return;
            const elem = {
                minutes: i,
                value: history.value,
            };

            data.push(elem);
        });
    }
    const fineData = [];
    for (let i = lastMinutes; i >= 1; i--) {
        let forPush;
        data.forEach((datum) => {
            if (datum.minutes == i) forPush = datum;
        });
        let dataFix;
        if (forPush == undefined)
            dataFix = {
                minutes: i,
                value: 0,
            };
        else dataFix = forPush;
        fineData.push(dataFix);
    }

    return [fineData, currentTime]
}

export function DataSetCreator(data, currentTime) {
    const label = data.map((d) => d.minutes);
    const value = data.map((d) => d.value);

    return [label, value]
}

export const chartConfig = {
	backgroundGradientFrom: "gray",
	backgroundGradientFromOpacity: 1,
	backgroundGradientTo: "gray",
	backgroundGradientToOpacity: 1,
	color: (opacity = 1) => `rgba(0,255,255, ${opacity})`,
	strokeWidth: 3, // optional, default 3
	barPercentage: 0.5,
	useShadowColorFromDataset: false, // optional
};