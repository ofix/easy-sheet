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
        constructor(parentWnd:CView,nRows:number,nCols:number){
            this._parent = parentWnd;
            this._nRows = nRows;
            this._nCols = nCols;
            this._scrollX = 0;
            this._scrollY = 0;
            this._x = FIXED_CELL_WIDTH;
            this._y = CELL_HEIGHT;
            this._w = nCols * CELL_WIDTH;
            this._h = nRows * CELL_HEIGHT;
            this._vx = this._x;
            this._vy = this._y;
            this._vw = this._w;
            this._vh = this._h;
            this._rows = [];
            this._cols = [];
            this._cacheExist = false;
            for(let i=0; i<nRows;i++){
                this._rows.push(CELL_HEIGHT);
            }
            for(let j=0; j<nCols;j++){
                this._cols.push(CELL_WIDTH);
            }
            this._ctx = this._parent.context;
            this.CreateCacheCtx();
        }
        get clientWidth():number{
            return this._parent.clientWidth;
        }
        get clientHeight():number{
            return this._parent.clientHeight;
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
            console.log("scrollWindow 1",now());
            if((deltaX>0) && (deltaX<this.clientWidth)) {
                this._ctx.save();
                let data: ImageData = this._ctx.getImageData(this._scrollX+deltaX, this._scrollY, this.clientWidth, this.clientHeight);
                this._ctx.putImageData(data,this._scrollX + deltaX, this._scrollY);
                this._ctx.restore();
            }
            console.log("scrollWindow 2",now());
            if((deltaY>0) && (deltaY<this.clientHeight)) {
                this._ctx.save();
                let data:ImageData = this._ctx.getImageData(this._scrollX,this._scrollY+deltaY,this.clientWidth,this.clientHeight);
                this._ctx.putImageData(data,this._scrollX,this._scrollY + deltaY);
                this._ctx.restore();
            }
        }
        Draw():void{
            if(!this._cacheExist){
                this.DrawInCache();
            }
            this._ctx.drawImage(this._cacheCanvas,this._vx,this._vy,this._vw,this._vh);
        }
        DrawInCache():void{
            //清空左侧行
            this._cacheCtx.save();
            this._cacheCtx.fillStyle = "#FFF";
            this._cacheCtx.fillRect(this._x,this._y,this._w,this._h);
            this._cacheCtx.strokeStyle="#C5C5C5";
            //画背景横线
            this._cacheCtx.beginPath();
            let yOffset:number = this._y;
            for(let i=0;i<this._nRows;i++){
                this._cacheCtx.moveTo(this._x,yOffset+this._rows[i]);
                this._cacheCtx.lineTo(this._x+this._w,yOffset+this._rows[i]);
                yOffset += this._rows[i];
            }
            this._cacheCtx.stroke();
            //画背景竖线
            this._cacheCtx.beginPath();
            let xOffset:number=this._x;
            for(let j=0;j<this._nCols;j++){
                this._cacheCtx.moveTo(xOffset+this._cols[j],this._y);
                this._cacheCtx.lineTo(xOffset+this._cols[j],this._y+this._h);
                xOffset += this._cols[j];
            }
            this._cacheCtx.stroke();
            this._cacheCtx.beginPath();
            //画Cell单元格
            this._cacheCtx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
            this._cacheCtx.textBaseline="middle";
            this._cacheCtx.textAlign = "center";
            this._cacheCtx.fillStyle = "#000";
            for(let i=0; i<this._nRows; i++){
                for(let j=0; j<this._nCols; j++){
                    let xy = this.GetItemXY(i,j);
                    this._cacheCtx.fillText(""+i+j,xy.x+CELL_WIDTH/2,xy.y+CELL_HEIGHT/2);
                }
            }
            this._cacheCtx.stroke();
            this._cacheCtx.restore();
            this._cacheExist = true;
        }
    }
}