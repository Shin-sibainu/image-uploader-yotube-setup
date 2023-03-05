import { Button } from "@mui/material";
import React, { useState } from "react";
import ImageLogo from "./movie.svg";
import "./MovieUpload.css";
import storage from "./firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// THREE.JS
import THREEx from "./threex-arpatternfile.js";
// import { Canvas, useFrame } from '@react-three/fiber'

const MovieUploader = () => {
  const [loading, setLoading] = useState(false);
  const [isUploaded, setUploaded] = useState(false);

  var innerImageURL = `${process.env.PUBLIC_URL}/testsrc/test.jpg`;
  var imageName = "test";
  var fullMarkerImage = null;
  var fullMarkerURL = null;

  const OnFileUplodeToFirebase = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    const storageRef = ref(storage, file.lastModified + "/" + file.name);
    const uploadMovie = uploadBytesResumable(storageRef, file);

    uploadMovie.on(
      "state_change",
      (snapshot) => {
        setLoading(true);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setLoading(false);
        setUploaded(true);
        var user_id = file.lastModified;
        console.log(file);
        var result = document.getElementById("result");
        let qrValue = "https://" + user_id;
        document.getElementById("qr-code").src =
          "https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=" +
          qrValue;
      }
    );
  };

  // ARマーカー作成
  const updateFullMarkerImage = () => {
    console.log("updateFullMarkerImage：ARマーカの生成");
    // get patternRatio とりあえずテキトーに設定・自由に変更できるようにしてもいいね
    var patternRatio = 0.5;
    var imageSize = 512;
    var borderColor = "black";
    // var patternRatio = document.querySelector('#patternRatioSlider').value/100
    // var imageSize = document.querySelector('#imageSize').value
    // var borderColor = document.querySelector('#borderColor').value

    // function hexaColor(color) {
    // 	return /^#[0-9A-F]{6}$/i.test(color);
    // };

    // var s = new Option().style;
    // s.color = borderColor;
    // 	if (borderColor === '' || (s.color != borderColor && !hexaColor(borderColor))) {
    // 	// if color not valid, use black
    // 	borderColor = 'black';
    // }

    THREEx.ArPatternFile.buildFullMarker(
      innerImageURL,
      patternRatio,
      imageSize,
      borderColor,
      function onComplete(markerUrl) {
        fullMarkerURL = markerUrl

        var fullMarkerImage = document.createElement("img");
        fullMarkerImage.src = fullMarkerURL;

        // put fullMarkerImage into #imageContainer
        var container = document.querySelector("#imageContainer");
        while (container.firstChild)
          container.removeChild(container.firstChild);
        container.appendChild(fullMarkerImage);

        console.log("ARマーカー作成完了");
      }
    );
  }

  // ARマーカパターンファイル出力
  const OutPutPattarnFile = () => {
    console.log("ppatファイル作成開始");

    // var innerImageURL = `${process.env.PUBLIC_URL}/testsrc/test.jpg`;
    // var imageName = "test";
    // var fullMarkerImage = null;
    console.log("pattダウンロードボタン押下");

    updateFullMarkerImage(innerImageURL);

    if (innerImageURL === null) {
      alert("upload a file first");
      return;
    }
    console.assert(innerImageURL);
    THREEx.ArPatternFile.encodeImageURL(
      innerImageURL,
      function onComplete(patternFileString) {
        THREEx.ArPatternFile.triggerDownload(
          patternFileString,
          "pattern-" + (imageName || "marker") + ".patt"
        );
      }
    );
  };

  // ARマーカ画像出力
  const OutPutMakerImage = () => {
    var innerImageURL = `${process.env.PUBLIC_URL}/testsrc/test.jpg`;
    var imageName = "test";

    // debugger
    if (innerImageURL === null) {
      alert("upload a file first");
      return;
    }

    updateFullMarkerImage(innerImageURL);
    var domElement = window.document.createElement("a");
    domElement.href = fullMarkerURL;
    domElement.download = "pattern-" + (imageName || "marker") + ".png";
    document.body.appendChild(domElement);
    domElement.click();
    document.body.removeChild(domElement);
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
                <img
                  id="qr-code"
                  src="qr-code.png"
                  alt="qr-code"
                  class="qr-code"
                />
                <br />
              </div>
              <div className="result">
                <h2 id="result">
                  <p>アップロード完了しました！</p>
                </h2>
                <p>
                  <Link to="/marker">次へ</Link>
                </p>
              </div>
            </>
          ) : (
            <div className="outerBox">
              <div className="title">
                <h2>ARマーカ作成</h2>
                <p>画像アップロード</p>
              </div>
              <div className="movieUplodeBox">
                <div className="movieLogoAndText">
                  <img src={ImageLogo} alt="imagelogo" />
                  <p>ここにドラッグ＆ドロップしてください</p>
                </div>
                <input
                  className="movieUploadInput"
                  multiple
                  name="movieURL"
                  type="file"
                  accept=".mp4"
                  onChange={OnFileUplodeToFirebase}
                />
              </div>
              <p>または</p>
              <Button variant="contained">
                ファイルを選択
                <input
                  className="movieUploadInput"
                  type="file"
                  onChange={OnFileUplodeToFirebase}
                  accept=".mp4"
                />
              </Button>

              <Button variant="contained" onClick={OutPutPattarnFile}>
                ARマーカ pattファイル出力
              </Button>
              <Button variant="contained" onClick={OutPutMakerImage}>
                ARマーカ pngファイル選択
              </Button>

              <div id="imageContainer"></div>
              <img
                width="50px"
                src={`${process.env.PUBLIC_URL}/testsrc/test.jpg`}
              ></img>
            </div>
          )}
        </>
      )}
    </>
  );
};

const Marker = () => {
  return (
    <div>
      <h1>ARマーカー作成</h1>
      <p>
        <Link to="/about">始める</Link>
      </p>
    </div>
  );
};

export default MovieUploader;
