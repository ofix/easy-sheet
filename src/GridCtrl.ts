/*
 * This file is part of EasySheet.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author    code lighter
 * @copyright https://github.com/ofix
 * @qq        981326632
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 * @Date      2017/12/28
 * @Time      09:20
 */
/// <reference path="Cell.ts"/>
/// <reference path="Draggable.ts"/>
/// <reference path="Wnd.ts"/>
/// <reference path="Const.ts"/>
/// <reference path="Point.ts"/>
/// <reference path="CellRange.ts"/>
namespace EasySheet{
    export class CGridCtrl implements IDraggable{
        protected _x:number;
        protected _y:number;
        protected _w:number;
        protected _h:number;
        protected _nRows:number;
        protected _nCols:number;
        protected _rows:any[];
        protected _cols:any[];
        protected _inDrag:boolean;
        protected _parent:CView;
        protected _scrollX:number;
        protected _scrollY:number;
        protected _cacheExist:boolean;
        protected _vx:number;
        protected _vy:number;
        protected _vw:number;
        protected _vh:number;
        protected _ctx:CanvasRenderingContext2D;
        protected _cacheCanvas:HTMLCanvasElement;
        protected _cacheCtx:CanvasRenderingContext2D;
        protected _canvasList:any[];
        constructor(parentWnd:CView,nRows:number,nCols:number){
            this._parent = parentWnd;
            this._nRows = nRows;
            this._nCols = nCols;
            this._scrollX = 0;
            this._scrollY = 0;
            this._x = 0;
            this._y = 0;
            this._w = parentWnd.clientWidth;
            this._h = parentWnd.clientHeight;
            this._vx = this._x;
            this._vy = this._y;
            this._vw = this._w;
            this._vh = this._h;
            this._rows = [];
            this._cols = [];
            this._canvasList = [];
            this._cacheExist = false;
            for(let i=0; i<nRows;i++){
                this._rows.push(CELL_HEIGHT);
            }
            for(let j=0; j<nCols;j++){
                this._cols.push(CELL_WIDTH);
            }
            this._ctx = this._parent.context;
            this.CreateCacheCtx();
            this.makeCanvasList();
        }
        get clientWidth():number{
            return this._parent.clientWidth;
        }
        get clientHeight():number{
            return this._parent.clientHeight;
        }
        makeCanvasList():void{
            console.log("make-list 1 ",now());
            for(let i=0; i<1000;i++) {
                let canvas: HTMLCanvasElement;
                let ctx: CanvasRenderingContext2D;
                canvas = document.createElement("canvas");
                canvas.width = this._w;
                canvas.height = this._h;
                ctx = canvas.getContext("2d");
                this._canvasList.push(canvas);
                this._canvasList.push(ctx);
            }
            console.log("canvas_list = ",this._canvasList.length);
            console.log("make-list 2 ",now());
        }
        CreateCacheCtx():void{
            this._cacheCanvas = document.createElement("canvas");
            this._cacheCanvas.width = this._w;
            this._cacheCanvas.height = this._h;
            this._cacheCtx = this._cacheCanvas.getContext("2d");
        }
        OnDragStart(ptCursor:CPoint):void{
            this._inDrag = true;
        }
        OnDragging(ptCursor:CPoint):void{

        }
        OnDragEnd(ptCursor:CPoint):void{
            this._inDrag = false;
        }
        GetRowWidth():number{
            return this._w;
        }
        GetColHeight():number{
            return this._h;
        }
        GetItemXY(iRow:number,iCol:number):CPoint{
            let pt = new CPoint();
            pt.x = iCol*CELL_WIDTH+this._x;
            pt.y = iRow*CELL_HEIGHT;
            return pt;
        }
        //利用图片函数滚动窗口
        ScrollWindow(deltaX:number,deltaY:number):void{
            this._scrollX = this._scrollX+deltaX;
            this._scrollY = this._scrollY+deltaY;
            if((deltaX>0)) {
                this._vx = this._scrollX;
                this._vy = this._scrollY;
                this.Draw();
            }
            if((deltaY>0) && (deltaY<this.clientHeight)) {
                this._vx = this._scrollX;
                this._vy = this._scrollY;
                this.Draw();
            }
        }
        GetVisibleCellRange(xOffset:number,yOffset:number):CCellRange{
            let x:number =0;
            let y:number =0;
            let rng = new CCellRange(-1,-1,-1,-1);
            for(let i=0; i<this._nRows;i++){
                x+= this._nRows[i];
                if(x>= xOffset){
                    rng.rowStartIndex = i;
                }
                if((x+this.clientWidth)>=xOffset){
                    rng.rowEndIndex = i;
                    break;
                }
            }

            for(let j=0; j<this._nCols;j++){
                y+=this._nCols[j];
                if(y>=yOffset){
                    rng.colStartIndex = j;
                }
                if((x+this.clientHeight)>=yOffset){
                    rng.colEndIndex = j;
                    break;
                }
            }
            return rng;
        }
        Draw():void{
            if(!this._cacheExist){
                this.DrawInCache();
                console.log("写入缓存");
            }
            console.log("GridCtrl 1",now());
            this._ctx.save();
            console.log(this._vx,this._vy,this.clientWidth,this.clientHeight);
            this._ctx.drawImage(this._cacheCanvas,this._vx,this._vy,this.clientWidth,this.clientHeight,
                this._vx,this._vy,this.clientWidth,this.clientHeight);
            this._ctx.restore();
            console.log("GridCtrl 2",now());
        }
        DrawInCache():void{
            console.log("draw grid cache 1",now());
            console.log("vw","vh",this._vw,this._vh);
            //清空左侧行
            console.log("time 01 =",now());
            this._cacheCtx.save();
            this._cacheCtx.fillStyle = "#FFF";
            this._cacheCtx.fillRect(this._vx,this._vy,this._vw,this._vh);
            this._cacheCtx.strokeStyle="#C5C5C5";
            this._cacheCtx.restore();
            //画背景横线
            console.log("time 02 =",now());
            this._cacheCtx.save();
            this._cacheCtx.translate(0.5,0.5);
            this._cacheCtx.beginPath();
            let yOffset:number = this._vy;
            for(let i=0;i<this._nRows;i++){
                this._cacheCtx.moveTo(this._vx,yOffset+this._rows[i]);
                this._cacheCtx.lineTo(this._vx+this._vw,yOffset+this._rows[i]);
                yOffset += this._rows[i];
            }
            this._cacheCtx.stroke();
            //画背景竖线
            console.log("time 03 =",now());
            this._cacheCtx.beginPath();
            let xOffset:number=this._vx;
            for(let j=0;j<this._nCols;j++){
                this._cacheCtx.moveTo(xOffset+this._cols[j],this._vy);
                this._cacheCtx.lineTo(xOffset+this._cols[j],this._vy+this._vh);
                xOffset += this._cols[j];
            }
            this._cacheCtx.stroke();
            //画Cell单元格
            console.log("time 04 =",now());
            this._cacheCtx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
            this._cacheCtx.textBaseline="middle";
            this._cacheCtx.textAlign = "center";
            this._cacheCtx.fillStyle = "#000";
            console.log("time 05 =",now());
            for(let i=0; i<this._nRows; i++){
                for(let j=0; j<this._nCols; j++){
                    let xy = this.GetItemXY(i,j);
                    if(xy.x < this.clientWidth && xy.y < this.clientHeight) {
                        this._cacheCtx.fillText("" + i + j, xy.x + CELL_WIDTH / 2, xy.y + CELL_HEIGHT / 2);
                    }
                }
            }
            console.log("time 06 =",now());
            this._cacheCtx.restore();
            this._cacheExist = true;
            console.log("draw grid cache 2",now());
        }
    }
}