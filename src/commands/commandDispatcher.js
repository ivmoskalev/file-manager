import { goUp, changeDirectory, list } from "./navigation.js";
import { osInfo } from "./osInfo.js";
import { hashFile } from "./hash.js";
import { cat, add, rn, cp, mv, rm, mkdir } from "./fileOperations.js";
import { compressFile, decompressFile } from "./compress.js";

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
        case "cat":
            cat(args.join(" "), showCurrentDirectory);
            break;
        case "add":
            add(args.join(" "), showCurrentDirectory);
            break;
        case "mkdir":
            mkdir(args.join(" "), showCurrentDirectory);
            break;
        case "rn":
            rn(args[0], args[1], showCurrentDirectory);
            break;
        case "cp":
            cp(args[0], args[1])
                .then(() => {
                    console.log("File copied successfully");
                })
                .catch(() => {
                    console.log("Operation failed");
                })
                .finally(() => {
                    showCurrentDirectory();
                });
            break;
        case "mv":
            mv(args[0], args[1], showCurrentDirectory);
            break;
        case "rm":
            rm(args.join(" "), showCurrentDirectory);
            break;
        case "compress":
            compressFile(args[0], args[1], showCurrentDirectory);
            break;
        case "decompress":
            decompressFile(args[0], args[1], showCurrentDirectory);
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
