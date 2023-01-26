import { isEmpty, isArray } from "lodash";
import Post from "../post";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

const Posts = ({ posts }) => {
  // console.warn('from posts', posts);

  if (isEmpty(posts) && !isArray(posts)) {
    return null;
  }

  return (
    <section className="section section-blog-list">
      <Container>
        {posts.map((post, index) => {
          return (
            <div key={`${post?.node?.id}-${index}` ?? ""}>
              <Post post={post?.node} />
            </div>
          );
        })}
      </Container>
    </section>
  );
};

Posts.propTypes = {
  posts: PropTypes.array,
};

Posts.defaultProps = {
  posts: [],
};

export default Posts;
