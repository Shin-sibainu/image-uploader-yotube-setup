import { Button } from "@mui/material";
import React, { useState } from "react";
import ImageLogo from "./movie.svg";
import "./MovieUpload.css";
import firebase from "./firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

// firestore
import { collection, addDoc } from "firebase/firestore";



// import firebase from "./firebase";
// import "firebase/compat/firestore";
// import { doc, onSnapshot, collection, query, where } from "firebase/firestore";




function MovieUploader() {
  const [loading, setLoading] = useState(false);
  const [isUploaded, setUploaded] = useState(false);

  const OnFileUplodeToFirebase = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    const movie_path = file.lastModified + "/" + file.name
    const storageRef = ref(firebase.storage, movie_path);
    const uploadMovie = uploadBytesResumable(storageRef, file);
    let percentage;

    uploadMovie.on(
      "state_change",
      (snapshot) => {
        setLoading(true);
        // setInterval(() => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        var loading = document.getElementById("loading");
        var percentage = document.getElementById("percentage");
        loading.value = progress;
        console.log("<progress max= 100" + " value=" + progress + "></progress>");
        percentage.innerHTML = progress.toFixed() + " %";
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
        // }, 100);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setLoading(false);
        setUploaded(true);
        var user_id = file.lastModified;

        // DB登録
        InsertDB_movie_path(movie_path);

        console.log(file);
        var result = document.getElementById("result");
        let qrValue = "https://" + user_id;
        document.getElementById("qr-code").src = 'https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=' + qrValue;
      }
    );
  };

  // DB保存
  const InsertDB_movie_path = async (movie_path) => {
    console.log("動画のパス入力" + movie_path);
    try {
      const docRef = await addDoc(collection(firebase.db, "arbum_data"), {
        movie_path: movie_path
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };



  return (
    <>
      {loading ? (
        <div>
          <progress max="100" value="50" id="loading"></progress>
          <h3 id="percentage">0 %</h3>
          <h2 className="nowloading">アップロード中・・・</h2>
        </div>
      ) : (
        <>
          {isUploaded ? (
            <>
              <div>
                <img id="qr-code" src="qr-code.png" alt="qr-code" className="qr-code" /><br /><br />
                <h2 id="result" className="result"><p>アップロード完了しました！</p></h2>
                <p><Link to="/marker"><button class="next-button">次へ</button></Link></p>
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
                <input className="movieUploadInput" type="file" onChange={OnFileUplodeToFirebase} accept=".mp4" />
              </Button>
              {/* <Button onClick={InsertDB}>
                テーブル作成（Debug）
              </Button> */}
            </div>
          )}
        </>
      )}
    </>
  );
}


export default MovieUploader;
