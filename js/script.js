/*
TODO: setup user input for add, subtract, multiply and divide two input
TODO: make a function that will clear the screen
TODO: make a function that chains all the equations together. like (1+1=x x+2=y)
TODO: turn calculator to object
TODO: get usder input user input needs to indicate what button its frome
TODO: make switch statment for userinput
User Story: I can add, subtract, multiply and divide two numbers.
User Story: I can clear the input field with a clear button.
User Story: I can keep chaining mathematical operations together until I hit the equal button, and the calculator will tell me the correct output.
*/

function calculator() {
  var calcScreen = 0;
  var buttons = [
    ["AC", "CE", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "=", "+"]
  ];

  this.getCalcScreen = function() {
    return calcScreen;
  };

  this.getButtons = function() {
    return buttons;
  };

  this.setCalcScreen = function(data) {
    calcScreen = data;
  };

  this.displayCalc = function() {
    var temp = "<div class=\"row\">";
    temp += "<div class=\"col\">";
    temp += "<div class = \"calcScreen\">" + calcScreen + "</div>";
    temp += "</div>";
    temp += "</div>";

    for (var i = 0; i < buttons.length; i++) {
      temp += "<div class=\"row\">";
      for (var j = 0; j < buttons[i].length; j++) {

        temp += "<div class=\"col\">";
        temp += "<button class=\"" + buttons[i][j] + "\" >";
        temp += buttons[i][j];
        temp += "</button>";
        temp += "</div>";

      }
      temp += "</div>";
    }

    $("body").append(temp);
  };

  this.updateScreen = function() {
    $(".calcScreen").text("ERROR");
  };
  this.calculate = function(userInput) {
    var regex = /\d/g;
    if (regex.test(userInput)) {
      console.log(userInput);
      return;
    }
    switch (userInput) {
      case "AC":
        console.log("AC");
        break;
      case "CE":
        console.log("CE");
        break;
      case "%":
        console.log("%");
        break;
      case "/":
        console.log("/");
        break;
      case "*":
        console.log("*");
        break;
      case "-":
        console.log("-");
        break;
      case "+":
        console.log("+");
        break;
      case ".":
        console.log(".");
        break;
      case "=":
        console.log("=");
        break;
      default:
        $(".calcScreen").text("ERROR");
        calcScreen = 0;

    }
  };

}

var calc = new calculator();

$(document).ready(function() {
  calc.displayCalc();
  $("button").click(function() {
    calc.calculate($(this).attr("class"));
  });
});
