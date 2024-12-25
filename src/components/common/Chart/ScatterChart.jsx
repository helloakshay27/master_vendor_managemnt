import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { chartOptions } from '../../../constant/data';

const ScatterChart = ({graphData,selectedFilter }) => {
 console.log("graph data:",graphData)

 // Map the data to Highcharts-friendly format
const formattedData = graphData.map(item => {
  const date = new Date(item.data[0]); // Parse the date string
  const value = parseFloat(item.data[1]); // Convert the value to a number

  // Map of selectedFilter values to human-readable strings
  const filterMap = {
    product_price: 'Product Price',
    product_total: 'Product Total',
    gross_total: 'Gross Total', // Formatting "gross_total" to "Gross Total"
    // Add more filters as needed
  };

  // Get the human-readable version of the selected filter, fallback to selectedFilter if not found
  const formattedFilter = filterMap[selectedFilter] || selectedFilter;


  return {
    name: `${item.name} - ${formattedFilter}`,
    // lable:selectedFilter,
    data: [[
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes()), // UTC timestamp
      value // corresponding value
    ]]
  };
});
 console.log("selected f:",selectedFilter)

console.log("formated date graph:",formattedData)
  const options = {
    chart: {
      type: "scatter",
      zoomType: "xy",
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      title: {
        text: null,
      },
      labels: {
        format: "{value:%m/%d %H:%M %p}",
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        format: "₹{value}",
      },
    },
    legend: {
      enabled: true,
    },
    // series: [
    //   {
    //     name: "MORAINE GROUP",
    //     data: [
    //       [Date.UTC(2024, 3, 2, 22, 23), 13000],
    //       [Date.UTC(2024, 3, 2, 16, 11), 10000],
    //     ],
    //   },
    //   // {
    //   //   name: "OMFURN INDIA LIMITED",
    //   //   data: [
    //   //     [Date.UTC(2024, 3, 2, 19, 48), 14200],
    //   //     [Date.UTC(2024, 3, 2, 15, 36), 10800],
    //   //   ],
    //   // },
    // ],
   
    series: formattedData,
  };

  
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ScatterChart;
