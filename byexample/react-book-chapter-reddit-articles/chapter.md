# Reddit-like List of articles with "upvoting" option.

There is a lot of content flowing through the internet. One of the most successful ideas to organise them so far are content aggregates. Sites like Reddit or HackerNews allows their users to "vote" whether a content pushed to them is good or not. All articles maintain some kind of score - and their position on a list are determined by it.

As you will see, implementing such list is very simple with React.js. In this example you'll see how to create a list of articles with links and an "upvote" option. The "upvote" option increases the score of an article by one. Articles will be sorted by this score on a list.

## Requirements

This example won't use any technologies or third-party components apart from the React.js library.

You need to have an environment which supports Stage 0 ECMAScript 2016 features. Babel.js is one of the options available.

## Recipe

To bootstrap this example, you can start with a React component returning nothing. It can be done like this:

{lang="javascript"}
    class ArticleList extends React.Component {
      render() {
        return null;
      }
    }

This is the minimal React component class possible. It consists of a `render` method (every component class in React needs to define it), which returns `null` - it'll get transformed into a `<noscript>` tag, rendering nothing. 

Since you have the start point, you can start with the data. Since articles will get modified, they have to be stored in a state. Their changes will trigger the `ArticleList` component re-rendering.

The good technique there is to use `initialArticles` default property with some dummy data. Then, you seed the initial state with this value.

{lang="javascript"}
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

      render() {
        return null;
      }
    }

So far, so good. If no data is provided while rendering such list (for example, using `React.render(<ArticleList initialArticles={[]} />, domNode)` to provide an empty list of articles) dummy data will be used. It's great for quick prototyping, since you don't need to care about the data from this point.

Since you have your articles already, it's time to render something. The minimal step would be to provide a list of article titles:

{lang="javascript"}
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

      render() {
        let { articles } = this.state;

        return (
          <ul>
            {articles.map(article => <li>{article.title}</li>)}
          </ul>
        );
      }
    }

Right now, a bullet list of article titles will get rendered. To get the `articles` list from state, a destructuring assignment is used. `let { articles } = this.state` is the more concise way of saying `let articles = this.state.articles`.

OK. Since you'd like to maintain a list of links with titles, how about attaching a link to article titles?

{lang="javascript"}
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

      render() {
        let { articles } = this.state;

        return (
          <ul>
            {articles.map(article => 
            <li>
              <a href={article.url}>
                {article.title}
              </a>
            </li>
            )}
          </ul>
        );
      }
    }

From now each title on a bulleted list is a link to the article. Great!

One more thing missing from this list in terms of 'displaying data' is lack of score information. This can be easily fixed.
 
{lang="javascript"}
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

      render() {
        let { articles } = this.state;

        return (
          <ul>
            {articles.map(article => 
            <li>
              ({article.score}){' '}
              <a href={article.url}>
                {article.title}
              </a>
            </li>
            )}
          </ul>
        );
      }
    }

Notice how the `{' '}` is used here. Since JSX is stripping spaces, you need to insert it using a JSX literal like on example above.

Right now you have a bulleted list of articles, with title being links to them and score displayed in braces.

There is a problem, though. Your list of articles is meant to be sorted by a score - not it is not. Let's fix it:

{lang="javascript"}
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

      render() {
        return (
          <ul>
            {this.sortedArticles().map(article => 
            <li>
              ({article.score}){' '}
              <a href={article.url}>
                {article.title}
              </a>
            </li>
            )}
          </ul>
        );
      }
    }

There is a new method introduced called `sortedArticles`. It takes articles from state, copies it (`[].concat(<list>)` creates a new list by copying elements in a shallow way) since modifying state without `setState` is a bad idea, and sorting using a `sort` function from the standard library.

All that needs to be done in `render` is to change `articles.map` to `this.sortedArticles().map`.

So far, so good. Your list is now sorted based on a score of the article!

There is the last feature that is needed. A way to modify score. To keep things simple, a new link will be introducted after the article's title.

{lang="javascript"}
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
              <a href="#">upvote</a>
            </li>
            )}
          </ul>
        );
      }
    }

Right now this link does nothing - it just appends a `#` to the address of yur site. In this step a behaviour will get attached to it.

{lang="javascript"}
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

Right now you can upvote your article, increasing its score by one. After such change an article list will re-order articles if necessary. Notice that thanks to React.js declarativeness there are no logic of this re-ordering necessary. Since you specified in `render` how articles are rendered, React will take care of it if something changes.

To implement upvoting behavior, two new methods are created - `upvote` and `handleUpvoting`. `handleUpvoting` is an _event handler factory_. It takes an article and returns a _function_ which will be a handler for your clicks. What it does is just preventing the `#` to being appended to your address bar (by calling `preventDefault()` method on an event object) and calling the `upvote` method which will take care of the upvoting. Since `upvote` is working in terms of the position of an article in the array, `indexOf` is used to find such index.

## What next?

What can be done next is to create a new component called `Article` to keep logic of displaying single article there. In a real use case you'll propably have some kind of unique identifier of an article - it can be used to simplify logic of `handleUpvoting` method by not returning a function at all.

## Summary

Implementing a list of articles with dynamic scores attached to articles is a very simple illustration of the power that React.js posess thanks to its declarativity. Your `render` method is all about _what my content looks when I have properties and state (x,y)_. It does not contain any logic about how you can go from props/state `(x, y)` to props/state `(a, b)`.

If you have used jQuery before, you might need to provide a logic for re-ordering articles or re-render the whole list in an inefficient way. React.js solves this problem by re-rendering the list in a very efficient way using the _diff algorithm_.

This is a great starting point for your clone of Reddit - and such project can be a great toy project to fiddle with. Good luck!

