import { Button } from "@mui/material";
import React, { useState } from "react";
import ImageLogo from "./image.svg";
import "./ImageUpload.css";
import storage from "./firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
// import Loading from "./Loading";
// import Uploaded from "./Uploaded";

const ImageUploader = () => {
  //   const [imagesFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); //0%からスタート
  const [isUploaded, setIsUploaded] = useState(false);
  const [downloadURL, setDownLoadURL] = useState(null);

  const OnFileUploadToFirebase = (e) => {
    // const file = document.querySelector(".imageUploadInput").files[0];
    //firebaseへアップロード
    // console.log(e.target.files[0]); //FileObj
    const file = e.target.files[0];

    // console.log(imagesFile);

    console.log("アップロード処理");
    const storageRef = ref(storage, "image/" + file.name);
    //"file comes from FileAPI(file)
    const uploadImage = uploadBytesResumable(storageRef, file);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
        //get image progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(progress);
        // console.log("Upload is" + progress + "% done");
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
          setLoading(false);
          setIsUploaded(true);
          setDownLoadURL(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  };

  return (
    <>
      {loading ? (
        //Loadingコンポーネント作成
        <h2> loading中・・・</h2>
      ) : (
        <>
          {isUploaded ? (
            <h2>アップロードに成功しました！</h2>
          ) : (
            // <Uploaded downLoadURL={downloadURL} setIsUploaded={setIsUploaded} />
            <div className="outerBox">
              <div className="title">
                <h2>画像アップローダー</h2>
                <p>JpegかPngの画像ファイル</p>
              </div>
              <div className="imageUplodeBox">
                <div className="imageLogoAndText">
                  <img src={ImageLogo} alt="imagelogo" />
                  <p>ここにドラッグ＆ドロップしてね</p>
                </div>
                <input
                  type="file"
                  className="imageUploadInput"
                  multiple
                  name="imageURL"
                  accept=".png, .jpeg, .jpg"
                  onChange={OnFileUploadToFirebase}
                />
              </div>
              <p>または</p>
              <Button variant="contained">
                ファイルを選択
                <input
                  type="file"
                  className="imageUploadInput"
                  onChange={OnFileUploadToFirebase}
                />
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ImageUploader;
