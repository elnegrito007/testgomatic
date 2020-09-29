import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialButtonDark2(props) {

    function more(){
        var valor = props.valor;
        var newvalor = parseInt(valor) + 1;
        props.valorUpdate(newvalor);
    }

    return (
    <Container onClick={more} {...props}>
      <Caption>&gt;</Caption>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #212121;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  cursor:pointer;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

const Caption = styled.span`
  font-family: Roboto;
  color: #fff;
  font-size: 14px;
`;

export default MaterialButtonDark2;
