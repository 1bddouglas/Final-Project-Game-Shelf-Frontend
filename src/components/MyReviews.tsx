import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Review from "../models/Review";
import { getMyReviews } from "../services/reviewAPIService";
import "./MyReviews.css";

const MyReviews = () => {
  const id: string | undefined = useParams().uid;
  const [myReviews, setMyReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (id) {
      console.log(id);

      getMyReviews(id).then((res) => {
        setMyReviews(res);
        console.log();
      });
    }
  }, [id]);
  return (
    <div className="MyReviews">
      <h2>My Reviews</h2>
      <ul>
        {myReviews.map((review) => (
          <li key={review._id}>
            <p>Game: {review.gameName}</p>
            <p>Title: {review.title}</p>
            <p>"{review.content}"</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReviews;
