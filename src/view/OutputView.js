import { Printer } from '../io/index.js';

export default class OutputView {
  printError(message) {
    Printer.print(message);
  }
}
