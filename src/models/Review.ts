import Account from "./Account";

export default interface Review {
  _id?: string;
  reviewId: string;
  title: string;
  content: string;
  comments?: string[];
  reviewAccount: Account;
}
