/*
TODO: setup user input for add, subtract, multiply and divide two input
TODO: make a function that will clear the screen
TODO: make a function that chains all the equations together. like (1+1=x x+2=y)
TODO: turn calculator to object
TODO: get usder input user input needs to indicate what button its frome
TODO: make switch statment for userinput
TODO: look up string to number mpanipulation (mabey you can append numbers to a string and then convert to number)
TODO: create upper and lower limits so you dont loose acuracy
TODO: implemnt stack with calculator push and pop on array
User Story: I can add, subtract, multiply and divide two numbers.
User Story: I can clear the input field with a clear button.
User Story: I can keep chaining mathematical operations together until I hit the equal button, and the calculator will tell me the correct output.
*/

function calculator() {
  var calcScreen = "0";
  var stack = []; // put all opeartionos on the stack to make it easy to pop out things to do;
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

  this.updateScreen = function(data) {
    $(".calcScreen").text(data);
  };

  this.calculate = function(userInput) {
    var regexNum = /\d/g;
    var regexDecimal = /\./g;
    if (regexNum.test(userInput)) { //stack numbers
      if (calcScreen === "0") {
        calcScreen = userInput;
        this.updateScreen(calcScreen);
      } else {
        calcScreen += userInput; // append number  to screen
        this.updateScreen(calcScreen);
      }
      return;
    }
    switch (userInput) {
      case "AC":
        console.log("AC"); // clear both memory and screen
        calcScreen = "0";
        this.updateScreen(calcScreen);
        break;
      case "CE":
        console.log("CE"); // clear dispay to zero but keep memory
        calcScreen = "0";
        this.updateScreen(calcScreen);
        break;
      case "%":
        console.log("%"); // 10 % 2 = 0.2 ( (1/10) * 2)
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
        if (regexDecimal.test(calcScreen)) {
          break;
        }
        calcScreen += userInput;
        this.updateScreen(calcScreen);
        break;
      case "=":
      //check to see if a + - / * % was pressed
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
