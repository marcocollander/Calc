const buttons = document.querySelectorAll('.btnClass');
const displayControl = document.querySelector('#resDisplay');
let prevValue = null;
let lastOperator = null;
let currValue = '';

let refreshDisplay = () => {
  //console.log(currValue);
  if (currValue.length > 0) {
    displayControl.textContent = currValue;
  } else if (prevValue !== null) {
    displayControl.textContent = prevValue;
  } else {
    displayControl.textContent = '0';
  }
};

let calculate = (val1, val2, operator) => {
  let v1Num = Number(val1);
  let v2Num = Number(val2);

  if (operator === '+') return v1Num + v2Num;
  if (operator === '-') return v1Num - v2Num;
  if (operator === '*') return v1Num * v2Num;
  if (operator === '/') return v1Num / v2Num;
};

const onBtnClick = e => {
  let btnId = e.target.id;

  if (btnId.startsWith('btn')) {
    // number button. Add to currValue string
    currValue = currValue + btnId.replace('btn', '');
  } else if (btnId === 'comma') {
    // if no number in currValue, put zero
    if (currValue === '') currValue = '0';
    currValue = currValue + '.';
  } else if (btnId.startsWith('oper')) {
    // get operator from id
    let operator = btnId.replace('oper', '');
    if (prevValue === null) {
      // first number. Do nothing except write number to last value variable
      prevValue = currValue;
    } else {
      // calculate and store in last value variable
      prevValue = calculate(prevValue, currValue, lastOperator);
    }
    // store operator and reset current value
    lastOperator = operator;
    currValue = '';
  } else if (btnId.startsWith('result')) {
    // calculate and reset last value
    currValue = calculate(prevValue, currValue, lastOperator).toString();
    prevValue = null;
  }

  refreshDisplay();
};

const addListeners = () => {
  let btnArray = [...buttons];
  btnArray.forEach(btn => {
    btn.addEventListener('click', onBtnClick);
  });
};

addListeners();
refreshDisplay();
