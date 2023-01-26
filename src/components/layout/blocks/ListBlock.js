import parseHtml from "../../../lib/parser";
import { Container, Row, Col } from "react-bootstrap";
export default function ListBlock(attributes) {
  const content = attributes.attributes;
  return (
    <div className="html-block">
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} md={8}>
            {parseHtml(content)}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
