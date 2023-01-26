import { isEmpty, isArray } from "lodash";
import Post from "../post";
import PropTypes from "prop-types";

const Posts = ({ posts }) => {
  // console.warn('from posts', posts);

  if (isEmpty(posts) && !isArray(posts)) {
    return null;
  }

  return (
    <div className="career-list border-bottom border-secondary">
      {posts.map((post, index) => {
        return (
          <Post key={`${post?.node?.id}-${index}` ?? ""} post={post?.node} />
        );
      })}
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.array,
};

Posts.defaultProps = {
  posts: [],
};

export default Posts;
