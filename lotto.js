var numbers = Array(45)
  .fill()
  .map(function (val, index) {
    return index + 1;
  }); //1.빈배열만들기 2.undefiend채우기 3.mapping으로 숫자 채우기

var suffle = []; //랜덤하게 섞어서, 뽑을 것

while (numbers.length > 0) {
  var ranNum = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
  suffle.push(ranNum);
}

var bonusPick = suffle[suffle.length - 1]; //마지막숫자를 보너스번호로 가져옴
var pick = suffle.slice(0, 6).sort(function (p, c) {
  return p - c;
});
console.log(bonusPick, pick);

var result = document.querySelector(".result");

for (var i = 0; i < pick.length; i += 1) {
  var ball = document.createElement("div");
  ball.textContent = pick[i];
  result.appendChild(ball);
}
