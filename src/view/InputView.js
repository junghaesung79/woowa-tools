import { Reader } from '../io/index.js';
import { throwError } from '../utils/errorHandler.js';
import { CONFIRM_TYPES } from '../types/index.js';

export default class InputView {
  static async confirm(promptType) {
    const answer = await Reader.readConfirm(CONFIRM_TYPES[promptType]);
    return answer === 'y';
  }
}
