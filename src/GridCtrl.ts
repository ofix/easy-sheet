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
        GetItemXY(iRow:number,iCol:number):CPoint{
            let pt = new CPoint();
            pt.x = iCol*CELL_WIDTH+this._x;
            pt.y = iRow*CELL_HEIGHT;
            return pt;
        }
        Draw():void{
            for(let i=0; i<this._nRows; i++){
                for(let j=0; j<this._nCols; j++){
                    this._ctx.save();
                    let xy = this.GetItemXY(i,j);
                    this._ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
                    this._ctx.textBaseline="middle";
                    this._ctx.textAlign = "center";
                    this._ctx.fillStyle = "#000";
                    this._ctx.fillText(""+i+j,xy.x+CELL_WIDTH/2,xy.y+CELL_HEIGHT/2);
                    this._ctx.stroke();
                    this._ctx.restore();
                }
            }
        }
    }
}