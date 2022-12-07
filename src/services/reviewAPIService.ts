import axios from "axios";
import Review from "../models/Review";

const baseUrl: string = process.env.REACT_APP_API_URL || "";

export const createReview = (review: Review): Promise<Review> => {
  return axios
    .post(`${baseUrl}/reviews`, review)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};
