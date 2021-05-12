import _defaultTo from "lodash/defaultTo";
import _isNil from "lodash/isNil";

import ConfigHolder from "./types/ConfigHolder";
import ILogger from "./types/ILogger";

const DEBUG = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

function makeLogger(prefix: string, config?: ConfigHolder<boolean>) {
  return function (message: string, ...args: any) {
    if (!config || config.get()) {
      console.log(...[`${prefix} :: ${message}`, ...args]);
    }
  };
}

function makeLoggerE(prefix: string) {
  return function (message: string, ...args: any) {
    console.error(...[`${prefix} :: ${message}`, ...args]);
  };
}

function makeLoggerW(prefix: string) {
  return function (message: string, ...args: any) {
    console.warn(...[`${prefix} :: ${message}`, ...args]);
  };
}

function _makeLoggers(
  prefix: string,
  config: ConfigHolder<boolean>
): ILogger & { logger: ILogger } {
  let debug = config.get();

  const logger = {
    log: makeLogger(prefix, config),
    logi: makeLogger(prefix, new ConfigHolder(DEBUG)),
    loge: makeLoggerE(prefix),
    logw: makeLoggerW(prefix),
    fork: (subprefix: string) => {
      return _makeLoggers(`${prefix} :: ${subprefix}`, config);
    },
    setDebug: (enabled: boolean) => {
      // ignore when undefined
      if (_isNil(enabled)) {
        return;
      }

      // if turned off
      if (debug && !enabled) {
        if (DEBUG) {
          console.log(`${prefix} logger is disabled`);
        }
      }

      debug = enabled;
      config.set(enabled);
    },
  };

  return {
    ...logger,
    logger,
  };
}

export function makeLoggers(prefix: string, debug?: boolean) {
  const config = new ConfigHolder(DEBUG);

  // DEBUG from dotenv.ts is a global switch
  // debug parameter can be used to selectively switch on/off a module
  if (DEBUG) {
    config.set(_defaultTo(debug, DEBUG));
  }

  if (!config.get()) {
    if (DEBUG) {
      console.log(`${prefix} logger is disabled`);
    }
  }

  return _makeLoggers(prefix, config);
}

export default makeLoggers;
