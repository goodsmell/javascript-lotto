import Lotto from "./Lotto.js";
import LottoResult from "./LottoResult.js";
import { LOTTO, RANK } from "../constant/index.js";
import { LOTTO_ERROR_MESSAGE } from "../constant/message.js";

class WinningLotto {
  #lotto;
  #bonus;

  constructor(numbers, bonus) {
    this.#lotto = numbers;
    this.#validate(numbers, bonus);
    this.#bonus = bonus;
  }

  getNumbers() {
    return this.#lotto.getNumbers();
  }

  #validate(numbers, bonus) {
    this.#validateUniq(numbers.getNumbers(), bonus);
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

  evaluateLotto(lotto) {
    const numbersSet = new Set([
      ...lotto.getNumbers(),
      ...this.#lotto.getNumbers(),
    ]);

    const matchCount = lotto.getNumbers().length * 2 - numbersSet.size;
    const hasBonus = lotto.getNumbers().includes(this.#bonus);

    if (matchCount === 6) return RANK.FIRST;
    if (matchCount === 5 && hasBonus) return RANK.SECOND;
    if (matchCount === 5 && !hasBonus) return RANK.THIRD;
    if (matchCount === 4) return RANK.FOURTH;
    if (matchCount === 3) return RANK.FIFTH;
  }

  evaluateLottos(lottos) {
    const ranks = lottos.map((lotto) => this.evaluateLotto(lotto));

    const counts = Object.values(RANK).reduce((acc, rank) => {
      acc[rank] = 0;
      return acc;
    }, {});

    ranks.forEach((rank) => {
      if (rank) counts[rank]++;
    });

    return new LottoResult(counts);
  }
}

export default WinningLotto;
