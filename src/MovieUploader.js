import { Button } from "@mui/material";
import React, { useState } from "react";
import ImageLogo from "./movie.svg";
import "./MovieUpload.css";
import storage from "./firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const MovieUploader = () => {
  const [loading, setLoading] = useState(false);
  const [isUploaded, setUploaded] = useState(false);

  const OnFileUplodeToFirebase = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0]
    const storageRef = ref(storage, file.lastModified + "/" + file.name);
    const uploadMovie = uploadBytesResumable(storageRef, file);

    uploadMovie.on(
      "state_change",
      (snapshot) => {
        setLoading(true);
      },
      (err) => {
        console.log(err)
      },
      () => {
        setLoading(false);
        setUploaded(true);
        var user_id = file.lastModified
        console.log(file)
        var result = document.getElementById("result");
        let qrValue = "https://" + user_id
        document.getElementById("qr-code").src = 'https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=' + qrValue;
      }
    )
  };
  return (
    <>
      {loading ? (
        <h2>アップロード中・・・</h2>
      ) : (
        <>
          {isUploaded ? (
            <>
              <div className="qr-code">
                <img id="qr-code" src="qr-code.png" alt="qr-code" class="qr-code"/><br/>
              </div>
              <div className="result">
                <h2 id="result"><p>アップロード完了しました！</p></h2>
                <p><Link to="/marker">次へ</Link></p>
              </div>
            </>
          ) : (
          <div className="outerBox">
            <div className="title">
              <h2>動画アップローダー</h2>
              <p>mp4の画像ファイル</p>
            </div>
            <div className="movieUplodeBox">
              <div className="movieLogoAndText">
                <img src={ImageLogo} alt="imagelogo" />
                <p>ここにドラッグ＆ドロップしてください</p>
              </div>
              <input className="movieUploadInput" multiple name="movieURL" type="file" accept=".mp4" onChange={OnFileUplodeToFirebase} />
            </div>
            <p>または</p>
            <Button variant="contained">
              ファイルを選択
              <input className="movieUploadInput" type="file" onChange={OnFileUplodeToFirebase} accept=".mp4"/>
            </Button>
          </div>
          )}
        </>
      )}
    </>
  );
};


export default MovieUploader;
