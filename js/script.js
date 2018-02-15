/*
TODO: create upper and lower limits so you dont loose acuracy
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
  // TODO: create regex function toe check for /+-%*/
  function updateScreen(data) {
    $(".calcScreen").text(data);
  }

  function calculateStack() {
    if ( stack.length == 1) {
      stack = [];
      return;
    }
    var tempSecondNumber = stack.pop();
    var tempSign = stack.pop();
    var tempNumber = stack.pop();
    var tempCalc = 0;

    while (true) {
      if (tempSign === "+") {
        tempCalc =  Number(tempNumber) + Number(tempSecondNumber);
      } else if (tempSign === "-") {
        tempCalc = Number(tempNumber) - Number(tempSecondNumber);
      } else if (tempSign === "*") {
        tempCalc = Number(tempNumber) * Number(tempSecondNumber);
      } else if (tempSign === "/") {
        tempCalc = Number(tempNumber) / Number(tempSecondNumber);
      } else if (tempSign === "%") {
        tempCalc = ( 1 / Number(tempNumber)) * Number(tempSecondNumber);
      }

      if (stack.length  > 0) {
        tempSign = stack.pop();
        tempNumber = stack.pop();
        tempSecondNumber = String(tempCalc);
      }else{
        break;
      }
    }
    calcScreen = String(tempCalc);
    updateScreen(calcScreen);
    // TODO: zero out stack after calc
    // TODO: check if stack is outo order
    // TODO: add final result to calcScreen and update
    // TODO: error if zero
  }

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

  this.handleUserInput = function(userInput) {
    var regexNum = /\d/g;
    var regexDecimal = /\./g;
    if (regexNum.test(userInput)) { //stack numbers
      if (calcScreen === "0") {
        calcScreen = userInput;
        updateScreen(calcScreen);
      } else {
        calcScreen += userInput; // append number  to screen
        updateScreen(calcScreen);
      }
      return;
    }
    // TODO: prevent stack from getting out of order
    switch (userInput) {
      case "AC": // clear both memory and screen
        calcScreen = "0";
        updateScreen(calcScreen);
        break;
      case "CE": // clear dispay to zero but keep memory
        calcScreen = "0";
        updateScreen(calcScreen);
        stack = [];
        break;

      case "%": // 10 % 2 = 0.2 ( (1/10) * 2)
        stack.push(calcScreen);
        calcScreen = "0";
        updateScreen(calcScreen);
        stack.push("%");
        break;

      case "/":
        stack.push(calcScreen);
        calcScreen = "0";
        updateScreen(calcScreen);
        stack.push("/");
        break;

      case "*":
        stack.push(calcScreen);
        calcScreen = "0";
        updateScreen(calcScreen);
        stack.push("*");
        break;

      case "-":
        stack.push(calcScreen);
        calcScreen = "0";
        updateScreen(calcScreen);
        stack.push("-");
        break;

      case "+":
        stack.push(calcScreen);
        calcScreen = "0";
        updateScreen(calcScreen);
        stack.push("+");
        break;

      case ".":
        if (regexDecimal.test(calcScreen)) {
          break;
        }
        calcScreen += userInput;
        updateScreen(calcScreen);
        break;

      case "=":
        stack.push(calcScreen);
        calculateStack();
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
    calc.handleUserInput($(this).attr("class"));
  });
});
