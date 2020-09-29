import React, {Component, useEffect, useState} from 'react';
import styled, {css} from 'styled-components';

function PageOne(props) {
    const [valorTextdb, setvalorTextdb] = useState('');
    const [data, setData] = useState([]);

    function consultReal(indice) {
        console.log('consulto a servivio en plena extracción ' + indice);
        websocket('{"r":"request","d":[' + indice + ']}');
    }

    function extractTimeReal(indice) {
        if (indice === 1) {
            consultReal(indice);
            extractTimeReal(indice + 1);
        } else if (indice !== 0 && indice > 1) {
            var timeReal = setTimeout(function () {
                clearTimeout(timeReal);
                consultReal(indice + 1);
                extractTimeReal(indice + 1);
            }, 10000 * 25);
        }
    }

    function websocket(datos) {
        if ('WebSocket' in window) {
            var ws = new WebSocket('ws://localhost:4000/');
            ws.onopen = function () {
                ws.send(datos);
            };
            ws.onmessage = function (evt) {
                var resul = evt.data.replaceAll('\\"', '');
                var resul2 = resul.replaceAll(/\\/g, '');
                var Json = JSON.parse(resul2);
                setData(d => [...d, Json]);
            };
            ws.onclose = function(event) {
                console.log("WebSocket is closed now.");
            };
            window.onbeforeunload = function (event) {
                ws.close();
            };
        } else {
            console.log('WebSocket NOT supported by your Browser');
        }
    }

    useEffect(() => {
        extractTimeReal(1);
    }, []);

    return (
        <>
            <Titulo>TEST GOMATIC{'\n'}Carlos Javier Ariza Perez</Titulo>
            <TimeRealRow>
                <TimeReal>TIME REAL ><a href="/PageTwo/">DATA BASE</a></TimeReal>
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

const TimeReal = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
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

export default PageOne;
