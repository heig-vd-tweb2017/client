const red = 'rgb(255, 99, 132)';
const orange = 'rgb(255, 159, 64)';
const yellow = 'rgb(255, 205, 86)';
const green = 'rgb(75, 192, 192)';
const blue = 'rgb(54, 162, 235)';
const purple = 'rgb(153, 102, 255)';
const grey = 'rgb(201, 203, 207)';

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

    const canvas = document.getElementById(canvasId).getContext('2d')

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
