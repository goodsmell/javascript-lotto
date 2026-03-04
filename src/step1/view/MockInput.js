class MockInput {
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

export default MockInput;
