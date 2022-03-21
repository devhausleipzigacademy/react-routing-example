import { Route, Routes } from "react-router-dom";
import CustomLink from "./components/CustomLink";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import GuestBook from "./pages/GuestBook";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-200">
      <header className="bg-slate-800 p-2">
        <nav className="flex text-slate-100 space-x-4">
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/blog">Blog</CustomLink>
          <CustomLink to="/guestbook">GuestBook</CustomLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" element={<BlogPost />} />
        <Route path="/guestbook" element={<GuestBook />} />
      </Routes>
    </div>
  );
};

export default App;
