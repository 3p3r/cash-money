const money = require("./dist");
const { cash, memfs } = money;

console.log(cash("echo 'hello world'"));
memfs.writeFileSync("sample.txt", "hello file", "utf8");
console.log(cash("cat sample.txt"));
console.log(cash("ls -lah"));
