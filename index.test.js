const chai = require("chai");
const { cash, fs, use, console: logger } = require("./dist");

chai.use(require("chai-as-promised"));
chai.use(require("deep-equal-in-any-order"));

const TEST_OUTPUT = `\
hello world
Sample 1.0.0
hello file content
random.log  
sample.txt  
tmp         
sample help
`;

describe("cash-money tests", () => {
  it("should pass without blowing up", async () => {
    // aggregate console logs
    let output = "";
    logger.on("log", (m) => (output += `${m}\n`));
    // install a runtime command
    use({
      // program's binary name
      name: "sample",
      // help when executed as "help <command>"
      help: "sample help",
      // program's entry point
      exec: async function (argv) {
        // application logic goes here
        if (argv.version) {
          logger.log("Sample 1.0.0");
          return 0;
        }
      },
      // program's command line parser setup
      setup: function (vorpal, preparser, interfacer) {
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

    await cash("echo 'hello world'");
    await cash(`sample --version`);
    fs.writeFileSync("sample.txt", "hello file content", "utf8");
    await cash("touch random.log");
    await cash("cat sample.txt");
    await cash("ls");
    await cash(`help sample`);

    chai.assert.deepEqual(TEST_OUTPUT, output);
  });
});
