import Input from "./view/Input.js";
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

    const money = Number(moneyString);

    if (!money) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_NUMBER);
    }

    if (money % 1 !== 0) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_INTEGER);
    }

    if (money % 1000 !== 0) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_THOUSAND_UNIT);
    }
  }
}

export default App;
