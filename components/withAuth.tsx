import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function withAuth(WrappedComponent: React.ComponentType) {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const session = await getSession();
        if (!session) {
          router.push('/member?callbackUrl=' + encodeURIComponent(router.asPath));
        } else {
          setIsLoading(false);
        }
      };
      
      checkAuth();
    }, [router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}
