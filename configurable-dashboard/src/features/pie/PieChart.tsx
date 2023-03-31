import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from 'chart.js'
// import { Typography, Popper, Fade, Box, Switch, Slider, TextField, Stack, IconButton, ClickAwayListener, Button, Autocomplete } from "@mui/material";
// import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

Chart.register(ArcElement);

type PieChartData = {
  labels: string[];
  data: number[];
};

type PieChartProps = {
  title: string;
  legendTitle: string;
  data: PieChartData;
};

export default function PieChart({ title, legendTitle, data }: PieChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.data,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#00FF7F",
          "#FF7F50",
          "#DC143C",
          "#8B008B",
          "#FFFF00",
          "#00CED1",
          "#FFA500",
        ],
      },
    ],
  };

  return (
    <div>

      <h2>{title}</h2>
      <Pie data={chartData} />
      <div>
        <h3>{legendTitle}</h3>
        <ul>
          {data.labels.map((label, index) => (
            <li key={label}>
              <span
                style={{
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                  display: "inline-block",
                  height: "20px",
                  marginRight: "10px",
                  width: "20px",
                }}
              ></span>
              {label} - {data.data[index]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

