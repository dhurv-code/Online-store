/**
 * ChatPage
 *
 * Displays user conversations and the active chat thread.
 */

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageLayout from '../../../components/PageLayout'
import ConversationList from '../components/ConversationList'
import ChatWindow from '../components/ChatWindow'
import Loader from '../../../components/Loader'
import EmptyState from '../../../components/EmptyState'
import { ChatService } from '../services/ChatService'
import { useAuth } from '../../../context/AuthContext'
import { useToast } from '../../../context/ToastContext'

function ChatPage() {
  const { user } = useAuth()
  const { conversationId } = useParams()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [loadingConversations, setLoadingConversations] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(false)

  useEffect(() => {
    if (!user) return
    const unsubscribe = ChatService.listenConversationsForUser(user.id, results => {
      setConversations(results)
      setLoadingConversations(false)
      if (!conversationId && results.length > 0) {
        navigate(`/chat/${results[0].id}`, { replace: true })
      }
    })
    return unsubscribe
  }, [user, conversationId, navigate])

  useEffect(() => {
    if (!conversationId) {
      setActiveConversation(null)
      setMessages([])
      return
    }
    setLoadingMessages(true)
    const unsubscribe = ChatService.listenMessages(conversationId, results => {
      setMessages(results)
      setLoadingMessages(false)
    })
    ChatService.getConversationById(conversationId).then(conversation => setActiveConversation(conversation))
    return unsubscribe
  }, [conversationId])

  async function handleSend(text) {
    if (!activeConversation) {
      addToast('Select a conversation first.', 'error')
      return
    }
    await ChatService.sendMessage(activeConversation.id, {
      senderId: user.id,
      senderRole: user.role,
      message: text,
    })
  }

  return (
    <PageLayout>
      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Conversations</h2>
          {loadingConversations ? <Loader /> : <ConversationList conversations={conversations} />}
        </aside>
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          {conversationId ? (
            loadingMessages ? <Loader /> : activeConversation ? (
              <div className="space-y-4">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <h3 className="text-xl font-semibold text-slate-900">{activeConversation.productName || 'Chat'}</h3>
                </div>
                <ChatWindow userId={user.id} messages={messages} onSend={handleSend} />
              </div>
            ) : <EmptyState title="Conversation not found" description="The selected conversation could not be loaded." />
          ) : <EmptyState title="No conversation selected" description="Choose a conversation to start messaging." />}
        </section>
      </div>
    </PageLayout>
  )
}

export default ChatPage
