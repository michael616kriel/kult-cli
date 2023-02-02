#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const figlet_1 = __importDefault(require("figlet"));
const entry_1 = require("./commands/entry");
console.log(figlet_1.default.textSync('KULT CLI'));
(0, entry_1.run)();
