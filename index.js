'use strict'

const start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    elementsIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    depositCheck = document.querySelector('#deposit-check'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('[type="range"]'),
    periodAmount = document.querySelector('.period-amount'),
    isNumber = function(n){
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItem = document.querySelectorAll('.income-items'),
    dataInputTypeText = document.querySelector('.data').querySelectorAll('[type="text"]');

const AppData = function() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};

AppData.prototype.start = function() {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    this.closedInputAndHiddenStart();
};

AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('click', function() {
        incomePeriodValue.value = _this.budgetMonth * +periodAmount.textContent;
    });
};

AppData.prototype.addExpensesBLock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
    dataInputTypeText = document.querySelector('.data').querySelectorAll('[type="text"]');
};

AppData.prototype.addIncomeBLock = function() {
    let cloneIncomeItem = incomeItem[0].cloneNode(true);
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItem = document.querySelectorAll('.income-items');
    if(incomeItem.length === 3) {
        incomePlus.style.display = 'none';
    }
    dataInputTypeText = document.querySelector('.data').querySelectorAll('[type="text"]');
};

AppData.prototype.addPeriodAmountValue = function() {
    periodAmount.textContent = periodSelect.value;
};

AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = +cashExpenses;
        } 
    });
};

AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItem.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = +cashIncome;
        }
    });
};

AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function() {
    const _this = this;
    elementsIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
        this.expensesMonth += this.expenses[key];
    }
};

AppData.prototype.getIncomeMonth = function() {
    for (let key in this.income) {
        this.incomeMonth += this.income[key];
    }
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
};

AppData.prototype.getTargetMonth = function() {
    if (this.budgetMonth === 0){
        return 0
    } else {
        return targetAmount.value / this.budgetMonth;
    }  
};

AppData.prototype.checkSalaryAmount = function() {
    if (salaryAmount.value !== '' && isNumber(salaryAmount.value)) {
        start.removeAttribute('disabled');
    } else {
        start.setAttribute('disabled', 'disabled');
    } 
};

AppData.prototype.getStatusIncome = function() {
    if (Math.floor(this.budgetDay) >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if ((Math.floor(this.budgetDay) < 1200) && (Math.floor(this.budgetDay) >= 600)){
        return ('У вас средний уровень дохода');
    } else if ((Math.floor(this.budgetDay) < 600) && (Math.floor(this.budgetDay) >= 0)) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (Math.floor(this.budgetDay) < 0) {
        return ('Что то пошло не так');
    }
};

AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.closedInputAndHiddenStart = function() {
    dataInputTypeText.forEach(function(item, i){
        dataInputTypeText[i].setAttribute('disabled', 'disabled');
    });
    start.style.display = 'none';
    cancel.style.display = 'block';
};

AppData.prototype.reset = function() {
    location.reload();
};

AppData.prototype.getCapitalLetter = function() {
    for (let i = 0; i < this.addExpenses.length; i++) {
        this.addExpenses[i] = this.addExpenses[i].charAt(0).toUpperCase() + this.addExpenses[i].substring(1);
    }
    return this.addExpenses.join(', ');
};

AppData.prototype.eventsListeners = function () {
    salaryAmount.addEventListener('keyup', this.checkSalaryAmount);
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset);
    expensesPlus.addEventListener('click', this.addExpensesBLock);
    incomePlus.addEventListener('click', this.addIncomeBLock);
    periodSelect.addEventListener('click', this.addPeriodAmountValue);
};

const appData = new AppData();

appData.eventsListeners();