import React, { Component } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import PedidoForm from './PedidoForm'
class AppHeader extends Component {
  constructor() {
    super();
    this.state = { 
      pedidoWindow: 0,

    
    };
  }

  openAddpedido() {
    var valor
    if(this.state.pedidoWindow){
      valor = 0;
    }else{
      valor =1 ;
    }
    this.setState({ pedidoWindow: valor });
  }
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Pitssas Alpha Panel
          </Typography>
        </Toolbar>
        {!this.state.pedidoWindow ? (
          <Button
            onClick={() => this.openAddpedido()}
            variant="contained"
            color="primary"
            style={{ alignSelf: "stretch", backgroundColor: "#4d4dff" }}
          >
            Adicionar Pedido
          </Button>
        ) : null}
        {this.state.pedidoWindow ? (
          <Button
            onClick={() => this.openAddpedido()}
            variant="contained"
            color="secondary"
            style={{ alignSelf: "stretch", backgroundColor: "#ff5050" }}
          >
            Cancelar
          </Button>
          
        ) : null}
        {this.state.pedidoWindow ? <PedidoForm></PedidoForm>:null}
      </AppBar>
    );
  }
}
export default AppHeader;
