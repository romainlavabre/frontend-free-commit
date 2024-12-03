import {useEffect, useState} from "react";
import api from "../../../api/api";
import {BarChart} from "@mui/x-charts";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import Typography from "@mui/material/Typography";

const chartSetting = {
    yAxis: [
        {
            label: 'Seconds',
        },
    ],
    width: window.screen.width - 100,
    height: window.screen.height - 250,
    series: [{dataKey: 'duration', label: 'Duration'}],
};

export default function () {
    const [result, setResult] = useState(null);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        setResult((await api.statistic.sumDuration()).data);
    }


    if (isNull(result)) return null;

    return (
        <>
            <BarChart
                dataset={result}
                xAxis={[{scaleType: "band", dataKey: "date"}]}
                {...chartSetting}
            />
            <Typography variant="body2" component="div" textAlign={"center"}>
                Total build duration by year & month (in seconds)
            </Typography>
        </>
    )
}