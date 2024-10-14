import { createWriteStream, createReadStream } from "fs";
import { isAbsolute, join } from "path";
import { createGunzip, createGzip } from "zlib";

export const compressFile = (sourcePath, destinationPath, showCurrentDirectory) => {
    const src = isAbsolute(sourcePath) ? sourcePath : join(process.cwd(), sourcePath);
    const dest = isAbsolute(destinationPath) ? destinationPath : join(process.cwd(), destinationPath);

    const readStream = createReadStream(src);
    const writeStream = createWriteStream(dest, { flags: "wx" });
    const gzip = createGzip();

    readStream.on("error", () => {
        console.log("Operation failed");
        showCurrentDirectory();
    });

    writeStream.on("error", () => {
        console.log("Operation failed");
        showCurrentDirectory();
    });

    writeStream.on("finish", () => {
        console.log("File compressed successfully");
        showCurrentDirectory();
    });

    readStream.pipe(gzip).pipe(writeStream);
};

export const decompressFile = (sourcePath, destinationPath, showCurrentDirectory) => {
    const src = isAbsolute(sourcePath) ? sourcePath : join(process.cwd(), sourcePath);
    const dest = isAbsolute(destinationPath) ? destinationPath : join(process.cwd(), destinationPath);

    const readStream = createReadStream(src);
    const writeStream = createWriteStream(dest, { flags: "wx" });
    const gunzip = createGunzip();

    readStream.on("error", () => {
        console.log("Operation failed");
        showCurrentDirectory();
    });

    writeStream.on("error", () => {
        console.log("Operation failed");
        showCurrentDirectory();
    });

    writeStream.on("finish", () => {
        console.log("File decompressed successfully");
        showCurrentDirectory();
    });

    readStream.pipe(gunzip).pipe(writeStream);
};
