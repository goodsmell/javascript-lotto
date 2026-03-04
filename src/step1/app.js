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
  }
}

export default App;
