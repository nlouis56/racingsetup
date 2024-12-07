import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Vérifie la prise en charge des Service Workers
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('Service Worker registered successfully.'))
        .catch((err) => console.error('Service Worker registration failed:', err));
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
