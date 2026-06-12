/**
 * ChatWindow
 *
 * Displays individual conversation messages and input.
 */

import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'

function ChatWindow({ userId, messages, onSend }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex h-[calc(100vh-200px)] flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-2 py-3">
        {messages.length ? messages.map(message => (
          <MessageBubble key={message.id} message={message} isOwn={message.senderId === userId} />
        )) : (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-slate-50 p-8 text-center text-sm text-slate-600">No messages yet. Start the conversation.</div>
        )}
      </div>
      <MessageInput onSend={onSend} />
    </div>
  )
}

export default ChatWindow
