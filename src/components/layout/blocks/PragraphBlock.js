import parseHtml from "../../../lib/parser";
import { Container, Row, Col } from "react-bootstrap";
export default function ParagraphBlock(attributes) {
  const attributesData = JSON.parse(attributes.attributes);
  // console.warn(attributesData);
  const content = attributesData.content;
  const align = attributesData.align;

  function getClassName(align) {
    if (align === "center" || align === "right") {
      return `text-${align}`;
    }

    return "text-left";
  }
  return (
    <div className="paragrahp-block">
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} md={8}>
            <p className={getClassName(align)}>{parseHtml(content)}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
