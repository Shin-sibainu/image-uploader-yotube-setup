import React, { Component } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import MovieUploader from "./MovieUploader";

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
    <div>
      <h1>Welcome</h1>
      <p><Link to="/about">始める</Link></p>
    </div>
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

const Marker = () => {
  return (
    <div>
      <h1>ARマーカー作成</h1>
      <p><Link to="/about">始める</Link></p>
    </div>
  )
}

// const Marker = () => {
//   return (
//     <div className="Marker">
//       {/* makemarker */}
//       <Makemarker />
//     </div>
//   );
// }

export default App;
