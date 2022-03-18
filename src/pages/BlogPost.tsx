import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostType } from "../types";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/posts/${id}`)
      .then((res) => setPost(res.data));
  }, []);

  return (
    <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default BlogPost;
