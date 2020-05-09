var game = 0;
var myWin = 0;
var comWin = 0;
var comChoice = "0";
var rockScissor = {
  //딕셔너리 구조
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

function computer(comChoice) {
  return Object.entries(rockScissor).find(function (v) {
    return v[1] === comChoice;
  })[0];
}

var interval;
function intervalMaker() {
  interval = setInterval(function () {
    //멈출때까지 반복하는 함수
    if (comChoice === rockScissor.바위) {
      comChoice = rockScissor.가위;
    } else if (comChoice === rockScissor.가위) {
      comChoice = rockScissor.보;
    } else {
      comChoice = rockScissor.바위;
    }

    document.querySelector(
      "#computer"
    ).style.background = `url(https://sites.google.com/site/hafsrsp/_/rsrc/1468855017636/config/customLogo.gif?revision=2) ${comChoice} 0`;
  }, 100);
}

intervalMaker();

var number = {
  가위: -1,
  바위: 0,
  보: 1,
};

document.querySelectorAll(".btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    //btn에 클릭이벤트 반복문으로 생성
    clearInterval(interval); //클릭시 interval 멈추기
    setTimeout(function () {
      //다시 가위바위보 실행
      intervalMaker();
    }, 1000);

    game += 1;

    var myChoice = this.textContent;
    console.log(myChoice, computer(comChoice));
    var myPick = number[myChoice];
    var comPick = number[computer(comChoice)];
    if (myPick - comPick === 0) {
      console.log("비겼습니다.");
    } else if ([-2, 1].includes(myPick - comPick)) {
      console.log("이겼습니다");
      myWin += 1;
    } else {
      console.log("졌습니다ㅜㅜ");
      comWin += 1;
    }
    console.log(game, myWin, comWin);

    var a = document.querySelector(".total-point");
    a.textContent = `${game} 번째 게임입니다.`;

    var b = document.querySelector(".win-point");
    b.textContent = `${myWin} 번째 승리!`;

    var c = document.querySelector(".lose-point");
    c.textContent = `${comWin} 번째 지는중..`;
  });
});
