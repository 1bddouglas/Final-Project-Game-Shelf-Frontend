import { FormEvent, useState } from "react";
import "./ReviewCommentForm.css";

interface Props {
  createComment: (index: number, comment: string) => void;
  index: number;
}

const ReviewCommentForm = ({ createComment, index }: Props) => {
  const [comment, setComment] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (comment) {
      setComment("");
      createComment(index, comment);
    }
  };

  return (
    <form className="ReviewCommentForm" onSubmit={submitHandler}>
      <label htmlFor="comment">Reply</label>
      <div className="reply-input">
        <textarea
          name="comment"
          id="comment"
          cols={30}
          rows={1}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button>Post</button>
      </div>
    </form>
  );
};

export default ReviewCommentForm;
