

$(() => {

  const defaultData = [('Second', 0), ('First', 0), ('Third', 0)];

  const openedIssues = new BarChart('opened-issues-chart', defaultData);
  const closedIssues = new BarChart('closed-issues-chart', defaultData);

  $('#search-button').click(() => {
    const input = $('#search-input').val();

    const request = input.replace('https://github.com/', '');

    const infos = request.split('/');

    const owner = infos[0];

    const repo = infos[1];

    const allIssuesRequest = $.ajax({
      url: `/api/${owner}/${repo}/all-issues`,
      method: 'POST',
      data: {
        targetUrl: input,
      },
      dataType: 'json',
    });

    allIssuesRequest.done((msg) => {
      console.log(msg);
    });

    allIssuesRequest.fail((jqXHR, textStatus) => {
      console.log(`Request failed: ${textStatus}`);

      $('#total-issues-table').text('Coucou, je suis content ^_^');
    });
    const updatedDataClosed = [('Second', 0), ('First', 1), ('Third', 0)];

    closedIssues.updateData(updatedDataClosed);

  });
});
