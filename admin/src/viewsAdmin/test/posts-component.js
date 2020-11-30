import React from 'react';
import { fetchPosts } from '../../saga/action';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const PostsComponent = ({ data: { posts }, fetchPosts }) => {
  const onClick = () => {
    fetchPosts()
  }
  return (
    <div className="app-container">
      <div className="posts-container">
        {
          posts.length > 0 &&
          posts.slice(0, 10).map((post, i) => {
            return (
              <div key={i} className="each-post">
                <b>Post#{i.toString()}</b> - {post.title}
              </div>
            )
          })
        }
      </div>
      <div className="posts-button-container">
        <div className="button_cont" align="center">
          <a className="example_a" onClick={onClick} >
            Fetch Posts
            </a>
        </div>
      </div>
    </div>
  )
}

const structuredSelector = createStructuredSelector({
  data: state => state.posts
})

const mapDispatchToProps = { fetchPosts }

export default connect(structuredSelector, mapDispatchToProps)(PostsComponent)
