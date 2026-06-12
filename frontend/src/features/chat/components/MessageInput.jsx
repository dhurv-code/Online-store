/**
 * MessageInput
 *
 * Chat input field for sending messages.
 */

import { useState } from 'react'
import Button from '../../../components/Button'

function MessageInput({ disabled, onSend }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!text.trim()) {
      return
    }
    onSend(text)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 rounded-3xl border border-gray-200 bg-white p-3 shadow-sm">
      <input
        className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-brand-500"
        placeholder="Write your message"
        value={text}
        onChange={e => setText(e.target.value)}
        disabled={disabled}
      />
      <Button type="submit" disabled={disabled || !text.trim()}>Send</Button>
    </form>
  )
}

export default MessageInput
