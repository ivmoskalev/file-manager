import { chdir, cwd } from "process";
import { dirname, parse, join, isAbsolute } from "path";
import { readdir, stat } from "fs/promises";

export const goUp = async (showCurrentDirectory) => {
    try {
        const parentDir = dirname(cwd());
        const rootDir = parse(cwd()).root;
        if (cwd() !== rootDir) {
            chdir(parentDir);
        }
        showCurrentDirectory();
    } catch {
        console.log("Operation failed");
        showCurrentDirectory();
    }
};

export const changeDirectory = async (dir, showCurrentDirectory) => {
    try {
        const targetDir = isAbsolute(dir) ? dir : join(cwd(), dir);
        const stats = await stat(targetDir);
        if (stats.isDirectory()) {
            chdir(targetDir);
        } else {
            console.log("Invalid input");
        }
    } catch {
        console.log("Operation failed");
    }
    showCurrentDirectory();
};

export const list = async (showCurrentDirectory) => {
    try {
        const items = await readdir(cwd(), { withFileTypes: true });

        const directories = items
            .filter((item) => item.isDirectory())
            .map((dir) => ({ Name: dir.name, Type: "directory" }))
            .sort((a, b) => a.Name.localeCompare(b.Name));

        const files = items
            .filter((item) => item.isFile())
            .map((file) => ({ Name: file.name, Type: "file" }))
            .sort((a, b) => a.Name.localeCompare(b.Name));

        console.table([...directories, ...files]);
    } catch {
        console.log("Operation failed");
    }
    showCurrentDirectory();
};
