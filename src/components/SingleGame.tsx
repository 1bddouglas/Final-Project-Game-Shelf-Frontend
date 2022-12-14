import { FormEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardGame from "../models/BoardGame";
import { singleGameService } from "../services/boardGameAPIService";
import "./SingleGame.css";
import ImageComponant from "./ImageComponent";
import AuthContext from "../context/AuthContext";
import { updateAccountDatabase } from "../services/accountAPIService";
import {
  createReview,
  editReview,
  getReviewsByID,
} from "../services/reviewAPIService";
import Review from "../models/Review";
import ReviewCommentForm from "./ReviewCommentForm";
import bookshelf from "../assets/bookshelf.png";
import whiteBookshelf from "../assets/bookshelf-white.png";
import wishlistBlack from "../assets/wishlist-black.png";
import wishlistWhite from "../assets/wishlist-white.png";
import ShowMoreText from "react-show-more-text";

const SingleGame = () => {
  const { account, setAccount } = useContext(AuthContext);
  const [singleGame, setSingleGame] = useState<BoardGame>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState("");
  const [expandDescription, setExpandDescription] = useState(false);

  // const navigate = useNavigate();
  const id: string | undefined = useParams().id;

  let cleanText = singleGame?.description_preview?.replace(
    /<\/?[^>]+(>|$)/g,
    ""
  );

  useEffect(() => {
    console.log(id);
    if (id) {
      singleGameService(id!).then((res) => {
        setSingleGame(res.games[0]);
      });
      getReviewsByID(id!).then((res) => {
        setReviews(res);
        console.log(res);
      });
    }
  }, [id]);

  const isInWishlist = (id: string): boolean | undefined => {
    return account?.wishlist.some((game) => {
      return game.id === id;
    });
  };

  const isInMyShelf = (id: string): boolean | undefined => {
    return account?.myShelf.some((game) => {
      return game.id === id;
    });
  };

  const addToWishlistHandler = () => {
    console.log(singleGame);

    if (account && singleGame) {
      if (isInWishlist(singleGame.id)) {
        console.log("game already in wishlist");
      } else {
        const copyOfAccount = { ...account };
        const copyOfWishlist = [...account.wishlist];
        copyOfAccount.wishlist = [...copyOfWishlist, singleGame];
        console.log(copyOfWishlist);

        updateAccountDatabase(copyOfAccount).then((res) => {
          setAccount(res);
        });
      }
    }
  };

  const addToShelfHandler = () => {
    console.log(singleGame);

    if (account && singleGame) {
      if (isInMyShelf(singleGame.id)) {
        console.log("game already in shelf");
      } else {
        const copyOfAccount = { ...account };
        const copyOfShelf = [...account.myShelf];
        copyOfAccount.myShelf = [...copyOfShelf, singleGame];
        console.log(copyOfShelf);

        updateAccountDatabase(copyOfAccount).then((res) => {
          setAccount(res);
        });
      }
    }
  };

  const deleteHandler = (id: string): void => {
    if (account) {
      const copyOfAccount = { ...account };
      const copyOfShelf = [...account.myShelf];
      const foundIndex = copyOfShelf.findIndex((game) => {
        return game.id === id;
      });
      copyOfAccount.myShelf = [
        ...copyOfShelf.slice(0, foundIndex),
        ...copyOfShelf.slice(foundIndex + 1),
      ];
      updateAccountDatabase(copyOfAccount).then((res) => {
        setAccount(res);
      });
    }
  };

  const commentSubmitHandler = (index: number, comment: string) => {
    if (account && singleGame) {
      setComment(comment);
      const copyOfReview = { ...reviews[index] };
      copyOfReview.comments.push({ comment, displayName: account.name });
      editReview(copyOfReview).then(() => {
        getReviewsByID(singleGame?.id).then((res) => setReviews(res));
      });
    }
  };

  const reviewSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (account) {
      setTitle("");
      setContent("");
      const newReview: Review = {
        reviewId: singleGame?.id!,
        title,
        content,
        comments: [],
        reviewAccount: account,
        reviewerId: account.uid,
        gameName: singleGame?.name!,
      };
      console.log(newReview);
      createReview(newReview).then(() => {
        getReviewsByID(singleGame?.id!).then((res) => {
          setReviews(res);
          console.log(res);
        });
      });
    }
  };

  return (
    <>
      {singleGame ? (
        <div className="SingleGame">
          <section className="game-information">
            <h2>{singleGame?.name}</h2>
            <div className="single-game-img">
              <ImageComponant src={singleGame?.images.medium!} />
            </div>
            <div className="single-game-buttons">
              {!account ? (
                <p className="sign-in-to-add">
                  Sign in to add to wishlist & shelf
                </p>
              ) : !isInMyShelf(singleGame.id) ? (
                <img
                  className="shelf-button"
                  src={bookshelf}
                  alt=""
                  onClick={addToShelfHandler}
                />
              ) : (
                <img
                  src={whiteBookshelf}
                  alt=""
                  className="shelf-button"
                  onClick={() => deleteHandler(singleGame.id)}
                />
              )}
              {account && !isInWishlist(singleGame.id) ? (
                <img
                  src={wishlistBlack}
                  alt=""
                  onClick={addToWishlistHandler}
                  className="wishlist-button"
                />
              ) : (
                <img
                  src={wishlistWhite}
                  alt=""
                  onClick={() => deleteHandler(singleGame.id)}
                  className="wishlist-button"
                />
              )}
            </div>
            <ul>
              {singleGame?.min_players && (
                <li>
                  Players: {singleGame?.min_players} - {singleGame?.max_players}
                </li>
              )}
              {singleGame?.min_playtime && (
                <li>
                  Playtime: {singleGame?.min_playtime} -{" "}
                  {singleGame?.max_playtime}
                  mins
                </li>
              )}
              {singleGame?.price && <li>Price: ${singleGame?.price}</li>}
              {singleGame?.primary_designer.name && (
                <li>Designer: {singleGame?.primary_designer.name}</li>
              )}
            </ul>
            {singleGame?.description_preview && (
              <ShowMoreText
                className={`show-more-description ${
                  expandDescription ? "clicked" : ""
                }`}
                onClick={() => setExpandDescription((prev) => !prev)}
              >
                <p className="description">{cleanText}</p>
              </ShowMoreText>
            )}
          </section>
          <section className="game-reviews">
            <h2>Reviews</h2>
            <ul>
              {reviews.map((review, index) => (
                <div key={review._id} className="review-box">
                  <div className="comment-box">
                    <div className="review-header">
                      <div className="user-account">
                        <img src={review.reviewAccount.profilePic} alt="" />
                        <p>{review.reviewAccount.name}</p>
                      </div>
                      <div className="review-title">{review.title}</div>
                    </div>

                    <li>
                      <p>"{review.content}"</p>
                      <h3>Comments</h3>
                      <ul>
                        {review.comments?.map((comment) => (
                          <li key={Math.random()} className="comment-li">
                            <p>{comment.displayName}</p>
                            <p>"{comment.comment}"</p>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </div>
                  <ReviewCommentForm
                    createComment={commentSubmitHandler}
                    index={index}
                  />
                </div>
              ))}
            </ul>
          </section>
          <section className="review-form">
            <h2>Submit a review</h2>
            <form onSubmit={reviewSubmitHandler}>
              <label htmlFor="title">Add a title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="content">Add content</label>
              <textarea
                name="content"
                id="content"
                cols={30}
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              {title && content ? (
                <button className="review-submit-btn">
                  Submit your review
                </button>
              ) : (
                <button className="review-submit-btn" disabled>
                  Submit your review
                </button>
              )}
            </form>
          </section>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default SingleGame;
