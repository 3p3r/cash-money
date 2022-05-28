const { EventEmitter2 } = require("eventemitter2");
class EmitterConsole extends EventEmitter2 {
  log(...args) {
    this.emit("log", ...args);
  }
  info(...args) {
    this.emit("info", ...args);
  }
  error(...args) {
    this.emit("error", ...args);
  }
  warn(...args) {
    this.emit("warn", ...args);
  }
  trace(...args) {
    this.emit("trace", ...args);
  }
  debug(...args) {
    this.emit("debug", ...args);
  }
}
module.exports = new EmitterConsole({ wildcard: true });
