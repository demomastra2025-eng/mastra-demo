import { Mastra } from '@mastra/core/mastra';
import { LibSQLStore } from '@mastra/libsql';
import { chatRoute } from '@mastra/ai-sdk';
import { ghibliAgent } from './agents';

export const mastra = new Mastra({
    agents: {
        ghibliAgent,
    },
    storage: new LibSQLStore({
        url: 'file:../../mastra.db'
    }),
    server: {
        apiRoutes: [
            chatRoute({
                path: '/chat/:agentId',
            }),
        ],
    },
})