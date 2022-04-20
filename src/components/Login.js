import React from "react";
import { Container, Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";

function Login({ show, onHide, signUp, ...rest }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      {...rest}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      className="login-modal"
      centered
    >
      <div>
        <Container>
          <h2
            style={{
              marginTop: "50px",
              marginLeft: "10px",
              fontWeight: "700",
              fontSize: "31px",
            }}
          >
            Login
          </h2>
          <div style={{ padding: "30px" }}>
            <LoginForm />
            <div className="login-redirect">
              <p>Don't have an account?</p>
              <button
                className="custom-button"
                onClick={() => {
                  onHide();
                  signUp();
                }}
              >
                <h3>Signup</h3>
              </button>
            </div>
          </div>
        </Container>
      </div>
    </Modal>
  );
}

export default Login;
