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

    this.$modal = document.querySelector("#result-modal");
    this.$modalCloseButton = document.querySelector("#modal-close-button");
    this.$resultTableBody = document.querySelector("#result-table-body");
    this.$profitRate = document.querySelector("#total-profit-rate");
    this.$resetButton = document.querySelector("#reset-button");
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

  renderResult(rankCounts, profitRate) {
    console.log(rankCounts, profitRate);
    this.$resultTableBody.innerHTML = this._createResultTemplate(rankCounts);
    this.$profitRate.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;
    this.$modal.classList.remove("hidden");
  }

  _lottoTemplate(lotto) {
    return `
      <div class="lotto-item"> <span class="lotto-icon">🎟️</span>
        <p class="lotto-body">${lotto.getNumbers().join(", ")}</p>
      </div>
    `;
  }

  _createResultTemplate(rankCounts) {
    return `
    <tr><td>3개</td><td>5,000</td><td>${rankCounts[4] || 0}개</td></tr>
    <tr><td>4개</td><td>50,000</td><td>${rankCounts[3] || 0}개</td></tr>
    <tr><td>5개</td><td>1,500,000</td><td>${rankCounts[2] || 0}개</td></tr>
    <tr><td>5개 + 보너스 볼</td><td>30,000,000</td><td>${rankCounts[1] || 0}개</td></tr>
    <tr><td>6개</td><td>2,000,000,000</td><td>${rankCounts[0] || 0}개</td></tr>

  `;
  }

  showWinningInput() {
    this.$winningSection.classList.remove("hidden");
  }
}

export default LottoView;
