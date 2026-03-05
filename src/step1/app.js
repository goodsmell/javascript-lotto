import Input from "./view/Input.js";
import Money from "./model/Money.js";
import LottoStore from "./model/LottoStore.js";
import { MONEY_ERROR_MESSAGE, INPUT_MESSAGE } from "./constant/message.js";
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

    // 당첨 '번호' 검증하고
    // 당첨 '보너스 번호' 입력받기(번호)
    // 당첨 '보너스 번호' 검증

    // 당첨 결과 계산
    // 로또 1장 당 번호 일치 수 계산
    // 로또 전체 번호 일치 수 계산
    // 수익률 계산
    // 당첨 통계 출력

    // 다시 시작 여부 묻기
  }
}

export default App;
