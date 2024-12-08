import { CONFIG, ERRORS } from './constants/index.js';
import { Service } from './services/index.js';
import { throwError } from './utils/errorHandler.js';
import { InputView, OutputView } from './view/index.js';
import { EventEmitter } from './core/index.js';
import { EVENT_TYPES } from './types/index.js';

export default class Controller {
  constructor() {
    EventEmitter.on(EVENT_TYPES.submit, (data) => {
      OutputView.printSubmit(data);
    });
  }

  async #retryOnError(inputFunction) {
    let attempts = 0;

    while (attempts < CONFIG.maxRetryCount) {
      try {
        return await inputFunction();
      } catch (error) {
        attempts += 1;
        OutputView.printError(error.message);

        if (attempts >= maxTries) {
          throw throwError(ERRORS.exceedMaxRetryCount);
        }
      }
    }
  }

  async run() {
    const input = await this.#retryOnError(async () => await InputView.getInput());
  }
}
