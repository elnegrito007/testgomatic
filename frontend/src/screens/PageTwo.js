import React, {Component, useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import MaterialButtonDark from '../components/MaterialButtonDark';
import MaterialUnderlineTextbox from '../components/MaterialUnderlineTextbox';
import MaterialButtonDark2 from '../components/MaterialButtonDark2';

function PageTwo(props) {
    const [valor, setvalor] = useState('1');
    const [valorTextdb, setvalorTextdb] = useState('');
    const [data, setData] = useState([]);

    function websocket(datos) {
        if ('WebSocket' in window) {
            var ws = new WebSocket('ws://localhost:4000/');
            ws.onopen = function () {
                ws.send(datos);
            };
            ws.onclose = function(event) {
                console.log("WebSocket is closed now");
            };
            ws.onmessage = function (evt) {
                var resul = JSON.parse(evt.data)['data'];
                var Json = JSON.parse(resul);
                setData(d => [...d, Json]);
            };
            window.onbeforeunload = function (event) {
                ws.close();
            };
        } else {
            console.log('WebSocket NOT supported by your Browser');
        }
    }

    useEffect(() => {
        setData([]);
        websocket('{"r":"consult","d":['+valor+']}');
    }, [valor]);

    return (
        <>
            <Titulo>TEST GOMATIC{'\n'}Carlos Javier Ariza Perez</Titulo>
            <TimeRealRow>
                <DataBase>DATA BASE ><a href="/PageOne/">REAL TIME</a></DataBase>
                <MaterialButtonDark
                    valor={valor}
                    valorUpdate={setvalor}
                    style={{
                        height: 36,
                        width: 100,
                        marginLeft: 37,
                        marginTop: 4,
                    }}></MaterialButtonDark>
                <MaterialUnderlineTextbox
                    valor={valor}
                    valorUpdate={setvalor}
                    style={{
                        height: 43,
                        width: 50,
                        marginLeft: 60,
                    }}></MaterialUnderlineTextbox>
                <MaterialButtonDark2
                    valor={valor}
                    valorUpdate={setvalor}
                    style={{
                        height: 36,
                        width: 100,
                        marginLeft: 79,
                        marginTop: 4,
                    }}></MaterialButtonDark2>
            </TimeRealRow>
            <Divtable
                style={{width: 700, margin: 80}}>
                <table>
                    <thead>
                        <tr>
                            <th>Oportunity Number</th>
                            <th>Oportunity Title</th>
                            <th>Agency</th>
                            <th>Posted date</th>
                        </tr>
                    </thead>
                    {
                        data.map((elem) =>
                            (
                                <tr key={elem.opportunity_number}>
                                    <td>
                                        {elem.opportunity_number}
                                    </td>
                                    <td>
                                        {elem.opportunity_tittle}
                                    </td>
                                    <td>
                                        {elem.agency}
                                    </td>
                                    <td>
                                        {elem.posted_date}
                                    </td>
                                </tr>
                            )
                        )
                    }
                </table>
            </Divtable>
            <Divtable
                valorTextdb={valorTextdb}
                valorUpdateRE={setvalorTextdb}
                style={{width: 700, margin: 80}}>
                {' '}
                {valorTextdb}
            </Divtable>
        </>
    );
}

const Divtable = styled.span`
  width: 500px;
`;

const Titulo = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  margin-top: 36px;
  margin-left: 80px;
`;

const DataBase = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  margin-left: 20px;
  margin-top: 13px;
`;

const TimeRealRow = styled.div`
  height: 43px;
  flex-direction: row;
  display: flex;
  margin-top: 4px;
  margin-left: 80px;
  margin-right: 161px;
`;

export default PageTwo;
