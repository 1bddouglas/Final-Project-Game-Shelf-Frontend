import { useEffect, useState } from "react";
import "./ImageComponent.css";
import imgNotFound from "../assets/img-not-found.jpg";

interface Props {
  src: string;
}

const ImageComponent = ({ src }: Props) => {
  const [valid, setValid] = useState(false);
  const [validSrc, setValidSrc] = useState("");

  useEffect(() => {
    const image = new Image();

    const checkValid = () => {
      if (image.complete && image.naturalWidth > 0 && image.naturalHeight > 0) {
        setValid(true);
        setValidSrc(src);
      }
    };

    image.onload = checkValid;
    image.src = src;
  }, [src]);

  return (
    <>
      {!valid ? (
        <img src={imgNotFound} alt="Image not found" />
      ) : (
        <img src={validSrc} />
      )}
    </>
  );
};

export default ImageComponent;
