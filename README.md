# cash-money

"cash-money" is a virtual [busybox](https://busybox.net/)-like framework in pure javascript.

![cash-money](cash-money.png)

## usage

install:

```bash
npm i react-ode-cash-money
```

sample:

```JS
const { cash, memfs } = require("react-ode-cash-money");

(async () => {
  console.log(await cash("echo 'hello world'"));
  memfs.writeFileSync("sample.txt", "hello file content", "utf8");
  await cash("touch random.log");
  console.log(await cash("cat sample.txt"));
  console.log(await cash("ls -lah"));
})();
```

output:

```bash
hello world

hello file content

total 18
drw-rw-rw- 1 1000 1000  0 May 27 13:22 .
drw-rw-rw- 1 1000 1000  0 May 27 13:22 ..
-rw-rw-rw- 1 1000 1000  0 May 27 13:22 random.log
-rw-rw-rw- 1 1000 1000 18 May 27 13:22 sample.txt
drwxrwxrwx 1 1000 1000  0 May 27 13:22 tmp
```

## api

a single `use` api is exposed where you can define "programs" for the shell. `exec()` is program's entrypoint and `setup()` is like its `getopts`.

"cash-money" modifies "cash" to accept async `exec()`s but you still need to make sure `exec()`s are executed serially and asynchronously.

meaning that you cannot call cash commands in the middle of each other. there is no threading or process.

do a waterfall `await cash(<thing 1>); await cash(<thing 2>);` and you are good.

```JS
const { use } = require("react-ode-cash-money");
// this works if you call before 1st execution
use({
  // program's binary name
  name: "sample",
  // help when executed as "help <command>"
  help: "sample help",
  // program's entry point
  exec: async function (argv) {
    // application logic goes here
    if (argv.version) {
      console.log("Sample 1.0.0");
      return 0;
    }
  },
  // program's command line parser setup
  setup: function ({ vorpal, interfacer, preparser }) {
    vorpal
      .command("sample")
      .parse(preparser)
      .option("-v, --version", "show version")
      .action(function (args, callback) {
        // this call glues vorpal to cash basically
        return interfacer.call(this, args, callback);
      });
  },
});
// this is how you use the new command:
(async () => {
  console.log(await cash(`sample --version`));
  console.log(await cash(`help sample`));
})();
```
