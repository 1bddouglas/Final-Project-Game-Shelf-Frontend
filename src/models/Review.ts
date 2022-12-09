import Account from "./Account";

interface Comment {
  comment: string;
  displayName: string;
}

export default interface Review {
  _id?: string;
  reviewId: string;
  reviewerId: string;
  title: string;
  content: string;
  comments: Comment[];
  reviewAccount: Account;
  gameName: string;
}
