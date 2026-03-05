import Input from "./view/Input.js";
import Money from "./model/Money.js";
import LottoStore from "./model/LottoStore.js";
import WinningLotto from "./model/WinningLotto.js";
import { MONEY_ERROR_MESSAGE, INPUT_MESSAGE } from "./constant/message.js";
import { parseNumbers, evaluateLotto } from "./utils.js";
import { getCountsRank, getReturnOnInvestment, printResult } from "./utils.js";

class App {
  #input;

  constructor({ input } = {}) {
    this.#input = input ?? new Input();
  }

  async run() {
    const moneyString = await this.#input.readLineAsync(
      INPUT_MESSAGE.PURCHASE_AMOUNT,
    );

    const money = new Money(Number(moneyString));
    const lottoCount = money.getLottoCount();

    const lottoStore = new LottoStore();
    const lottos = lottoStore.issuedLotto(lottoCount);

    // 발행한 로또 출력
    console.log(`${money.getLottoCount()}장을 구매했습니다.`);
    lottos.forEach((lotto) => console.log(lotto.getNumbers()));

    // 당첨 '번호' 입력받기
    const winningNumbersString = await this.#input.readLineAsync(
      INPUT_MESSAGE.WINNING_NUMBER,
    );

    // 당첨 '번호' 파싱
    const winningNumbers = parseNumbers(winningNumbersString);

    // 당첨 '보너스 번호' 입력받기(번호)
    const bonusNumberString = await this.#input.readLineAsync(
      INPUT_MESSAGE.BONUS_NUMBER,
    );

    // 당첨 '보너스 번호' 파싱
    const bonusNumber = Number(bonusNumberString);

    // 당첨 '보너스 번호', '번호' 검증하고
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

    // 당첨 결과 계산

    // 구입한 로또 등수 계산   { RANK_1: 2, RANK_2: 1, RANK_3: 1, RANK_4: 0, RANK_5: 1 }
    const ranks = lottos.map((lotto) => evaluateLotto(lotto, winningLotto));

    // 수익률 계산
    const counts = getCountsRank(ranks);
    const returnOnInvestment = getReturnOnInvestment(money.getMoney(), counts);

    // 당첨 통계 출력
    printResult(counts, returnOnInvestment);
    // 다시 시작 여부 묻기
    
  }
}

export default App;
