import { isEmpty, isArray } from "lodash";
import Blog from "../post/indexBlog";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";

const Blogs = ({ posts }) => {
  // console.warn('from posts', posts);

  if (isEmpty(posts) && !isArray(posts)) {
    return null;
  }

  return (
    <section className="section section-blog-list">
      <Row>
        {posts.map((post, index) => {
          return (
            <Col md={6} xl={4} key={`${post?.node?.id}-${index}` ?? ""}>
              <Blog post={post?.node} />
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

Blogs.propTypes = {
  posts: PropTypes.array,
};

Blogs.defaultProps = {
  posts: [],
};

export default Blogs;
