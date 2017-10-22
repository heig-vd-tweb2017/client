/* eslint no-undef: "error" */
/* global LineChart BarChart Table oboe */

$(() => {
  // Create all the objects
  const allIssuesGraph = new LineChart('total-issues-chart', [], [], []);
  const allIssuesTable = new Table('total-issues-table', ['Date', '# issues opened', '# issues closed'], []);

  const openedIssuesGraph = new BarChart('opened-issues-chart', [], []);
  const openedIssuesTable = new Table('opened-issues-table', ['User', '# issues opened'], []);

  const closedIssuesGraph = new BarChart('closed-issues-chart', [], []);
  const closedIssuesTable = new Table('closed-issues-table', ['User', '# issues closed'], []);

  // Define the API's URL
  const url = 'http://localhost:5050'; // 'https://evening-garden-52901.herokuapp.com';

  $('#search-button').click(() => {
    // Reset the graphs and tables
    allIssuesGraph.reset();
    allIssuesTable.reset();

    openedIssuesGraph.reset();
    openedIssuesTable.reset();

    closedIssuesGraph.reset();
    closedIssuesTable.reset();

    // Get the informations from the repository
    const input = $('#search-input').val();

    const request = input.replace('https', 'http').replace('http://github.com/', '');

    const infos = request.split('/');

    const owner = infos[0];
    const repo = infos[1];

    const tableTotalRows = new Map();

    // Get opened issues
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

        allIssuesTable.setBody(Array.from(tableTotalRows.values()));
      })
      .node('users', (element) => {
        const users = new Map(element);

        //  const usersGraphLabels = Array.from(users.keys());
        //        const usersGraphData = Array.from(users.values());
        const usersTableRows = Array.from(users).sort((a, b) => b[1] - a[1]);

        openedIssuesGraph.update([usersTableRows[1][0], usersTableRows[0][0], usersTableRows[2][0]], [usersTableRows[1][1], usersTableRows[0][1], usersTableRows[2][1]]);
        openedIssuesTable.setBody(usersTableRows);
      });

    // Get closed issues
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
        allIssuesTable.setBody(Array.from(tableTotalRows.values()));
      })
      .node('users', (element) => {
        const users = new Map(element);

        //  const usersGraphLabels = Array.from(users.keys());
        // const usersGraphData = Array.from(users.values());
        const usersTableRows = Array.from(users).sort((a, b) => b[1] - a[1]);

        closedIssuesGraph.update([usersTableRows[1][0], usersTableRows[0][0], usersTableRows[2][0]], [usersTableRows[1][1], usersTableRows[0][1], usersTableRows[2][1]]);
        closedIssuesTable.setBody(usersTableRows);
      });
  });
});
