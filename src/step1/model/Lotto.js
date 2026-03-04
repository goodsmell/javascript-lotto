import { LOTTO_ERROR_MESSAGE } from "../constant/message.js";
import { LOTTO_COUNT } from "../constant/lotto.js";

class Lotto {
  constructor(numbers) {
    this.#validate(numbers);
  }

  #validate(numbers) {
    this.#validateCount(numbers);
    this.#validateUniq(numbers);
  }

  #validateCount(numbers) {
    if (numbers.length !== LOTTO_COUNT) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_NOT_SIX_NUMBER);
    }
  }

  #validateUniq(numbers) {
    const n = new Set(numbers);
    if (n.size !== numbers.length) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_DUPLICATE);
    }
  }
}

export default Lotto;
