class ResultModal {
  constructor() {
    this.$modal = document.querySelector("#result-modal");
    this.$modalCloseButton = document.querySelector("#modal-close-button");
    this.$resultTableBody = document.querySelector("#result-table-body");
    this.$profitRate = document.querySelector("#total-profit-rate");
    this.$resetButton = document.querySelector("#reset-button");
  }

  bindCloseModal() {
    this.$modalCloseButton.addEventListener("click", () => {
      this.$modal.classList.add("hidden");
    });
  }

  bindReset(handler) {
    this.$resetButton.addEventListener("click", () => {
      handler();
    });
  }

  renderResult(rankCounts, profitRate) {
    this.$resultTableBody.innerHTML = this._createResultTemplate(rankCounts);
    this.$profitRate.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;
    this.$modal.classList.remove("hidden");
  }

  _createResultTemplate(rankCounts) {
    return `
    <tr><td>3개</td><td>5,000</td><td>${rankCounts.RANK_5 || 0}개</td></tr>
    <tr><td>4개</td><td>50,000</td><td>${rankCounts.RANK_4 || 0}개</td></tr>
    <tr><td>5개</td><td>1,500,000</td><td>${rankCounts.RANK_3 || 0}개</td></tr>
    <tr><td>5개 + 보너스 볼</td><td>30,000,000</td><td>${rankCounts.RANK_2 || 0}개</td></tr>
    <tr><td>6개</td><td>2,000,000,000</td><td>${rankCounts.RANK_1 || 0}개</td></tr>
  `;
  }

  reset() {
    this.$modal.classList.add("hidden");
  }
}

export default ResultModal;
