import { Console } from '@woowacourse/mission-utils';
import { ERRORS } from '../constants/index.js';
import { throwError } from '../utils/errorHandler.js';

const CSV_SEPARATOR = ',';
const CONFIRM_ANSWERS = Object.freeze(['y', 'n']);

export default class Reader {
  static async readLine(query) {
    return this.#readAndNormalize(query);
  }

  static async readNumber(query) {
    const normalizedLine = await this.#readAndNormalize(query);

    if (!Number.isInteger(Number(normalizedLine))) {
      throwError(ERRORS.invalidNumber);
    }

    return Number(normalizedLine);
  }

  static async readCSVString(query) {
    const normalizedLine = await this.#readAndNormalize(query);
    const splittedLine = normalizedLine.split(CSV_SEPARATOR);

    this.#validateSplittedLine(splittedLine);

    return normalizedLine;
  }

  static async readCSVNumber(query) {
    const normalizedLine = await this.#readAndNormalize(query);
    const splittedLine = normalizedLine.split(CSV_SEPARATOR);

    this.#validateSplittedLine(splittedLine);
    if (splittedLine.some((word) => !Number.isInteger(Number(word.trim())))) {
      throwError(ERRORS.invalidNumber);
    }

    return normalizedLine;
  }

  static async readConfirmation(query) {
    const normalizedInput = await this.#readAndNormalize(query);
    const answer = normalizedInput.toLowerCase();

    if (!CONFIRM_ANSWERS.includes(answer)) {
      throwError(ERRORS.invalidConfirmation);
    }

    return answer;
  }

  static async #readAndNormalize(query) {
    const line = await Console.readLineAsync(query);
    const normalizedLine = line.trim();

    if (normalizedLine === '') {
      throwError(ERRORS.emptyInput);
    }

    return normalizedLine;
  }

  static #validateSplittedLine(splittedLine) {
    if (splittedLine.some((word) => word.trim() === '')) {
      throwError(ERRORS.invalidCSV);
    }
  }
}
