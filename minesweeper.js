var tbody = document.querySelector("#table tbody");
var dataset = []; //화면과 데이터를 일치시켜줘야 한다.
document.querySelector("#exec").addEventListener("click", function () {
  tbody.innerHTML = ""; //실행할때마다 내부내용을 지움
  var hor = document.querySelector("#hor").value;
  var ver = document.querySelector("#ver").value;
  var mine = document.querySelector("#mine").value;

  //지뢰위치 뽑기
  var numbers = Array(hor * ver)
    .fill()
    .map(function (val, index) {
      return index;
    });

  var suffle = [];
  while (numbers.length > 80) {
    var ranNum = numbers.splice(Math.floor(Math.random() * numbers.length), 1);
    suffle.push(ranNum);
  }
  console.log(suffle);

  for (var i = 0; i < ver; i += 1) {
    //세로를 먼저 만들어야한다.
    var arr = [];
    var tr = document.createElement("tr");
    dataset.push(arr);
    for (var j = 0; j < hor; j += 1) {
      arr.push(1); //데이터가 빈칸일때 1을 넣어줘야함. (기본값)
      var td = document.createElement("td");
      td.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        var momTr = e.currentTarget.parentNode;
        var momTbody = e.currentTarget.parentNode.parentNode;
        var kan = Array.prototype.indexOf.call(momTr.children, e.currentTarget); //Array.prototype => 배열인척
        var jul = Array.prototype.indexOf.call(momTbody.children, momTr); //call(지정할 객체, 인자)
        console.log(momTr, momTbody, e.currentTarget, kan, jul);

        if (
          e.currentTarget.textContent === "" ||
          e.currentTarget.textContent === "X"
        ) {
          e.currentTarget.textContent = "!";
        } else if (e.currentTarget.textContent === "!") {
          e.currentTarget.textContent = "?";
        } else if (e.currentTarget.textContent === "?") {
          //원래값이 빈값이면 빈값으로, 지뢰면 지뢰로
          if (dataset[jul][kan] === 1) {
            //1은 빈칸의 데이터 값이다.
            e.currentTarget.textContent = "";
          } else if (dataset[jul][kan] === "X") {
            e.currentTarget.textContent = "X";
          }
        }
      });
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  //지뢰심기
  for (var k = 0; k < suffle.length; k++) {
    var sero = Math.floor(suffle[k] / 10);
    var garo = suffle[k] % 10;

    tbody.children[sero].children[garo].textContent = "X";
    dataset[sero][garo] = "X";
  }
});
