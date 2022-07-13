import "./Styles/App.scss";
import "./Styles/Container.scss";
import { InputStats } from "./Components/InputStats";
import { Calculations } from "./Components/Calculations";
import { Results } from "./Components/Result";
import { Col, Row, Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row className="py-3">
            <Col sm="6" className="column-left">
              <InputStats />
            </Col>
            <Col
              sm="6"
              className="column-right mt-5 mt-md-0 px-3 p-mx-5 d-flex flex-column"
            >
              <Calculations />
              <Results />
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;
