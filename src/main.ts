import type { Plugin } from "@crowbartools/firebot-types";

import effects from "./effects";
import obsRemote from "./obs-remote";
import obsLogo from "./obs-logo-scalable.svg";
import uiExtension from "./ui";

type Params = {
  obsHost: string;
  obsPort: number;
  obsPassword: string;
}

const plugin: Plugin<Params> = {
  manifest: {
    name: "OBS Plus",
    version: PLUGIN_VERSION,
    author: "DennisOnTheInternet",
    description: "Firebot plugin which adds extra functionality for OBS like multi-canvas support (OBS 32.1.0 or higher required)",
    tags: [
      "obs",
      "vertical",
      "canvas"
    ],
    repo: "https://github.com/dennisrijsdijk/firebot-plugin-obs-plus",
    minimumFirebotVersion: {
      major: 5,
      minor: 67,
      patch: 0
    },
    icon: {
      type: "custom",
      url: `data:image/svg+xml;base64,${obsLogo}`
    }
  },
  parametersSchema: [
    {
      name: "obsHost",
      type: "string",
      title: "OBS Host",
      description: "Enter the hostname or IP Address of your OBS Instance",
      default: "localhost"
    },
    {
      name: "obsPort",
      type: "number",
      title: "OBS Port",
      description: "Enter the port for your OBS Websocket instance",
      default: 4455
    },
    {
      name: "obsPassword",
      type: "password",
      title: "OBS Password",
      description: "Enter the password for your OBS Instance",
      default: ""
    }
  ],
  registers: {
    effects,
    frontendListeners: [
      {
        eventName: "dennisontheinternet:obs-plus:getCanvasedSourceData",
        useAsync: true,
        handler: () => obsRemote.getCanvasedSourceData()
      },
      {
        eventName: "dennisontheinternet:obs-plus:getColorSources",
        useAsync: true,
        handler: () => obsRemote.getAllColorSources()
      },
      {
        eventName: "dennisontheinternet:obs-plus:getSourcesWithFilters",
        useAsync: true,
        handler: () => obsRemote.getSourcesWithFilters()
      },
      {
        eventName: "dennisontheinternet:obs-plus:getTextSources",
        useAsync: true,
        handler: () => obsRemote.getAllTextSources()
      },
      {
        eventName: "dennisontheinternet:obs-plus:obsSupportsCanvases",
        useAsync: true,
        handler: () => obsRemote.getObsSupportsCanvases()
      }
    ],
    uiExtensions: [ uiExtension ]
  },
  onLoad({ parameters }) {
    obsRemote.connect(parameters.obsHost, parameters.obsPort, parameters.obsPassword);
  },
  onParameterUpdate({ parameters }) {
    obsRemote.connect(parameters.obsHost, parameters.obsPort, parameters.obsPassword, true);
  },
  async onUnload() {
    obsRemote.abort = true;
    await obsRemote.disconnect();
  }
}

export default plugin;
