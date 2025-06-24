import { Command, Flags } from '@oclif/core';
import { functionDevCore } from '../../cores/functions/dev.js';
export default class DevCommand extends Command {
    static description = 'Start the Sanity Function emulator';
    static examples = ['<%= config.bin %> <%= command.id %> --port 8974'];
    static flags = {
        port: Flags.integer({ char: 'p', description: 'Port to start emulator on', required: false }),
    };
    async run() {
        const { flags } = await this.parse(DevCommand);
        const { success, error, streaming } = await functionDevCore({
            bin: this.config.bin,
            log: (msg) => this.log(msg),
            flags,
        });
        if (!success)
            this.error(error);
        if (streaming)
            await streaming;
    }
}
