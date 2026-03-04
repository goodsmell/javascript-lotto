import { LOTTO_ERROR_MESSAGE } from "../constant/message.js";
import { LOTTO_COUNT } from "../constant/lotto.js";

class Lotto {
  constructor(numbers) {
    this.#validateCount(numbers);
  }

  #validateCount(numbers) {
    if (numbers.length !== LOTTO_COUNT) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_NOT_SIX_NUMBER);
    }
  }
}

export default Lotto;
