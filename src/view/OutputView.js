import { Printer } from '../io/index.js';

export default class OutputView {
  static printError(message) {
    Printer.print(message);
  }
}
