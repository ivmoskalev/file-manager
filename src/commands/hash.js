import { createReadStream } from "fs";
import { isAbsolute, join } from "path";
import { createHash } from "crypto";

export const hashFile = (filePath, showCurrentDirectory) => {
    const absolutePath = isAbsolute(filePath) ? filePath : join(process.cwd(), filePath);

    const hash = createHash("sha256");
    const stream = createReadStream(absolutePath);

    stream.on("data", (chunk) => hash.update(chunk));

    stream.on("end", () => {
        console.log(`Hash: ${hash.digest("hex")}`);
        showCurrentDirectory();
    });

    stream.on("error", () => {
        console.log("Operation failed");
        showCurrentDirectory();
    });
};
