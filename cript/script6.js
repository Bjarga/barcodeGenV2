"use strict";

const mCanvas = document.querySelector("#mainCanvas");
let downloadpdf = document.querySelector(".downloadbtn");
let barcodeNumber = document.querySelector(".barnumber");
let genBtn = document.querySelector("#check");
let userInput = document.querySelector("#userNum");

//co-ordinates starting point for drawing barcode lines
let x = 24;
let y = 121;

//new barcode array from which barcode is drawn
const newNum = [];

// barcode numbers in binary stored in arrays

//left 6 digits of barcode odd encoding
const oddLeftNum0 = [0, 0, 0, 1, 1, 0, 1];
const oddLeftNum1 = [0, 0, 1, 1, 0, 0, 1];
const oddLeftNum2 = [0, 0, 1, 0, 0, 1, 1];
const oddLeftNum3 = [0, 1, 1, 1, 1, 0, 1];
const oddLeftNum4 = [0, 1, 0, 0, 0, 1, 1];
const oddLeftNum5 = [0, 1, 1, 0, 0, 0, 1];
const oddLeftNum6 = [0, 1, 0, 1, 1, 1, 1];
const oddLeftNum7 = [0, 1, 1, 1, 0, 1, 1];
const oddLeftNum8 = [0, 1, 1, 0, 1, 1, 1];
const oddLeftNum9 = [0, 0, 0, 1, 0, 1, 1];

//left 6 digits of barcode even encoding
const evenLeftNum0 = [0, 1, 0, 0, 1, 1, 1];
const evenLeftNum1 = [0, 1, 1, 0, 0, 1, 1];
const evenLeftNum2 = [0, 0, 1, 1, 0, 1, 1];
const evenLeftNum3 = [0, 1, 0, 0, 0, 0, 1];
const evenLeftNum4 = [0, 0, 1, 1, 1, 0, 1];
const evenLeftNum5 = [0, 1, 1, 1, 0, 0, 1];
const evenLeftNum6 = [0, 0, 0, 0, 1, 0, 1];
const evenLeftNum7 = [0, 0, 1, 0, 0, 0, 1];
const evenLeftNum8 = [0, 0, 0, 1, 0, 0, 1];
const evenLeftNum9 = [0, 0, 1, 0, 1, 1, 1];

//Right 6 digits of barcode encoding
const rightNum0 = [1, 1, 1, 0, 0, 1, 0];
const rightNum1 = [1, 1, 0, 0, 1, 1, 0];
const rightNum2 = [1, 1, 0, 1, 1, 0, 0];
const rightNum3 = [1, 0, 0, 0, 0, 1, 0];
const rightNum4 = [1, 0, 1, 1, 1, 0, 0];
const rightNum5 = [1, 0, 0, 1, 1, 1, 0];
const rightNum6 = [1, 0, 1, 0, 0, 0, 0];
const rightNum7 = [1, 0, 0, 0, 1, 0, 0];
const rightNum8 = [1, 0, 0, 1, 0, 0, 0];
const rightNum9 = [1, 1, 1, 0, 1, 0, 0];

// Even Odd choice for first 6 Digits
const evenOddChoice = {
  start0: [0, 0, 0, 0, 0, 0],
  start1: [0, 0, 1, 0, 1, 1],
  start2: [0, 0, 1, 1, 0, 1],
  start3: [0, 0, 1, 1, 1, 0],
  start4: [0, 1, 0, 0, 1, 1],
  start5: [0, 1, 1, 0, 0, 1],
  start6: [0, 1, 1, 1, 0, 0],
  start7: [0, 1, 0, 1, 0, 1],
  start8: [0, 1, 0, 1, 1, 0],
  start9: [0, 1, 1, 0, 1, 0],
};

//function to refresh the page
const refresh = function refreshPage() {
  window.location.reload();
};

// Generate barcode from button click
genBtn.addEventListener("click", function () {
  genBtn.addEventListener("click", function () {
    refresh();
  });

  const barcodeNum = userInput.value;
  let myFunc = (intArr) => Number(intArr);
  const intArr = Array.from(String(barcodeNum), myFunc);

  //calculate barcode checknumber to see if numbers entered is a valid barcode
  const checkBarValid = [...intArr];
  let num1 = 0;
  for (let p = 0; p < checkBarValid.length - 1; p++) {
    if (p === 0) {
      num1 = num1 + checkBarValid[p] * 1;
    } else if (p === 1) {
      num1 = num1 + checkBarValid[p] * 3;
    } else if (p === 2) {
      num1 = num1 + checkBarValid[p] * 1;
    } else if (p === 3) {
      num1 = num1 + checkBarValid[p] * 3;
    } else if (p === 4) {
      num1 = num1 + checkBarValid[p] * 1;
    } else if (p === 5) {
      num1 = num1 + checkBarValid[p] * 3;
    } else if (p === 6) {
      num1 = num1 + checkBarValid[p] * 1;
    } else if (p === 7) {
      num1 = num1 + checkBarValid[p] * 3;
    } else if (p === 8) {
      num1 = num1 + checkBarValid[p] * 1;
    } else if (p === 9) {
      num1 = num1 + checkBarValid[p] * 3;
    } else if (p === 10) {
      num1 = num1 + checkBarValid[p] * 1;
    } else if (p === 11) {
      num1 = num1 + checkBarValid[p] * 3;
    }
  }
  let checkNumMod = num1 % 10;
  let finalCheckNum = 10 - checkNumMod;

  // Remove first number from barcode number and store in variable
  const firstNum = intArr.shift();

  barcodeNumber.textContent = " ";

  // check if number is a valid 13 digit number
  if (
    finalCheckNum != checkBarValid[12] ||
    intArr.length < 12 ||
    (intArr.length > 12 && intArr != Number)
  ) {
    alert("Not a valid 13 digit barcode");

    refresh();

    // check and store left 6 numbers excluding first number of the barcode in a new Array
  } else {
    for (let a = 0; a <= intArr.length - 1; a++) {
      if (intArr[a] === 0 && evenOddChoice[`start${firstNum}`][a] === 0) {
        for (let i = 0; i <= oddLeftNum0.length - 1; i++) {
          newNum.push(oddLeftNum0[i]);
        }
      } else if (
        intArr[a] === 0 &&
        evenOddChoice[`start${firstNum}`][a] === 1
      ) {
        for (let i = 0; i <= evenLeftNum0.length - 1; i++) {
          newNum.push(evenLeftNum0[i]);
        }
      } else if (
        intArr[a] === 1 &&
        evenOddChoice[`start${firstNum}`][a] === 0
      ) {
        for (let i = 0; i <= oddLeftNum1.length - 1; i++) {
          newNum.push(oddLeftNum1[i]);
        }
      } else if (
        intArr[a] === 1 &&
        evenOddChoice[`start${firstNum}`][a] === 1
      ) {
        for (let i = 0; i <= evenLeftNum1.length - 1; i++) {
          newNum.push(evenLeftNum1[i]);
        }
      } else if (
        intArr[a] === 2 &&
        evenOddChoice[`start${firstNum}`][a] === 0
      ) {
        for (let i = 0; i <= oddLeftNum2.length - 1; i++) {
          newNum.push(oddLeftNum2[i]);
        }
      } else if (
        intArr[a] === 2 &&
        evenOddChoice[`start${firstNum}`][a] === 1
      ) {
        for (let i = 0; i <= evenLeftNum2.length - 1; i++) {
          newNum.push(evenLeftNum2[i]);
        }
      } else if (
        intArr[a] === 3 &&
        evenOddChoice[`start${firstNum}`][a] === 0
      ) {
        for (let i = 0; i <= oddLeftNum3.length - 1; i++) {
          newNum.push(oddLeftNum3[i]);
        }
      } else if (
        intArr[a] === 3 &&
        evenOddChoice[`start${firstNum}`][a] === 1
      ) {
        for (let i = 0; i <= evenLeftNum3.length - 1; i++) {
          newNum.push(evenLeftNum3[i]);
        }
      } else if (
        intArr[a] === 4 &&
        evenOddChoice[`start${firstNum}`][a] === 0
      ) {
        for (let i = 0; i <= oddLeftNum4.length - 1; i++) {
          newNum.push(oddLeftNum4[i]);
        }
      } else if (
        intArr[a] === 4 &&
        evenOddChoice[`start${firstNum}`][a] === 1
      ) {
        for (let i = 0; i <= evenLeftNum4.length - 1; i++) {
          newNum.push(evenLeftNum4[i]);
        }
      } else if (
        intArr[a] === 5 &&
        evenOddChoice[`start${firstNum}`][a] === 0
      ) {
        for (let i = 0; i <= oddLeftNum5.length - 1; i++) {
          newNum.push(oddLeftNum5[i]);
        }
      } else if (
        intArr[a] === 5 &&
        evenOddChoice[`start${firstNum}`][a] === 1
      ) {
        for (let i = 0; i <= evenLeftNum5.length - 1; i++) {
          newNum.push(evenLeftNum5[i]);
        }
      } else if (
        intArr[a] === 6 &&
        evenOddChoice[`start${firstNum}`][a] === 0
      ) {
        for (let i = 0; i <= oddLeftNum6.length - 1; i++) {
          newNum.push(oddLeftNum6[i]);
        }
      } else if (
        intArr[a] === 6 &&
        evenOddChoice[`start${firstNum}`][a] === 1
      ) {
        for (let i = 0; i <= evenLeftNum6.length - 1; i++) {
          newNum.push(evenLeftNum6[i]);
        }
      } else if (
        intArr[a] === 7 &&
        evenOddChoice[`start${firstNum}`][a] === 0
      ) {
        for (let i = 0; i <= oddLeftNum7.length - 1; i++) {
          newNum.push(oddLeftNum7[i]);
        }
      } else if (
        intArr[a] === 7 &&
        evenOddChoice[`start${firstNum}`][a] === 1
      ) {
        for (let i = 0; i <= evenLeftNum7.length - 1; i++) {
          newNum.push(evenLeftNum7[i]);
        }
      } else if (
        intArr[a] === 8 &&
        evenOddChoice[`start${firstNum}`][a] === 0
      ) {
        for (let i = 0; i <= oddLeftNum8.length - 1; i++) {
          newNum.push(oddLeftNum8[i]);
        }
      } else if (
        intArr[a] === 8 &&
        evenOddChoice[`start${firstNum}`][a] === 1
      ) {
        for (let i = 0; i <= evenLeftNum8.length - 1; i++) {
          newNum.push(evenLeftNum8[i]);
        }
      } else if (
        intArr[a] === 9 &&
        evenOddChoice[`start${firstNum}`][a] === 0
      ) {
        for (let i = 0; i <= oddLeftNum9.length - 1; i++) {
          newNum.push(oddLeftNum9[i]);
        }
      } else if (
        intArr[a] === 9 &&
        evenOddChoice[`start${firstNum}`][a] === 1
      ) {
        for (let i = 0; i <= evenLeftNum9.length - 1; i++) {
          newNum.push(evenLeftNum9[i]);
        }
      }
    }

    // check and store right side 6 barcode numbers in same array as left side
    for (let a = 6; a <= intArr.length - 1; a++) {
      if (intArr[a] === 0) {
        for (let i = 0; i <= rightNum0.length - 1; i++) {
          newNum.push(rightNum0[i]);
        }
      } else if (intArr[a] === 1) {
        for (let i = 0; i <= rightNum1.length - 1; i++) {
          newNum.push(rightNum1[i]);
        }
      } else if (intArr[a] === 2) {
        for (let i = 0; i <= rightNum2.length - 1; i++) {
          newNum.push(rightNum2[i]);
        }
      } else if (intArr[a] === 3) {
        for (let i = 0; i <= rightNum3.length - 1; i++) {
          newNum.push(rightNum3[i]);
        }
      } else if (intArr[a] === 4) {
        for (let i = 0; i <= rightNum4.length - 1; i++) {
          newNum.push(rightNum4[i]);
        }
      } else if (intArr[a] === 5) {
        for (let i = 0; i <= rightNum5.length - 1; i++) {
          newNum.push(rightNum5[i]);
        }
      } else if (intArr[a] === 6) {
        for (let i = 0; i <= rightNum6.length - 1; i++) {
          newNum.push(rightNum6[i]);
        }
      } else if (intArr[a] === 7) {
        for (let i = 0; i <= rightNum7.length - 1; i++) {
          newNum.push(rightNum7[i]);
        }
      } else if (intArr[a] === 8) {
        for (let i = 0; i <= rightNum8.length - 1; i++) {
          newNum.push(rightNum8[i]);
        }
      } else if (intArr[a] === 9) {
        for (let i = 0; i <= rightNum9.length - 1; i++) {
          newNum.push(rightNum9[i]);
        }
      }
    }

    //Drawing starting barcode guides
    var c = document.getElementById("mainCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.scale(4, 4);
    ctx.rect(18, 0, 2, 110);
    ctx.fillStyle = "black";
    ctx.fill();

    var c = document.getElementById("mainCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();

    ctx.rect(22, 0, 2, 110);
    ctx.fillStyle = "black";
    ctx.fill();

    //Draw Barcoode first 6 Digits (left side)
    for (let b = 0; b <= newNum.length - 42; b++) {
      if (newNum[b] === 0) {
        var c = document.getElementById("mainCanvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();

        ctx.rect(x, 0, 2, 100);
        ctx.fillStyle = "transparent";
        ctx.fill();
      } else {
        var c = document.getElementById("mainCanvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();

        ctx.rect(x, 0, 2, 100);
        ctx.fillStyle = "black";
        ctx.fill();
      }
      x = x + 2;
    }

    //drawing middel barcode guides
    var c = document.getElementById("mainCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();

    ctx.rect(112, 0, 2, 110);
    ctx.fillStyle = "black";
    ctx.fill();

    var c = document.getElementById("mainCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();

    ctx.rect(116, 0, 2, 110);
    ctx.fillStyle = "black";
    ctx.fill();

    // Drawing Barcoode last 6 Digits (right side)
    for (let b = 42; b <= newNum.length - 1; b++) {
      if (newNum[b] === 0) {
        var c = document.getElementById("mainCanvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();

        ctx.rect(y, 0, 2, 100);
        ctx.fillStyle = "transparent";
        ctx.fill();
      } else {
        var c = document.getElementById("mainCanvas");
        var ctx = c.getContext("2d");
        ctx.beginPath();

        ctx.rect(y, 0, 2, 100);
        ctx.fillStyle = "black";
        ctx.fill();
      }
      y = y + 2;
    }

    //drawing ending barcode guides
    var c = document.getElementById("mainCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();

    ctx.rect(210, 0, 2, 110);
    ctx.fillStyle = "black";
    ctx.fill();

    var c = document.getElementById("mainCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();

    ctx.rect(206, 0, 2, 110);
    ctx.fillStyle = "black";
    ctx.fill();

    //drawing barcode number on Canvas
    //draw first number
    var canvas = document.getElementById("mCanvas");
    var ctx = c.getContext("2d");

    ctx.font = "18px sans-serif";
    ctx.fillText(firstNum, 5, 115);

    //draw next 6 numbers
    const first6Num = intArr.slice(0, 6).join(" ");

    var canvas = document.getElementById("mCanvas");
    var ctx = c.getContext("2d");

    ctx.font = "18px sans-serif";
    ctx.fillText(first6Num, 26, 115);

    //draw last 6 numbers
    const last6Num = intArr.slice(6, 12).join(" ");

    var canvas = document.getElementById("mCanvas");
    var ctx = c.getContext("2d");

    ctx.font = "18px sans-serif";
    ctx.fillText(last6Num, 120, 115);
  }

  //Download generated barcode as jpg
  downloadpdf.addEventListener("click", function () {
    if (intArr.length === 12) {
      //IE / edge Support
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(mCanvas.msToBlob(), barcode_unamed.png);
        refresh();

        //Crome and other browseres support
      } else {
        const a = document.createElement("a");

        document.body.appendChild(a);
        a.href = mCanvas.toDataURL("image/jpg", 1);
        a.download = "barcode_unamed.jpg";
        a.click();
        document.body.removeChild(a);
        refresh();
      }
    } else {
      refresh();
    }
  });
});
