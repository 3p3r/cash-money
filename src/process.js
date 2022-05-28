const mod = require("../node_modules/process/browser");
const stream = require("stream");
const path = require("path"); // path internally uses process :(
const { cwd, chdir } = require("./chdir");
module.exports = {
  ...mod,
  cwd,
  chdir,
  stdin: new stream.Readable(),
  stdout: new stream.Writable(),
  stderr: new stream.Writable(),
};
