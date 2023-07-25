import React, { Component } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { ThirtyFpsSelect } from "@mui/icons-material";

export default class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let API =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=0d0865b06d054312ad3f44c7e9a149d1&page=1&pageSize=18";
    await axios
      .get(API)
      .then((response) => {
        const articles = response.data?.articles || [];
        this.setState({ articles });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  handleNextPage = () => {
    console.log(`next`);
    if (
      this.state.page + 1 >
      Math.ceil(this.state.articles.totalResults / 18)
    ) {
      window.alert("pages ran out...");
    } else {
      let API = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0d0865b06d054312ad3f44c7e9a149d1&page=${
        this.state.page + 1
      }&pageSize=18`;
      axios
        .get(API)
        .then((response) => {
          const articles = response.data?.articles || [];
          this.setState({ articles });
        })
        .catch((error) => {
          console.error(error);
        });
      this.state = {
        articles: [],
        page: this.state.page + 1,
      };
      console.log(this.state.page);
    }
  };
  handlePrevPage = () => {
    console.log(`prev`);
    let API = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0d0865b06d054312ad3f44c7e9a149d1&page=${
      this.state.page - 1
    }&pageSize=18`;
    axios
      .get(API)
      .then((response) => {
        const articles = response.data?.articles || [];
        this.setState({ articles });
      })
      .catch((error) => {
        console.error(error);
      });
    this.state = {
      articles: [],
      page: this.state.page - 1,
    };
    console.log(this.state.page);
  };
  render() {
    console.log(this.state.page);
    const { articles } = this.state;
    return (
      <div className="container">
        <h1>News Articles</h1>
        <div className="card-grid">
          {articles.map((article, index) => (
            <Card key={index} sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={
                  !article.urlToImage
                    ? "https://s.yimg.com/ny/api/res/1.2/WsH5yQefCftNdBxbGmxJsw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-07/fda2edc0-2695-11ee-a6df-4772432b5232"
                    : article.urlToImage
                }
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.description}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  See More...
                </a>
              </CardActions>
            </Card>
          ))}
        </div>
        <div className="btn-container">
          <Button disabled={this.state.page <= 1} onClick={this.handlePrevPage}>
            &larr; Previous
          </Button>
          <Button onClick={this.handleNextPage}>Next &rarr;</Button>
        </div>
      </div>
    );
  }
}
