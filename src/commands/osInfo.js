import { EOL, cpus as osCpus, homedir, userInfo } from "os";

export const osInfo = async (option, showCurrentDirectory) => {
    switch (option) {
        case "--EOL":
            console.log(`End-of-Line: ${JSON.stringify(EOL)}`);
            break;
        case "--cpus":
            const cpus = osCpus();
            console.log(`Total CPUs: ${cpus.length}`);
            cpus.forEach((cpu, index) => {
                console.log(`CPU ${index + 1}: ${cpu.model}, ${(cpu.speed / 1000).toFixed(2)} GHz`);
            });
            break;
        case "--homedir":
            console.log(`Home Directory: ${homedir()}`);
            break;
        case "--username":
            console.log(`System User Name: ${userInfo().username}`);
            break;
        case "--architecture":
            console.log(`CPU Architecture: ${process.arch}`);
            break;
        default:
            console.log("Invalid input");
    }
    showCurrentDirectory();
};
