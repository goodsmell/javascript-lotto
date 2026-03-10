(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
class Input {
  // async readLineAsync(message) {
  //   return new Promise((resolve, reject) => {
  //     const rl = readline.createInterface({
  //       input: process.stdin,
  //       output: process.stdout,
  //     });
  //     rl.question(message ?? "", (line) => {
  //       rl.close();
  //       resolve(line);
  //     });
  //   });
  // }
}
const MONEY_ERROR_MESSAGE = Object.freeze({
  INPUT_NOT_NUMBER: "[ERROR] 구입 금액은 숫자만 입력 가능합니다..\n",
  INPUT_NOT_INTEGER: "[ERROR] 구입 금액은 정수만 입력 가능합니다.\n",
  INPUT_NOT_THOUSAND_UNIT: "[ERROR] 금액은 1000원 단위로 입력 가능합니다.\n",
  INPUT_NEGATIVE: "[ERROR] 금액은 양수만 입력 가능합니다."
});
const LOTTO_ERROR_MESSAGE = Object.freeze({
  INPUT_NOT_SIX_NUMBER: "[ERROR] 로또 번호는 6개 이어야합니다.\n",
  INPUT_DUPLICATE: "[ERROR] 중복된 번호는 입력할 수 없습니다.\n",
  INPUT_RANGE: "[ERROR] 로또 번호는 1에서 45 사이의 숫자여야 합니다.\n"
});
const INPUT_MESSAGE = Object.freeze({
  PURCHASE_AMOUNT: "> 구입금액을 입력해주세요. ",
  WINNING_NUMBER: "\n> 당첨 번호를 입력해주세요. ",
  BONUS_NUMBER: "\n> 보너스 번호를 입력해 주세요. ",
  ASK_RETRY: "\n> 다시 시작하시겠습니까? (y/n) "
});
const ERROR_MESSAGE = Object.freeze({
  NOT_INPUT_RETRY: "[ERROR] y 또는 n을 입력해주세요.\n"
});
const LOTTO = Object.freeze({
  COUNT: 6,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  PRICE: 1e3
});
const RANK = {
  FIRST: "RANK_1",
  SECOND: "RANK_2",
  THIRD: "RANK_3",
  FOURTH: "RANK_4",
  FIFTH: "RANK_5"
};
const RANK_PRIZE = {
  [RANK.FIRST]: 2e9,
  [RANK.SECOND]: 3e7,
  [RANK.THIRD]: 15e5,
  [RANK.FOURTH]: 5e4,
  [RANK.FIFTH]: 5e3
};
class Money {
  #amount;
  constructor(amount) {
    this.#validate(amount);
    this.#amount = amount;
  }
  #validate(amount) {
    this.#validateNumber(amount);
    this.#validateInteger(amount);
    this.#validatePositive(amount);
    this.#validateThousandUnit(amount);
  }
  #validateNumber(amount) {
    if (Number.isNaN(amount)) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_NUMBER);
    }
  }
  #validatePositive(amount) {
    if (amount <= 0) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_NEGATIVE);
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
class Lotto {
  #numbers;
  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = [...numbers].sort((a, b) => a - b);
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
      (number) => number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER
    );
    if (result) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
    }
  }
  getNumbers() {
    return [...this.#numbers];
  }
}
const pickLottoNumbers = () => {
  const lottoNumbers = /* @__PURE__ */ new Set();
  do {
    const randomNumber = Math.random() * (LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER) + LOTTO.MIN_NUMBER;
    lottoNumbers.add(Math.floor(randomNumber));
  } while (lottoNumbers.size < LOTTO.COUNT);
  return [...lottoNumbers.keys()];
};
const parseNumbers = (raw) => {
  const numbers = raw.split(",").map(Number);
  return numbers;
};
class LottoStore {
  #pickLottoNumbers;
  constructor(randomLottoNumberGenerator) {
    this.#pickLottoNumbers = randomLottoNumberGenerator ?? (() => pickLottoNumbers());
  }
  issuedLottos(amount) {
    const count = amount / LOTTO.PRICE;
    const lottos = [];
    for (let i = 0; i < count; i++) {
      const lotto = new Lotto(this.#pickLottoNumbers());
      lottos.push(lotto);
    }
    return lottos;
  }
}
class LottoResult {
  #counts;
  constructor(counts) {
    this.#counts = { ...counts };
  }
  getCounts() {
    return { ...this.#counts };
  }
  getPrize() {
    return Object.entries(this.#counts).reduce(
      (acc, [rank, count]) => acc + RANK_PRIZE[rank] * count,
      0
    );
  }
  getReturnOnInvestment(amount) {
    return this.getPrize() / amount * 100;
  }
}
class WinningLotto {
  #lottoNumbers;
  #bonus;
  constructor(numbers, bonus) {
    this.#lottoNumbers = numbers;
    this.#validate(numbers, bonus);
    this.#bonus = bonus;
  }
  #validate(numbers, bonus) {
    this.#validateUniq(numbers.getNumbers(), bonus);
    this.#validateRange(bonus);
  }
  #validateUniq(numbers, bonus) {
    const uniqueNumbers = /* @__PURE__ */ new Set([...numbers, bonus]);
    if (uniqueNumbers.size !== numbers.length + 1) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_DUPLICATE);
    }
  }
  #validateRange(bonus) {
    if (bonus < LOTTO.MIN_NUMBER || bonus > LOTTO.MAX_NUMBER) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
    }
  }
  getNumbers() {
    return this.#lottoNumbers.getNumbers();
  }
  evaluateLotto(lotto) {
    const uniqueNumbers = /* @__PURE__ */ new Set([
      ...lotto.getNumbers(),
      ...this.#lottoNumbers.getNumbers()
    ]);
    const matchedNumberCount = lotto.getNumbers().length * 2 - uniqueNumbers.size;
    const hasBonusNumber = lotto.getNumbers().includes(this.#bonus);
    if (matchedNumberCount === 6) return RANK.FIRST;
    if (matchedNumberCount === 5 && hasBonusNumber) return RANK.SECOND;
    if (matchedNumberCount === 5 && !hasBonusNumber) return RANK.THIRD;
    if (matchedNumberCount === 4) return RANK.FOURTH;
    if (matchedNumberCount === 3) return RANK.FIFTH;
  }
  evaluateLottos(lottos) {
    const rankResults = lottos.map((lotto) => this.evaluateLotto(lotto));
    const rankCounts = Object.values(RANK).reduce((acc, rank) => {
      acc[rank] = 0;
      return acc;
    }, {});
    rankResults.forEach((rank) => {
      if (rank) rankCounts[rank]++;
    });
    return new LottoResult(rankCounts);
  }
}
class Output {
  // static printResult = (countsObject, returnOnInvestment) => {
  //   console.log("");
  //   console.log("당첨 통계");
  //   console.log("--------------------");
  //   console.log(`3개 일치 (5,000원) - ${countsObject[RANK.FIFTH]}개`);
  //   console.log(`4개 일치 (50,000원) - ${countsObject[RANK.FOURTH]}개`);
  //   console.log(`5개 일치 (1,500,000원) - ${countsObject[RANK.THIRD]}개`);
  //   console.log(
  //     `5개 일치, 보너스 볼 일치 (30,000,000원) - ${countsObject[RANK.SECOND]}개`,
  //   );
  //   console.log(`6개 일치 (2,000,000,000원) - ${countsObject[RANK.FIRST]}개`);
  //   console.log(`총 수익률은 ${returnOnInvestment.toFixed(1)}%입니다.`);
  // };
  // static printPurchasedLottos = (lottos) => {
  //   console.log(`${lottos.length}장을 구매했습니다.`);
  //   lottos.forEach((lotto) =>
  //     console.log(`[${lotto.getNumbers().join(", ")}]`),
  //   );
  // };
}
class App {
  #input;
  #lottoStore;
  constructor({ input, lottoStore } = {}) {
    this.#input = input ?? new Input();
    this.#lottoStore = lottoStore ?? new LottoStore();
  }
  async run() {
    while (true) {
      await this.#playGame();
      const isRetry = await this.#askRetry();
      if (!isRetry) {
        break;
      }
    }
  }
  async #playGame() {
    const money = await this.#askMoney();
    const lottos = this.#lottoStore.issuedLottos(money.getMoney());
    Output.printPurchasedLottos(lottos);
    const winningNumbers = await this.#askWinningNumbers();
    const winningLotto = await this.#askBonusNumber(winningNumbers);
    const lottoGameResult = winningLotto.evaluateLottos(lottos);
    const returnOnInvestment = lottoGameResult.getReturnOnInvestment(
      money.getMoney()
    );
    Output.printResult(lottoGameResult.getCounts(), returnOnInvestment);
  }
  async #askBonusNumber(lotto) {
    return await this.#retry(async () => {
      const inputBonus = await this.#input.readLineAsync(
        INPUT_MESSAGE.BONUS_NUMBER
      );
      const bonusNumber = Number(inputBonus);
      const winningLotto = new WinningLotto(lotto, bonusNumber);
      return winningLotto;
    });
  }
  async #askWinningNumbers() {
    return await this.#retry(async () => {
      const inputWinningNumber = await this.#input.readLineAsync(
        INPUT_MESSAGE.WINNING_NUMBER
      );
      const winningNumbers = parseNumbers(inputWinningNumber);
      return new Lotto(winningNumbers);
    });
  }
  async #askMoney() {
    return await this.#retry(async () => {
      const inputMoney = await this.#input.readLineAsync(
        INPUT_MESSAGE.PURCHASE_AMOUNT
      );
      const money = new Money(Number(inputMoney));
      return money;
    });
  }
  async #askRetry() {
    return await this.#retry(async () => {
      const askRetry = await this.#input.readLineAsync(INPUT_MESSAGE.ASK_RETRY);
      const input = askRetry.toLowerCase();
      if (input === "y") return true;
      if (input === "n") return false;
      throw new Error(ERROR_MESSAGE.NOT_INPUT_RETRY);
    });
  }
  async #retry(task) {
    while (true) {
      try {
        return await task();
      } catch (e) {
        console.log(e.message);
      }
    }
  }
}
const app = new App();
await app.run();
