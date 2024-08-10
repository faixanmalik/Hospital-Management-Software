import "@/src/styles/globals.css";
import '@/src/styles/scrollbar.css';

export default function App({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />
  </>
}
