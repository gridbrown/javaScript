var content = document.body;

var number = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var arr = [];

for (var i = 0; i < 4; i += 1) {
  var num = number.splice(Math.floor(Math.random() * (9 - i)), 1)[0]; //배열이 아닌 숫자를위해 [0]해줌
  arr.push(num);
}
console.log(arr);

var result = document.createElement("h1");
content.append(result);
var form = document.createElement("form");
document.body.append(form);
var input = document.createElement("input");
form.append(input);
input.type = "text";
input.maxLength = 4;
var button = document.createElement("button");
button.textContent = "입력";
form.append(button);

var count = 0;
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var answer = input.value;

  if (answer === arr.join("")) {
    result.textContent = "홈런";
    input.value = "";
    input.focus();
    var number = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    var arr = [];

    for (var i = 0; i < 4; i += 1) {
      var num = number.splice(Math.floor(Math.random() * (9 - i)), 1)[0]; //배열이 아닌 숫자를위해 [0]해줌
      arr.push(num);
    }
  } else {
    //답 틀리면 스트라이크,볼 표시
    count += 1;
    if (count > 10) {
      result.textContent =
        "10번 넘게 틀려서 실패! 답은 " + arr.join(",") + "입니다. ";
    }
    var numOne = answer.split("");
    var strike = 0;
    var ball = 0;
    for (var i = 0; i < 3; i += 1) {
      if (Number(numOne[i]) === arr[i]) {
        //같은 자리인지 확인
        strike += 1;
      } else if (arr.indexOf(Number(numOne[i])) > -1) {
        //자리는 다르지만, 같은 숫자가 있는지 확인
        ball += 1;
      }
    }
    result.textContent = `${strike} 스트라이크 ${ball} 볼 입니다.`;
    input.value = "";
    input.focus();
  }
});
