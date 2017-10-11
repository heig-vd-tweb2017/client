/*
 var place = ["Second", "First", "Third"];
 var color = Chart.helpers.color;
 var barChartData = {
     labels: ["Second", "First", "Third"],
     datasets: [{
         label: 'Dataset 1',
         backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
         borderColor: window.chartColors.red,
         borderWidth: 1,
         data: [
             3,9,6
         ]
     }]
 };


window.onload = function() {
    var ctx = document.getElementById("opened-issues-chart").getContext("2d");
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart'
            }
        }
    });

};*/