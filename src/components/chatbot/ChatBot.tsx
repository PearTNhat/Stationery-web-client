import React, { useState } from 'react'

interface ChatBotProps {
  isOpen: boolean
  onClose: () => void
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    if (!input.trim()) return

    // Gửi tin nhắn người dùng
    const userMessage = { sender: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])

    try {
      const response = await fetch('http://localhost:5000/handle_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: input })
      })

      const data = await response.json()
      const botMessage = { sender: 'bot', text: data.response }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    }

    setInput('')
  }

  if (!isOpen) return null

  return (
    <div className='fixed bottom-24 right-5 z-50 bg-white w-80 h-96 shadow-lg rounded-xl flex flex-col'>
      <div className='p-3 border-b flex justify-between items-center'>
        <span className='font-semibold'>ChatBot</span>
        <button onClick={onClose}>&times;</button>
      </div>

      <div className='flex-1 overflow-y-auto p-3 space-y-2 text-sm'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}
          >
            <div dangerouslySetInnerHTML={{ __html: msg.text }} />
          </div>
        ))}
      </div>

      <div className='p-2 border-t flex'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className='flex-1 px-2 py-1 border rounded-l'
          placeholder='Nhập tin nhắn...'
        />
        <button onClick={sendMessage} className='bg-blue-500 text-white px-4 rounded-r'>
          Gửi
        </button>
      </div>
    </div>
  )
}

export default ChatBot
