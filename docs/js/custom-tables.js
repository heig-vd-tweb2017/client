class Table {
  /**
   * The constructor.
   * @param {string} divId TheID of the div where the table will appear.
   * @param {array} columns The table's columns.
   * @param {array} rows The table's rows.
   */
  constructor(divId, columns, rows) {
    this.div = document.getElementById(divId);

    let table = '';

    table += '<div class="table-responsive">';
    table += '  <table class="table table-striped table-hover">';
    table += '    <thead>';
    table += '      <tr>';

    columns.forEach((column) => {
      table += `            <th>${column}</th>`;
    });

    table += '      </tr>';
    table += '    </thead>';
    table += '    <tbody>';

    // Body will come here later

    table += '    </tbody>';
    table += '  </table>';
    table += '</div>';

    // Insert the table in the div
    this.div.innerHTML = table;

    this.setBody(rows);
  }

  /**
   * Set the table's body with the rows.
   * @param {array} rows The new table's column.
   */
  setBody(rows) {
    const tableBody = this.div.getElementsByTagName('tbody')[0];

    // Reset the rows
    tableBody.innerHTML = '';

    let body = '';

    // Generate the table's rows
    rows.forEach((row) => {
      body += '      <tr>';

      // Generate the row's cells
      row.forEach((cell) => {
        body += `            <td>${cell}</td>`;
      });

      body += '      </tr>';
    });

    // Insert the body in the table
    tableBody.innerHTML = body;
  }

  /**
   * Reset the table.
   */
  reset() {
    this.setBody([]);
  }
}
