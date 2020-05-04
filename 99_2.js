var num1 = Math.ceil(Math.random() * 9);
var num2 = Math.ceil(Math.random() * 9);
var numR = num1 * num2;

var text = document.createElement("div");
text.textContent = `${num1} * ${num2} 는? `;
document.body.append(text);

var form = document.createElement("form");
document.body.append(form);
var input = document.createElement("input");
form.append(input);
var button = document.createElement("button");
button.textContent = `입력`;
form.append(button);

var result = document.createElement("div");
document.body.append(result);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(numR, input.value);
  if (numR === Number(input.value)) {
    //Number 대문자 유의
    result.textContent = `정답입니다`;

    num1 = Math.ceil(Math.random() * 9);
    num2 = Math.ceil(Math.random() * 9);
    numR = num1 * num2;
    text.textContent = `${num1} * ${num2} 는? `;
    input.value = ``;
    input.focus();
  } else {
    result.textContent = `떙!`;
    input.value = ``;
    input.focus();
  }
});
