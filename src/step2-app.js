import Money from "./model/Money.js";
import LottoMachine from "./controller/LottoMachine.js";

class App {
  constructor() {
    this.lottoMachine = new LottoMachine();

    this.$moneyInput = document.querySelector("#money-input");
    this.$moneyForm = document.querySelector("#money-form");
    this.$lottoNumberSection = document.querySelector(
      "#lotto-number-container",
    );
  }

  // 초기화
  init() {
    // 사용자가 구입 버튼을 누르거나 엔터를 쳐서 폼 제출하면
    // 구매 처리 함수로 넘김
    this.$moneyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handlePurchase();
    });
  }

  // 구매 처리 함수
  // 입력을 받아서 도메인으로 넘긴다
  handlePurchase() {
    // 타이핑 한 값 가져옴.
    const money = this.$moneyInput.value;

    try {
      const lottos = this.lottoMachine.issuedLotto(money);
      this.renderLottoList(lottos);
      // 화면에 그리기
    } catch (error) {
      // 예외처리
      alert(error.message);
    }
  }

  renderLottoList(lottos) {
    this.$lottoNumberSection.innerHTML = `
      <p class="lotto-body">총 ${lottos.length}개를 구매하였습니다.</p>
      <div class="lotto-numbers">
        ${lottos
          .map((number) => {
            return `
            <div id="numbers">
            <span class="lotto-icon">🎟️</span>
            <p class = "lotto-body">${number.getNumbers()}</p>
            </div>
          `;
          })
          .join("")}
      </div>
    `;
  }
}

export default App;
