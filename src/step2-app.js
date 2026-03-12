import LottoView from "./view/web/index.js";
import LottoMachine from "./controller/LottoMachine.js";

class App {
  constructor() {
    this.view = new LottoView();
    this.machine = new LottoMachine();
  }

  // 초기화
  init() {
    // View에게 구매 버튼 누르면 App한테 알려달라고 등록
    this.view.bindPurchase((money) => this.handlePurchase(money));
  }

  // 구매 처리 함수
  handlePurchase(money) {
    try {
      const lottos = this.machine.issuedLotto(money);
      this.view.renderLottoList(lottos);
    } catch (error) {
      alert(error.message);
    }
  }
}

export default App;
