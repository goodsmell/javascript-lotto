import Lotto from "./Lotto.js";
import { pickLottoNumbers } from "../utils.js";

class LottoStore {
  #pickLottoNumbers;

  constructor(randomLottoNumberGenerator) {
    this.#pickLottoNumbers =
      randomLottoNumberGenerator ?? (() => pickLottoNumbers());
  }

  issuedLotto(count) {
    const lottos = [];

    for (let i = 0; i < count; i++) {
      const lotto = new Lotto(this.#pickLottoNumbers());
      lottos.push(lotto);
    }

    return lottos;
  }
}

export default LottoStore;
