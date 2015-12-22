import React from 'react/addons';

class ArticleList extends React.Component {
  static defaultProps = {
    initialArticles: [
      { title: "What React component class syntax should I use?",
        url: "http://reactkungfu.com/2015/07/what-react-component-class-syntax-should-i-use/",
        score: 2
      },
      { title: "Why are we using React.js in our projects?",
        url: "http://reactkungfu.com/2015/07/why-are-we-using-react-js-in-our-projects/",
        score: 4
      },
      { title: "Approaches to testing React components - an overview",
        url: "http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/",
        score: 3
      }
    ]
  };

  state = { articles: this.props.initialArticles };

  sortedArticles = () => {
    let { articles } = this.state;

    return [].concat(articles).sort((articleOne, articleTwo) => {
      if(articleOne.score == articleTwo.score) return 0;
      if(articleOne.score > articleTwo.score) return -1;
      return 1;
    });
  };

  upvote = (articleIndex) => {
    let { articles } = this.state,
        article = articles[articleIndex];

    article.score = article.score + 1;
    this.setState({ articles });
  };

  handleUpvoting = (article) => {
    return (ev) => {
      ev.preventDefault();
      this.upvote(this.state.articles.indexOf(article));
    };
  };

  render() {
    return (
      <ul>
        {this.sortedArticles().map(article =>
        <li>
          ({article.score})
          {' '}
          <a href={article.url}>
            {article.title}
          </a>
          {' '}
          <a href="#" onClick={this.handleUpvoting(article)}>upvote</a>
        </li>
        )}
      </ul>
    );
  }
}

export default ArticleList;
