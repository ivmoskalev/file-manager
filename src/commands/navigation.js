import { chdir, cwd } from "process";
import path from "path";
import fs from "fs/promises";

export const goUp = async (showCurrentDirectory) => {
    try {
        const parentDir = path.dirname(cwd());
        const rootDir = path.parse(cwd()).root;
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
        const targetDir = path.isAbsolute(dir) ? dir : path.join(cwd(), dir);
        const stats = await fs.stat(targetDir);
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
        const files = await fs.readdir(cwd(), { withFileTypes: true });

        const directories = [];
        const filesList = [];

        for (const dirent of files) {
            if (dirent.isDirectory()) {
                directories.push({ Name: dirent.name, Type: "directory" });
            } else if (dirent.isFile()) {
                directories.push({ Name: dirent.name, Type: "file" });
            }
        }

        directories.sort((a, b) => a.Name.localeCompare(b.Name));

        console.table(directories);
    } catch {
        console.log("Operation failed");
    }
    showCurrentDirectory();
};
