import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: 'group-report-studio',
  title: '小組回報管理',
  projectId,
  dataset,
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('內容')
          .items([
            S.listItem()
              .title('小組回報')
              .child(
                S.document()
                  .schemaType('groupReport')
                  .documentId('group-report')
                  .views([
                    S.view.form(),
                    S.view
                      .component(require('./components/GroupReportStats').default)
                      .title('統計')
                      .icon(() => '📊'),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
