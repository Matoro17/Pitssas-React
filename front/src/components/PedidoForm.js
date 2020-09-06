import React, { Component } from "react";
import url from "../env.json";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

class PedidoForm extends Component {
  constructor() {
    super();
    this.state = { findClient: 0 };
  }

  loadClientesByIdentificador(iden) {
    if (iden.target.value.length < 8) {
      this.setState({ findClient: 0 });
      return;
    }
    this.setState({ isLoading: true });
    fetch(url.url + "/clientes/identificador/" + iden.target.value)
      .then((response) => response.json())
      .then((data) => {
        if (data[0] === undefined) {
          this.setState({ findClient: 0 });
        } else {
          this.setState({ atualCliente: data[0] });
          this.setState({ findClient: 1 });
          console.table(data[0]);
        }
      });
  }

  render() {
    var pagamento;
    var er = this.state.findClient;
    if (!this.state.findClient) {
      er = "error";
    } else {
      er = null;
    }

    return (
      <div style={{ backgroundColor: "white" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              error={er === "error" ? true : false}
              helperText={
                er === "error"
                  ? "Usuário não encontrado ou numero muito pequeno!"
                  : " "
              }
              inputMode="tel"
              variant="filled"
              placeholder="Identificador de Usuário"
              onChange={(e) => this.loadClientesByIdentificador(e)}
            ></TextField>
          </Grid>
          {this.state.findClient ? (
            <Grid item xs={6}>
              <p style={{ color: "black" }}>
                Cliente: {this.state.atualCliente.nome}
                Endereço: {this.state.atualCliente.bairro}, Rua{" "}
                {this.state.atualCliente.rua}, Numero{" "}
                {this.state.atualCliente.numero}
                Complemento: {this.state.atualCliente.complemento}
                Referência: {this.state.atualCliente.referencia}
              </p>
            </Grid>
          ) : null}
        </Grid>
        {this.state.findClient ? (
          <Grid>
            <form>
              <Grid item xs={12}>
                <TextField fullWidth label="Pedido" />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Subtotal" />
                <TextField label="Entrega" />
                <TextField label="Total" />
                <Select
                  native
                  value={pagamento}
                  inputProps={{ name: "Pagamento" }}
                >
                  <option value={"Cartão"}>Cartão</option>
                  <option value={"Dinheiro"}>Dinheiro</option>
                  <option value={"Bitcoin"}>Bitcoin</option>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <div container-fluid>
                  <Button
                    //onClick={() => this.openAddpedido()}
                    variant="contained"
                    color="secondary"
                    style={{ alignSelf: "stretch", backgroundColor: "#228B22" }}
                  >
                    Enviar
                  </Button>
                </div>
              </Grid>
            </form>
          </Grid>
        ) : null}
      </div>
    );
  }
}

export default PedidoForm;
