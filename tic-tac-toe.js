var content = document.body;
var table = document.createElement("table");

var rows = [];
var columns = [];
var turn = "X";
var result = document.createElement("div");

var 비동기콜백 = function (e) {
  console.log(e.target); //칸
  console.log(e.target.parentNode); //줄
  console.log(e.target.parentNode.parentNode); //테이블

  var a = rows.indexOf(e.target.parentNode);
  console.log(a);
  var b = columns[a].indexOf(e.target);
  console.log(b);

  if (columns[a][b].textContent !== "") {
    console.log("빈칸아닙니다");
  } else {
    console.log("빈칸입니다");
    columns[a][b].textContent = turn;

    var bingo = false;

    //가로줄검사
    if (
      columns[a][0].textContent === turn &&
      columns[a][1].textContent === turn &&
      columns[a][2].textContent === turn
    ) {
      bingo = true;
    }

    //세로줄 검사
    if (
      columns[0][b].textContent === turn &&
      columns[1][b].textContent === turn &&
      columns[2][b].textContent === turn
    ) {
      bingo = true;
    }

    //대간석 검사
    if (a - b === 0) {
      if (
        columns[0][0].textContent === turn &&
        columns[1][1].textContent === turn &&
        columns[2][2].textContent === turn
      ) {
        bingo = true;
      }
    }
    if (Math.abs(a - b) === 2) {
      if (
        columns[0][2].textContent === turn &&
        columns[1][1].textContent === turn &&
        columns[2][0].textContent === turn
      ) {
        bingo = true;
      }
    }
    //다찼으면
    if (bingo) {
      result.textContent = turn + "님이 승리!";
      //이겼으면 초기화
      turn = "X";
      columns.forEach(function (row) {
        row.forEach(function (coulmn) {
          coulmn.textContent = "";
        });
      });
    } else {
      if (turn === "X") {
        turn = "O";
      } else {
        turn = "X";
      }
    }
  }
};

for (var i = 1; i <= 3; i += 1) {
  //큰for문: tr만들고 td,td,td -->3번 반복
  var row = document.createElement("tr");
  rows.push(row);
  columns.push([]); //먼저 빈칸을 만든다 (어려움)
  for (var j = 1; j <= 3; j += 1) {
    var column = document.createElement("td");
    column.addEventListener("click", 비동기콜백);
    columns[i - 1].push(column); //0,1,2번째에 각각 td,td,td
    row.appendChild(column); //줄마다 하나씩 추가(row밑에)
  }
  table.appendChild(row);
}

content.appendChild(table);
content.appendChild(result);
console.log(columns);
