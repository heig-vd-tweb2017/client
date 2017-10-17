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
    this.labels = [];

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
        showLines: true,
        elements: {
          line: {
            tension: 0, // disables bezier curves
          },
        },
      },
    };

    const canvas = document.getElementById(canvasId).getContext('2d');

    this.chart = new Chart(canvas, this.config);
  }

  updateOpenedIssues(newLabels, newData) {
    const { data } = this.config;

    this.labels = [...new Set([...this.labels, ...newLabels])];
    data.labels = this.labels;
    data.datasets[0].data = newData;

    this.chart.config.data = data;
    this.chart.update(0);
  }

  updateClosedIssues(newLabels, newData) {
    const { data } = this.config;

    this.labels = [...new Set([...this.labels, ...newLabels])];
    data.labels = this.labels;
    data.datasets[1].data = newData;

    this.chart.config.data = data;
    this.chart.update(0);
  }
}

class BarChart {
  /**
   * The constructor.
   * @param {string} canvasId ID of the canvas where the graph will show.
   * @param {array} chartLabels An array with the graph's labels.
   * @param {array} chartData An array with the graph's data.
   */
  constructor(canvasId, chartLabels, chartData) {
    this.config = {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [{
          // backgroundColor: [orange, green, yellow],
          // borderColor: [orange, green, yellow],
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
   * @param {array} newLabels An array with the new graph's labels.
   * @param {array} newData An array with the new graph's data.
   */
  update(newLabels, newData) {
    const { data } = this.config;

    data.labels = newLabels;
    data.datasets[0].data = newData;

    this.chart.config.data = data;
    this.chart.update(0);
  }
}
