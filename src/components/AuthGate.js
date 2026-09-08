'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const allowedRoutes = ['/pro-login', '/pro-account', '/admin'];

export default function AuthGate({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentPath = pathname || '/';
    const isAllowed = allowedRoutes.some((route) => currentPath === route || currentPath.startsWith(`${route}/`));

    try {
      const session = JSON.parse(localStorage.getItem('kolfe_pro_student_session') || 'null');
      const hasActiveAccess = !!session?.accessActive;

      if (!hasActiveAccess && !isAllowed) {
        router.replace('/pro-login');
        return;
      }
    } catch {
      if (!isAllowed) {
        router.replace('/pro-login');
        return;
      }
    }

    setReady(true);
  }, [pathname, router]);

  if (!ready) {
    return (
      <div style={{ minHeight: '50vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
        <div className="glass glass-card" style={{ padding: '1.25rem 2rem' }}>
          <strong>Checking access...</strong>
        </div>
      </div>
    );
  }

  return children;
}
