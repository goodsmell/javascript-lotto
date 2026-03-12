import Money from "../model/Money.js";
import LottoStore from "../model/LottoStore.js";
import WinningLotto from "../model/WinningLotto.js";
import Lotto from "../model/Lotto.js";
class LottoMachine {
  #lottos = [];
  #money;

  #setMoney(money) {
    this.#money = new Money(money);
  }

  issuedLotto(money) {
    this.#setMoney(money);
    this.#lottos = new LottoStore().issuedLottos(this.#money.getMoney());
    return [...this.#lottos];
  }

  calculateResult(winningNumbers, BonusNumbers) {
    const bonusNumber = Number(BonusNumbers);

    const winningLotto = new WinningLotto(
      new Lotto(winningNumbers),
      bonusNumber,
    );
    const lottoResult = winningLotto.evaluateLottos(this.#lottos);
    return {
      countMatchRank: lottoResult.getCounts(),
      returnOnInvestment: lottoResult.getReturnOnInvestment(
        this.#money.getMoney(),
      ),
    };
  }
}
export default LottoMachine;
