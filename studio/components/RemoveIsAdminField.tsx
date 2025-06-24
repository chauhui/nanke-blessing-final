// studio/components/RemoveIsAdminField.tsx
import React, {useEffect, useRef} from 'react'
import {useDocumentOperation} from 'sanity'

export function RemoveIsAdminField(props: any) {
  const {patch, publish} = useDocumentOperation(props.id, props.type)
  const executedRef = useRef(false)

  useEffect(() => {
    // 如果已经执行过，就跳过
    if (executedRef.current) return

    // draft 存在且还有 isAdmin
    if (props.draft?._id && props.draft.isAdmin !== undefined) {
      patch.execute([{unset: ['isAdmin']}])
      executedRef.current = true

    // published 存在且还有 isAdmin
    } else if (props.published?._id && props.published.isAdmin !== undefined) {
      patch.execute([{unset: ['isAdmin']}])
      publish.execute()
      executedRef.current = true
    }
  },
  // 只对 _id 与 isAdmin 变化敏感，且 guarded by executedRef
  [props.draft?._id, props.draft?.isAdmin, props.published?._id, props.published?.isAdmin]
  )

  return null
}
