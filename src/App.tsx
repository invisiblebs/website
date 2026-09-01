import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToHash from './components/ScrollToHash';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

// The /v1 and /v2 design alternates were removed from the router so draft
// pages can't leak into the search index; the files remain in src/pages.
const App = () => (
  <BrowserRouter>
    <ScrollToHash />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
