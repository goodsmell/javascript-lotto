import LottoView from "./view/web/index.js";
import LottoMachine from "./controller/LottoMachine.js";

class App {
  constructor() {
    this.view = new LottoView();
    this.machine = new LottoMachine();
  }

  // 초기화
  init() {
    this.view.bindPurchase((money) => this.handlePurchase(money));
    this.view.bindCalculate((data) => this.handleCalculateResults(data));
    this.view.bindCloseModal();
  }

  // 구매 처리 함수
  handlePurchase(money) {
    try {
      const lottos = this.machine.issuedLotto(money);
      this.view.renderLottoList(lottos);

      this.view.showWinningInput();
    } catch (error) {
      alert(error.message);
    }
  }

  // 결과 계산 함수
  handleCalculateResults({ winningNumbers, bonusNumber }) {
    try {
      const { countMatchRank, returnOnInvestment } =
        this.machine.calculateResult(winningNumbers, bonusNumber);
      this.view.renderResult(countMatchRank, returnOnInvestment);
    } catch (error) {
      alert(error.message);
    }
  }
}

export default App;
