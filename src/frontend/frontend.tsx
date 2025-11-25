import { createRoot } from 'react-dom/client';
import { App } from './ui/root';

function start() {
  const root = createRoot(document.getElementById('root') as HTMLElement);
  root.render(<App />);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
