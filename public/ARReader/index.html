<!DOCTYPE html>
<html>
<!-- A-Frame -->
<script src="https://aframe.io/releases/1.0.0/aframe.min.js"></script>

<!-- AR.js -->
<script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.7.7/aframe/build/aframe-ar.js"></script>


<body style="margin: 0px; overflow: hidden;">
  <a-scene embedded arjs>

    <a-assets timeout="30000">
      <video id="video_namahage" autoplay src="./sample.mp4" loop="true" preload="auto"></video>
      <!-- <video id="ar-video" autoplay loop="true" preload="auto" src="test0818.mp4"></video> -->

      <audio src="./sample.mp4" autoplay></audio>
    </a-assets>

    <!-- マーカー(~.patt)のURL -->
    <a-marker type="pattern" url="pattern-test.patt" registerevents>
    <!-- <a-marker type="pattern" url="pattern-marker.patt" registerevents> -->
      <!-- <a-box position="0 -1 0" scale="1 1 1" color="grey"></a-box> -->
      <a-video src="#video_namahage" width="4.6" height="4.6" position="0 0 0" rotation="0 0 0" play="true"></a-video>
    </a-marker>
    <a-entity camera></a-entity>
  </a-scene>

  <script>
    // ビデオ格納用の変数定義を追加
    console.log("test");
    var video = null;
    AFRAME.registerComponent('registerevents', {
      init: function () {
        console.log("関数定義中？");


        var marker = this.el;

        // マーカーを検出したイベントの登録
        marker.addEventListener('markerFound', function () {
          console.log('markerFound');
          // マーカー認識したら、ビデオ再生
          if (video == null) {
            video = document.querySelector('#video_namahage');
          }
          video.play();
        });

        // マーカーを見失ったイベントの登録
        marker.addEventListener('markerLost', function () {
          console.log("markerLost");
          // マーカー認識が外れたら、、ビデオ停止
          video.pause();
        });
      }
    });

    console.log("関数登録完了" + video);
  </script>
</body>

</html>