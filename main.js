const inputBill = document.getElementById("bill");
const tipButton = document.querySelectorAll(".tip-button");
const customTipInput = document.querySelector(".custom-tip-input");
const peopleInput = document.getElementById("people");
const tipAmountDisplay = document.getElementById("tip-amount");
const totalAmountDisplay = document.getElementById("total-amount");
const resetButton = document.getElementById("reset-button");
const billLabel = document.querySelector(".bill-label-group");
const peopleLabel = document.querySelector(".people-label-group");

let billValue = 0;
let tipValue = 0;
let peopleValue = 1;

const checkError = () => {
  if (peopleValue === 0) {
    peopleLabel.classList.add("error");
    peopleInput.classList.add("error");
    return true;
  } else {
    peopleLabel.classList.remove("error");
    peopleInput.classList.remove("error");
    return false;
  }
};

const calculateAmounts = () => {
  const tipAmount = (billValue * tipValue) / peopleValue;
  const totalAmount = (billValue + billValue * tipValue) / peopleValue;
  return { tipAmount, totalAmount };
};

const updateDisplay = (tipAmount, totalAmount) => {
  tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
};

const calculateTip = () => {
  if (checkError()) {
    updateDisplay(0, 0);
    return;
  }

  const { tipAmount, totalAmount } = calculateAmounts();
  updateDisplay(tipAmount, totalAmount);
};

// const calculateTip = () => {
//   if (peopleValue === 0) {
//     peopleLabel.classList.add("error");
//     peopleInput.classList.add("error");
//     tipAmountDisplay.textContent = `$0.00`;
//     totalAmountDisplay.textContent = `$0.00`;
//     return;
//   } else {
//     peopleLabel.classList.remove("error");
//     peopleInput.classList.remove("error");
//   }
//   const tipAmount = (billValue * tipValue) / peopleValue;
//   const totalAmount = (billValue + billValue * tipValue) / peopleValue;

//   tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
//   totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
// };

inputBill.addEventListener("input", (e) => {
  billValue = parseFloat(e.target.value) || 0;
  calculateTip();
});

peopleInput.addEventListener("input", (e) => {
  peopleValue = parseInt(e.target.value) || 0;
  calculateTip();
});

tipButton.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    tipValue = parseFloat(e.target.textContent) / 100;
    calculateTip();
  });
});

customTipInput.addEventListener("input", (e) => {
  tipValue = parseFloat(e.target.value) / 100 || 0;
  calculateTip();
});

resetButton.addEventListener("click", () => {
  inputBill.value = "";
  peopleInput.value = "";
  customTipInput.value = "";
  billValue = 0;
  tipValue = 0;
  peopleValue = 1;
  calculateTip();
});
