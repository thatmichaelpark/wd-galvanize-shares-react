import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

const App = React.createClass({
  getInitialState() {
    return {
      editing: null,
      posts: []
    };
  },

  // Life cycle stuff
  componentWillMount() {
    axios.get('/api/posts')
      .then((res) => {
        this.setState({
          posts: res.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },

  handleTouchTap() {
    const nextEditing = {
      submitter: 'stanleypaddles',
      title: '',
      topic: '',
      url: '',
      votes: Infinity
    };
    const nextPosts = this.state.posts.concat(nextEditing);
    this.setState({ editing: nextEditing, posts: nextPosts });
  },
  handleTitleTouchTap() {
    this.props.router.push('/');
  },
  incrementVotes(post, inc) {
    const nextPosts = this.state.posts.map((element) => {
      if (post !== element) {
        return element;
      }
      const nextPost = Object.assign({}, post, { votes: post.votes + inc });

      return nextPost;
    });
    this.setState({ posts: nextPosts });
  },
  stopEditingPost(post) {
    const nextPosts = this.state.posts.filter((element) => element !== post);

    this.setState({ editing: null, posts: nextPosts });
  },
  updatePost(post, nextPost) {
    axios.post('/api/posts', nextPost)
      .then((res) => {
        const nextPosts = this.state.posts.map((element) => {
          if (post !== element) {
            return element;
          }
          return res.data;
        });

        this.setState({ posts: nextPosts, editing: null });

      })
      .catch((err) => {
        console.error(err);
      });
  },
  render() {
    const styleFlatButton = {
      height: '64px',
      lineHeight: '64px'
    };
    const styleTitle = {
      cursor: 'pointer'
    };
    return <div>
      <AppBar
        onTitleTouchTap={this.handleTitleTouchTap}
        title="Galvanize Shares"
        titleStyle={styleTitle}
      >
        <FlatButton
          label="New Post"
          onTouchTap={this.handleTouchTap}
          style={styleFlatButton}
        />
      </AppBar>

      {React.cloneElement(this.props.children, {
        editing: this.state.editing,
        incrementVotes: this.incrementVotes,
        posts: this.state.posts,
        stopEditingPost: this.stopEditingPost,
        updatePost: this.updatePost
      })}
    </div>;
  }
});

export default withRouter(App);
