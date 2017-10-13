const red = 'rgb(255, 99, 132)';
const orange = 'rgb(255, 159, 64)';
const yellow = 'rgb(255, 205, 86)';
const green = 'rgb(75, 192, 192)';
const blue = 'rgb(54, 162, 235)';
const purple = 'rgb(153, 102, 255)';
const grey = 'rgb(201, 203, 207)';

Chart.defaults.global.legend.display = false; // Permet de retirer les labels des dataset

class BarChart {
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

  updateData(newData) {
    const data = {
      labels: ['Second', 'First', 'Third'],
      datasets: [{
        backgroundColor: [orange, green, yellow],
        borderColor: [orange, green, yellow],
        borderWidth: 1,
        scaleStartValue: 0,
        data: newData,
      }],
    };

    this.chart.config.data = data;
    this.chart.update();
  }
}

const dataClosed = [('Second', 500), ('First', 653), ('Third', 143)];

const chartClosed = new BarChart('closed-issues-chart', dataClosed);

const updatedDataClosed = [('Second', 0), ('First', 1), ('Third', 0)];


chartClosed.updateData(updatedDataClosed);
