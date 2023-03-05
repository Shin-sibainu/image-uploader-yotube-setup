import React, { Component } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import MovieUploader from "./MovieUploader";
import Makemarker from "./Makemarker";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container text-center mt-5">
        <Routes>
            <Route path={`/`} element={<Home />} />
            <Route path={`/about/`} element={<About />} />
            <Route path={`/marker/`} element={<Marker />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const Home = () => {
  return (
    // <div>
    //   <h1>Welcome</h1>
    //   <p><Link to="/about">始める</Link></p>
    // </div>
    <html>
      <head>
        <title>Welcome</title>
        <link rel="stylesheet" type="text/css" href="style.css"/>
      </head>
      <body>
        <div class="welcome-container">
          <h1>ようこそ</h1>
          <p>そつあるさくせい</p>
          <p><Link to="/about"><button class="start-button">スタート</button></Link></p>
          <p><Link to="/marker">ARマーカー生成（Debug）</Link></p>
        </div>
      </body>
    </html>
  )
}

const About = () => {
  return (
    <div className="App">
      {/* uplodaer */}
      <MovieUploader />
    </div>
  );
}

// const Marker = () => {
//   return (
//     <div>
//       <h1>ARマーカー作成</h1>
//       <p><Link to="/about">始める</Link></p>
//     </div>
//   )
// }

const Marker = () => {
  return (
    <div className="Marker">
      {/* makemarker */}
      <Makemarker />
    </div>
  );
}

export default App;
