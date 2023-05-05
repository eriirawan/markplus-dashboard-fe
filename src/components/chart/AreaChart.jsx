import { Box } from '@mui/system';
import React from 'react';
import { Line } from 'react-chartjs-2';

const AreaChart = ({ chartData, width, height, maxWidthLegend }) => {
  const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);

    let listContainer = legendContainer?.querySelector('ul');

    if (!listContainer) {
      listContainer = document.createElement('ul');
      listContainer.style.display = 'grid';
      listContainer.style.gridTemplateColumns = 'auto auto auto';
      listContainer.style.rowGap = '17px';
      listContainer.style.columnGap = '0px';

      listContainer.style.maxWidth = maxWidthLegend;
      listContainer.style.margin = 0;
      listContainer.style.padding = 0;

      legendContainer.appendChild(listContainer);
    }

    return listContainer;
  };

  const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
      const ul = getOrCreateLegendList(chart, options.containerID);

      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }

      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);

      items.forEach((item) => {
        const li = document.createElement('li');
        li.style.alignItems = 'center';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.style.marginLeft = '10px';
        li.onclick = () => {
          const { type } = chart.config;
          if (type === 'pie' || type === 'doughnut') {
            // Pie and doughnut charts only have a single dataset and visibility is per item
            chart.toggleDataVisibility(item.index);
          } else {
            chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
          }
          chart.update();
        };

        // Color box
        const boxSpan = document.createElement('span');
        boxSpan.style.background = item.fillStyle;
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderWidth = item.lineWidth + 'px';
        boxSpan.style.display = 'inline-block';
        boxSpan.style.height = '20px';
        boxSpan.style.marginRight = '10px';
        boxSpan.style.width = '20px';

        // Text
        const textContainer = document.createElement('p');
        textContainer.style.color = item.fontColor;
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

        const text = document.createTextNode(item.text);
        textContainer?.appendChild(text);

        li?.appendChild(boxSpan);
        li?.appendChild(textContainer);
        ul?.appendChild(li);
      });
    },
  };
  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      htmlLegend: {
        // ID of the container to put the legend in
        containerID: 'legend-container-area',
      },
      legend: {
        display: false,
      },
      filler: {
        propagate: true,
      },
      'samples-filler-analyser': {
        target: 'chart-analyser',
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          // lineWidth: function (context) {
          //   return context?.index === 0 ? 0 : 1; // <-- this removes the base line
          // }
          lineWidth: 0,
        },
        ticks: {
          crossAlign: 'far',
        },
      },
      x: {
        offset: true,
        display: true,
        tick: {
          display: false,
        },
        grid: {
          lineWidth: 1, // <-- this removes vertical lines between bars
        },
      },
    },
    // radius: 10,
    // interaction: {
    //   intersect: false,
    // },
    elements: {
      line: {
        tension: 0.4,
      },
      //   point: {
      //     radius: 0,
      //   },
    },
  };
  return (
    <Box>
      <Line data={chartData} width={width} height={height} options={options} plugins={[htmlLegendPlugin]}></Line>
      <Box display={'flex'} justifyContent={'center'} sx={{ marginTop: '24px' }} id="legend-container-area"></Box>
    </Box>
  );
};

export default AreaChart;
