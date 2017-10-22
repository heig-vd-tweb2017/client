/* eslint no-undef: "error" */
/* global Chart: true */

const red = 'rgb(249, 42, 42)';
const blue = 'rgb(2, 65, 252)';
const gold = 'rgb(255, 215, 0)';
const silver = 'rgb(192, 192, 192)';
const bronze = 'rgb(205, 127, 50)';

class LineChart {
  /**
   * Generate a line chart.
   * @param {string} canvasId The canvas ID.
   * @param {array} graphLabels An array of labels for the graph.
   * @param {array} openedIssues An array with the opened issues.
   * @param {array} closedIssues An array with the closed issues.
   */
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
        legend: {
          display: true,
          reverse: true,
          position: 'top',
        },
        responsive: true,
        showLines: true,
        elements: {
          line: {
            tension: 0, // disables bezier curves
          },
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'linear',
          }],
        }
      },
    };

    const canvas = document.getElementById(canvasId).getContext('2d');

    this.chart = new Chart(canvas, this.config);
  }

  /**
   * Reset the chart.
   */
  reset() {
    this.labels = [];
    this.updateClosedIssues([], []);
    this.updateOpenedIssues([], []);
  }

  /**
   * Refresh the graph with the new opened issues data.
   * @param {array} newLabels An array with the new graph's labels.
   * @param {array} newData An array with the new graph's data.
   */
  updateOpenedIssues(newLabels, newData) {
    const { data } = this.config;

    this.labels = [...new Set([...this.labels, ...newLabels])];
    data.labels = this.labels;
    data.datasets[0].data = newData;
    data.datasets[1].data = data.datasets[1].data;

    this.chart.config.data = data;
    this.chart.update(0);
  }

  /**
   * Refresh the graph with the new closed issues data.
   * @param {array} newLabels An array with the new graph's labels.
   * @param {array} newData An array with the new graph's data.
   */
  updateClosedIssues(newLabels, newData) {
    const { data } = this.config;

    this.labels = [...new Set([...this.labels, ...newLabels])];
    data.labels = this.labels;
    data.datasets[0].data = data.datasets[0].data;
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
          backgroundColor: [silver, gold, bronze],
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
   * Reset the chart.
   */
  reset() {
    this.update([], []);
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
