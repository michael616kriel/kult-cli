#!/usr/bin/env node
import figlet from 'figlet';
import { run } from './commands/entry';
console.log(figlet.textSync('KULT CLI'));
run();
