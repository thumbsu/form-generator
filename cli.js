#!/usr/bin/env node

const { Command } = require('commander');
const reader = require('./yaml-reader.js')

const program = new Command();

const timeLabel = 'command duration';
program
  .option('-p, --profile', 'show how long command takes')
  .hook('preAction', (thisCommand) => {
    if (thisCommand.opts().profile) {
      console.time(timeLabel);
    }
  })
  .hook('postAction', (thisCommand) => {
    if (thisCommand.opts().profile) {
      console.timeEnd(timeLabel);
    }
  });

program
  .option('-t, --trace', 'display trace statements for commands')
  .hook('preAction', (thisCommand, actionCommand) => {
    if (thisCommand.opts().trace) {
      console.log('>>>>');
      console.log(`About to call action handler for subcommand: ${actionCommand.name()}`);
      console.log('arguments: %O', actionCommand.args);
      console.log('options: %o', actionCommand.opts());
      console.log('<<<<');
    }
  });

program.command('parser')
  .argument('[file name]', 'file name')
  .action((fileName) => {
    const filters = reader.yamlToJson(fileName)
    reader.generate(filters)
  })

// Some of the hooks or actions are async, so call parseAsync rather than parse.
program.parseAsync().then(() => { });
