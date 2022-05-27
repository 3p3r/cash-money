const { cash, memfs } = require("./dist");
console.log(cash("echo 'hello world'"));
memfs.writeFileSync("sample.txt", "hello file content", "utf8");
cash("touch random.log");
console.log(cash("cat sample.txt"));
console.log(cash("ls -lah"));
