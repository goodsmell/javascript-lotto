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

export default Input;
