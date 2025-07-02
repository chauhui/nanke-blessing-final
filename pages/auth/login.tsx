// pages/auth/login.tsx
import { useState, FormEvent, useEffect } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react";

type Props = {
  csrfToken: string;
};

export default function LoginPage({ csrfToken }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  // 取得 callbackUrl，預設 /member/meal
  const callbackUrl = searchParams.get('callbackUrl') || '/member/meal';

  // session 有效就自動跳轉
  useEffect(() => {
    if (status === "authenticated" && callbackUrl && callbackUrl !== '/auth/login') {
      window.location.href = decodeURIComponent(callbackUrl);
    }
  }, [status, callbackUrl]);

  // 處理 URL 中的錯誤參數
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'AccountNotApproved') {
      setError('您的帳號尚未通過審核，請聯繫管理員');
      // 清除錯誤參數
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('error');
      router.replace(`${router.pathname}?${newParams.toString()}`);
    }
  }, [router, searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // 不要讓 NextAuth 自動 redirect
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: decodeURIComponent(callbackUrl),
      });

      // debug log（可刪）
      // console.log('signIn result:', result);

      // 處理登入錯誤訊息
      if (!result) {
        setError('伺服器連線失敗，請稍後再試');
        return;
      }

      if (result.error) {
        if (
          result.error === 'AccountNotApproved'
        ) {
          setError('您的帳號尚未通過審核，請聯繫管理員');
        } else if (
          result.error === 'CredentialsSignin' ||
          result.error === 'Unauthorized' ||
          result.error.toLowerCase().includes('credentials')
        ) {
          setError('電子郵件或密碼錯誤');
        } else {
          setError('登入過程中發生錯誤，請稍後再試。' + result.error);
        }
        return;
      }

      // 登入成功，自行跳轉
      if (result.ok && result.url) {
        window.location.href = decodeURIComponent(result.url);
      } else {
        setError('登入過程中發生錯誤，請稍後再試。');
      }
    } catch (error: any) {
      setError('登入過程中發生錯誤，請稍後再試。');
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
