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
        protected _ctx:CanvasRenderingContext2D;
        constructor(parentWnd:CView,nRows:number,nCols:number){
            this._parent = parentWnd;
            this._nRows = nRows;
            this._nCols = nCols;
            this._x = FIXED_CELL_WIDTH;
            this._y = CELL_HEIGHT;
            this._w = nCols * CELL_WIDTH;
            this._h = nRows * CELL_HEIGHT;
            this._rows = [];
            this._cols = [];
            for(let i=0; i<nRows;i++){
                this._rows.push(CELL_HEIGHT);
            }
            for(let j=0; j<nCols;j++){
                this._cols.push(CELL_WIDTH);
            }
            this._ctx = this._parent.context;
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
        Draw():void{
            //画横线
            console.log("before_grid",now());
            this._ctx.save();
            this._ctx.fillStyle = "#FFF";
            this._ctx.fillRect(this._x,this._y,this._w,this._h);
            this._ctx.strokeStyle="#C5C5C5";
            let yOffset:number = this._y;
            for(let i=0;i<this._nRows;i++){
                this._ctx.beginPath();
                this._ctx.moveTo(this._x,yOffset+this._rows[i]);
                this._ctx.lineTo(this._x+this._w,yOffset+this._rows[i]);
                yOffset += this._rows[i];
                this._ctx.closePath();
                this._ctx.stroke();
            }
            let xOffset:number=this._x;
            for(let j=0;j<this._nCols;j++){
                this._ctx.beginPath();
                this._ctx.moveTo(xOffset+this._cols[j],this._y);
                this._ctx.lineTo(xOffset+this._cols[j],this._y+this._h);
                xOffset += this._cols[j];
                this._ctx.stroke();
            }

            this._ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
            this._ctx.textBaseline="middle";
            this._ctx.textAlign = "center";
            this._ctx.fillStyle = "#000";
            for(let i=0; i<this._nRows; i++){
                for(let j=0; j<this._nCols; j++){
                    let xy = this.GetItemXY(i,j);
                    this._ctx.fillText(""+i+j,xy.x+CELL_WIDTH/2,xy.y+CELL_HEIGHT/2);
                    this._ctx.stroke();
                }
            }
            this._ctx.restore();
            console.log("after_grid",now());
        }
    }
}