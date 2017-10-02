$(() => {
  $('#search-button').click(() => {
    const input = $('#search-input').val();

    const request = $.ajax({
      url: 'http://localhost:8080/test.php',
      method: 'POST',
      data: {
        targetUrl: input,
      },
      dataType: 'json',
    });

    request.done((msg) => {
      alert(msg);
    });

    request.fail((jqXHR, textStatus) => {
      alert( "Request failed: " + textStatus );
    });
  });
});
