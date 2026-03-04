import { MONEY_ERROR_MESSAGE } from "../constant/message";
import { LOTTO } from "../constant";

class Money {
  #amount;

  constructor(amount) {
    this.#amount = amount;
    this.#validate(amount);
  }

  #validate(amount) {
    this.#validateNumber(amount);
    this.#validateInteger(amount);
    this.#validateThousandUnit(amount);
  }

  #validateNumber(amount) {
    if (Number.isNaN(amount)) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_NUMBER);
    }
  }

  #validateInteger(amount) {
    if (amount % 1 !== 0) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_INTEGER);
    }
  }

  #validateThousandUnit(amount) {
    if (amount % LOTTO.PRICE !== 0) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_THOUSAND_UNIT);
    }
  }

  getMoney() {
    return this.#amount;
  }
}

export default Money;
