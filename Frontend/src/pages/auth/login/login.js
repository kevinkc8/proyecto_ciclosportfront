import React from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { APIHOST as host } from "../../../app.json";
import "./login.css";
import { isNull } from "util";
import Cookies from "universal-cookie";
import { calculaExpiracionSesion } from "../../../components/helper/helper";
import Loading from "../../../components/loading/loading";
import logo from "../login/img/logo.png";

const cookies = new Cookies();

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  iniciarSesion() {
    this.setState({ loading: true });

    axios
      .post(`${host}/auth/login`, {
        username: this.state.usuario,
        password: this.state.pass,
      })
      .then((response) => {
        if (isNull(response.data.body.accessToken)) {
          alert("Usuario y/o contraseña invalidos");
        } else {
          cookies.set("_s", response.data.body.accessToken, {
            path: "/",
            expires: calculaExpiracionSesion(),
          });

          this.props.history.push("/empleados");
        }

        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <Container id="login-container">
        <Loading show={this.state.loading} />

        <Row>
          <Col>
            <Row>
            <img src className="logo1" src={logo} />
              <h2>INICIAR SESION</h2>
            </Row>
            <Row>
              <Col
                sm="12"
                xs="12"
                md={{ span: 4, offset: 4 }}
                lg={{ span: 4, offset: 4 }}
                xl={{ span: 4, offset: 4 }}
              >
                <Form>
                  <Form.Group>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                      onChange={(e) =>
                        this.setState({ usuario: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => this.setState({ pass: e.target.value })}
                    />
                  </Form.Group>
                  <Button
                  id="boton"
                    variant="primary"
                    onClick={() => {
                      this.iniciarSesion();
                    }}
                  >
                    INICIAR SESION
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col
                sm="12"
                xs="12"
                md={{ span: 4, offset: 4 }}
                lg={{ span: 4, offset: 4 }}
                xl={{ span: 4, offset: 4 }}
              >
                <p>O registrate</p>
                <a id="register" href="/register">REGISTRARSE</a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
