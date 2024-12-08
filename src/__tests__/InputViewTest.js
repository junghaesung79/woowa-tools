import { InputView } from '../src/view/index.js';
import { Reader } from '../src/io/index.js';
import { jest } from '@jest/globals';

describe.skip('InputView 클래스 테스트', () => {
  beforeEach(() => {
    Reader.readCSVString = jest.fn();
    Reader.readNumber = jest.fn();
  });

  describe('getNames 메서드 테스트', () => {
    test('정상적인 자동차 이름 입력 처리', async () => {
      // given
      const mockInput = 'pobi,woni,jun';
      Reader.readCSVString.mockReturnValue(mockInput);

      // when
      const result = await InputView.getNames();

      // then
      expect(result).toEqual(['pobi', 'woni', 'jun']);
    });

    test('자동차 이름이 다섯 글자가 넘을 경우 예외 발생', async () => {
      // given
      const mockInput = 'pobiiii,woni,jun';
      Reader.readCSVString.mockResolvedValue(mockInput);

      // when & then
      await expect(InputView.getNames()).rejects.toThrow('[ERROR]');
    });

    test('자동차 이름이 중복될 경우 예외 발생', async () => {
      // given
      const mockInput = 'pobi,pobi,jun';
      Reader.readCSVString.mockResolvedValue(mockInput);

      // when & then
      await expect(InputView.getNames()).rejects.toThrow('[ERROR]');
    });
  });

  describe('getTryCount 메서드 테스트', () => {
    test('정상적인 시도 횟수 입력 처리', async () => {
      // given
      Reader.readNumber.mockReturnValue(5);

      // when
      const result = await InputView.getTryCount();

      // then
      expect(typeof result).toBe('number');
      expect(result).toBe('5');
    });

    test('시도 횟수가 음수일 경우 예외 발생', async () => {
      // given
      Reader.readNumber.mockReturnValue(-1);

      // when & then
      await expect(InputView.getTryCount()).rejects.toThrow('[ERROR]');
    });

    test('시도 횟수가 0일 경우 예외 발생', async () => {
      // given
      Reader.readNumber.mockReturnValue(0);

      // when & then
      await expect(InputView.getTryCount()).rejects.toThrow('[ERROR]');
    });

    test('시도 횟수가 최대값을 초과할 경우 예외 발생', async () => {
      // given
      Reader.readNumber.mockReturnValue(11);

      // when & then
      await expect(InputView.getTryCount()).rejects.toThrow('[ERROR]');
    });
  });
});
