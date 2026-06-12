/**
 * MessageBubble
 *
 * Displays a chat message bubble.
 */

function MessageBubble({ message, isOwn }) {
  return (
    <div className={`max-w-[85%] ${isOwn ? 'self-end bg-brand-600 text-white' : 'self-start bg-white text-slate-900'} rounded-3xl px-4 py-3 shadow-sm`}> 
      <p className="text-sm leading-6">{message.message}</p>
      <span className="mt-2 block text-xs text-slate-400">{message.senderRole === 'seller' ? 'Seller' : message.senderRole === 'buyer' ? 'Buyer' : 'Admin'} • {message.createdAt ? new Date(message.createdAt.seconds * 1000).toLocaleString() : 'Sending...'}</span>
    </div>
  )
}

export default MessageBubble
