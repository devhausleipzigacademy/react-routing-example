import { Reply as ReplyType } from "./Comment";

type Props = {
  reply: ReplyType;
};

export const Reply = ({ reply }: Props) => {
  console.log(reply);
  return (
    <div key={reply.id}>
      <h3 className="font-bold">{reply.author}</h3>
      <p>{reply.message}</p>
    </div>
  );
};
