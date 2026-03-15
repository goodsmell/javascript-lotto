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
const lottoIcon = "/javascript-lotto/assets/lotto_icon-B0TrAQPw.png";
class LottoList {
  constructor() {
    this.$lottoListSection = document.querySelector(".lotto-list");
  }
  renderLottoList(lottos) {
    this.$lottoListSection.innerHTML = `
      <p class="text-lotto-body lotto-list__count">총 ${lottos.length}개를 구매하였습니다.</p>
      <div class = "lotto-list__container" >
        ${lottos.map((lotto) => this._lottoTemplate(lotto)).join("")}
      </div>
    `;
  }
  _lottoTemplate(lotto) {
    return `
      <div class="lotto-list__item"> <img src="${lottoIcon}" alt="lotto-icon" class="lotto-list__icon" />
        <p class="text-lotto-body lotto-list__numbers">${lotto.getNumbers().join(", ")}</p>
      </div>
    `;
  }
  reset() {
    this.$lottoListSection.innerHTML = "";
  }
}
class MoneyInput {
  constructor() {
    this.$moneyInput = document.querySelector(".money-form__input");
    this.$moneyForm = document.querySelector(".money-form");
  }
  bindPurchase(handler) {
    this.$moneyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const moneyValue = this.$moneyInput.value;
      handler(moneyValue);
    });
  }
  reset() {
    this.$moneyForm.reset();
  }
}
const closeIcon = "data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M14%201.41L12.59%200L7%205.59L1.41%200L0%201.41L5.59%207L0%2012.59L1.41%2014L7%208.41L12.59%2014L14%2012.59L8.41%207L14%201.41Z'%20fill='black'/%3e%3c/svg%3e";
const LOTTO = Object.freeze({
  COUNT: 6,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  PRICE: 1e3,
  MAX_PRICE: 1e5
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
const RANK_DESCRIPTION = {
  [RANK.FIFTH]: "3개",
  [RANK.FOURTH]: "4개",
  [RANK.THIRD]: "5개",
  [RANK.SECOND]: "5개 + 보너스 볼",
  [RANK.FIRST]: "6개"
};
class ResultModal {
  constructor() {
    this.$modal = document.querySelector(".result-modal");
    this.$modalCloseButton = document.querySelector(
      ".result-modal__close-button"
    );
    this.$resultTableBody = document.querySelector(".result-modal__table-body");
    this.$profitRate = document.querySelector(".result-modal__profit-rate");
    this.$resetButton = document.querySelector(".result-modal__reset-button");
    this.initCloseButton();
  }
  initCloseButton() {
    this.$modalCloseButton.innerHTML = `<img src="${closeIcon}" alt="close" class="result-modal__close-icon" />`;
  }
  bindCloseModal() {
    this.$modalCloseButton.addEventListener("click", () => {
      this.$modal.classList.add("hidden");
    });
  }
  bindReset(handler) {
    this.$resetButton.addEventListener("click", () => {
      handler();
    });
  }
  renderResult(rankCounts, profitRate) {
    this.$resultTableBody.innerHTML = this._createResultTemplate(rankCounts);
    this.$profitRate.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;
    this.$modal.classList.remove("hidden");
  }
  _createResultTemplate(rankCounts) {
    const ranks = [
      RANK.FIFTH,
      RANK.FOURTH,
      RANK.THIRD,
      RANK.SECOND,
      RANK.FIRST
    ];
    return ranks.map(
      (rank) => `
    <tr class="result-modal__table-row">
      <td>${RANK_DESCRIPTION[rank]}</td>
      <td>${RANK_PRIZE[rank].toLocaleString()}</td>
      <td>${rankCounts[rank] || 0}개</td>
    </tr>
  `
    ).join("");
  }
  reset() {
    this.$modal.classList.add("hidden");
  }
}
class WinningInput {
  constructor() {
    this.$winningNumbersForm = document.querySelector(".winning-section__form");
    this.$winningNumberInputs = document.querySelectorAll(
      ".winning-section__input"
    );
    this.$winningSection = document.querySelector(".winning-section");
    this.$bonusNumberInput = document.querySelector(
      ".winning-section__input--bonus"
    );
  }
  bindCalculate(handler) {
    this.$winningNumbersForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const winningNumbers = Array.from(this.$winningNumberInputs).map(
        (input) => Number(input.value)
      );
      const bonusNumber = Number(this.$bonusNumberInput.value);
      handler({ winningNumbers, bonusNumber });
    });
  }
  showWinningInput() {
    this.$winningSection.classList.remove("hidden");
  }
  reset() {
    this.$winningSection.classList.add("hidden");
    this.$winningNumbersForm.reset();
  }
}
const MONEY_ERROR_MESSAGE = Object.freeze({
  INPUT_NOT_NUMBER: "[ERROR] 구입 금액은 숫자만 입력 가능합니다..\n",
  INPUT_NOT_INTEGER: "[ERROR] 구입 금액은 정수만 입력 가능합니다.\n",
  INPUT_NOT_THOUSAND_UNIT: "[ERROR] 금액은 1000원 단위로 입력 가능합니다.\n",
  INPUT_NEGATIVE: "[ERROR] 금액은 양수만 입력 가능합니다.",
  INPUT_EXCEED_MAX: `[ERROR] 최대 구입 금액은 ${LOTTO.MAX_PRICE.toLocaleString()}원입니다.
`
});
const LOTTO_ERROR_MESSAGE = Object.freeze({
  INPUT_NOT_SIX_NUMBER: "[ERROR] 로또 번호는 6개 이어야합니다.\n",
  INPUT_DUPLICATE: "[ERROR] 중복된 번호는 입력할 수 없습니다.\n",
  INPUT_RANGE: "[ERROR] 로또 번호는 1에서 45 사이의 숫자여야 합니다.\n"
});
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
    this.#validateMaxAmount(amount);
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
  #validateMaxAmount(amount) {
    if (amount > LOTTO.MAX_PRICE) {
      throw new Error(MONEY_ERROR_MESSAGE.INPUT_EXCEED_MAX);
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
const formatROI = (roi) => {
  return Math.round(roi * 100) / 100;
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
    const roi = this.getPrize() / amount * 100;
    return formatROI(roi);
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
class LottoMachine {
  #lottos = [];
  #money;
  #setMoney(money) {
    this.#money = new Money(money);
  }
  issueLottos(money) {
    this.#setMoney(money);
    this.#lottos = new LottoStore().issuedLottos(this.#money.getMoney());
    return [...this.#lottos];
  }
  calculateResult(winningNumbers, bonusNumber) {
    if (this.#lottos.length === 0) return null;
    const numericBonusNumber = Number(bonusNumber);
    const winningLotto = new WinningLotto(
      new Lotto(winningNumbers),
      numericBonusNumber
    );
    const lottoResult = winningLotto.evaluateLottos(this.#lottos);
    return {
      countMatchRank: lottoResult.getCounts(),
      returnOnInvestment: lottoResult.getReturnOnInvestment(
        this.#money.getMoney()
      )
    };
  }
}
class App {
  constructor() {
    this.views = {
      money: new MoneyInput(),
      modal: new ResultModal(),
      list: new LottoList(),
      winning: new WinningInput()
    };
    this.service = new LottoMachine();
  }
  init() {
    this.views.money.bindPurchase((money) => this.handlePurchase(money));
    this.views.winning.bindCalculate(
      (data) => this.handleCalculateResults(data)
    );
    this.views.modal.bindCloseModal();
    this.views.modal.bindReset(() => this.handleReset());
  }
  handlePurchase(money) {
    try {
      const lottos = this.service.issueLottos(money);
      this.views.list.renderLottoList(lottos);
      this.views.winning.showWinningInput();
    } catch (error) {
      alert(error.message);
    }
  }
  handleCalculateResults({ winningNumbers, bonusNumber }) {
    try {
      const { countMatchRank, returnOnInvestment } = this.service.calculateResult(winningNumbers, bonusNumber);
      console.log(countMatchRank, returnOnInvestment);
      this.views.modal.renderResult(countMatchRank, returnOnInvestment);
    } catch (error) {
      alert(error.message);
    }
  }
  handleReset() {
    this.service = new LottoMachine();
    this.views.money.reset();
    this.views.modal.reset();
    this.views.list.reset();
    this.views.winning.reset();
    console.log("앱이 초기화되었습니다.");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const lottoApp = new App();
  lottoApp.init();
});
