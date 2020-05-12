var screen = document.querySelector("#screen");
var 시작시간; //스코프로인해
var 끝시간;
var record = [];
var timeOut;

function clickHandler() {
  if (screen.classList.contains("wating")) {
    //대기상태인지 파악
    screen.classList.remove("wating");
    screen.classList.add("ready");

    screen.textContent = "파란색이 나오면 클릭하세요";

    timeOut = setTimeout(function () {
      시작시간 = new Date();
      screen.click();
    }, Math.floor(Math.random() * 1000) + 2000); //랜덤시간
  } else if (screen.classList.contains("ready")) {
    //준비 상태
    if (!시작시간) {
      //부정클릭 undefined, 0, NaN, null, false, ''
      clearTimeout(timeOut);
      screen.classList.remove("ready");
      screen.classList.add("wating");
      screen.textContent = "성급하시네요";
    } else {
      screen.classList.remove("ready");
      screen.classList.add("now");
      screen.textContent = "클릭하세요!!";
    }
  } else if (screen.classList.contains("now")) {
    // 시작 상태
    끝시간 = new Date();
    console.log(끝시간 - 시작시간);
    record.push(끝시간 - 시작시간);
    시작시간 = null;
    끝시간 = null;
    screen.classList.remove("now");
    screen.classList.add("wating");
    screen.textContent = "클릭해서 시작하세요!";
  }
}

screen.addEventListener("click", clickHandler);
