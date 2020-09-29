import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialUnderlineTextbox(props) {

    function onchanges(e){
        props.valorUpdate(e.target.value);
    }

    return (
    <Container {...props}>
      <InputStyle placeholder="Number page" maxLength={2} value = {props.valor} onChange = {onchanges}></InputStyle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #D9D5DC;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
`;

const InputStyle = styled.input`
  font-family: Roboto;
  color: #000;
  padding-right: 5px;
  font-size: 16px;
  align-self: stretch;
  flex: 1 1 0%;
  width: 80px;
  line-height: 16px;
  padding-top: 16px;
  padding-bottom: 8px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

export default MaterialUnderlineTextbox;
