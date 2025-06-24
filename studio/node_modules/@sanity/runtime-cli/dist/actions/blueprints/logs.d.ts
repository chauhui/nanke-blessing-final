import type { AuthParams, BlueprintLog } from '../../utils/types.js';
export declare const logsUrl: string;
export declare function getLogs(stackId: string, auth: AuthParams): Promise<{
    logs: BlueprintLog[];
    ok: boolean;
    error: string | null;
}>;
export declare function findNewestLogTimestamp(logs: BlueprintLog[]): number;
export declare function isNewerLog(log: BlueprintLog, timestamp: number): boolean;
export declare function getRecentLogs(logs: BlueprintLog[], limit?: number): BlueprintLog[];
export interface StreamLogsOptions {
    stackId: string;
    after?: string;
    auth: AuthParams;
    onLog: (log: BlueprintLog) => void;
    onOpen: () => void;
    onError: (error: string) => void;
}
export declare function streamLogs({ stackId, after, auth, onLog, onOpen, onError, }: StreamLogsOptions): () => void;
