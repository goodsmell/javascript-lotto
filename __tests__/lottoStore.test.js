import LottoStore from "../src/step1/model/LottoStore.js";

describe("로또 발행 테스트 ", () => {
  test("로또 발행", () => {
    expect(new LottoStore().issuedLotto(6).length).toBe(6);
  });
});
