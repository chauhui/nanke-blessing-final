import React, {useState} from 'react'
import {hash} from 'bcryptjs'
import {type StringInputProps, useClient, useFormValue} from 'sanity'

function randomCharacter(characters: string) {
  const values = new Uint32Array(1)
  crypto.getRandomValues(values)
  return characters[values[0] % characters.length]
}

function createTemporaryPassword() {
  const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const lowercase = 'abcdefghijkmnopqrstuvwxyz'
  const numbers = '23456789'
  const all = uppercase + lowercase + numbers
  const characters = [
    randomCharacter(uppercase),
    randomCharacter(lowercase),
    randomCharacter(numbers),
    ...Array.from({length: 9}, () => randomCharacter(all)),
  ]

  for (let index = characters.length - 1; index > 0; index -= 1) {
    const values = new Uint32Array(1)
    crypto.getRandomValues(values)
    const swapIndex = values[0] % (index + 1)
    ;[characters[index], characters[swapIndex]] = [characters[swapIndex], characters[index]]
  }

  return characters.join('')
}

export default function TemporaryPasswordIssuer(_props: StringInputProps) {
  const client = useClient({apiVersion: '2024-06-01'})
  const documentId = useFormValue(['_id']) as string | undefined
  const usedAt = useFormValue(['usedAt']) as string | undefined
  const [temporaryPassword, setTemporaryPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const issuePassword = async () => {
    if (!documentId || usedAt || isSubmitting) return

    setIsSubmitting(true)
    setError('')

    try {
      const requestId = documentId.replace(/^drafts\./, '')
      const request = await client.fetch<{
        _id: string
        usedAt?: string
        userId?: string
        authVersion?: number
      } | null>(
        `*[_type == "passwordResetRequest" && _id == $requestId][0]{
          _id,
          usedAt,
          "userId": user->_id,
          "authVersion": user->authVersion
        }`,
        {requestId},
      )

      if (!request?.userId) throw new Error('找不到此申請對應的會員')
      if (request.usedAt) throw new Error('此申請已經處理完成')

      const password = createTemporaryPassword()
      const passwordHash = await hash(password, 12)
      const completedAt = new Date().toISOString()

      await client
        .transaction()
        .patch(request.userId, {
          set: {
            password: passwordHash,
            mustChangePassword: true,
            temporaryPasswordIssuedAt: completedAt,
            authVersion: (request.authVersion || 1) + 1,
          },
        })
        .patch(request._id, {
          set: {
            status: 'completed',
            usedAt: completedAt,
          },
        })
        .commit()

      setTemporaryPassword(password)
    } catch (issueError) {
      setError(issueError instanceof Error ? issueError.message : '產生臨時密碼失敗')
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyPassword = async () => {
    await navigator.clipboard.writeText(temporaryPassword)
  }

  if (usedAt && !temporaryPassword) {
    return <div style={{padding: 16, background: '#f0fdf4', border: '1px solid #bbf7d0'}}>此申請已完成，臨時密碼不會再次顯示。</div>
  }

  return (
    <div style={{padding: 16, background: '#f8fafc', border: '1px solid #cbd5e1'}}>
      <p style={{marginTop: 0}}>確認會員身分後，產生一次性臨時密碼。密碼只會在這個畫面顯示一次。</p>
      {error && <p style={{color: '#b91c1c'}}>{error}</p>}
      {temporaryPassword ? (
        <div>
          <div style={{fontFamily: 'monospace', fontSize: 24, fontWeight: 700, letterSpacing: 2, padding: 16, background: '#fff', border: '1px solid #94a3b8', marginBottom: 12}}>
            {temporaryPassword}
          </div>
          <button type="button" onClick={copyPassword} style={{padding: '10px 16px', cursor: 'pointer'}}>複製臨時密碼</button>
          <p style={{color: '#b45309', marginBottom: 0}}>請立即透過電話、LINE 或本人確認後提供給會員；離開此畫面後無法再次查看。</p>
        </div>
      ) : (
        <button type="button" onClick={issuePassword} disabled={isSubmitting} style={{padding: '10px 16px', cursor: isSubmitting ? 'wait' : 'pointer', background: '#1E1B4B', color: '#fff', border: 0}}>
          {isSubmitting ? '產生中...' : '產生一次性臨時密碼'}
        </button>
      )}
    </div>
  )
}
