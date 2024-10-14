import { goUp, changeDirectory, list } from "./navigation.js";
import { osInfo } from "./osInfo.js";
import { hashFile } from "./hash.js";

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
        case "os":
            await osInfo(args[0], showCurrentDirectory);
            break;
        case "hash":
            hashFile(args.join(" "), showCurrentDirectory);
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
