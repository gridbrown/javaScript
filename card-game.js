var x = 4;
var y = 3;
function setting(x, y) {
  for (var i = 0; i < x * y; i += 1) {
    var card = document.createElement("div");
    card.className = "card";
    var cardInner = document.createElement("div");
    cardInner.className = "card-inner";
    var cardFront = document.createElement("div");
    cardFront.className = "card-front";
    var cardBack = document.createElement("div");
    cardBack.className = "card-back";
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    (function (c) {
      card.addEventListener("click", function () {
        c.classList.toggle("flipped");
      });
    })(card);
    document.body.appendChild(card);
  }
}

setting(x, y);
