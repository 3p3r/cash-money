const { cash, memfs } = require("./dist");

(async () => {
  console.log(await cash("echo 'hello world'"));
  memfs.writeFileSync("sample.txt", "hello file content", "utf8");
  await cash("touch random.log");
  console.log(await cash("cat sample.txt"));
  console.log(await cash("ls -lah"));
})();
