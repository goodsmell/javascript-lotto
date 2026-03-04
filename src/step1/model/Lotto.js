import { LOTTO_ERROR_MESSAGE } from "../constant/message.js";
import { LOTTO_COUNT } from "../constant/index.js";
import { LOTTO } from "../constant/index.js";
class Lotto {
  constructor(numbers) {
    this.#validate(numbers);
  }

  #validate(numbers) {
    this.#validateCount(numbers);
    this.#validateUniq(numbers);
    this.#validateRange(numbers);
  }

  #validateCount(numbers) {
    if (numbers.length !== LOTTO.COUNT) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_NOT_SIX_NUMBER);
    }
  }

  #validateUniq(numbers) {
    const numbersSet = new Set(numbers);
    if (numbersSet.size !== numbers.length) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_DUPLICATE);
    }
  }

  #validateRange(numbers) {
    const result = numbers.some(
      (number) => number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER,
    );
    if (result) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
    }
  }
}

export default Lotto;
