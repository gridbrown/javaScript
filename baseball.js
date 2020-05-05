var content = document.body;

var number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var arr = [];

for (var i = 0; i < 4; i += 1) {
  var num = number.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
  arr.push(num);
}
console.log(arr);
var result = document.createElement("h1");
document.body.append(result);
var form = document.createElement("form");
document.body.append(form);
var input = document.createElement("input");
form.append(input);
var button = document.createElement("button");
button.textContent = "입력";
form.append(button);

var count = 0;
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var answer = input.value;
  if (arr.join("") === answer) {
    result.textContent = "홈런";
    input.value = "";
    input.focus();
    var number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var arr = [];
    for (var i = 0; i < 4; i += 1) {
      var num = number.splice(Math.floor(Math.random() * (9 - i)), 1)[0]; //ceil쓰면 undefiend뜸.(우리는 0~8이 필요하므로)
      arr.push(num);
    }
    count = 0; //정답시 초기화
  } else {
    //답이 틀리면
    var answerArr = answer.split(""); //하나씩 비교하기위해
    var strike = 0;
    var ball = 0;
    count += 1;
    if (count > 10) {
      //10번넘게 틀린경우
      result.textContent =
        "10번넘게 틀려서 실패! 답은" + arr.join(",") + "입니다";
      input.value = "";
      input.focus();
      var number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      var arr = [];
      for (var i = 0; i < 4; i += 1) {
        var num = number.splice(Math.floor(Math.random() * (9 - i)), 1)[0]; //ceil쓰면 undefiend뜸.(우리는 0~8이 필요하므로)
        arr.push(num);
      }
      count = 0; // 10번넘게 틀려서 초기화
    } else {
      //10번 미만으로 틀린경우
      for (var i = 0; i < 3; i += 1) {
        // i=0,1,2,3
        if (Number(answerArr[i]) === arr[i]) {
          //같은 자리인지 확인
          strike += 1;
        } else if (arr.indexOf(Number(answerArr[i])) > -1) {
          //index0f로 찾을 수 없는건 -1이 나옴
          ball += 1; // -1보다 크면 어딘가에 값이 있다는 것이므로 ball+1
        }
      }
      result.textContent = `${strike}스트라이크 ${ball}볼 입니다`;
      input.value = "";
      input.focus();
    }
  }
});
