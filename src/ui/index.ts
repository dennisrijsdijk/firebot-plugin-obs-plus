import { UIExtension } from "@crowbartools/firebot-types";
import obsCanvasService from "./obs-canvas-service";

const extension: UIExtension = {
    id: "obs-canvas-extension",
    providers: {
        factories: [
            obsCanvasService
        ]
    }
}

export default extension;