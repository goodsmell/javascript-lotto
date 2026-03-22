import Input from "./view/console/Input.js";
import { INPUT_MESSAGE, ERROR_MESSAGE } from "./constant/message.js";
import { parseNumbers } from "./utils.js";
import Output from "./view/console/Output.js";
import LottoMachine from "./service/LottoMachine.js";
class App {
  #input;

  constructor({ input } = {}) {
    this.#input = input ?? new Input();
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
    const lottoMachine = new LottoMachine();
    const lottos = lottoMachine.issueLottos(money);
    Output.printPurchasedLottos(lottos);

    const winningNumbers = await this.#askWinningNumbers();
    const bonusNumber = await this.#askBonusNumber(winningNumbers);
    const winningLotto = lottoMachine.calculateResult(
      winningNumbers,
      bonusNumber,
    );

    Output.printResult(
      winningLotto.countMatchRank,
      winningLotto.returnOnInvestment,
    );
  }

  async #askBonusNumber() {
    return await this.#retry(async () => {
      const inputBonus = await this.#input.readLineAsync(
        INPUT_MESSAGE.BONUS_NUMBER,
      );

      return Number(inputBonus);
    });
  }

  async #askWinningNumbers() {
    return await this.#retry(async () => {
      const inputWinningNumber = await this.#input.readLineAsync(
        INPUT_MESSAGE.WINNING_NUMBER,
      );
      const winningNumbers = parseNumbers(inputWinningNumber);
      return winningNumbers;
    });
  }

  async #askMoney() {
    return await this.#retry(async () => {
      const inputMoney = await this.#input.readLineAsync(
        INPUT_MESSAGE.PURCHASE_AMOUNT,
      );

      return Number(inputMoney);
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

export default App;
