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
      <ul>
        {myReviews.map((review) => (
          <li key={review._id}>
            <p>{review.gameName}</p>
            <p>{review.title}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReviews;