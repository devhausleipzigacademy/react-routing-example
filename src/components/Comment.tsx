import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Comment as CommentType } from "../pages/BlogPost";
import { Reply } from "./Reply";
type Props = {
  comment: CommentType;
  postId: string;
};

export type Reply = {
  id: number;
  author: string;
  message: string;
  postId: string;
  commentId: string;
};

type ReplyFormState = Omit<Reply, "id" | "commentId" | "postId">;

const initialState: ReplyFormState = {
  author: "",
  message: "",
};

export const Comment = ({ comment, postId }: Props) => {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyForm, setReplyForm] = useState<ReplyFormState>(initialState);
  const [replyFormOpen, setReplyFormOpen] = useState(false);

  useEffect(() => {
    axios
      .get<Reply[]>(`http://localhost:3001/replies`)
      .then((res) => {
        return res.data.filter(
          (reply) => reply.postId === postId && reply.commentId == comment.id
        );
      })
      .then((res) => {
        setReplies(res);
      });
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3001/replies`, {
        ...replyForm,
        postId: postId,
        commentId: comment.id,
      })
      .then((res) => {
        setReplies([...replies, res.data]);
        setReplyForm(initialState);
      });
  };

  return (
    <div>
      <h3 className="font-bold">{comment.author}</h3>
      <div className="flex justify-between">
        <p>{comment.message}</p>
        <button
          onClick={() => setReplyFormOpen(!replyFormOpen)}
          className="underline"
        >
          {replyFormOpen ? "x" : "Reply"}
        </button>
      </div>
      {replyFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 items-start w-1/2"
        >
          <input
            value={replyForm.author}
            onChange={(e) =>
              setReplyForm({ ...replyForm, author: e.target.value })
            }
            type="text"
          />
          <textarea
            value={replyForm.message}
            onChange={(e) =>
              setReplyForm({ ...replyForm, message: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-slate-700 text-slate-100 px-4 py-2 rounded-md"
          >
            Reply
          </button>
        </form>
      )}
      <div className="pl-8">
        {replies.map((reply) => (
          <Reply key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  );
};
