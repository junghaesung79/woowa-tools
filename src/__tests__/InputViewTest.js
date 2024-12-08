import { InputView } from '../src/view/index.js';
import { Reader } from '../src/io/index.js';

describe('InputView 클래스 테스트', () => {
  beforeEach(() => {
    Reader.readCSVString = jest.fn();
    Reader.readNumber = jest.fn();
  });

  test.each([
    ['정상 입력', 'pobi,woni,jun', ['pobi', 'woni', 'jun'], false],
    ['다섯 글자 초과', 'pobiiii,woni,jun', null, true],
  ])('getNames - %s', async (_, input, expected, shouldThrow) => {
    Reader.readCSVString.mockResolvedValue(input);

    if (shouldThrow) {
      await expect(InputView.getNames()).rejects.toThrow();
      return;
    }
    expect(await InputView.getNames()).toEqual(expected);
  });

  test.each([
    ['정상 입력', 5, 5, false],
    ['음수 입력', -1, null, true],
    ['0 입력', 0, null, true],
  ])('getTryCount - %s', async (_, input, expected, shouldThrow) => {
    Reader.readNumber.mockResolvedValue(input);

    if (shouldThrow) {
      await expect(InputView.getTryCount()).rejects.toThrow();
      return;
    }
    expect(await InputView.getTryCount()).toBe(expected);
  });
});
