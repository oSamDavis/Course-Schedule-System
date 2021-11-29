import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import Contact from "./pages/Contact";
import Index from "./pages/Index";
import GenerateReport from "./pages/GenerateReport";
import UpdateCatalog from "./pages/UpdateCatalog";
import ViewReport from "./pages/ViewReport";
import ExportReport from "./pages/ExportReport";

function App() {
  return (
    <Container>
      <Router>
        <Route path="/" exact component={Index} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/updateCatalog" exact component={UpdateCatalog} />
        <Route path="/generateReport" exact component={GenerateReport} />
        <Route path="/viewReport" exact component={ViewReport} />
        <Route path="/exportReport" exact component={ExportReport} />
      </Router>
    </Container>
  );
}

export default App;
