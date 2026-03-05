import Lotto from "./Lotto.js";
import { LOTTO } from "../constant/index.js";
import { LOTTO_ERROR_MESSAGE } from "../constant/message.js";

class WinningLotto extends Lotto {
  #bonus;

  constructor(numbers, bonus) {
    super(numbers);
    this.#validate(numbers, bonus);
    this.#bonus = bonus;
  }

  #validate(numbers, bonus) {
    this.#validateUniq(numbers, bonus);
    this.#validateRange(bonus);
  }

  #validateUniq(numbers, bonus) {
    const numbersSet = new Set([...numbers, bonus]);
    if (numbersSet.size !== numbers.length + 1) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_DUPLICATE);
    }
  }

  #validateRange(bonus) {
    if (bonus < LOTTO.MIN_NUMBER || bonus > LOTTO.MAX_NUMBER) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
    }
  }

  getBonus() {
    return this.#bonus;
  }
}

export default WinningLotto;
