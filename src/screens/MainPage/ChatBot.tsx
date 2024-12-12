import React, { useState } from 'react';

interface ChatbotProps {
  messages: { user: string, text: string }[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ messages, onSendMessage, onClose }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '0', right: '0', width: '300px', height: '400px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '10px', display: 'flex', flexDirection: 'column' }}>
      <button onClick={onClose} style={{ alignSelf: 'flex-end', margin: '10px', padding: '5px 10px' }}>Cerrar</button>
      <div style={{ flex: '1', overflowY: 'auto', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '5px 0', textAlign: msg.user === 'user' ? 'right' : 'left' }}>
            <span style={{ backgroundColor: msg.user === 'user' ? '#007bff' : '#009900', color: '#fff', padding: '5px 10px', borderRadius: '10px' }}>{msg.text}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc' }}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} style={{ flex: '1', padding: '5px' }} />
        <button onClick={handleSend} style={{ marginLeft: '10px', padding: '5px 10px' }}>Enviar</button>
      </div>
    </div>
  );
};

export default Chatbot;