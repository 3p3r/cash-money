const mod = require("../node_modules/process/browser");
const stream = require("stream");
const path = require("path");
module.exports = {
  ...mod,
  chdir(dir) {
    this.cwd = () => {
      return path.resolve(dir);
    };
  },
  stdin: new stream.Readable(),
  stdout: new stream.Writable(),
  stderr: new stream.Writable(),
};
