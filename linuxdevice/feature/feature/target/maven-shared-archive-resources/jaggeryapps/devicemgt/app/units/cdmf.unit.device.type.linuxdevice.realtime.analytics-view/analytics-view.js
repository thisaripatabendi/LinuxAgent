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
function onRequest(context) {
    var log = new Log("stats.js");
    var carbonServer = require("carbon").server;
    var device = context.unit.params.device;
    var devicemgtProps = require("/app/modules/conf-reader/main.js")["conf"];
    var constants = require("/app/modules/constants.js");
    var websocketEndpoint = devicemgtProps["wssURL"].replace("https", "wss");
    var jwtService = carbonServer.osgiService(
        'org.wso2.carbon.identity.jwt.client.extension.service.JWTClientManagerService');
    var jwtClient = jwtService.getJWTClient();
    var encodedClientKeys = session.get(constants["ENCODED_TENANT_BASED_WEB_SOCKET_CLIENT_CREDENTIALS"]);
    var token = "";
    if (encodedClientKeys) {
        var tokenUtil = require("/app/modules/oauth/token-handler-utils.js")["utils"];
        var resp = tokenUtil.decode(encodedClientKeys).split(":");
        var tokenPair = jwtClient.getAccessToken(resp[0], resp[1], context.user.username,"default", {});
        if (tokenPair) {
            token = tokenPair.accessToken;
        }
        var websocketToken= {'name':'websocket-token','value': token, 'path':'/', "maxAge":18000};
        response.addCookie(websocketToken);
    }
    var websocketEndpointForStream1 = websocketEndpoint + "/secured-websocket/iot.per.device.stream.laptop.batterylevel/1.0.0?deviceId=" + device.deviceIdentifier + "&deviceType=laptop"+"&websocketToken=" + token;
    var websocketEndpointForStream2 = websocketEndpoint + "/secured-websocket/iot.per.device.stream.laptop.batterystatus/1.0.0?deviceId=" + device.deviceIdentifier + "&deviceType=laptop"+"&websocketToken=" + token;
    var websocketEndpointForStream3 = websocketEndpoint + "/secured-websocket/iot.per.device.stream.laptop.cpuusage/1.0.0?deviceId=" + device.deviceIdentifier+ "&deviceType=laptop" + "&websocketToken=" + token;
    var websocketEndpointForStream4 = websocketEndpoint + "/secured-websocket/iot.per.device.stream.laptop.memoryspace/1.0.0?deviceId=" + device.deviceIdentifier+"&deviceType=laptop" + "&websocketToken=" + token;
    var websocketEndpointForStream5 = websocketEndpoint + "/secured-websocket/iot.per.device.stream.laptop.diskspace/1.0.0?deviceId=" + device.deviceIdentifier+"&deviceType=laptop" + "&websocketToken=" + token;
    var websocketEndpointForStream6 = websocketEndpoint + "/secured-websocket/iot.per.device.stream.laptop.loadaverage/1.0.0?deviceId=" + device.deviceIdentifier+"&deviceType=laptop" + "&websocketToken=" + token;
    return {
        "device": device,
        "websocketEndpointForStream1": websocketEndpointForStream1,
        "websocketEndpointForStream2": websocketEndpointForStream2,
        "websocketEndpointForStream3": websocketEndpointForStream3,
        "websocketEndpointForStream4": websocketEndpointForStream4,
        "websocketEndpointForStream5": websocketEndpointForStream5,
        "websocketEndpointForStream6": websocketEndpointForStream6
    };
}