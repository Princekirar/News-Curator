class CleanTerminalPlugin {
  apply(compiler) {
    process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
    compiler.hooks.invalid.tap("CleanTerminal", () => {
      process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
    });
  }
}

module.exports = CleanTerminalPlugin;