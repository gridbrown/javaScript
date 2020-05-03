var bodyCon = document.body;
var word = document.createElement("div");
word.textContent = "햄버거";
document.body.append(word);
var form = document.createElement("form"); //form으로 감싸주면 엔터로 버튼입력 가능
document.body.append(form);
var input = document.createElement("input");
form.append(input);
var button = document.createElement("button");
button.textContent = "입력";
form.append(button);
var result = document.createElement("div");
document.body.append(result);

form.addEventListener("submit", function (e) {
  e.preventDefault(); //초기화 방지
  if (word.textContent[word.textContent.length - 1] === input.value[0]) {
    result.textContent = "good!";
    word.textContent = input.value;
    input.value = "";
  } else {
    result.textContent = "try agian";
    input.value = "";
    input.focus();
  }
});
