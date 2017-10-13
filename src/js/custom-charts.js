/* eslint no-undef: "error" */
/* global Chart: true */

const red = 'rgb(255, 99, 132)';
const orange = 'rgb(255, 159, 64)';
const yellow = 'rgb(255, 205, 86)';
const green = 'rgb(75, 192, 192)';
const blue = 'rgb(54, 162, 235)';
const purple = 'rgb(153, 102, 255)';
const grey = 'rgb(201, 203, 207)';

class LineChart {
  constructor(canvasId, graphLabels, openedIssues, closedIssues) {
    this.config = {
      type: 'line',
      data: {
        labels: graphLabels,
        datasets: [{
          label: 'Issues opened',
          backgroundColor: red,
          borderColor: red,
          fill: false,
          data: openedIssues,
        }, {
          label: 'Issues closed',
          backgroundColor: blue,
          borderColor: blue,
          fill: false,
          data: closedIssues,
        }],
      },
      options: {
        title: {
          text: 'Total issues opened and closed',
        },
      },
    };

    const canvas = document.getElementById(canvasId).getContext('2d');

    this.chart = new Chart(canvas, this.config);
  }

  updateData(newLabels, newOpenedIssues, newClosedIssues) {
    const { data } = this.config;

    data.labels = newLabels;
    data.datasets[0].data = newOpenedIssues;
    data.datasets[1].data = newClosedIssues;

    this.chart.config.data = data;
    this.chart.update();
  }
}

class BarChart {
  /**
   * The constructor.
   * @param {string} canvasId ID of the canvas where the graph will show.
   * @param {array} chartData An array with the graph's data.
   */
  constructor(canvasId, chartData) {
    this.config = {
      type: 'bar',
      data: {
        labels: ['Second', 'First', 'Third'],
        datasets: [{
          backgroundColor: [orange, green, yellow],
          borderColor: [orange, green, yellow],
          borderWidth: 1,
          scaleStartValue: 0,
          data: chartData,
        }],
      },
      options: {
        responsive: true,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    };

    const canvas = document.getElementById(canvasId).getContext('2d');

    this.chart = new Chart(canvas, this.config);
  }

  /**
   * Refresh the graph with the new data.
   * @param {array} newData An array with the new graph's data.
   */
  updateData(newData) {
    const { data } = this.config;

    data.datasets[0].data = newData;

    this.chart.config.data = data;
    this.chart.update();
  }
}
