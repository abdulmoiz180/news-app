import "./App.css";
import React, { Component } from "react";
import NabBar from "./components/NavBar";
import NewsList from "./components/NewsList";

export default class App extends Component {
  render() {
    return (
      <div>
        <NabBar />
        <NewsList />
      </div>
    );
  }
}

// API KEY: 0d0865b06d054312ad3f44c7e9a149d1
