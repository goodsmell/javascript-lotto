class LottoView {
  constructor() {
    this.$moneyInput = document.querySelector("#money-input");
    this.$moneyForm = document.querySelector("#money-form");
    this.$lottoNumberSection = document.querySelector(
      "#lotto-number-container",
    );
    this.$winningNumbersForm = document.querySelector("#winning-numbers-form");
    this.$winningNumberInputs = document.querySelectorAll(
      ".winning-number-input",
    );
    this.$winningSection = document.querySelector("#winning-bonus-container");
    this.$bonusNumberInput = document.querySelector("#bonus-number-input");
  }

  bindPurchase(handler) {
    this.$moneyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const moneyValue = this.$moneyInput.value;
      handler(moneyValue);
    });
  }

  // 💡 당첨 번호 제출 이벤트를 감시하는 함수
  bindCalculate(handler) {
    this.$winningNumbersForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const winningNumbers = Array.from(this.$winningNumberInputs).map(
        (input) => Number(input.value),
      );
      const bonusNumber = Number(this.$bonusNumberInput.value);
      
      handler({ winningNumbers, bonusNumber });
    });
  }

  renderLottoList(lottos) {
    this.$lottoNumberSection.innerHTML = `
      <p class="lotto-body">총 ${lottos.length}개를 구매하였습니다.</p>
      <div class="lotto-numbers">
        ${lottos.map((lotto) => this._lottoTemplate(lotto)).join("")}
      </div>
    `;
  }

  _lottoTemplate(lotto) {
    return `
      <div class="lotto-item"> <span class="lotto-icon">🎟️</span>
        <p class="lotto-body">${lotto.getNumbers().join(", ")}</p>
      </div>
    `;
  }

  showWinningInput() {
    this.$winningSection.classList.remove("hidden");
  }
}

export default LottoView;
