var tbody = document.querySelector("#table tbody");
var dataset = []; //화면과 데이터를 일치시켜줘야 한다.

var flag = false;
var open = 0;
var code = {
  연칸: -1,
  물음표: -2,
  깃발: -3,
  깃발지뢰: -4,
  물음표지뢰: -5,
  지뢰: 1,
  보통칸: 0,
};
document.querySelector("#exec").addEventListener("click", function () {
  tbody.innerHTML = ""; //실행할때마다 내부내용을 지움
  dataset = [];
  opend = 0;
  flag = false;
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
  while (numbers.length > hor * ver - mine) {
    var ranNum = numbers.splice(
      Math.floor(Math.random() * numbers.length),
      1
    )[0];
    suffle.push(ranNum);
  }
  console.log(suffle);

  for (var i = 0; i < ver; i += 1) {
    //세로를 먼저 만들어야한다.
    var arr = [];
    var tr = document.createElement("tr");
    dataset.push(arr);
    for (var j = 0; j < hor; j += 1) {
      arr.push(code.보통칸); //데이터가 빈칸일때 1을 넣어줘야함. (기본값)
      var td = document.createElement("td");
      td.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        if (flag) {
          return;
        }
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
          if (dataset[jul][kan] === code.지뢰) {
            dataset[jul][kan] = code.깃발지뢰;
          } else {
            dataset[jul][kan] = code.깃발;
          }
        } else if (e.currentTarget.textContent === "!") {
          e.currentTarget.textContent = "?";
          if (dataset[jul][kan] === code.깃발지뢰) {
            dataset[jul][kan] = code.물음표지뢰;
          } else {
            dataset[jul][kan] = code.물음표;
          }
        } else if (e.currentTarget.textContent === "?") {
          //원래값이 빈값이면 빈값으로, 지뢰면 지뢰로
          if (dataset[jul][kan] === code.물음표지뢰) {
            e.currentTarget.textContent = "X";
            dataset[jul][kan] = code.지뢰;
          } else {
            e.currentTarget.textContent = "";
            dataset[jul][kan] = code.보통칸;
          }
        }
      });

      td.addEventListener("click", function (e) {
        if (flag) {
          return;
        }
        //클릭시 지뢰갯수 나오게
        var momTr = e.currentTarget.parentNode;
        var momTbody = e.currentTarget.parentNode.parentNode;
        var kan = Array.prototype.indexOf.call(momTr.children, e.currentTarget);
        var jul = Array.prototype.indexOf.call(momTbody.children, momTr);

        if (
          [
            code.연칸,
            code.깃발,
            code.깃발지뢰,
            code.물음표지뢰,
            code.물음표,
          ].includes(dataset[jul][kan])
        ) {
          return;
        }

        //클릭했을때
        e.currentTarget.classList.add("opened");
        opend += 1;
        if (dataset[jul][kan] === code.지뢰) {
          e.currentTarget.textContent = "펑";
          document.querySelector(".result").textContent = "실패ㅠㅠ";
          flag = true;
        } else {
          //주변 지뢰개수
          var around = [dataset[jul][kan - 1], dataset[jul][kan + 1]];
          if (dataset[jul - 1]) {
            around = around.concat([
              dataset[jul - 1][kan - 1],
              dataset[jul - 1][kan],
              dataset[jul - 1][kan + 1],
            ]);
          }
          if (dataset[jul + 1]) {
            around = around.concat([
              dataset[jul + 1][kan - 1],
              dataset[jul + 1][kan],
              dataset[jul + 1][kan + 1],
            ]);
          }
          console.log(around);
          var aroundNum = around.filter(function (v) {
            return [code.지뢰, code.깃발지뢰, code.물음표지뢰].includes(v);
          }).length;
          e.currentTarget.textContent = aroundNum || "";
          dataset[jul][kan] = code.연칸;
          if (aroundNum === 0) {
            //주변에 지뢰가 없다면

            // 주변 8칸 동시 오픈(재귀함수)
            var around = [];
            if (tbody.children[jul - 1]) {
              around = around.concat([
                tbody.children[jul - 1].children[kan - 1],
                tbody.children[jul - 1].children[kan],
                tbody.children[jul - 1].children[kan + 1],
              ]);
            }
            around = around.concat([
              tbody.children[jul].children[kan - 1],
              tbody.children[jul].children[kan + 1],
            ]);
            if (tbody.children[jul + 1]) {
              around = around.concat([
                tbody.children[jul + 1].children[kan - 1],
                tbody.children[jul + 1].children[kan],
                tbody.children[jul + 1].children[kan + 1],
              ]);
            }
            around
              .filter(function (v) {
                return !!v;
              })
              .forEach(function (next) {
                var momTr = next.parentNode;
                var momTbody = next.parentNode.parentNode;
                var nextKan = Array.prototype.indexOf.call(
                  momTr.children,
                  next
                );
                var nextJul = Array.prototype.indexOf.call(
                  momTbody.children,
                  momTr
                );
                if (dataset[nextKan][nextJul] !== code.연칸) {
                  next.click();
                }
              });
          }
          if (opend === hor * ver - mine) {
            flag = true;
            document.querySelector(".result").textContent = "승리";
          }
        }
      });

      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  //지뢰심기
  for (var k = 0; k < suffle.length; k++) {
    var sero = Math.floor(suffle[k] / ver);
    var garo = suffle[k] % ver;

    tbody.children[sero].children[garo].textContent = "X";
    dataset[sero][garo] = code.지뢰;
  }
});
