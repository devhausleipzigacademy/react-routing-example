import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Comment } from "../components/Comment";
import { PostType } from "../types";

export type Comment = {
  id: string;
  author: string;
  message: string;
};

type CommentFormState = Omit<Comment, "id">;

const initialState: CommentFormState = {
  author: "",
  message: "",
};

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentForm, setCommentForm] =
    useState<CommentFormState>(initialState);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/posts/${postId}`)
      .then((res) => setPost(res.data));
    axios
      .get(`http://localhost:3001/posts/${postId}/comments`)
      .then((res) => setComments(res.data));
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3001/posts/${postId}/comments`, commentForm)
      .then((res) => {
        setComments([...comments, res.data]);
        setCommentForm(initialState);
      });
  };

  return (
    <div>
      {post ? (
        <div className="w-1/2 mx-auto py-8">
          <div className="mb-8 prose">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </div>
          <h2>Write a comment</h2>
          <form
            className="flex flex-col space-y-4 mb-8"
            onSubmit={handleSubmit}
          >
            <input
              value={commentForm.author}
              onChange={(event) =>
                setCommentForm({ ...commentForm, author: event.target.value })
              }
              type="text"
              name="author"
              id="author"
              placeholder="Your Name"
            />
            <textarea
              value={commentForm.message}
              onChange={(event) =>
                setCommentForm({ ...commentForm, message: event.target.value })
              }
              name="message"
              id="message"
              placeholder="Your message"
              rows={5}
            />
            <button
              className="bg-slate-700 px-4 py-2 rounded-md text-slate-100"
              type="submit"
            >
              Post Comment
            </button>
          </form>
          <div className="space-y-4 divide-y divide-slate-700">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                postId={postId as string}
                comment={comment}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default BlogPost;
