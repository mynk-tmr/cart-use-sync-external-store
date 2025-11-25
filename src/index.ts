import { serve } from 'bun';
import index from './frontend/index.html';

serve({
  routes: {
    '/*': index,
  },
  development: process.env.NODE_ENV !== 'production' && {
    hmr: true,
    console: true,
  },
});

console.log('Server started on http://localhost:3000');
