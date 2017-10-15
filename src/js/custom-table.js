
const myArray = new Array();
myArray[0] = 1;
myArray[1] = 2.218;
myArray[2] = 33;
myArray[3] = 114.94;
myArray[4] = 5;
myArray[5] = 33;
myArray[6] = 114.980;
myArray[7] = 5;

ment.getElementById('total-issues-table').innerHTML = myTable;

class tableHtml {
  constructor(titleData, data, id) {
    this.titleData = titleData;
    this.data = data;
    this.id = id;
    this.myTable = '';
    this.build();
  }

  setData(data) {
    this.data = data;
    this.build();
  }

  build() {
    this.title = '';
    // Construction des titres
    for (let i = 0; i < this.titleData.length; i++) {
      this.title += `<th>${this.titleData[i]}</th>`;
    }

    // Construction de la table et ajout des titres
    this.myTable = `<table>${this.title}`;

    // Constructions des lignes
    for (let i = 0; i < this.data.length; i++) {
      this.myTable += `<tr><td>Number ${i} is:</td>`;
      this.data[i] = this.data[i].toFixed(3);
      this.myTable += `<td>${this.data[i]}</td>`;
      this.myTable += `<td>${this.data[i]}</td></tr>`;
    }
    // Construction fin de tableau
    this.myTable += '</table>';
    // Injecte le tableau
    document.getElementById(this.id).innerHTML = this.myTable;
  }
}

const totalTitle = ['Date', 'Issues Opened', 'Issues Closed'];
const tableTotal = new tableHtml(totalTitle, myArray, 'total-issues-table');
