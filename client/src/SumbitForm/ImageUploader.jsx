import { useRef, useState } from "react";
import { Button, Image } from "semantic-ui-react";
import Loader from "react-loader-spinner";
import { config } from "../config";
import { photo } from "./mocks";
import axios from "axios";

const ImageUploader = ({ onChangedLink, imageLink }) => {
  const [isLoading, setLoading] = useState(false);
  const photoSrc = imageLink || photo;
  const fileInput = useRef(null);

  const onImageLoad = (e) => {
    const data = new FormData();
    if(e.target.files.length){
        data.append("file", e.target.files[0]);
        setLoading(true);
        axios.post(config.hostname.concat("/upload"), data).then((response) => {
          onChangedLink(response.data.link);
          setTimeout(() => setLoading(false), 100);
        });
    }
  };

  return (
    <div className={"submit-form-upload-photo-wrapper"}>
      {isLoading ? (
        <Loader type="Puff" color="#2b2b2bd9" height={100} width={100} />
      ) : (
        <div className={"submit-form-upload"}>
          <Image src={photoSrc} size="small" centered />
          <input
            type="file"
            onChange={onImageLoad}
            hidden
            ref={fileInput}
            accept={".png"}
          />
          <Button
            className={"submit-form-upload-button"}
            onClick={(e) => fileInput.current && fileInput.current.click()}
          >
            {imageLink ? "Змінити фотографію" : "Завантажити фотографію"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
