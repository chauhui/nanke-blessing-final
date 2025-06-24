'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function EventRegistrationForm({ 
  eventId, 
  eventTitle,
  onClose 
}: { 
  eventId: string;
  eventTitle: string;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let response: Response | undefined;
    
    try {
      console.log('Submitting registration:', { eventId, formData });
      
      // 使用新的 API 端點
      const apiUrl = `${window.location.origin}/api/submit-registration/`;
      console.log('Attempting to fetch:', apiUrl);
      
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          eventId,
          ...formData
        }),
      });

      console.log('Response status:', response?.status);
      console.log('Response headers:', response?.headers);
      
      // 首先讀取響應文本
      const text = await response.text();
      console.log('Response text:', text);

      if (!response?.ok) {
        try {
          // 嘗試將文本解析為 JSON
          const errorData = JSON.parse(text);
          console.error('API Error Response:', errorData);
          
          // 處理重複報名的特殊情況
          if (errorData.error === 'Duplicate registration detected' || 
              errorData.message === 'You have already registered for this event') {
            throw new Error('您已經報名過此活動，無需重複報名');
          }
          
          throw new Error(errorData.message || errorData.error || 'API 請求失敗');
        } catch (parseError) {
          // 如果解析 JSON 失敗，直接使用文本
          console.error('Failed to parse error response:', parseError);
          
          // 檢查是否為重複報名的原始錯誤訊息
          if (text.includes('already registered') || text.includes('Duplicate registration')) {
            throw new Error('您已經報名過此活動，無需重複報名');
          }
          
          throw new Error(`報名失敗：${text}`);
        }
      }

      // 解析成功響應（已經讀取過一次，所以這裡不需要再讀取）
      try {
        const data = JSON.parse(text);
        console.log('Success response:', data);

        setIsSuccess(true);
        // 清空表單
        setFormData({
          name: '',
          email: '',
          phone: '',
          note: ''
        });
        // 3秒後自動關閉表單
        setTimeout(() => {
          onClose();
        }, 3000);
      } catch (parseError) {
        console.error('Failed to parse success response:', parseError);
        throw new Error('無法解析成功響應');
      }
    } catch (error) {
      console.error('報名失敗:', error);
      // 添加更詳細的錯誤信息
      const errorMessage = error instanceof Error 
        ? error.message 
        : typeof error === 'string' 
          ? error 
          : '未知錯誤';
      
      // 檢查 Network 面板中的實際請求
      console.error('Network error:', {
        status: response?.status,
        statusText: response?.statusText,
        url: response?.url
      });
      
      // 使用更友好的對話框顯示錯誤訊息
      if (errorMessage.includes('already registered') || errorMessage.includes('Duplicate registration') || errorMessage.includes('已經報名過')) {
        alert('您已經報名過此活動，無需重複報名');
      } else {
        alert(`發生錯誤：${errorMessage}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="關閉"
        >
          <X size={24} />
        </button>
        
        <h3 className="text-xl font-bold mb-4 text-center">報名活動: {eventTitle}</h3>
        
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <p className="text-lg font-medium">報名成功！</p>
            <p className="text-gray-600 mt-2">我們已收到您的報名資訊</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                姓名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                電子郵件 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                電話號碼
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                備註
              </label>
              <textarea
                id="note"
                name="note"
                rows={3}
                value={formData.note}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-2.5 px-4 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center"
              >
                {isSubmitting ? '處理中...' : '確認報名'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
