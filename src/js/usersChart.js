Chart.defaults.global.legend.display = false; // Permet de retirer les labels des dataset

class BarChart {
  constructor(ctx, data) {
    this.data = data;
    this.ctx = ctx;
    this.place = ['Second', 'First', 'Third'];

    this.barData = {
      labels: this.place,
      datasets: [{
        backgroundColor: [orange, green, yellow],
        borderWidth: 1,
        data: this.data,
        fill: false,
      }],
    };

    this.options = {
      options: {
        responsive: false,
        scales: {
          xAxes: [{
            barPercentage: 0.5,
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{ 
            ticks: {
              min: 0,
              max: 6500,
              stepSize: 1,
            },
          }],
        },
      },
    };

    this.config = {
      type: 'bar',
      data: this.barData,
      options: this.options,
    };

    this.chart = new Chart(this.ctx, this.config);
  }

  updateData(newData) {
    this.chart.data.datasets.data = newData;
    this.chart.update();
  }
}

const dataOpened = [('Second', 12), ('First', 17), ('Third', 8)];
const dataClosed = [('Second', 8), ('First', 9), ('Third', 7)];

const chartOpened = new BarChart(document.getElementById('opened-issues-chart').getContext('2d'), dataOpened);
const chartClosed = new BarChart(document.getElementById('closed-issues-chart').getContext('2d'), dataClosed);

chartClosed.updateData([('Second', 2), ('First', 3), ('Third', 1)]);
