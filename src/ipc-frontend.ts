import firebot from "@crowbartools/firebot-types";

class IPCFrontend {
    async send<T extends keyof FrontendCommunicatorCommands>(command: T, ...args: FrontendCommunicatorCommands[T]["args"]): Promise<FrontendCommunicatorCommands[T]["returns"]> {
        return await firebot.frontendCommunicator.fireEventAsync(`dennisontheinternet:obs-plus:${command}`, args);
    }
}

export default new IPCFrontend();