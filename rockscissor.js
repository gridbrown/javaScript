var comChoice = "0";
var rockScissor = {
  //딕셔너리 구조
  rock: "0",
  scissor: "-142px",
  paper: "-284px",
};

setInterval(function () {
  //멈출때까지 반복하는 함수
  if (comChoice === rockScissor.rock) {
    comChoice = rockScissor.scissor;
  } else if (comChoice === rockScissor.scissor) {
    comChoice = rockScissor.paper;
  } else {
    comChoice = rockScissor.rock;
  }
  document.querySelector(
    "#computer"
  ).style.background = `url(https://sites.google.com/site/hafsrsp/_/rsrc/1468855017636/config/customLogo.gif?revision=2)${comChoice} 0px`;
  console.log(comChoice);
}, 150);

document.querySelectorAll(".btn").forEach(function (btn) {
  //btn에 클릭이벤트 반복문으로 생성
  btn.addEventListener("click", function () {
    var myChoice = this.textContent;
    console.log(myChoice, comChoice);
  });
});
