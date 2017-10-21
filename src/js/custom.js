/* eslint no-undef: "error" */
/* global LineChart BarChart Table oboe */

$(() => {
  const openedIssuesGraph = new BarChart('opened-issues-chart', [], []);
  const closedIssuesGraph = new BarChart('closed-issues-chart', [], []);
  const allIssuesGraph = new LineChart('total-issues-chart', [], [], []);

  const totalIssuesTable = new Table('total-issues-table', ['Date', '# issues opened', '# issues closed'], []);
  const openedIssuesTable = new Table('opened-issues-table', ['User', '# issues opened'], []);
  const closedIssuesTable = new Table('closed-issues-table', ['User', '# issues closed'], []);


  const url = 'http://localhost:5050'; // 'https://evening-garden-52901.herokuapp.com';
  $('#search-button').click(() => {
    const tableTotalRows = new Map();
    const input = $('#search-input').val();

    const request = input.replace('https', 'http').replace('http://github.com/', '');

    const infos = request.split('/');

    const owner = infos[0];
    const repo = infos[1];

    oboe(`${url}/api/opened-issues/${owner}/${repo}`)
      .node('dates', (element) => {
        const dates = new Map(element);

        const datesLabels = Array.from(dates.keys());
        const datesData = [];

        dates.forEach((value, key) => {
          datesData.push({
            x: `new newDateString(${key})`,
            y: value,
          });
          if (!tableTotalRows.has(key)) {
            tableTotalRows.set(key, [key, value, 0]);
          } else {
            tableTotalRows.set(key, [key, value, tableTotalRows.get(key)[2]]);
          }
        });

        allIssuesGraph.updateOpenedIssues(datesLabels, datesData);

        totalIssuesTable.setBody(Array.from(tableTotalRows.values()));
      })
      .node('users', (element) => {
        const users = new Map(element);

        //  const usersGraphLabels = Array.from(users.keys());
        //        const usersGraphData = Array.from(users.values());
        const usersTableRows = Array.from(users).sort((a, b) => b[1] - a[1]);

        openedIssuesGraph.update([usersTableRows[0][0], usersTableRows[1][0], usersTableRows[2][0]], [usersTableRows[0][1], usersTableRows[1][1], usersTableRows[2][1]]);
        openedIssuesTable.setBody(usersTableRows);
      });

    oboe(`${url}/api/closed-issues/${owner}/${repo}`)
      .node('dates', (element) => {
        const dates = new Map(element);

        const datesLabels = Array.from(dates.keys());
        const datesData = [];

        dates.forEach((value, key) => {
          datesData.push({
            x: `new newDateString(${key})`,
            y: value,
          });
          if (!tableTotalRows.has(key)) {
            tableTotalRows.set(key, [key, 0, value]);
          } else {
            tableTotalRows.set(key, [key, tableTotalRows.get(key)[1], value]);
          }
        });

        allIssuesGraph.updateClosedIssues(datesLabels, datesData);
        totalIssuesTable.setBody(Array.from(tableTotalRows.values()));
      })
      .node('users', (element) => {
        const users = new Map(element);

        //  const usersGraphLabels = Array.from(users.keys());
        // const usersGraphData = Array.from(users.values());
        const usersTableRows = Array.from(users).sort((a, b) => b[1] - a[1]);

        closedIssuesGraph.update([usersTableRows[0][0], usersTableRows[1][0], usersTableRows[2][0]], [usersTableRows[0][1], usersTableRows[1][1], usersTableRows[2][1]]);
        closedIssuesTable.setBody(usersTableRows);
      });
  });
  document.getElementById('search-button').disabled = false;
});
