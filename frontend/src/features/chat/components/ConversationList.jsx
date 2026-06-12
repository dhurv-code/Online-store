/**
 * ConversationList
 *
 * Renders the list of user conversations.
 */

import { Link } from 'react-router-dom'

function ConversationList({ conversations }) {
  return (
    <div className="space-y-3">
      {conversations.length ? conversations.map(conversation => (
        <Link key={conversation.id} to={`/chat/${conversation.id}`} className="block rounded-3xl border border-gray-200 bg-white p-4 transition hover:border-brand-500">
          <div className="text-sm font-semibold text-slate-900">{conversation.productName || 'Conversation'}</div>
          <p className="mt-2 text-sm text-slate-600 truncate">{conversation.lastMessage || 'No messages yet'}</p>
        </Link>
      )) : (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-slate-600">No conversations yet.</div>
      )}
    </div>
  )
}

export default ConversationList
