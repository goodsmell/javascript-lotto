import Input from "./view/Input.js";

class App {
  #input;

  constructor({ input } = {}) {
    this.#input = input ?? new Input();
  }

  async run() {
    const test = await this.#input.readLineAsync("구입금액을 입력해 주세요.\n");

    const money = Number(test);

    if (!money) {
      throw new Error("[ERROR] 숫자를 입력해주세요.");
    }

    if (money % 1000 !== 0) {
      throw new Error("[ERROR] 구입 금액은 1000원 단위로 입력해주세요.");
    }
  }
}

export default App;
