import invoke from '../../utils/invoke-local.js';
export async function testAction(resource, options, context) {
    const { payload = null, timeout } = options;
    try {
        const { json, logs } = await invoke(resource, payload, context, { timeout });
        return { error: undefined, json, logs };
    }
    catch (error) {
        return { error, json: undefined, logs: undefined };
    }
}
