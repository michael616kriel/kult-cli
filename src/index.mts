#!/usr/bin/env node
import figlet from 'figlet';
import { getPrompts } from './utils/prompts.mjs';

console.log(figlet.textSync('KULT CLI'));
getPrompts();

