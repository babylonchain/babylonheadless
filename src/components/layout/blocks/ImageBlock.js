import parseHtml from "../../../lib/parser";
import { Container, Row, Col } from "react-bootstrap";
export default function ImageBlock({ attributes, dynamicContent }) {
  return (
    <div className="image-block">
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} md={8}>
            {parseHtml(dynamicContent)}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
