export const commandDispatcher = async (input, showCurrentDirectory, username) => {
    const [command, ...args] = input.split(" ");

    switch (command) {
        case "up":
            console.log("go up");
            break;
        default:
            console.log("Invalid input");
            showCurrentDirectory();
    }
};
