import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PostType } from "../types";

const Blog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:3001/posts").then((res) => {
      setPosts(res.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-6xl text-center mb-8">Blog</h1>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

type Props = {
  id: number;
  title: string;
};

const Post = ({ id, title }: Props) => {
  return (
    <Link to={`/blog/${id}`}>
      <div key={id} className="mb-4">
        <h2 className="text-3xl mb-2">{title}</h2>
      </div>
    </Link>
  );
};

export default Blog;
