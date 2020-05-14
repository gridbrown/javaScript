var x = 4;
var y = 3;
var color = [
  "red",
  "red",
  "gray",
  "gray",
  "yellow",
  "yellow",
  " white",
  "white",
  "pink",
  "pink",
  "orange",
  "orange",
];
var colorCopy = color.slice();
var cardColor = [];

var flag = true; //flag가 false일때 클릭 불가능
var clickCard = []; //카드를 뒤집은 횟수
var end = []; //카드의 색깔이 같다면 end에 넣을 것이다.
var startTime;
function suffle() {
  for (var i = 0; colorCopy.length > 0; i++) {
    cardColor = cardColor.concat(
      colorCopy.splice(Math.floor(Math.random() * colorCopy.length), 1)
    );
  }
}

function setting(x, y) {
  flag = false;
  for (var i = 0; i < x * y; i += 1) {
    var card = document.createElement("div");
    card.className = "card";
    var cardInner = document.createElement("div");
    cardInner.className = "card-inner";
    var cardFront = document.createElement("div");
    cardFront.className = "card-front";
    var cardBack = document.createElement("div");
    cardBack.className = "card-back";
    cardBack.style.backgroundColor = cardColor[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    (function (c) {
      card.addEventListener("click", function () {
        if (flag && !end.includes(c)) {
          //flag가 true이고, end를 가지고있지 않다면 --> 완성시 더이상 클릭하지 못하게하려고

          c.classList.toggle("flipped");

          clickCard.push(c);

          if (clickCard.length === 2) {
            if (
              clickCard[0].querySelector(".card-back").style.backgroundColor ===
              clickCard[1].querySelector(".card-back").style.backgroundColor
            ) {
              //카드색깔이 같다면, 상태를 유지한다.
              //상태를 유지할지 결정하기위해 처음 if문에 end의 유무를 파악

              end.push(clickCard[0]);
              end.push(clickCard[1]); // *색깔이 같아서 end를 가지게됨
              console.log(end);
              clickCard = []; //다음 두번을 위해 비워준다
              if (end.length === 12) {
                var endTime = new Date();
                alert(
                  `축하합니다! 걸린시간은 ${endTime - startTime}/1000 입니다. `
                );
                document.querySelector("#wrapper").innerHTML = "";
                colorCopy = color.slice();
                cardColor = [];
                end = [];
                startTime = null;
                suffle();
                setting(x, y);
              }
            } else {
              // *두 카드의 색깔이 다르면 end가 생성되지않음
              // 원상복귀한다.
              flag = false;
              setTimeout(function () {
                console.log(clickCard);
                clickCard[0].classList.remove("flipped");
                clickCard[1].classList.remove("flipped");
                flag = true;
                clickCard = []; //다음 두번을 위해 비워준다
              }, 1000);
            }
          }
        }
      });
    })(card);
    document.querySelector("#wrapper").appendChild(card);
  }

  document.querySelectorAll(".card").forEach(function (card, index) {
    setTimeout(function () {
      card.classList.add("flipped");
    }, 1000 + 100 * index);
  });

  setTimeout(function () {
    document.querySelectorAll(".card").forEach(function (card) {
      card.classList.remove("flipped");
    });
    flag = true;
    startTime = new Date();
  }, 4000);
}

suffle();

setting(x, y);
