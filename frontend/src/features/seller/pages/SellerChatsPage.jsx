/**
 * SellerChatsPage
 *
 * Seller inbox for active conversations.
 */

import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import PageLayout from '../../../components/PageLayout'
import ConversationList from '../../chat/components/ConversationList'
import Loader from '../../../components/Loader'
import { ChatService } from '../../chat/services/ChatService'

function SellerChatsPage() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = ChatService.listenConversationsForUser(user.id, results => {
      setConversations(results)
      setLoading(false)
    })
    return unsubscribe
  }, [user.id])

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Chat inbox</h1>
          <p className="mt-2 text-sm text-slate-600">Open conversations with buyers for your products.</p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          {loading ? <Loader /> : <ConversationList conversations={conversations} />}
        </div>
      </div>
    </PageLayout>
  )
}

export default SellerChatsPage
