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

function fillColor(num, result) {
  var ball = document.createElement("div");
  ball.textContent = num;
  ball.style.display = "inline-block";
  ball.style.border = "2px solid black";

  ball.style.width = "40px";
  ball.style.height = "40px";
  ball.style.borderRadius = "50%";
  ball.style.textAlign = "center";
  ball.style.fontSize = "25px";
  ball.style.fontWeight = "600";
  ball.style.margin = "10px";
  var bgColor;
  if (num < 10) {
    bgColor = "orangered";
  } else if (num <= 20) {
    bgColor = "orange";
  } else if (num <= 30) {
    bgColor = "yellow";
  } else if (num <= 40) {
    bgColor = "dodgerblue";
  } else {
    bgColor = "green";
  }
  ball.style.background = bgColor;
  result.appendChild(ball);
}

for (var i = 0; i < pick.length; i++) {
  //클로저 문제를 해결한 for문
  (function (j) {
    setTimeout(function () {
      fillColor(pick[j], result);
    }, (j + 1) * 1000);
  })(i);
}

/* 
setTimeout(function 비동기콜백() {
  fillColor(pick[0], result);
}, 1000);

setTimeout(function 비동기콜백() {
  fillColor(pick[1], result);
}, 2000);

setTimeout(function 비동기콜백() {
  fillColor(pick[2], result);
}, 3000);

setTimeout(function 비동기콜백() {
  fillColor(pick[3], result);
}, 4000);

setTimeout(function 비동기콜백() {
  fillColor(pick[4], result);
}, 5000);

setTimeout(function 비동기콜백() {
  fillColor(pick[5], result);
}, 6000);

*/

setTimeout(function 비동기콜백() {
  var titleB = document.querySelector(".bonus-title");
  titleB.textContent = "보너스!";
}, 7000);

setTimeout(function 비동기콜백() {
  var bonus = document.querySelector(".bonus");
  fillColor(bonusPick, bonus);
}, 8000);

setTimeout(function 비동기콜백() {
  var retry = document.querySelector(".retry");
  var btn = document.createElement("button");
  btn.addEventListener("click", function () {
    window.location.reload();
  });
  btn.textContent = "다시하기";
  btn.className = "btn";
  retry.append(btn);
}, 9000);
