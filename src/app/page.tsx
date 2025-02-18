'use client';

import Guest from '@/app/(guest)/guest/page';
import ErrorFallbackView from '@/components/ErrrorFallback/ErrorFallback.view';
import Navbar from '@/components/Navbar';
import { ErrorBoundary } from 'react-error-boundary';

export default function Page() {
  return (
    <>
    <ErrorBoundary FallbackComponent={ErrorFallbackView}>
      <Navbar/>
      <Guest />
      </ErrorBoundary>
    </>
  );
}
