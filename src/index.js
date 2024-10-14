// src/index.js

import { createInterface } from "readline";
import { homedir } from "os";
import { chdir, cwd } from "process";
import path from "path";
import { commandDispatcher } from "./commands/commandDispatcher.js";

const args = process.argv.slice(2);
const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Anonymous";

console.log(`Welcome to the File Manager, ${username}!`);

let currentDir = homedir();
chdir(currentDir);

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
});

const showCurrentDirectory = () => {
    console.log(`You are currently in ${cwd()}`);
};

showCurrentDirectory();

rl.on("line", async (input) => {
    await commandDispatcher(input.trim(), showCurrentDirectory, username);
});

const exitProgram = () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
};

rl.on("SIGINT", () => {
    exitProgram();
});

process.on("SIGINT", () => {
    exitProgram();
});
