import { FormEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardGame from "../models/BoardGame";
import { singleGameService } from "../services/boardGameAPIService";
import "./SingleGame.css";
import ImageComponant from "./ImageComponent";
import AuthContext from "../context/AuthContext";
import { updateAccountDatabase } from "../services/accountAPIService";
import { createReview } from "../services/reviewAPIService";
import Review from "../models/Review";

const SingleGame = () => {
  const { account, setAccount } = useContext(AuthContext);
  const [singleGame, setSingleGame] = useState<BoardGame>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // const navigate = useNavigate();
  const id: string | undefined = useParams().id;

  let cleanText = singleGame?.description_preview?.replace(
    /<\/?[^>]+(>|$)/g,
    ""
  );

  useEffect(() => {
    console.log(id);
    singleGameService(id!).then((res) => {
      setSingleGame(res.games[0]);
    });
  }, [id]);

  console.dir(singleGame?.images.medium);

  const addToWishlistHandler = () => {
    console.log(singleGame);

    if (account && singleGame) {
      const copyOfAccount = { ...account };
      const copyOfWishlist = [...account.wishlist];
      copyOfAccount.wishlist = [...copyOfWishlist, singleGame];
      console.log(copyOfWishlist);

      updateAccountDatabase(copyOfAccount).then((res) => {
        setAccount(res);
      });
    }
  };

  const addToShelfHandler = () => {
    console.log(singleGame);

    if (account && singleGame) {
      const copyOfAccount = { ...account };
      const copyOfShelf = [...account.myShelf];
      copyOfAccount.myShelf = [...copyOfShelf, singleGame];
      console.log(copyOfShelf);

      updateAccountDatabase(copyOfAccount).then((res) => {
        setAccount(res);
      });
    }
  };

  const reviewSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    setTitle("");
    setContent("");
    const newReview: Review = {
      reviewId: singleGame?.id!,
      title,
      content,
    };
    console.log(newReview);
    createReview(newReview);
  };

  return (
    <>
      {singleGame ? (
        <div className="SingleGame">
          <section className="game-information">
            <h2>{singleGame?.name}</h2>
            <ImageComponant src={singleGame?.images.medium!} />
            <button className="shelf-button" onClick={addToShelfHandler}>
              Add to my Shelf
            </button>
            <button className="wishlist-button" onClick={addToWishlistHandler}>
              Add to my Wishlist
            </button>
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
              {singleGame?.msrp && <li>Price: ${singleGame?.msrp}</li>}
              {singleGame?.primary_designer.name && (
                <li>Designer: {singleGame?.primary_designer.name}</li>
              )}
            </ul>
            {singleGame?.description_preview && <p>{cleanText}</p>}
          </section>
          <section className="game-reviews"></section>
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
              <button className="review-submit-btn">Submit your review</button>
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
