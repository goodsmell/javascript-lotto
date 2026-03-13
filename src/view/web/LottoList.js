import lottoIcon from "../../asset/lotto_icon.png";

class LottoList {
  constructor() {
    this.$lottoNumberSection = document.querySelector(
      "#lotto-number-container",
    );
  }

  renderLottoList(lottos) {
    this.$lottoNumberSection.innerHTML = `
      <p class="lotto-body">총 ${lottos.length}개를 구매하였습니다.</p>
      <div id = "lotto-numbers" >
        ${lottos.map((lotto) => this._lottoTemplate(lotto)).join("")}
      </div>
    `;
  }

  _lottoTemplate(lotto) {
    return `
      <div class="lotto-item"> <img src="${lottoIcon}" alt="lotto-icon" class="lotto-icon-img" />
        <p class="lotto-body lotto-item-numbers">${lotto.getNumbers().join(", ")}</p>
      </div>
    `;
  }

  reset() {
    this.$lottoNumberSection.innerHTML = "";
  }
}

export default LottoList;
