import { writeFile, rename, unlink } from "fs/promises";
import { isAbsolute, join } from "path";
import { existsSync, createReadStream, createWriteStream } from "fs";

export const cat = (filePath, showCurrentDirectory) => {
    const absolutePath = isAbsolute(filePath) ? filePath : join(process.cwd(), filePath);

    const readStream = createReadStream(absolutePath, "utf-8");

    readStream.on("error", () => {
        console.log("Operation failed");
        showCurrentDirectory();
    });

    readStream.on("end", () => {
        showCurrentDirectory();
    });

    readStream.pipe(process.stdout);
};

export const add = async (fileName, showCurrentDirectory) => {
    try {
        const filePath = join(process.cwd(), fileName);
        await writeFile(filePath, "", { flag: "wx" });
        console.log("File created successfully");
    } catch {
        console.log("Operation failed");
    }
    showCurrentDirectory();
};

export const rn = async (oldPath, newFileName, showCurrentDirectory) => {
    try {
        const oldFilePath = isAbsolute(oldPath) ? oldPath : join(process.cwd(), oldPath);
        const newFilePath = join(path.dirname(oldFilePath), newFileName);
        await rename(oldFilePath, newFilePath);
        console.log("File renamed successfully");
    } catch {
        console.log("Operation failed");
    }
    showCurrentDirectory();
};

export const cp = (sourcePath, destinationPath) => {
    return new Promise((resolve, reject) => {
        const src = isAbsolute(sourcePath) ? sourcePath : join(process.cwd(), sourcePath);
        const destDir = isAbsolute(destinationPath) ? destinationPath : join(process.cwd(), destinationPath);
        const dest = join(destDir, path.basename(src));

        if (!existsSync(src)) {
            reject(new Error("Operation failed"));
            return;
        }

        const readStream = createReadStream(src);
        const writeStream = createWriteStream(dest, { flags: "wx" });

        readStream.on("error", () => {
            reject(new Error("Operation failed"));
        });

        writeStream.on("error", () => {
            reject(new Error("Operation failed"));
        });

        writeStream.on("finish", () => {
            resolve();
        });

        readStream.pipe(writeStream);
    });
};

export const mv = async (sourcePath, destinationPath, showCurrentDirectory) => {
    try {
        await cp(sourcePath, destinationPath);
        await rm(sourcePath);
        console.log("File moved successfully");
    } catch {
        console.log("Operation failed");
    }
    showCurrentDirectory();
};

export const rm = async (filePath, showCurrentDirectory) => {
    try {
        const absolutePath = isAbsolute(filePath) ? filePath : join(process.cwd(), filePath);
        await unlink(absolutePath);
        console.log("File deleted successfully");
    } catch {
        console.log("Operation failed");
    }
    showCurrentDirectory();
};
