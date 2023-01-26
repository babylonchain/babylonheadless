import parseHtml from "../../../lib/parser";
import { Container, Row, Col } from "react-bootstrap";
import { GoQuote } from "react-icons/go";

export default function QuoteBlock(attributes) {
  const content = attributes.attributes;
  return (
    <div className="quote-block">
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} md={8}>
            <GoQuote className="quote-icon" />
            {parseHtml(content)}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
