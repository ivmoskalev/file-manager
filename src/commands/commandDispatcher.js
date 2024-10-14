import { goUp, changeDirectory, list } from "./navigation.js";

export const commandDispatcher = async (input, showCurrentDirectory, username) => {
    const [command, ...args] = input.split(" ");

    switch (command) {
        case "up":
            await goUp(showCurrentDirectory);
            break;
        case "cd":
            await changeDirectory(args.join(" "), showCurrentDirectory);
            break;
        case "ls":
            await list(showCurrentDirectory);
            break;
        case ".exit":
            console.log(`Thank you for using File Manager, ${username}, goodbye!`);
            process.exit();
            break;
        default:
            console.log("Invalid input");
            showCurrentDirectory();
    }
};
