import readline from "readline";

class Input {
  #rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async readLineAsync(message) {
    return new Promise((resolve, reject) => {
      this.#rl.question(message ?? "", (line) => {
        this.#rl.close();
        resolve(line);
      });
    });
  }
}

export class MockInput {
  #returnValue;

  constructor(returnValue) {
    this.#returnValue = returnValue;
  }

  async readLineAsync(message) {
    return new Promise((resolve, reject) => {
      resolve(this.#returnValue);
    });
  }
}

class App {
  #input;

  constructor({ input } = {}) {
    this.#input = input ?? new Input();
  }

  async run() {
    const test = await this.#input.readLineAsync("구입금액을 입력해 주세요.");

    if (!Number(test)) {
      throw new Error("[ERROR] 숫자를 입력해주세요.");
    }

    // if (test % 1000 !== 0) {
    //   console.log("[ERROR]");
    // }
  }
}

const app = new App();
app.run();

export default App;
