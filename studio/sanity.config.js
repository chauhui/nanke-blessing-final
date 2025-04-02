import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

import schema from './schemas/schema'

export default defineConfig({
  name: 'default',
  title: 'nanke-blessing-studio',
  projectId: 'p4osbiim',
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool()],
  schema: {
    types: schema.types,
  },
})
