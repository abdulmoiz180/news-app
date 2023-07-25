import React, { Component } from "react";
import axios from "axios";
import NewsList from "./NewsList";

export default class API extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    const API =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=0d0865b06d054312ad3f44c7e9a149d1";
    axios
      .get(API)
      .then((response) => {
        const articles = response.data?.articles || [];
        this.setState({ articles });
      })
      .catch((error) => {
        // Handle error
      });
  }

  render() {
    const { articles } = this.state;

    return (
      <>
        <NewsList articles={articles} />

      </>
    );
  }
}
