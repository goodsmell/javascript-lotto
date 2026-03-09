import App from "../src/step1/app.js";
import MockInput from "../src/step1/view/MockInput.js";
import LottoStore from "../src/step1/model/LottoStore.js";
import { ERROR_MESSAGE } from "../src/step1/constant/message.js";
import { MockPickLottoNumbers } from "../src/step1/utils.js";

describe("App 테스트 ", () => {
  test("y 또는 n이 입력되지 않은 경우 에러 메시지가 출력되는가?", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const app = new App({
      input: new MockInput(["1000", "1,2,3,4,5,6", "7", "s", "n"]),
    });
    await app.run();
    expect(logSpy).toHaveBeenCalledWith(ERROR_MESSAGE.NOT_INPUT_RETRY);
    logSpy.mockRestore();
  });
  
  test("정상적으로 App이 종료되는가?", async () => {
    const app = new App({
      input: new MockInput(["1000", "1,2,3,4,5,6", "7", "n"]),
    });

    await expect(app.run()).resolves.toBeUndefined();
  });

  test("정상적으로 전체 기능이 작동하는가?", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const app = new App({
      input: new MockInput(["2000", "1,2,3,4,5,6", "7", "n"]),
      lottoStore: new LottoStore(() =>
        MockPickLottoNumbers([[1, 2, 3, 4, 5, 6]]),
      ),
    });
    await app.run();
    const logs = [
      "2장을 구매했습니다.",
      "[1, 2, 3, 4, 5, 6]",
      "[1, 2, 3, 4, 5, 6]",
      "당첨 통계",
      "3개 일치 (5,000원) - 0개",
      "4개 일치 (50,000원) - 0개",
      "5개 일치 (1,500,000원) - 0개",
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
      "6개 일치 (2,000,000,000원) - 2개",
      "총 수익률은 200000000.0%입니다.",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
    logSpy.mockRestore();
  });
});
