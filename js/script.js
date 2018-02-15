function calculator() {

  var calcScreen = "0";
  var stack = [];
  var equation = function() {
    var temp = "";
    for (var i = 0; i < stack.length; i++) {
      temp += stack[i];
    }
    return temp;
  };
  var buttons = [
    ["AC", "CE", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "=", "-/+"]
  ];


  function updateScreen(data) {
    $(".calcScreen").text(data);
    $(".equation").text(equation() + calcScreen + " : Equation");
  }

  function calculateStack() {
    if (stack.length == 1) {
      stack = [];
      return;
    }
    var tempSecondNumber = stack.pop();
    var tempSign = stack.pop();
    var tempNumber = stack.pop();
    var tempCalc = 0;

    while (true) {
      if (tempSign === "+") {
        tempCalc = Number(tempNumber) + Number(tempSecondNumber);
      } else if (tempSign === "-") {
        tempCalc = Number(tempNumber) - Number(tempSecondNumber);
      } else if (tempSign === "*") {
        tempCalc = Number(tempNumber) * Number(tempSecondNumber);
      } else if (tempSign === "/") {
        if (Number(tempSecondNumber) === 0) {
          calcScreen = "0";
          stack = [];
          updateScreen("ERROR");
          return;
        }
        tempCalc = Number(tempNumber) / Number(tempSecondNumber);
      } else if (tempSign === "%") {
        tempCalc = (1 / Number(tempNumber)) * Number(tempSecondNumber);
      }

      if (stack.length > 0) {
        tempSign = stack.pop();
        tempNumber = stack.pop();
        tempSecondNumber = String(tempCalc);
      } else {
        break;
      }
    }
    calcScreen = String(tempCalc);
    updateScreen(calcScreen);
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
    var temp = "";
    for (var i = 0; i < buttons.length; i++) {
      temp += "<div class=\"Myrow\">";
      for (var j = 0; j < buttons[i].length; j++) {
        temp += "<button class=\"" + buttons[i][j] + "\" >";
        temp += buttons[i][j];
        temp += "</button>";
      }
      temp += "</div>";
    }

    $(".calculator").append(temp);
  };

  this.handleUserInput = function(userInput) {
    var regexNum = /\d/g;
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
    switch (userInput) {
      case "AC": // clear both stack and screen
        calcScreen = "0";
        stack = [];
        updateScreen(calcScreen);
        break;
      case "CE": // clear dispay to zero but keep memory
        calcScreen = "0";
        updateScreen(calcScreen);
        break;

      case "%":
        stack.push(calcScreen);
        calcScreen = "0";
        stack.push("%");
        updateScreen(calcScreen);
        break;

      case "/":
        stack.push(calcScreen);
        calcScreen = "0";
        stack.push("/");
        updateScreen(calcScreen);
        break;

      case "*":
        stack.push(calcScreen);
        calcScreen = "0";
        stack.push("*");
        updateScreen(calcScreen);
        break;

      case "-":
        stack.push(calcScreen);
        calcScreen = "0";
        stack.push("-");
        updateScreen(calcScreen);
        break;

      case "+":
        stack.push(calcScreen);
        calcScreen = "0";
        stack.push("+");
        updateScreen(calcScreen);
        break;

      case ".":
        calcScreen += userInput;
        updateScreen(calcScreen);
        break;

        case "-/+":
          if(calcScreen[0] === "-"){
            calcScreen=calcScreen.slice(1,calcScreen.length);
            updateScreen(calcScreen);
            break;
          }
          calcScreen  = "-" + calcScreen;
          updateScreen(calcScreen);
          break;

      case "=":
        stack.push(calcScreen);
        calculateStack();
        break;
      default:
        calcScreen = 0;
        updateScreen("ERROR");

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
