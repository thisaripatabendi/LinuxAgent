/*
 * Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var palette = new Rickshaw.Color.Palette({scheme: "classic9"});
var sensorType1 = "batterylevel";
var sensorType2 = "batterystatus";
var sensorType3 = "cpuusage";
var sensorType4 = "memoryspace";
var sensorType5 = "diskspace";
var sensorType6 = "loadaverage";

var sensorType1Graph;
var sensorType2Graph;
var sensorType3Graph;
var sensorType4Graph;
var sensorType5Graph;
var sensorType6Graph;

function drawGraph_linuxdevice(from, to)
{
    var devices = $("#details").data("devices");
    var tzOffset = new Date().getTimezoneOffset() * 60;
    var chartWrapperElmId = "#chartDivSensorType1";
    var graphWidth = $(chartWrapperElmId).width() - 50;
    var graphConfigSensorType1 = getGraphConfig("chartSensorType1");
    var graphConfigSensorType2 = getGraphConfig("chartSensorType2");
    var graphConfigSensorType3 = getGraphConfig("chartSensorType3");
    var graphConfigSensorType4 = getGraphConfig("chartSensorType4");
    var graphConfigSensorType5 = getGraphConfig("chartSensorType5");
    var graphConfigSensorType6 = getGraphConfig("chartSensorType6");

    function getGraphConfig(placeHolder) {
        return {
            element: document.getElementById(placeHolder),
            width: graphWidth,
            height: 400,
            strokeWidth: 2,
            renderer: 'line',
            interpolation: "linear",
            unstack: true,
            stack: false,
            xScale: d3.time.scale(),
            padding: {top: 0.2, left: 0.02, right: 0.02, bottom: 0.2},
            series: []
        }
    };

    if (devices) {
        for (var i = 0; i < devices.length; i++) {
            graphConfigSensorType1['series'].push(
                {
                    'color': palette.color(),
                    'data': [{
                        x: parseInt(new Date().getTime() / 1000),
                        y: 0
                    }],
                    'name': devices[i].name
                });

            graphConfigSensorType2['series'].push(
                {
                    'color': palette.color(),
                    'data': [{
                        x: parseInt(new Date().getTime() / 1000),
                        y: 0
                    }],
                    'name': devices[i].name
                });
            graphConfigSensorType3['series'].push(
                {
                    'color': palette.color(),
                    'data': [{
                        x: parseInt(new Date().getTime() / 1000),
                        y: 0
                    }],
                    'name': devices[i].name
                });
            graphConfigSensorType4['series'].push(
                {
                    'color': palette.color(),
                    'data': [{
                        x: parseInt(new Date().getTime() / 1000),
                        y: 0
                    }],
                    'name': devices[i].name
                });
            graphConfigSensorType5['series'].push(
                {
                    'color': palette.color(),
                    'data': [{
                        x: parseInt(new Date().getTime() / 1000),
                        y: 0
                    }],
                    'name': devices[i].name
                });
            graphConfigSensorType6['series'].push(
                {
                    'color': palette.color(),
                    'data': [{
                        x: parseInt(new Date().getTime() / 1000),
                        y: 0
                    }],
                    'name': devices[i].name
                });
        }
    } else {
        graphConfigSensorType1['series'].push(
            {
                'color': palette.color(),
                'data': [{
                    x: parseInt(new Date().getTime() / 1000),
                    y: 0
                }],
                'name': sensorType1
            });
        graphConfigSensorType2['series'].push(
            {
                'color': palette.color(),
                'data': [{
                    x: parseInt(new Date().getTime() / 1000),
                    y: 0
                }],
                'name': sensorType2
            });
        graphConfigSensorType3['series'].push(
            {
                'color': palette.color(),
                'data': [{
                    x: parseInt(new Date().getTime() / 1000),
                    y: 0
                }],
                'name': sensorType3
            });
        graphConfigSensorType4['series'].push(
            {
                'color': palette.color(),
                'data': [{
                    x: parseInt(new Date().getTime() / 1000),
                    y: 0
                }],
                'name': sensorType4
            });
        graphConfigSensorType5['series'].push(
            {
                'color': palette.color(),
                'data': [{
                    x: parseInt(new Date().getTime() / 1000),
                    y: 0
                }],
                'name': sensorType5
            });
        graphConfigSensorType6['series'].push(
            {
                'color': palette.color(),
                'data': [{
                    x: parseInt(new Date().getTime() / 1000),
                    y: 0
                }],
                'name': sensorType6
            });
    }

    sensorType1Graph = new Rickshaw.Graph(graphConfigSensorType1);
    sensorType2Graph = new Rickshaw.Graph(graphConfigSensorType2);
    sensorType3Graph = new Rickshaw.Graph(graphConfigSensorType3);
    sensorType4Graph = new Rickshaw.Graph(graphConfigSensorType4);
    sensorType5Graph = new Rickshaw.Graph(graphConfigSensorType5);
    sensorType6Graph = new Rickshaw.Graph(graphConfigSensorType6);

    drawGraph(sensorType1Graph, "sensorType1yAxis", "sensorType1Slider", "sensorType1Legend", sensorType1
        , graphConfigSensorType1, "chartSensorType1");
    drawGraph(sensorType2Graph, "sensorType2yAxis", "sensorType2Slider", "sensorType2Legend", sensorType2
        , graphConfigSensorType2, "chartSensorType2");
    drawGraph(sensorType3Graph, "sensorType3yAxis", "sensorType3Slider", "sensorType3Legend", sensorType3
        , graphConfigSensorType3, "chartSensorType3");
    drawGraph(sensorType4Graph, "sensorType4yAxis", "sensorType4Slider", "sensorType4Legend", sensorType4
        , graphConfigSensorType4, "chartSensorType4");
    drawGraph(sensorType5Graph, "sensorType5yAxis", "sensorType5Slider", "sensorType5Legend", sensorType5
        , graphConfigSensorType5, "chartSensorType5");
    drawGraph(sensorType6Graph, "sensorType6yAxis", "sensorType6Slider", "sensorType6Legend", sensorType6
        , graphConfigSensorType6, "chartSensorType6");


    function drawGraph(graph, yAxis, slider, legend, sensorType, graphConfig, chart) {
        graph.render();
        var xAxis = new Rickshaw.Graph.Axis.Time({
            graph: graph
        });
        xAxis.render();
        var yAxis = new Rickshaw.Graph.Axis.Y({
            graph: graph,
            orientation: 'left',
            element: document.getElementById(yAxis),
            width: 40,
            height: 410
        });
        yAxis.render();
        var slider = new Rickshaw.Graph.RangeSlider.Preview({
            graph: graph,
            element: document.getElementById(slider)
        });
        var legend = new Rickshaw.Graph.Legend({
            graph: graph,
            element: document.getElementById(legend)
        });
        var hoverDetail = new Rickshaw.Graph.HoverDetail({
            graph: graph,
            formatter: function (series, x, y) {
                var date = '<span class="date">' +
                    moment.unix(x + tzOffset).format('Do MMM YYYY h:mm:ss a') + '</span>';
                var swatch = '<span class="detail_swatch" style="background-color: ' +
                    series.color + '"></span>';
                return swatch + series.name + ": " + parseInt(y) + '<br>' + date;
            }
        });
        var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
            graph: graph,
            legend: legend
        });
        var order = new Rickshaw.Graph.Behavior.Series.Order({
            graph: graph,
            legend: legend
        });
        var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
            graph: graph,
            legend: legend
        });
        var deviceIndex = 0;
        if (devices) {
            getData(chat, deviceIndex, sensorType);
        } else {
            var backendApiUrl = $("#" + chart + "").data("backend-api-url") + "?from=" + from + "&to=" + to
                + "&sensorType=" + sensorType;
            var successCallback = function (data) {
                if (data) {
                    drawLineGraph(JSON.parse(data), sensorType, deviceIndex, graphConfig, graph);
                }
            };
            invokerUtil.get(backendApiUrl, successCallback, function (message) {
                console.log(message);
            });
        }
    }

    function getData(placeHolder, deviceIndex, sensorType, graphConfig, graph) {
        if (deviceIndex >= devices.length) {
            return;
        }
        var backendApiUrl = $("#" + placeHolder + "").data("backend-api-url") + devices[deviceIndex].deviceIdentifier
            + "?from=" + from + "&to=" + to + "&sensorType=" + sensorType;
        var successCallback = function (data) {
            if (data) {
                drawLineGraph(JSON.parse(data), sensorType, deviceIndex, graphConfig, graph);
            }
            deviceIndex++;
            getData(placeHolder, deviceIndex, sensorType);
        };
        invokerUtil.get(backendApiUrl, successCallback, function (message) {
            console.log(message);
            deviceIndex++;
            getData(placeHolder, deviceIndex, sensorType);
        });
    }

    function drawLineGraph(data, sensorType, deviceIndex, graphConfig, graph) {
        var previousPointValue = 0;
        var currentPointValue = 0;
        if (data.length === 0 || data.length === undefined) {
            return;
        }
        var chartData = [];
        if(sensorType == sensorType2){
            for (var i = 0; i < data.length; i++) {
                currentPointValue = data[i].values[sensorType];
                chartData.push(
                    {
                        x: parseInt(data[i].values.meta_time) - tzOffset,
                        y: parseInt(previousPointValue)
                    }
                );
                chartData.push(
                    {
                        x: parseInt(data[i].values.meta_time) - tzOffset,
                        y: parseInt(currentPointValue)
                    }
                );
                previousPointValue = currentPointValue;
            }
        }else{
            for (var i = 0; i < data.length; i++) {
                chartData.push(
                    {
                        x: parseInt(data[i].values.meta_time) - tzOffset,
                        y: parseInt(data[i].values[sensorType])
                    }
                );
            }
        }

        graphConfig.series[deviceIndex].data = chartData;
        graph.update();
    }
}
