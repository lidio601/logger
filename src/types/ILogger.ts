export interface ILogger {
  log: (message: string, ...args: any) => void;
  logi: (message: string, ...args: any) => void;
  loge: (message: string, ...args: any) => void;
  logw: (message: string, ...args: any) => void;
  fork: (prefix: string) => ILogger;
  setDebug: (enabled: boolean) => void;
}

export default ILogger;
