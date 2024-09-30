import { useState } from 'react';

export default function Chatbot() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (data.success && data.doctors.length > 0) {
        const doctorList = data.doctors.map(doc => `${doc.name} (${doc.specialization})`).join(', ');
        setResponse(`Here are some doctors that can help: ${doctorList}`);
      } else {
        setResponse('No matching doctors found.');
      }
    } catch (error) {
      setResponse('An error occurred while fetching doctors.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <h3>Ask about your symptoms</h3>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe your symptoms..."
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? 'Finding doctors...' : 'Send'}
      </button>
      {response && <p>{response}</p>}
    </div>
  );
}