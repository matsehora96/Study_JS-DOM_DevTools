'use strict'

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
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
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('[type="range"]'),
    incomeItem = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'),
    dataInputTypeText = document.querySelector('.data').querySelectorAll('[type="text"]');

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function(){

        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
        appData.closedInputAndHiddenStart();
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('click', this.accumulationMoneyRealTime);
    },
    addExpensesBLock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
        dataInputTypeText = document.querySelector('.data').querySelectorAll('[type="text"]');
    },
    addIncomeBLock: function() {
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');
        if(incomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
        dataInputTypeText = document.querySelector('.data').querySelectorAll('[type="text"]');
    },
    accumulationMoneyRealTime: function() {
        return incomePeriodValue.value = appData.budgetMonth * +periodAmount.textContent;
    },
    addPeriodAmountValue: function() {
        periodAmount.textContent = periodSelect.value;
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            } 
        });
    },
    getIncome: function() {
        incomeItem.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        elementsIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function() {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    },
    getIncomeMonth: function() {
        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }
    },
    getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    },
    getTargetMonth: function() {
        if (this.budgetMonth === 0){
            return 0
        } else {
            return targetAmount.value / this.budgetMonth;
        }  
    },
    checkSalaryAmount: function() {
        if (salaryAmount.value !== '' && isNumber(salaryAmount.value)) {
            start.removeAttribute('disabled');
        } else {
            start.setAttribute('disabled', 'disabled');
        } 
    },
    getStatusIncome: function() {
        if (Math.floor(appData.budgetDay) >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if ((Math.floor(appData.budgetDay) < 1200) && (Math.floor(appData.budgetDay) >= 600)){
            return ('У вас средний уровень дохода');
        } else if ((Math.floor(appData.budgetDay) < 600) && (Math.floor(appData.budgetDay) >= 0)) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (Math.floor(appData.budgetDay) < 0) {
            return ('Что то пошло не так');
        }
    },
    calcSavedMoney: function() {
        return this.budgetMonth * periodSelect.value;
    },
    closedInputAndHiddenStart: function () {
        dataInputTypeText.forEach(function(item, i){
            dataInputTypeText[i].setAttribute('disabled', 'disabled');
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
        console.log(appData);
    },
    reset: function() {
        location.reload();
    },
    getCapitalLetter: function() {
        
        for (let i = 0; i < appData.addExpenses.length; i++) {
            appData.addExpenses[i] = appData.addExpenses[i].charAt(0).toUpperCase() + appData.addExpenses[i].substring(1);
        }
        return appData.addExpenses.join(', ');
    }
};

salaryAmount.addEventListener('keyup', appData.checkSalaryAmount);

start.addEventListener('click', appData.start);

cancel.addEventListener('click', appData.reset);

expensesPlus.addEventListener('click', appData.addExpensesBLock);

incomePlus.addEventListener('click', appData.addIncomeBLock);

periodSelect.addEventListener('click', appData.addPeriodAmountValue);
