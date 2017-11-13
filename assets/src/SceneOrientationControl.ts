const { ccclass, property } = cc._decorator;
import ComponentInfo from './ComponentInfo';

enum OrientationEnum {
    Portrait = 0,
    Landcape
}

@ccclass("ControlData")
class ControlData {
    @property(cc.String)
    name: string = '';
    @property(cc.String)
    portraitInfo: string = '';
    @property(cc.String)
    landscapeInfo: string = '';
    @property(cc.Node)
    node: cc.Node = undefined;
}

@ccclass
export default class SceneOrientationControl extends cc.Component {
    @property(cc.String)
    _isSave: boolean = false;
    @property(cc.String)
    _isPortrait: boolean = true;
    @property({
        type: [ControlData],
        // visible: true
    })
    _arrNodeControlData: Array<ControlData> = [];

    _listenerPortrait;
    _listenerLandscape;
    _designResolutionLess = 750;
    _designResolutionMore = 1334;
    _sceneOrientationScripts: SceneOrientationControl[] = [];
    @property({ type: Boolean })
    set showPortrait(isPortrait: boolean) {
        const savaNodes = [];
        this._sceneOrientationScripts = [];
        this.saveNodeInfo(this.node, this._isPortrait, savaNodes);
        // 保留有用的資料
        const tmpDatas = [];
        this._arrNodeControlData.forEach((element, index) => {
            if (savaNodes.indexOf(element.node) >= 0) {
                tmpDatas.push(element);
            }
        });
        this._arrNodeControlData = tmpDatas;
        this._isPortrait = isPortrait;
        this.onOrientation(isPortrait);
    }

    get showPortrait() {
        return this._isPortrait;
    }

    /**
     * 儲存node資訊
     * @param rootNode 
     * @param isPortrait
     * @param savaNodes 
     */
    private saveNodeInfo(rootNode: cc.Node, isPortrait: boolean, savaNodes?: Array<cc.Node>): Array<NodeData> {
        const saveControlDataList = [];
        let getNodeData = (node: cc.Node) => {
            const nodeData: NodeData = {
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                active: node.active,
                color: {
                    r: node.color.getR(),
                    g: node.color.getG(),
                    b: node.color.getB(),
                    a: node.opacity
                },
                anchorX: node.anchorX,
                anchorY: node.anchorY,
            };
            if (node.getComponent(cc.Widget)) {
                nodeData.widget = this.getWidget(node.getComponent(cc.Widget));
            }
            if (node.getComponent(cc.Layout)) {
                nodeData.layout = this.getLayout(node.getComponent(cc.Layout));
            }
            if (node.getComponent('LT_SliderActionScript')) {
                nodeData.LT_SliderActionScript = this.getMenuVS(node.getComponent('LT_SliderActionScript'));
            }
            const componentInfo: ComponentInfo = node.getComponent(ComponentInfo);
            if (componentInfo) {
                nodeData.componentDetail = {
                    localZOrder: componentInfo.localZOrder
                };
            }
            return nodeData;
        };
        const saveNodeControlData = (node: cc.Node, data: NodeData, isPortrait: boolean) => {
            let targetControlData;
            if (this._arrNodeControlData) {
                targetControlData = this._arrNodeControlData.find((element) => {
                    return element.node === node;
                });
            }
            if (!targetControlData) {
                // 不存在, 建立一個空的
                targetControlData = new ControlData();
                Object.assign(targetControlData, {
                    name: node.name,
                    landscapeInfo: '',
                    portraitInfo: '',
                    node: node
                });
                this._arrNodeControlData.push(targetControlData);
            }

            if (isPortrait) {
                targetControlData.portraitInfo = JSON.stringify(data);
            } else {
                targetControlData.landscapeInfo = JSON.stringify(data);
            }
        };
        let childrenData = [];
        if (!rootNode.getComponent(SceneOrientationControl) || this.node == rootNode) {
            if (savaNodes) {
                savaNodes.push(rootNode);
            }
            saveNodeControlData(rootNode, getNodeData(rootNode), isPortrait);

            if (rootNode && rootNode.children) {
                const children = rootNode.children;
                children.forEach((element: cc.Node, index) => {
                    if (element) {
                        if (!element.children || element.children.length == 0) {
                            if (savaNodes) {
                                savaNodes.push(element);
                            }
                            saveNodeControlData(element, getNodeData(element), isPortrait);
                        } else {
                            const viewChildren = this.saveNodeInfo(element, isPortrait, savaNodes);
                            if (viewChildren.length > 0) {
                                childrenData = childrenData.concat(viewChildren);
                            }
                        }
                    }
                })
            }
        } else {
            this._sceneOrientationScripts.push(rootNode.getComponent(SceneOrientationControl));
        }
        return childrenData;
    }

    /**
     * 設置儲存的node資訊
     * @param isPortrait 
     */
    private setNodeInfo(isPortrait) {
        if (this._arrNodeControlData && typeof isPortrait === 'boolean') {
            this._arrNodeControlData.forEach((element, index) => {
                try {
                    const child: cc.Node = element.node;
                    let nodeInfo;
                    if (isPortrait) {
                        nodeInfo = element.portraitInfo;
                    } else {
                        nodeInfo = element.landscapeInfo;
                    }
                    if (child && nodeInfo) {
                        nodeInfo = JSON.parse(nodeInfo);
                        const children = child.parent.children;
                        const childIndex = children.indexOf(child);
                        if (child.getComponent("LT_ActiveControl")) {
                            child.active = child.getComponent("LT_ActiveControl").activeNode;
                        } else {
                            child.active = nodeInfo.active;
                        }
                        if (nodeInfo.active) {
                            child.color = new cc.Color(nodeInfo.color.r, nodeInfo.color.g, nodeInfo.color.b);
                            child.opacity = nodeInfo.color.a;
                            child.anchorX = nodeInfo.anchorX;
                            child.anchorY = nodeInfo.anchorY;
                            // TODO. Fixed for Real phone will cause view wrong
                            if (!cc.Canvas.instance || child != cc.Canvas.instance.node) {
                                child.x = nodeInfo.x;
                                child.y = nodeInfo.y;
                                child.width = nodeInfo.width;
                                child.height = nodeInfo.height;
                            }
                            if (nodeInfo.widget) {
                                this.setWidget(child.getComponent(cc.Widget), nodeInfo.widget);
                            }
                            if (nodeInfo.layout) {
                                this.setLayout(child.getComponent(cc.Layout), nodeInfo.layout);
                            }
                            if (nodeInfo.LT_SliderActionScript) {
                                this.setMenuVS(child.getComponent('LT_SliderActionScript'), nodeInfo.LT_SliderActionScript);
                            }

                            const componentInfo = child.getComponent(ComponentInfo);
                            if (componentInfo && nodeInfo.componentDetail) {
                                componentInfo.localZOrder = nodeInfo.componentDetail.localZOrder;
                                child.setLocalZOrder(nodeInfo.componentDetail.localZOrder);
                            } else {
                                child.setLocalZOrder(0);
                            }
                        }
                    }
                } catch (e) {
                    cc.log(e.message);
                }
            });
        }
    }

    private getMenuVS(layout: any) {
        if (layout) {
            const layoutData: NodeData['layout'] = {
                direction: layout.direction,
                actionDuration: layout.actionDuration,
                targetOffset: layout.targetOffset,
            };
            return layoutData;
        }
        return null;

    }

    private setMenuVS(layout: any, data) {
        if (layout) {
            layout.direction = data.direction;
            layout.actionDuration = data.actionDuration;
            layout.targetOffset = data.targetOffset;
        }
    }

    private getLayout(layout: cc.Layout): NodeData['layout'] {
        if (layout) {
            const layoutData: NodeData['layout'] = {
                type: layout.type,
                resizeMode: layout.resizeMode,
                cellSizeWidth: layout.cellSize.width,
                cellSizeHeight: layout.cellSize.height,
                startAxis: layout.startAxis,
                paddingLeft: layout.paddingLeft,
                paddingRight: layout.paddingRight,
                paddingTop: layout.paddingTop,
                paddingBottom: layout.paddingBottom,
                spacingX: layout.spacingX,
                spacingY: layout.spacingY,
                verticalDirection: layout.verticalDirection,
                horizontalDirection: layout.horizontalDirection,
            };
            return layoutData;
        }
        return null;
    }

    private setLayout(layout: cc.Layout, data: NodeData['layout']) {
        if (layout) {
            layout.type = data.type;
            layout.resizeMode = data.resizeMode;
            layout.cellSize = cc.size(data.cellSizeWidth, data.cellSizeHeight);
            layout.startAxis = data.startAxis;
            layout.paddingLeft = data.paddingLeft;
            layout.paddingRight = data.paddingRight;
            layout.paddingTop = data.paddingTop;
            layout.paddingBottom = data.paddingBottom;
            layout.spacingX = data.spacingX;
            layout.spacingY = data.spacingY;
            layout.verticalDirection = data.verticalDirection;
            layout.horizontalDirection = data.horizontalDirection;
        }
    }

    private getWidget(widget: cc.Widget): NodeData['widget'] {
        const widgetData: NodeData['widget'] = {
            isAlignTop: widget.isAlignTop,
            isAlignLeft: widget.isAlignLeft,
            isAlignRight: widget.isAlignRight,
            isAlignBottom: widget.isAlignBottom,
            isAlignOnce: widget.isAlignOnce,
            isAlignHorizontalCenter: widget.isAlignHorizontalCenter,
            isAlignVerticalCenter: widget.isAlignVerticalCenter,
            top: widget.top || 0,
            bottom: widget.bottom || 0,
            left: widget.left || 0,
            right: widget.right || 0,
            horizontalCenter: widget.horizontalCenter || 0,
            verticalCenter: widget.verticalCenter || 0,
        };
        if (widget.target) {
            this._arrNodeControlData.find((element, index) => {
                if (element.node === widget.target) {
                    widgetData.targetIndex = index;
                    return true;
                }
                return false;
            });
        }
        return widgetData;
    }
    private setWidget(widget: cc.Widget, data: NodeData['widget']) {
        if (widget && data) {
            const node = widget.node;
            const originHeight = node.height;
            const originWidth = node.width;
            let needResetHeight = widget.isAlignTop && !data.isAlignTop || widget.isAlignBottom && !data.isAlignBottom;
            let needResetWidth = widget.isAlignLeft && !data.isAlignLeft || widget.isAlignRight && !data.isAlignRight
            widget.target = this.findNodeByIndex(data.targetIndex);
            widget.isAlignTop = data.isAlignTop;
            widget.isAlignLeft = data.isAlignLeft;
            widget.isAlignRight = data.isAlignRight;
            widget.isAlignBottom = data.isAlignBottom;
            widget.isAlignOnce = data.isAlignOnce;
            widget.isAlignHorizontalCenter = data.isAlignHorizontalCenter;
            widget.isAlignVerticalCenter = data.isAlignVerticalCenter;
            if (needResetHeight) {
                // 此處為防止isAlignTop & isAlignBottom取消勾選後高度會亂跑
                node.height = originHeight;
            }
            if (needResetWidth) {
                // 此處為防止isAlignLeft & isAlignRight取消勾選後寬度會亂跑
                node.width = originWidth;
            }
            widget.top = data.top;
            widget.right = data.right;
            widget.left = data.left;
            widget.bottom = data.bottom;
            if (widget.isAlignHorizontalCenter) {
                widget.horizontalCenter = data.horizontalCenter;
            }
            if (widget.isAlignVerticalCenter) {
                widget.verticalCenter = data.verticalCenter;
            }
        }
    }
    /**
     * 根據索引尋找儲存的node
     * @param index 
     */
    private findNodeByIndex(index: number): cc.Node {
        let targetNode = null;
        if (index >= 0) {
            const targetControlData = this._arrNodeControlData[index];
            if (targetControlData) {
                targetNode = targetControlData.node;
            }
        }
        return targetNode;
    }

    /**
     * 設置指定node直橫屏資料(只需輸入需要更改的資料 ex: {active: false})
     * @param node 
     * @param portraitControlData 
     * @param landscapeControlData 
     */
    public setNodeData(node: cc.Node, portraitControlData: NodeData, landscapeControlData: NodeData) {
        const controlData = this._arrNodeControlData.find((data) => {
            return data.node === node;
        });
        if (controlData) {
            try {
                const replaceData = portraitControlData;
                const originData = JSON.parse(controlData.portraitInfo);
                for (let key in replaceData) {
                    if (typeof replaceData[key] !== 'object') {
                        originData[key] = replaceData[key];
                    } else {
                        for (let innerKey in replaceData[key]) {
                            originData[key][innerKey] = replaceData[key][innerKey];
                        }
                    }
                }
                controlData.portraitInfo = JSON.stringify(originData);
            } catch (e) {
                cc.log(e.message);
            }
            try {
                const replaceData = landscapeControlData;
                const originData = JSON.parse(controlData.landscapeInfo);
                for (let key in replaceData) {
                    if (typeof replaceData[key] !== 'object') {
                        originData[key] = replaceData[key];
                    } else {
                        for (let innerKey in replaceData[key]) {
                            originData[key][innerKey] = replaceData[key][innerKey];
                        }
                    }
                }
                controlData.landscapeInfo = JSON.stringify(originData);
            } catch (e) {
                cc.log(e.message);
            }
        } else {
            cc.log('nodeData not found');
        }
    }

    private _getOrientation(): OrientationEnum {
        if (cc.sys.isNative || (!cc.sys.isNative && !cc.sys.isMobile)) {
            var frameSize = cc.view.getFrameSize();
            return frameSize.height > frameSize.width ? OrientationEnum.Portrait : OrientationEnum.Landcape;
        } else {
            var screenHeight = Math.max(window.screen.height, window.screen.width);
            var screenWidth = Math.min(window.screen.height, window.screen.width);
            var cw = document.documentElement.clientWidth;
            if (screenHeight - cw > Math.abs(screenWidth - cw)) {
                return OrientationEnum.Portrait;
            }
            if (screenHeight - cw < Math.abs(screenWidth - cw)) {
                return OrientationEnum.Landcape;
            }
            cc.error("Detect error screenHeight: " + screenHeight + ", ClientWidth: " + cw);
        }
        return;
    }

    onLoad() {
        if (cc.sys.isNative) {
            this._listenerPortrait = cc.eventManager.addCustomListener("portrait", () => {
                this.onOrientation(true);
            });

            this._listenerLandscape = cc.eventManager.addCustomListener("landscape", () => {
                this.onOrientation(false);
            });
            this.onOrientation(CYPluginManager.orientation.isPortrait());
        } else {
            cc.view.resizeWithBrowserSize(true);
            cc.game.on('onOrientation', (event) => {
                this.onOrientation(event.detail);
            }, this);
            cc.view.setResizeCallback(() => {
                var isPortrait = this._getOrientation() == OrientationEnum.Portrait;
                cc.game.emit('onOrientation', isPortrait);
                setTimeout(() => { window.scrollTo(0, 0); }, 10);
            });
            var isPortrait = this._getOrientation() == OrientationEnum.Portrait;
            this.onOrientation(isPortrait);
        }
    }

    resetSize(isPortrait: boolean) {
        let size;
        if (isPortrait) {
            size = cc.size(this._designResolutionLess, this._designResolutionMore);
        } else {
            size = cc.size(this._designResolutionMore, this._designResolutionLess);
        }
        if (this.node.getComponent(cc.Canvas)) {
            cc.Canvas.instance.designResolution = size;
            cc.Canvas.instance.node.setContentSize(cc.winSize);
            cc.Canvas.instance.node.setPositionY(- cc.winSize.height / 2);

        }

    }

    onOrientation(isPortrait: boolean) {
        let nodeData;
        this.resetSize(isPortrait);
        this.setNodeInfo(isPortrait);

        if (CC_EDITOR) {
            var list = this._sceneOrientationScripts;
            cc.log("Length: " + list.length);
            for (var script of list) {
                if (script != this) {
                    script.showPortrait = isPortrait;
                }
            }
        } else {
            // TODO. It will cause do N times
            var widgets = this.node.getComponentsInChildren(cc.Widget);
            widgets.forEach((widget) => {
                console.log('@@@@@@@@@@ : ' + widget.node.name);
                widget.updateAlignment();
            });
        }
    }


}
