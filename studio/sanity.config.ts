// 不載入其他自訂 CSS
// import './public/custom-dark-fix.css'

import React from 'react'
import {defineConfig, buildLegacyTheme, LayoutProps} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './deskStructure'

// 行動裝置左側清單可捲動（不使用 JSX）
function MobileScrollPatch(props: LayoutProps) {
  const css = `
    @media (pointer: coarse) {
      #sanity [data-ui="ScrollContainer"] {
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
      }
      #sanity [data-ui="ScrollContainer"],
      #sanity [data-ui="ScrollContainer"] * {
        touch-action: pan-y !important;
      }
      #sanity [data-ui="Pane"],
      #sanity [data-ui="PaneContent"] {
        min-height: 0 !important;
      }
    }
  `
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('style', null, css),
    props.renderDefault(props)
  )
}

// 主題色
const colors = {
  '--my-blue':  '#60a5fa',
  '--my-red':   '#ef4444',
  '--my-yellow':'#f59e0b',
  '--my-green': '#22c55e',
}
const balancedTheme = buildLegacyTheme({
  '--brand-primary': colors['--my-blue'],
  '--default-button-primary-color': colors['--my-blue'],
  '--default-button-success-color': colors['--my-green'],
  '--default-button-warning-color': colors['--my-yellow'],
  '--default-button-danger-color': colors['--my-red'],
  '--state-info-color': colors['--my-blue'],
  '--state-success-color': colors['--my-green'],
  '--state-warning-color': colors['--my-yellow'],
  '--state-danger-color': colors['--my-red'],
  '--focus-color': colors['--my-blue'],
})

export default defineConfig({
  name: 'default',
  title: 'Church Site',
  projectId: 'von9yh08',
  dataset: 'production',
  basePath: '/studio',
  theme: balancedTheme,
  studio: { components: { layout: MobileScrollPatch } },
  plugins: [
    deskTool({ structure }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
  schema: { types: schemaTypes },
  document: { actions: (prev) => prev },
  server: { port: 3334, hostname: 'localhost' },
  logging: { level: 'debug', console: true },
  staticDir: './public',
})
