class MoneyInput {
  constructor() {
    this.$moneyInput = document.querySelector(".money-input");
    this.$moneyForm = document.querySelector(".money-form");
  }

  bindPurchase(handler) {
    this.$moneyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const moneyValue = this.$moneyInput.value;
      handler(moneyValue);
    });
  }

  reset() {
    this.$moneyForm.reset();
  }
}
export default MoneyInput;
