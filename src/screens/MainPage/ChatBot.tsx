import React, { useState, useEffect, useRef } from 'react';

interface ChatbotProps {
  messages: { user: string, text: string }[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ messages, onSendMessage, onClose }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{ position: 'fixed', bottom: '0', right: '0', width: '300px', height: '400px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '10px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#00bfff', padding: '10px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', textAlign: 'center', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Ayudante Virtual</span>
        <button onClick={onClose} style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cerrar</button>
      </div>
      <div style={{ flex: '1', overflowY: 'auto', padding: '10px', scrollbarColor: '#fff #ccc', scrollbarWidth: 'thin' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '10px 0', textAlign: msg.user === 'user' ? 'right' : 'left' }}>
            <span style={{ backgroundColor: msg.user === 'user' ? '#007bff' : '#009900', color: '#fff', padding: '5px 10px', borderRadius: '10px', display: 'inline-block', wordWrap: 'break-word', maxWidth: '80%' }}>{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc', backgroundColor: '#00bfff' }}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} style={{ flex: '1', padding: '5px', backgroundColor: '#fff', color:'#000' }} />
        <button onClick={handleSend} style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Enviar</button>
      </div>
    </div>
  );
};

export default Chatbot;