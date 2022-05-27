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
console.log(cash("echo 'hello world'"));
memfs.writeFileSync("sample.txt", "hello file content", "utf8");
cash("touch random.log");
console.log(cash("cat sample.txt"));
console.log(cash("ls -lah"));
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
