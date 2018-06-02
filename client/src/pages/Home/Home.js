import React, { Component } from "react";
import API from "../../utils/API";
import SaveBtn from "../../components/SaveBtn";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import { Container, Row, Col } from "../../components/Grid";
import moment from 'moment';

class Home extends Component {
  state = {
    articles: [],
    savedArticles: []
  };

  componentDidMount() {
    const self = this;
    API.scrapeArticles()
      .then(res => {
         self.loadArticles();
      })
      .catch(err => console.log(err));
  }

  loadArticles = (startDate, endDate) => {
    const self = this;
    API.getArticles(0, startDate, endDate)
      .then(function(res) {
        if (res.data) {
          self.setState({ articles: res.data });
        }
      })
      .catch(err => console.log(err));

    API.getArticles(1, startDate, endDate)
      .then(res => {
        if (res.data) {
          self.setState({ savedArticles: res.data });
        }
      })
      .catch(err => console.log(err));
  };

  saveArticle = id => {
    // only save if the article hasn't been saved already
    const foundIndex = this.state.savedArticles.findIndex(article => article._id !== id);
    const self = this;
    if (!foundIndex) {
      API.updateArticle(id, {
        $currentDate: {'save_date':true}
      })
        .then(res => self.loadArticles())
        .catch(err => console.log(err));
    }
  };

  removeArticle = id => {
    const self = this;
    API.deleteArticle(id)
      .then(res => self.loadArticles())
      .catch(err => console.log(err));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // call to scrape nyt for articles
    let savedOnly = null;
    let startDate = null;
    let endDate = null;

    // grab date filters from inputs
    

    this.loadArticles(savedOnly, startDate, endDate);
  };

  parseLocalTime = gmtDate => {
    var gmtDateTime = moment.utc(gmtDate);
    var local = gmtDateTime.local().format('YYYY-MMM-DD h:mm A');
    return local;
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="lg-12">
            <h2>Search</h2>
            <form>
              <Input />
              <FormBtn >
                <p>Search</p>
              </FormBtn>
            </form>
          </Col>
        </Row>

        <Row>
          <Col size="lg-12">
            <h2>Results</h2>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem 
                    key={article.url} >
                    <div>
                      <p className="item-title">Title: {article.title}</p>
                      <p className="item-author">Author: {article.author}</p>
                      <p className="item-date">Publish Date: {this.parseLocalTime(article.publish_date)}</p>
                      <p className="item-url">Url: {article.url}</p>
                      <SaveBtn onClick={() => this.saveArticle(article._id)}/>
                    </div>
                  </ListItem>
                ))}
              </List>
            ):
              <h3>No Articles to Display</h3>
            }
          </Col>
        </Row>
        
        <Row>
          <Col size="lg-12">
            <h2>Saved Articles</h2>
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.map(article => (
                  <ListItem 
                    key={article._id} >
                    <div>
                      <p className="item-title">{article.title}</p>
                      <p className="item-author">Author: {article.author}</p>
                      <p className="item-date">Publish Date:{article.publish_date}</p>
                      <p className="item-date">Save Date:{article.save_date}</p>
                      <p className="item-url">Url: {article.url}</p>
                    </div>
                  </ListItem>
                ))}
              </List>
            ):
              <h3>No Saved Articles to Display</h3>
            }
          </Col>
        </Row>

      </Container>
    );
  }
}

export default Home;