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
    for (let i = 0; i < this.data[0].length; i++) {
      this.myTable += '<tr>';
      for (let j = 0; j < this.data.length; j++) {
        this.myTable += `<td>${this.data[j][i]}</td>`;
      }
      this.myTable += '</tr>';
    }
    // Construction fin de tableau
    this.myTable += '</table>';
    // Injecte le tableau
    document.getElementById(this.id).innerHTML = this.myTable;
  }
}

// Test jeux de données fictifs
const totalTitle = ['Date', 'Issues Opened', 'Date', 'Issues Closed'];
const myArray = new Array(4, 3);
myArray[0] = ['10 oct 2017', '2 octobre 2017', '13 septembre 2017', '4 septembre 2017', '5 aout 2017', '16 juillet 2017', '12 juillet 2017', '8 juillet 2017'];
myArray[1] = [1, 2.218, 33, 114, 5, 33, 114, 5];
myArray[2] = ['10 oct 2017', '2 octobre 2017', '13 septembre 2017', '4 septembre 2017', '5 aout 2017', '16 juillet 2017', '12 juillet 2017', '8 juillet 2017'];
myArray[3] = [1, 2.218, 33, 114, 5, 33, 114, 5];
const tableTotal = new tableHtml(totalTitle, myArray, 'total-issues-table');

const openedTitle = ['Position', 'Name', 'Issues Oppened'];
const openedArray = new Array(3, 3);
openedArray[0] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
openedArray[1] = ['Jean', 'Pierre', 'Loanne', 'Julie', 'Marc', 'Jack', 'Lucie', 'Pascal', 'Josh', 'Marie'];
openedArray[2] = [85, 70, 65, 50, 46, 35, 24, 20, 19, 5];
const tableOpened = new tableHtml(openedTitle, openedArray, 'opened-issues-table');

const closedTitle = ['Position', 'Name', 'Issues Closed'];
const closedArray = new Array(3, 3);
closedArray[0] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
closedArray[1] = ['Jean', 'Pierre', 'Loanne', 'Julie', 'Marc', 'Jack', 'Lucie', 'Pascal', 'Josh', 'Marie'];
closedArray[2] = [85, 70, 65, 50, 46, 35, 24, 20, 19, 5];
const tableClosed = new tableHtml(closedTitle, closedArray, 'closed-issues-table');

const testUpdate = new Array(4, 3);
testUpdate[0] = ['10 oct 2017', '2 octobre 2017', '13 septembre 2017', '4 septembre 2017', '5 aout 2017', '16 juillet 2017', '12 juillet 2017', '8 juillet 2017'];
testUpdate[1] = [1, 2, 3, 4, 5, 6, 7, 8];
testUpdate[2] = ['10 oct 2017', '2 octobre 2017', '13 septembre 2017', '4 septembre 2017', '5 aout 2017', '16 juillet 2017', '12 juillet 2017', '8 juillet 2017'];
testUpdate[3] = [3, 5, 87, 13, 546, 2, 62, 91];
tableTotal.setData(testUpdate);
