import { Command } from '@oclif/core';
import type { Interfaces } from '@oclif/core';
import type { readLocalBlueprint } from './actions/blueprints/blueprint.js';
import type { AuthParams, Stack } from './utils/types.js';
export type Flags<T extends typeof Command> = Interfaces.InferredFlags<(typeof BlueprintCommand)['baseFlags'] & T['flags']>;
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>;
/**
 * @description Guarantees flags, args, sanityToken, and blueprint.
 * Blueprint parser errors are logged and the command exits with an error
 * @extends Command
 */
export declare abstract class BlueprintCommand<T extends typeof Command> extends Command {
    protected sanityToken: string;
    protected blueprint: Awaited<ReturnType<typeof readLocalBlueprint>>;
    protected flags: Flags<T>;
    protected args: Args<T>;
    init(): Promise<void>;
    protected catch(err: Error & {
        exitCode?: number;
    }): Promise<unknown>;
    protected finally(_: Error | undefined): Promise<unknown>;
}
/**
 * @description Guarantees flags, args, sanityToken, blueprint, projectId, stackId, auth, and deployedStack.
 * If a project or stack is missing, the command exits with an error
 * @extends BlueprintCommand
 */
export declare abstract class DeployedBlueprintCommand<T extends typeof Command> extends BlueprintCommand<T> {
    protected auth: AuthParams;
    protected deployedStack: Stack;
    protected projectId: string;
    protected stackId: string;
    init(): Promise<void>;
}
