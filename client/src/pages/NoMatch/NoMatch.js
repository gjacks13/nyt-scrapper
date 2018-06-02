import React from "react";
import { Container, Row, Col } from "../../components/Grid";

const NoMatch = () => {
  return (
    <Container>
      <Row>
        <Col size="lg-12">
          <h1>404 Page Not Found</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
          </h1>
        </Col>
      </Row>
    </Container>
  );
};

export default NoMatch;