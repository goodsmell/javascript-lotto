class LottoView {
  constructor() {
    this.$moneyInput = document.querySelector("#money-input");
    this.$moneyForm = document.querySelector("#money-form");
    this.$lottoNumberSection = document.querySelector(
      "#lotto-number-container",
    );
  }

  bindPurchase(handler) {
    this.$moneyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const moneyValue = this.$moneyInput.value;
      handler(moneyValue);
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

}

export default LottoView;
