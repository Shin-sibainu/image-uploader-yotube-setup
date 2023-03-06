import { Button } from "@mui/material";
import React, { useState } from "react";
import ImageLogo from "./movie.svg";
import "./MovieUpload.css";
import storage from "./firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// THREE.JS
import THREEx from "./threex-arpatternfile.js";


const MovieUploader = () => {

  const [loading, setLoading] = useState(false);
  const [isUploaded, setUploaded] = useState(false);

  // 送信された画像パス（予定：今は用意したパス）
  var innerImageURL = `${process.env.PUBLIC_URL}/testsrc/test.jpg`;
  var imageName = "test";
  // 作成したARマーカーのパス
  var fullMarkerURL = null;
  var fullMarkerImage = null;

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

  const UploadinnerImage=(e)=>{
    console.log("画像Upload");
    // var file = this.files[0];
    var file = e.target.files[0];
		imageName = file.name
		// remove file extension
		imageName = imageName.substring(0, imageName.lastIndexOf('.')) || imageName
		var reader = new FileReader();
		reader.onload = function(event){
			innerImageURL = event.target.result
			updateFullMarkerImage()
		};
		reader.readAsDataURL(file);

    console.log(innerImageURL);
  };

  // ARマーカー作成
  const updateFullMarkerImage = () => {
    console.log("updateFullMarkerImage：ARマーカの生成");
    // get patternRatio とりあえずテキトーに設定・自由に変更できるようにしてもいいね
    var patternRatio = 0.9;
    var imageSize = 512;
    var borderColor = "black";
    // var patternRatio = document.querySelector('#patternRatioSlider').value/100
    // var imageSize = document.querySelector('#imageSize').value
    // var borderColor = document.querySelector('#borderColor').value

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
                  accept="image/*,.png,.jpg,.jpeg,.gif"
                  onChange={UploadinnerImage}
                />
              </div>
              <p>または</p>
              <Button variant="contained">
                ファイルを選択
                <input
                  className="movieUploadInput"
                  type="file"
                  onChange={UploadinnerImage}
                  accept="image/*,.png,.jpg,.jpeg,.gif"
                />
              </Button>

              <Button variant="contained" onClick={OutPutPattarnFile}>
                ARマーカ pattファイル出力
              </Button>
              <Button variant="contained" onClick={OutPutMakerImage}>
                ARマーカ pngファイル選択
              </Button>

              <div id="imageContainer"></div>
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
