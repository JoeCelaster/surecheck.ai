"use client";

import { useState } from "react";

export default function RecommendPage() {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    lifestyle: "",
    conditions: [] as string[],
    income: "",
    city: "",
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (value: string) => {
    setForm((prev) => {
      const exists = prev.conditions.includes(value);
      return {
        ...prev,
        conditions: exists
          ? prev.conditions.filter((c) => c !== value)
          : [...prev.conditions, value],
      };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/policy/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "Recommend best health insurance",
          userProfile: form,
        }),
      });

      const data = await res.json();
      setResult(data);
      setShowChat(true);
    } catch (err) {
      alert("Backend not reachable");
    }

    setLoading(false);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = currentMessage;
    setCurrentMessage("");
    setChatLoading(true);

    // Add user message to chat
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          userProfile: form,
          chatHistory: chatMessages,
          recommendation: result
        }),
      });

      const data = await res.json();
      
      // Add AI response to chat
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again." }]);
    }

    setChatLoading(false);
  };

  return (
    <div className="min-h-screen text-black bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-center">
          Health Policy Recommendation
        </h1>

        {/* FORM CARD */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <input name="fullName" placeholder="Full Name" className="w-full border p-2 rounded" onChange={handleChange} />
          <input name="age" type="number" placeholder="Age" className="w-full border p-2 rounded" onChange={handleChange} />

          <select name="lifestyle" className="w-full border p-2 rounded" onChange={handleChange}>
            <option value="">Lifestyle</option>
            <option>Sedentary</option>
            <option>Moderate</option>
            <option>Active</option>
            <option>Athlete</option>
          </select>

          <div>
            <p className="font-semibold mb-2">Conditions</p>
            {["Diabetes","Hypertension","Asthma","Cardiac","None","Other"].map((c) => (
              <label key={c} className="mr-4 text-sm">
                <input type="checkbox" onChange={() => handleCheckbox(c)} /> {c}
              </label>
            ))}
          </div>

          <select name="income" className="w-full border p-2 rounded" onChange={handleChange}>
            <option value="">Income</option>
            <option>under 3L</option>
            <option>3-8L</option>
            <option>8-15L</option>
            <option>15L+</option>
          </select>

          <select name="city" className="w-full border p-2 rounded" onChange={handleChange}>
            <option value="">City</option>
            <option>Metro</option>
            <option>Tier-2</option>
            <option>Tier-3</option>
          </select>

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90"
          >
            {loading ? "Thinking..." : "Get Recommendation"}
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <div className="space-y-6">

            {/* SUMMARY */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="font-bold mb-2">Recommendation</h2>
              <p className="text-sm text-gray-700">{result.summary}</p>
            </div>

            {/* TABLE */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="font-bold mb-3">Comparison</h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Policy</th>
                    <th className="p-2">Insurer</th>
                    <th className="p-2">Waiting</th>
                    <th className="p-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {result.peerComparison.map((p: any, i: number) => (
                    <tr key={i} className="text-center border-t">
                      <td className="p-2">{p.policyName}</td>
                      <td className="p-2">{p.insurer}</td>
                      <td className="p-2">{p.waitingPeriod}</td>
                      <td className="p-2 font-bold">{p.suitabilityScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* WHY */}
            <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500">
              <h2 className="font-bold mb-2">Why This Policy</h2>
              <p className="text-sm">{result.whyThisPolicy}</p>
            </div>

            {/* CHAT SECTION */}
            {showChat && (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white p-4">
                  <h3 className="font-bold text-lg">Ask me anything about your insurance</h3>
                  <p className="text-sm opacity-90">I remember your profile and can help with specific questions</p>
                </div>
                
                <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {chatMessages.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      <p>👋 Hi! I'm here to help you understand your insurance options.</p>
                      <p className="text-sm mt-2">Ask me about coverage, claims, premiums, or any insurance questions!</p>
                    </div>
                  )}
                  
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white border border-gray-200 text-gray-800'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t bg-white">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about coverage, claims, premiums..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={chatLoading}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={chatLoading || !currentMessage.trim()}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}