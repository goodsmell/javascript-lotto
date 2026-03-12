import Money from "../model/Money.js";
import LottoStore from "../model/LottoStore.js";
class LottoMachine {
  #money;
  #lotto;
  constructor() {}

  setMoney(money) {
    this.#money = new Money(money);
  }

  issuedLotto(money) {
    this.setMoney(money);
    this.#lotto = new LottoStore().issuedLottos(this.#money.getMoney());
    return [...this.#lotto];
  }

  async #playGame() {
    //     const lottos = this.#lottoStore.issuedLottos(money.getMoney());
    //     Output.printPurchasedLottos(lottos);
    //     const winningNumbers = await this.#askWinningNumbers();
    //     const winningLotto = await this.#askBonusNumber(winningNumbers);
    //     const lottoGameResult = winningLotto.evaluateLottos(lottos);
    //     const returnOnInvestment = lottoGameResult.getReturnOnInvestment(
    //       money.getMoney(),
    //     );
    //     Output.printResult(lottoGameResult.getCounts(), returnOnInvestment);
    //
  }
}
export default LottoMachine;
