import LottoStore from "../src/step1/model/LottoStore.js";

describe("로또 발행 테스트 ", () => {
  test("구입 금액에 따른 로또 장 수가 올바르게 계산되었는가?", () => {
    expect(new LottoStore().issuedLotto(5000).length).toBe(5);
  });
});
