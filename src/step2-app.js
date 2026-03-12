import LottoList from "./view/web/LottoList.js";
import MoneyInput from "./view/web/MoneyInput.js";
import ResultModal from "./view/web/ResultModal.js";
import WinningInput from "./view/web/WinningInput.js";
import LottoMachine from "./controller/LottoMachine.js";

class App {
  constructor() {
    this.MoneyView = new MoneyInput();
    this.ResultModalView = new ResultModal();
    this.LottoListView = new LottoList();
    this.WinningInputView = new WinningInput();
    this.machine = new LottoMachine();
  }

  // 초기화
  init() {
    this.MoneyView.bindPurchase((money) => this.handlePurchase(money));
    this.WinningInputView.bindCalculate((data) =>
      this.handleCalculateResults(data),
    );
    this.ResultModalView.bindCloseModal();
    this.ResultModalView.bindReset(() => this.handleReset());
  }

  // 구매 처리 함수
  handlePurchase(money) {
    try {
      const lottos = this.machine.issuedLotto(money);
      this.LottoListView.renderLottoList(lottos);
      this.WinningInputView.showWinningInput();
    } catch (error) {
      alert(error.message);
    }
  }

  // 결과 계산 함수
  handleCalculateResults({ winningNumbers, bonusNumber }) {
    try {
      const { countMatchRank, returnOnInvestment } =
        this.machine.calculateResult(winningNumbers, bonusNumber);

      console.log(countMatchRank, returnOnInvestment);
      this.ResultModalView.renderResult(countMatchRank, returnOnInvestment);
    } catch (error) {
      alert(error.message);
    }
  }

  handleReset() {
    this.machine = new LottoMachine();
    this.MoneyView.reset();
    this.ResultModalView.reset();
    this.LottoListView.reset();
    this.WinningInputView.reset();

    console.log("앱이 초기화되었습니다.");
  }
}

export default App;
