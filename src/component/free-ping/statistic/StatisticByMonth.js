import {Chart} from "react-chartjs-2";
import React, {useEffect, useState} from "react";
import {BarElement, CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement} from "chart.js";
import isNull from "../../../mixin/global/isNull";
import api from "../../../api/api";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import priceFormatter from "../../../mixin/global/priceFormatter";

export default function ({pageId, pingId}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        if (!isNull(pageId)) {
            setData((await api.freeping.statistic.byPageByYearGroupByMonth(pageId, 2024)));
            return;
        }

        if (!isNull(pingId)) {
            setData((await api.freeping.statistic.byPingByYearGroupByMonth(pingId, 2024)));
            return;
        }
    }
    if (isNull(data)) return null;

    ChartJS.register(CategoryScale);
    ChartJS.register(LinearScale);
    ChartJS.register(PointElement);
    ChartJS.register(LineElement);
    ChartJS.register(BarElement);
    ChartJS.register(ChartDataLabels);

    return (
        <div>
            <Chart
                data={{
                    labels: data.labels,
                    datasets: [
                        {
                            type: "bar",
                            label: "label 2",
                            data: data.data,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            backgroundColor: "rgb(103,158,56)"
                        }
                    ]
                }}
                options={{
                    plugins: {
                        datalabels: {
                            color: "#004c3f",
                            anchor: 'center',
                            align: 'center',
                            formatter: data => {
                                return priceFormatter(data) + " %"
                            },
                            font: {
                                weight: 'bold'
                            }
                        }
                    }
                }}
                className={"bg-gray-800 text-black"}
            />
        </div>

    )
}