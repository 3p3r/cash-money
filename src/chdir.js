let _cwd = "/";

function cwd() {
  return _cwd;
}

function chdir(path) {
  _cwd = path;
}

module.exports = { cwd, chdir };
