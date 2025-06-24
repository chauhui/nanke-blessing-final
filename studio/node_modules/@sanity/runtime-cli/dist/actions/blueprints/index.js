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
import { readLocalBlueprint } from './blueprint.js';
import { getStack } from './stacks.js';
/**
 * Get the local Blueprint and deployed Stack
 * @deprecated Use initBlueprintConfig or initDeployedBlueprintConfig instead
 * @param blueprintPath - The path of the Blueprint file or directory- will search up the directory tree if not provided
 * @param token - The Sanity API token
 * @returns The local Blueprint, issues, and maybe a deployed Stack
 */
export async function getBlueprintAndStack({ token, blueprintPath, }) {
    if (!token)
        throw new Error('Auth is required');
    const localBlueprint = await readLocalBlueprint(blueprintPath);
    const { projectId, stackId, errors } = localBlueprint;
    const issues = [];
    if (errors.length > 0) {
        issues.push({ code: 'PARSE_ERROR', message: 'Blueprint parse errors', errors });
    }
    if (!(stackId && projectId)) {
        if (!projectId)
            issues.push({ code: 'NO_PROJECT_ID', message: 'Project ID not found' });
        if (!stackId)
            issues.push({ code: 'NO_STACK_ID', message: 'Stack ID not found' });
        return { localBlueprint, issues };
    }
    const auth = { token, projectId };
    const { error, ok, stack: deployedStack } = await getStack({ stackId, auth });
    if (!ok) {
        issues.push({ code: 'NO_STACK', message: error || 'Unknown error' });
        return { localBlueprint, issues };
    }
    return { localBlueprint: localBlueprint, deployedStack };
}
