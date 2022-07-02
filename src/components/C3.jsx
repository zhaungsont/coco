import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';



export default function C3() {

    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
        },
        maintainAspectRatio:false,
    };

    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']

    const data = {
        labels,
        datasets: [
        {
            label: 'Dataset 1',
            data: [273, -158, -789, 672, -481, -879, -747, 273, -158, -789, 672, -481, -879, -747, 273, -158, -789, 672, -481, -879, -747, 800, 959],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [-405, -383, -661, -305, -348, 629, -189, -789, 672, -481, -879, -747, 273, -158, -158, -789, 672, -481, 247, -556, 108, 794, -300],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        ],
    };

    return (
        <div>
            C3
            <div style={{height:'15rem'}}>
                <Line options={options} data={data} />
            </div>
        </div>
    )
}
