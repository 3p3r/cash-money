import * as cash from "cash";
import * as memfs from "memfs";

type Cash = (command: string) => Promise<string>;
type UseExec = (argv: any[]) => Promise<number>;
type UseSetup = (vorpal: any, preparser: any, interfacer: any) => Promise<number>;
type UseArgs = { name: string; help: string; exec: UseExec; setup: UseSetup };
type UseFunction = (args: UseArgs) => void;

const _fs = memfs as any as typeof import("fs");
const _use = cash.use.bind(cash) as any as UseFunction;
const _cash = cash as any as Cash;
const _process = process;
const _console = console;

const cm = { fs: _fs, use: _use, cash: _cash, process: _process, console: _console };
export { _fs as fs, _use as use, _cash as cash, _process as process, _console as console };
export default cm;
