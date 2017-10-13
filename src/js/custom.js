/* eslint no-undef: "error" */
/* global LineChart BarChart moment */

$(() => {
  const dateFormat = 'D.M.YYYY';

  const defaultData = [('Second', 0), ('First', 0), ('Third', 0)];

  function newDate(days) {
    const date = moment().add(days, 'd');

    return date.format(dateFormat);
  }

  // TEMP, to refactor and delete
  const labels = [newDate(0), newDate(1), newDate(2), newDate(3),
    newDate(4), newDate(5), newDate(6)];
  const openedIssuesData = [30, 14, 6, 24, 70, 28, 92];
  const closedIssuesData = [5, 9, 13, 8, 14, 23, 5];

  const openedIssuesGraph = new BarChart('opened-issues-chart', defaultData);
  const closedIssuesGraph = new BarChart('closed-issues-chart', defaultData);
  const allIssuesGraph = new LineChart('total-issues-chart', labels, openedIssuesData, closedIssuesData);

  const url = 'https://evening-garden-52901.herokuapp.com';
  $('#search-button').click(() => {
    const input = $('#search-input').val();

    const request = input.replace('https://github.com/', '');

    const infos = request.split('/');

    const owner = infos[0];
    const repo = infos[1];

    const openedIssuesRequest = $.get(`${url}/api/opened-issues/${owner}/${repo}`);

    openedIssuesRequest.done((msg) => {
      console.log(msg);
    });

    openedIssuesRequest.fail((jqXHR, textStatus) => {
      console.log(`Request failed: ${textStatus}`);

      $('#total-issues-table').text('Coucou, je suis content ^_^');
    });

    const updatedDataClosed = [('Second', 0), ('First', 1), ('Third', 0)];
    closedIssuesGraph.updateData(updatedDataClosed);

    const newLabels = [newDate(10), newDate(11), newDate(21), newDate(31),
      newDate(41), newDate(51), newDate(61)];
    const newOpenedIssues = [300, 140, 60, 240, 700, 280, 920];
    const newClosedIssues = [50, 90, 13, 80, 14, 230, 5];

    allIssuesGraph.updateData(newLabels, newOpenedIssues, newClosedIssues);
  });
});
