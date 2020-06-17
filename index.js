'use strict'

//Task first
let elementStartBtn = document.getElementById('start');
console.log(elementStartBtn);

//Task second
let elementsButton = document.getElementsByTagName('button');

let elementsButtonPlusFirst = elementsButton[0];
console.log(elementsButtonPlusFirst);

let elementsButtonPlusSecond = elementsButton[1];
console.log(elementsButtonPlusSecond);

//Task third
let elementCheckbox = document.querySelector('#deposit-check');
console.log(elementCheckbox);

//Task fourth
let elementsIncomeItem = document.querySelectorAll('.additional_income-item');

let elementIncomeItemFirst = elementsIncomeItem[0];
console.log(elementIncomeItemFirst);

let elementIncomeItemSecond = elementsIncomeItem[0];
console.log(elementIncomeItemSecond);

//Task five
let elementsNameValue = document.querySelectorAll('.result-total');

let arrElementsNameValue = Object.values(elementsNameValue);

for (let i = 1; i < arrElementsNameValue.length; i++) {
    window['elementNameValue'+i] = arrElementsNameValue[i];
    console.log(window['elementNameValue'+i]);
}

//Task six
let elementSalaryAmount = document.querySelector('.salary-amount');
let elementIncomeTitle = document.querySelector('.income-title');
let elementIncomeAmount = document.querySelector('.income-amount');
let elementExpensesTitle = document.querySelector('.expenses-title');
let elementExpensesAmount = document.querySelector('.expenses-amount');
let elementAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
let elementDepositAmount = document.querySelector('.deposit-amount');
let elementDepositPercent = document.querySelector('.deposit-percent');
let elementTargetAmount = document.querySelector('.target-amount');
let elementPeriodSelect = document.querySelector('[type="range"]');

console.log(elementPeriodSelect);






