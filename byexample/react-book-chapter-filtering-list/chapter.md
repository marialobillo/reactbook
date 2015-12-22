# Slack-like Quick Channel Switcher

Slack is one of the most successful startups nowadays. This success has many fathers - but great user experience is certainly one of them. User interface solutions presented in this app can be a great inspiration for many web applications that strive for great UX and design.

One of the features I usually use is the Quick Switcher. It allows you to enter a portion of the channel's name to quickly find and navigate to it. It also shows list of users who matches criteria.

With React.js, implementing an UI solution inspired by Quick Switcher is really simple.

## Requirements

This example uses the [React-Bootstrap](http://react-bootstrap.github.io) package. It allows you to quickly prototype a great looking UI using the famous [Twitter Bootstrap](http://getbootstrap.com) CSS framework. This package is a set of React components that implements UI elements from this framework.

**React-Bootstrap** must be installed. Refer to the documentation for installation instructions.

Apart from this package, only the React.js library is used. Syntax used is the vanilla ES6 classes without experimental features.

## Recipe

An empty component is always the great start for development of your new component. Let's name it `ChannelSearch`:

{lang="javascript"}
		class ChannelSearch extends React.Component {
		  render() {
		    return null;
		  }
		}

Now you may be tempted to add some dummy data to work with. Default properties are very great technique to do so. To provide default properties for the `ChannelSearch` component, you need to add `defaultProps` class property to the component class. It can be done like this:

{lang="javascript"}
		class ChannelSearch extends React.Component {
		  render() {
  		  return null;
  		}
		}

		ChannelSearch.defaultProps = {
  		channels: [
    			"reactjs",
    			"general",
    			"random",
    			"flux",
    			"relay",
    			"immutablejs",
    			"flow",
		    "webpack",
		    "babel"
		  ]
		};


This technique has a benefit that when you want to provide a real data to such component, all you need is to pass the `channels` property to the React element (like this: `React.render(<ChannelSearch channels={[...]} />, ...)`).

You got the data now. It's time to render something meaningful!

The good first step here is to create a simple list of channels. `ListGroup` and `ListGroupItem` from `react-bootstrap` can be used to render a great looking list.

Remember to require `ListGroup` and `ListGroupItem` component classes from the `react-bootstrap` package.

At the top of your file, use the `import` statement like this:

{lang="javascript"}
		import { ListGroup, ListGroupItem } from 'react-bootstrap';

If you are familiar with CommonJS style of `require`-ing modules, this is similar to:

{lang="javascript"}
		var ListGroup = require("react-bootstrap").ListGroup;
		var ListGroupItem = require("react-bootstrap").ListGroupItem;

Where `require("react-bootstrap")` returns an object where keys are names of components that React-Bootstrap provides and values - component classes attached to it.

Enough said about the setup. Let's use those component classes!

{lang="javascript"}
		class ChannelSearch extends React.Component {
		  render() {
		    let { channels } = this.props;

		    return (
  		    <ListGroup>
      			  {channels.map(channel =>
          			<ListGroupItem key={channel}>
		            {channel}
    			      </ListGroupItem>
        			)}
		      </ListGroup>
		    );
		  }
		}

		ChannelSearch.defaultProps = {
		  channels: [
		    "reactjs",
		    "general",
		    "random",
		    "flux",
    			"relay",
		    "immutablejs",
    			"flow",
		    "webpack",
    			"babel"
		  ]
		};

In this example you achieve dynamically generated list of channels by mapping channel names to React elements. What `map` does is taking each element from a list (in this case - a channel name) and transform it using the function provided. An array of transformed elements is returned as a result.

Since JSX is only a _syntax sugar_, you can map JavaScript values directly to JSX literals - and this is used in this example.

What about adding a hash to the channel name on a list? To do it, return in your `render` method must look like:

{lang="javascript"}
    return (
  		<ListGroup>
      	  {channels.map(channel =>
      			<ListGroupItem key={channel}>
		        #{channel}
    		   </ListGroupItem>
      	  )}
		  </ListGroup>
    );

What you rendered now is a static list of channels. It looks good, but an action needs to be taken. Let's add a link to each entry from this list. It'll point to a `<your_address>/#<channelName>`. You can do it like this:

{lang="javascript"}
    return (
  		<ListGroup>
      	  {channels.map(channel =>
      			<ListGroupItem key={channel} href={`#${channel}`}>
		        #{channel}
    		   </ListGroupItem>
      	  )}
		  </ListGroup>
    );

But wait. Isn't it strange? `ListGroupItem` is certainly not a `<a>` tag! Why adding `href` works?

It is because React-Bootstrap developers thought about this use case and allowed to use `href` parameter to make the whole list element clickable. You get also a hovered and active style for free. Neat!

If you think about it, your whole UI will be defined in terms of two "widgets":

* A list of channels
* An input to enter your search query

The React way of doing user interfaces is to _compose_ bigger components from the smaller ones. Since you know that list of channels is only one of the "parts" of your UI, it's great to  separate such part by creating a new component.

To do so, `Channels` component will be introduced.

{lang="javascript"}
		class Channels extends React.Component {
		  render() {
		    let { channels } = this.props;

		    return (
		      <ListGroup>
		        {channels.map(channel =>
		          <ListGroupItem key={channel} href={`#${channel}`}>
		            #{channel}
		          </ListGroupItem>
		        )}
		      </ListGroup>
		    );
		  }
		}

As you can see, all that is actually done is a copy-and-paste of the current `render` method of the `ChannelSearch` component class.

Since you'd like to actually use the new component as a part of the `ChannelSearch` component, you need to modify the `render` method of a `ChannelSearch` component class.

There is a problem, though. You already know that your component will be built by combining two smaller components. But you can only return _one_ React element (a.k.a. JSX literal) as a result of the `render` method. So... what now?

You can wrap your two components into a generic `<div />`. It can be done like this:

{lang="javascript"}
    render() {
      return (<div>
                <Component1 ... />
                <Component2 ... />
              </div>);
    }

In our example it can be also done this way. But since Bootstrap defines a grid system which allows your UI to be responsive by default, the components for specifying grid will be used. They are called `Grid` and `Row`. You of course need to import it.

To do so, your `import` statement must be changed from:

{lang="javascript"}
		import { ListGroup, ListGroupItem } from 'react-bootstrap';

To:

{lang="javascript"}
		import { ListGroup, ListGroupItem, Grid, Row } from 'react-bootstrap';

As you can see, the pattern is rather straightforward. **You declare what components you need by creating a list of them in a  curly brackets**. Under the hood it uses the ES6 feature called _destructuring_. It allows you to _pick_ values by keys from the objects and assign them to variables named the same as keys automatically.

Since you got everything you need to go further, next step would be modifying `ChannelSearch` `render` method to use newly created `Channels` component. You can modify `ChannelSearch` component class to look like this:

{lang="javascript"}
		class ChannelSearch extends React.Component {
		  render() {
		    let { channels } = this.props;

		    return (
		      <Grid fluid={true}>
		        <Row>
		          <Channels channels={channels} />
		        </Row>
		      </Grid>
		    );
		  }
		}

This creates your list by using `Channels` component, placing it in a responsive grid. That means it'll display correctly even on  mobile browsers.

What is lacking in this example is an input for filtering your channel list. Let's add it. For now it's doing nothing - you'll add necessary behaviour later.

Of course you need to import `Input` from the `react-bootstrap`. I bet you know already how you can do it!

Psst... here's a solution:

{lang="javascript"}
		import { ListGroup, ListGroupItem, Grid, Row, Input } from 'react-bootstrap';

Now, modify the `ChannelSearch` component class:

{lang="javascript"}
		class ChannelSearch extends React.Component {
		  render() {
		    let { channels } = this.props;

		    return (
		      <Grid fluid={true}>
		        <Row>
		          <Input type="text" 
										 placeholder="Search channels…"
										 bsSize="large" />
		          <Channels channels={channels} />
		        </Row>
		      </Grid>
		    );
		  }
		}

For now you got a list of channels and an input. It's doing nothing for now. To make it do something, you need to introduce state - a `searchQuery` variable which is by default an empty string - `''`.

To define the default state, a constructor of the component class will be used. So now your component class will look like this:

{lang="javascript"}
		class ChannelSearch extends React.Component {
      constructor(props) {
        super(props);
        this.state = { searchQuery: '' };
      }

		  render() {
		    let { channels } = this.props,
						{ searchQuery } = this.state;

		    return (
		      <Grid fluid={true}>
		        <Row>
		          <Input type="text" 
										 placeholder="Search channels…"
										 bsSize="large"
										 value={searchQuery} />
		          <Channels channels={channels} />
		        </Row>
		      </Grid>
		    );
		  }
		}

Notice the `super(props)` expression on the first line of your constructor. ECMAScript 6 (or ECMAScript 2015) demands it to be the first expression in a constructor if you want to call the parent class constructor. And in React you want to do it always.

The next line specifies how a default state will look like. You can use properties here - you got them in a `props` variable passed to the constructor. Here you don't need it.

What also changed is that now the input is _bound_ with the `searchQuery` state variable. It changes the behaviour - if you open your browser now and start typing to this input, nothing will happen. That is because now this input is a _controlled input_. When you provide a `value` property to an `<input>` in React which is not a `null` or `undefined`, this input will change its contents only when the `value` property changes. React-Bootstrap's `Input` mimics this behaviour, too.

To change the input contents you need to provide `onChange` event handler. It can be done by passing a function to the `onChange` property to the `Input`.

Let's make an empty event handler and bind it to your `Input`:

{lang="javascript"}
		class ChannelSearch extends React.Component {
		  constructor(props) {
		    super(props);

		    this.state = { searchQuery: '' };
		    this.changeSearchQuery = this.changeSearchQuery.bind(this);
		  }

		  changeSearchQuery(ev) {

		  }

		  render() {
		    let { channels } = this.props,
						{ searchQuery } = this.state;

		    return (
		      <Grid fluid={true}>
		        <Row>
		          <Input type="text"
		                 placeholder="Search channels…"
		                 bsSize="large"
    			             value={searchQuery}
		                 onChange={this.changeSearchQuery} />
		          <Channels channels={channels} />
		        </Row>
		      </Grid>
		    );
		  }
		}

This looks rather straightforward, isn't it? You created an empty method called `changeSearchQuery` which takes an _event_ as an argument. Then you passed it as an `onChange` property of your `Input`.

But wait! What happened to your constructor?

When you use React with ECMAScript 6 (a.k.a ECMAScript 2015) classes, methods you define are _not_ automatically bound to the context of your component. That means, `this` is not pointing to your component - so you can't use `setState`, access `state` and so on.

To fix it, the `bind` function from the `Function.prototype` is used. What it does is taking a context (and optionally, arguments) and returning a function that is the same as the caller function, but with context set to what you passed as an argument.

You can read more about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

Since in your constructor method `this` points to the component, when you bind the method defined with `this` of the constructor's context, you'll be able to use `state`, `setState` and all required things to allow React to re-render itself.

OK, but how to change the value of an input now?

As said before, your new handler will get an event as an argument every time you change the input. This event contains the new state of your input. It is stored in a `target.value` field of such event.

Since you bound your `Input` to the `searchQuery` state variable, all you need to do in this event handler is to call `setState` to update `searchQuery`. To do so, you can write the body of the `changeSearchQuery` method like this:

{lang="javascript"}
    changeSearchQuery(ev) {
      this.setState({ searchQuery: ev.target.value });
    }

Now go to your browser and test it. You'll see that you are able to change the input contents again!

What you have now is an input with an easily accessible value (you can always get `this.state.searchQuery` if you want to know what is being searched) and a list of channels. What needs to be done now is to filter channels list by using data from the search input.

To do so, another method will be introduced. **Just remember about binding it in a constructor!**

{lang="javascript"}
    constructor(props) {
      super(props);

      this.state = { searchQuery: '' };
      this.changeSearchQuery = this.changeSearchQuery.bind(this);
      this.filteredChannels  = this.filteredChannels.bind(this);
    }

Say hello to `filteredChannels` method!

{lang="javascript"}
    filteredChannels() {
      let { channels }    = this.props,
          { searchQuery } = this.state;

      return channels.filter(channel => {
        return channel.indexOf(searchQuery) === 0;
      });
    }

To implement this logic, two methods from the standard library are used. One is `filter` - if called on an array, it takes each element from the array and calls a function passed as an argument. This function gets an element, an index and the list on which `filter` is called. If this function evaluates to `false` for a given (element, index, list) arguments, this element is omitted from the resulting array.

So the result of `filter(fun)` are all elements for which `fun(element, elementIndex, list)` returns a truthy value.

`indexOf`, on the other hand is a function which is used to search for a substring in a string. It returns an index of the first occurrence of the string passed as an argument. So `"foo".indexOf('f')` will return 0, and `"foo".indexOf('o')` will return 1.

If there is no occurrence of the passed string in a string on which `indexOf` is called, `-1` is returned.

You can read more about these functions in the docs: [indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) and [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

So what this function does is taking a list of channel names and returning only those that starts with a `this.state.searchQuery`.

OK, you got the method defined but it is not used yet. To use it you need to modify your `render` method. The modification is really straightforward. Let's take a look at the `let` statements at the top of the `render` method:

{lang="javascript"}
    let { channels } = this.props,
				{ searchQuery } = this.state;

If you change it to:

{lang="javascript"}
    let channels = this.filteredChannels(),
				{ searchQuery } = this.state;

That's it. Your channel list is now filtered by the search query!

## Bonus

Since you achieved the minimal scope needed to mark this example as "done", there are few steps that are nice to be done.

You can abstract away the `Input` like this in the same way as you abstracted channel list by introducing `Channels` component. It will allow you to change API to be more friendly to test, since `changeSearchQuery` will take a new search query as an argument. Such component can be also reused in the other part of your project.

To do so, you need to create a component which takes its value _and_ function to change it as a property. In this case, I named such properties `searchQuery` and `onSearchQueryChanged`. Then you provide a custom, private event handler for such component and call `onSearchQueryChanged` inside it (not `setState` as it was done before).

Here is the example implementation of such component:

{lang="javascript"}
		class ChannelSearchInput extends React.Component {
		  constructor(props) {
		    super(props);
		    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
		  }

		  handleSearchQueryChange(ev) {
		    let { onSearchQueryChanged } = this.props;
		    onSearchQueryChanged(ev.target.value)
		  }

		  render() {
		    let { searchQuery } = this.props;

		    return (
		      <Input type="text"
		         placeholder="Search channels…"
		         bsSize="large"
		         value={searchQuery}
		         onChange={this.handleSearchQueryChange} />
		    );
		  }
		}

If you have a component like this, you can change your `changeSearchQuery` method to use the new `searchQuery` as an argument:

{lang="javascript"}
		changeSearchQuery(searchQuery) {
    		this.setState({ searchQuery });
  	}

You can be unfamiliar with this `{ searchQuery }` syntax. It is a new handy syntax for saying `{ searchQuery: searchQuery }` in ECMAScript 2015.

To finish this step, you need to modify the `render` method of `ChannelSearch` like this:

{lang="javascript"}
  		render() {
		    let { searchQuery } = this.state,
		        channels = this.filteredChannels();

		    return (
		      <Grid fluid={true}>
		        <Row>
		          <ChannelSearchInput 
								searchQuery={searchQuery}            
								onSearchQueryChanged={this.changeSearchQuery} />
	            <Channels channels={channels} />
		        </Row>
    			  </Grid>
		    );
		  }

So basically it is just a replacement of the old `<Input>` you had there before with a newly created component.

The next bonus thing that's neat to have is some kind of information when search query found nothing. It can be done by introducing yet another component. As has been said before working with React is all about creating components to compose your UI with them.

To get a nice looking widget, a `Well` component from React-Bootstrap will be used.

First of all, import it:

{lang="javascript"}
		import { ListGroup, ListGroupItem,
    			     Grid, Row, Input, Well } from 'react-bootstrap';

And then, provide a very simple component which will display an info:

{lang="javascript"}
		class NoValidChannels extends React.Component {
		  render() {
		    let { searchQuery } = this.props;

		    return (<Well>There are no channels matching
		                  your query <strong>"{searchQuery}"</strong>.
		            </Well>);
		  }
		}

As you can see, there is `searchQuery` passed to it. It is used to construct the message when there are no channels to be displayed.

You don't use your `NoValidChannels` component yet. It must be somehow integrated with the `ChannelSearch` component class `render` method.

JSX does not allow you to use `if` statements. What can be used, though, is a _ternary operator_. It is a shortcut syntax for `if` statements and it looks like this:

{lang="javascript"}
		condition ? <if true> : <if false>

What you want to do is to check whether `channels.length` is 0. If it is, render your new `NoValidChannels` component. If it is not, render the `Channels` list.

That's how your `render` method of `ChannelSearch` can look like:

{lang="javascript"}
  	render() {
    		let { searchQuery } = this.state,
      		  channels = this.filteredChannels();

	    return (
	      <Grid fluid={true}>
	        <Row>
	          <ChannelSearchInput 
							searchQuery={searchQuery}
              onSearchQueryChanged={this.changeSearchQuery} />
          		{channels.length === 0 ?
            		<NoValidChannels searchQuery={searchQuery} /> :
	            <Channels channels={channels} />}
	        </Row>
  	    </Grid>
	    );
	  }

As you can see, the ternary operator is used to check channels length and render the component based on the result of such check.

This addition finally finish this example. You got a nice looking list with dynamic searching and filtering!

## What's next?

You can provide more and more features to filtered list done this way. In Slack there are keyboard shortcuts and general keyboard-based flow of using such filtered list of channels. It can be a great exercise to provide such integration!

You can also mix data like Slack does. In this example only channels are used. You can add chat users and try to filter both data sources in a one list.

## Summary

Filtering data sets with React is a very simple task compared to jQuery-based solutions. You don't need to imperatively define logic behind hiding or showing your user interface elements. All you need to do is provide a filtering method which operates _on your data_ and transform your data set into React elements. Then, React will handle state updates for you.
