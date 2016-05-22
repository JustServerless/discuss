import React, { Component } from 'react';
import { Link } from 'react-router';
import TimeAgo from 'react-timeago';
import _ from 'lodash';

const hrStyles = {
  margin: '10px 0px'
};

const timeAgoStyles = {
  fontStyle: 'italic',
  color: '#B1B1B1'
};

const clearStyles = {
  clear: 'both'
};

const gravatarStyles = {
  'height': '30px',
  'display': 'inline-block'
};

const commentLiStyles = {
  border: '1px solid #E1E1E1',
  padding: '10px',
  marginLeft: '50px',
  listStyle: 'none'
};

const commentBodyStyles = {
  margin: '0px'
};

const commentAuthorStyles = {
  fontStyle: 'italic',
  float: 'right',
  color: '#B1B1B1'
};

const deleteCommentStyles = {
  marginLeft: '10px',
  float: 'right',
  border: 0,
  padding: '10px',
  margin: 0
};

const updateCommentStyles = {
  marginLeft: '10px',
  float: 'right',
  border: 0,
  padding: '10px',
  margin: 0
};

export default class Comment extends Component {
  constructor(props) {
    super(props);
    const { comment } = this.props;

    if(comment){
      this.state = { editing: false, id: comment.id, body: comment.body };
    }else{
      this.state = { editing: false, id: '', body: '' }
    }
  }

  onUpdateComment(event) {
    event.preventDefault();

    this.props.onUpdateComment(this.state);

    this.setState({editing: false});
    this.props.comment.body = this.state.body;
  }

  onDeleteComment(event) {
    event.preventDefault();

    this.props.onDeleteComment(this.state);
  }

  render() {
    const { comment, isAuthor } = this.props;
    const { editing, body } = this.state;

    return (
      <li style={commentLiStyles}>
        <p style={commentBodyStyles}>
          {editing ? (
            <textarea value={body} onChange={event => {this.setState({body: event.target.value})}} />
          ):comment.body}
        </p>
        <hr style={hrStyles}/>
        <TimeAgo date={+comment.createdAt} style={timeAgoStyles}/>
        {isAuthor ? (
          editing ? (
            <div>
              <button style={deleteCommentStyles} onClick={() => {this.setState({editing: false, body: comment.body})}}>
                <i className="fa fa-times"></i>
              </button>
              <button style={updateCommentStyles} onClick={this.onUpdateComment.bind(this)}>
                <i className="fa fa-check"></i>
              </button>
            </div>
          ): (
            <div>
              <button style={deleteCommentStyles} onClick={this.onDeleteComment.bind(this)}>
                <i className="fa fa-trash"></i>
              </button>
              <button style={updateCommentStyles} onClick={() => {this.setState({editing: true})}}>
                <i className="fa fa-pencil-square-o"></i>
              </button>
            </div>
          )
        ) : null}
              <span style={commentAuthorStyles}>
                <img style={gravatarStyles}
                     src={comment.author.gravatar}/>
                ● {comment.author.username}
              </span>
        <div style={clearStyles}></div>
      </li>
    )
  }
}