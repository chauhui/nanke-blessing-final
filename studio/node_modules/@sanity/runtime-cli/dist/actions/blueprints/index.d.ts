export * as assets from './assets.js';
export * as blueprint from './blueprint.js';
export * as logs from './logs.js';
export * as operations from './operations.js';
export * as resources from './resources.js';
export * as stacks from './stacks.js';
/**
 * @deprecated Use actions/sanity/projects.js instead
 */
export * as projects from '../sanity/projects.js';
import type { Stack } from '../../utils/types.js';
import type { BlueprintParserError } from '../../utils/types.js';
import { readLocalBlueprint } from './blueprint.js';
export type BlueprintIssue = {
    code: 'NO_STACK_ID' | 'NO_PROJECT_ID' | 'NO_STACK' | 'PARSE_ERROR';
    message: string;
    errors?: BlueprintParserError[];
};
type LocalBlueprintWithIds = Awaited<ReturnType<typeof readLocalBlueprint>> & {
    projectId: string;
    stackId: string;
};
type BlueprintSuccess = {
    localBlueprint: LocalBlueprintWithIds;
    deployedStack: Stack;
    issues?: never;
};
type BlueprintFailure = {
    localBlueprint: Awaited<ReturnType<typeof readLocalBlueprint>>;
    issues: BlueprintIssue[];
    deployedStack?: never;
};
type BlueprintResult = BlueprintSuccess | BlueprintFailure;
/**
 * Get the local Blueprint and deployed Stack
 * @deprecated Use initBlueprintConfig or initDeployedBlueprintConfig instead
 * @param blueprintPath - The path of the Blueprint file or directory- will search up the directory tree if not provided
 * @param token - The Sanity API token
 * @returns The local Blueprint, issues, and maybe a deployed Stack
 */
export declare function getBlueprintAndStack({ token, blueprintPath, }: {
    token: string;
    blueprintPath?: string;
}): Promise<BlueprintResult>;
