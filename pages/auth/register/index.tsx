'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('兩次輸入的密碼不一致');
      return;
    }
    if (formData.password.length < 6) {
      setError('密碼長度至少需要 6 個字元');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setError(data.error || '該電子郵件已被註冊，請直接登入');
        } else if (response.status === 400) {
          setError(data.error || '請檢查輸入欄位');
        } else {
          setError(data.error || '註冊失敗，請稍後再試');
        }
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);

      // ===== 移除自動跳轉 (停留在註冊成功畫面) =====
      // setTimeout(() => {
      //   router.push('/member');
      // }, 3000);
    } catch (err) {
      console.error('Registration error:', err);
      setError('註冊失敗，請稍後再試');
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            註冊成功！
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            感謝您的註冊。請等待管理員審核您的帳號。
          </p>
          <div className="mt-6 text-center">
            <Link href="/member" className="text-blue-600 hover:underline">
              返回登入
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ... 其餘畫面不變 ...
  // 直接複製你現有的表單、錯誤訊息、欄位（略）
}
