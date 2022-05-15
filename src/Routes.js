import React from "react";
import { Route, Switch } from "react-router-dom";
import { Row, Container } from "react-bootstrap";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import AdminPage from "./components/AdminPage";

const Routes = () => {
    return (
        <React.Fragment>
            <Container fluid="lg">
                <Row>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/admin" component={AdminPage} />
                    </Switch>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default Routes;
