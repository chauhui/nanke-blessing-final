import React from 'react'

/**
 * 以官方 Studio components API 包裝預設 Layout。
 * 目標：確保 Pane 內容能成為唯一捲動容器（含 iOS 慣性捲動）。
 */

export function ScrollFixLayout(props: any) {
  return (
    <div
      style={{
        height: '100dvh',         // 使用 dvh 避免 iOS 100vh bug
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',       // 由內層 PaneContent 承擔捲動
      }}
    >
      {props.renderDefault(props)}
    </div>
  )
}

export function ScrollFixActiveToolLayout(props: any) {
  return (
    <div
      style={{
        minHeight: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 預設渲染 */}
      {props.renderDefault(props)}

      {/* 關鍵：強化 PaneContent/ScrollContainer 的捲動行為 */}
      <style>{`
        [data-ui="Pane"], [data-ui="PaneLayout"], .sanity-default-layout__content { min-height: 0 !important; }
        [data-ui="Pane"] { display: flex !important; flex-direction: column !important; }
        [data-ui="PaneContent"] {
          flex: 1 1 auto !important;
          min-height: 0 !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          -webkit-overflow-scrolling: touch !important;
          overscroll-behavior-y: contain !important;
          touch-action: pan-y !important;
        }
        [data-ui="ScrollContainer"] {
          min-height: 0 !important;
          overflow-y: auto !important;
          -webkit-overflow-scrolling: touch !important;
          touch-action: pan-y !important;
        }
      `}</style>
    </div>
  )
}
