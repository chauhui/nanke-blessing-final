// pages/auth/login.tsx
import { useState, FormEvent, useEffect } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

type Props = {
  csrfToken: string;
};

import { useSession } from "next-auth/react";

export default function LoginPage({ csrfToken }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  
  // 從 URL 讀取 callbackUrl，若沒有則使用預設值
  const callbackUrl = searchParams.get('callbackUrl') || '/member/meal';
  console.log('Login - callbackUrl from URL:', callbackUrl);

  // 登入成功後自動跳轉 callbackUrl，避免卡在登入頁
  useEffect(() => {
    // 只要 session 有效且 callbackUrl 存在，馬上跳轉
    if (status === "authenticated" && callbackUrl && callbackUrl !== '/auth/login') {
      window.location.href = decodeURIComponent(callbackUrl);
    }
  }, [status, callbackUrl]);

  // 處理 URL 中的錯誤參數
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'AccountNotApproved') {
      setError('您的帳號尚未通過審核，請聯繫管理員');
      // 清除錯誤參數，避免重複顯示
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('error');
      router.replace(`${router.pathname}?${newParams.toString()}`);
    }
  }, [router, searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log('Login - Attempting sign in with callbackUrl:', callbackUrl);
    
    try {
      // 使用 signIn 並讓 NextAuth 處理重定向
      const result = await signIn('credentials', {
        redirect: true,  // 讓 NextAuth 處理重定向
        email,
        password,
        callbackUrl: decodeURIComponent(callbackUrl),
      });

      // 如果執行到這裡，表示登入失敗
      if (result?.error) {
        console.error('Login failed:', result.error);
        setError('登入失敗，請檢查您的電子郵件和密碼');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('登入過程中發生錯誤，請稍後再試');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">會員登入</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* next-auth 要的 CSRF Token */}
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          
          <label className="block">
            <span className="text-gray-700">電子郵件</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border px-3 py-2 rounded"
            />
          </label>
          
          <label className="block">
            <span className="text-gray-700">密碼</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border px-3 py-2 rounded"
            />
          </label>
          
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            登入
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm">
          沒有帳號？{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            立即註冊
          </Link>
        </p>
      </div>
    </div>
  );
}

// 取得 CSRF token
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};
