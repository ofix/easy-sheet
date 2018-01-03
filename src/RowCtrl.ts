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
 * @Date      2017/12/27
 * @Time      09:25
 */
/// <reference path="Cell.ts"/>
/// <reference path="Draggable.ts"/>
/// <reference path="Wnd.ts"/>
/// <reference path="Const.ts"/>
/// <reference path="View.ts"/>
 namespace EasySheet{
     export class CRowCtrl extends CWnd implements IDraggable{
         protected _nRows:number;
         protected _parent:CView;
         protected _rows:number[];
         protected _ctx:CanvasRenderingContext2D;
         protected _x:number;
         protected _y:number;
         protected _inDrag:boolean;
         constructor(parentWnd:CView,nRows:number){
             super("es-row-ctrl");
             this._parent = parentWnd;
             this._x=0;
             this._y=CELL_HEIGHT;
             this._w=this.rowOffset;
             this._h=this.clientHeight;
             this._nRows = nRows;
             this._rows = [];
             this._ctx = this._parent.context;
             for(let i=0; i<this._nRows;i++){
                 this._rows.push(CELL_HEIGHT);
             }
         }
         get colOffset():number{
             return this._parent.colOffset;
         }
         get rowOffset():number{
             return this._parent.rowOffset;
         }
         get clientWidth():number{
             return this._w;
         }
         get clientHeight():number{
             return this._parent.clientHeight;
         }
         get x():number{
             return this._x;
         }
         get y():number{
             return this._y;
         }
         OnDragStart(ptCursor:CPoint):void{
            this._inDrag = true;
         }
         OnDragging(ptCursor:CPoint):void{
         }
         OnDragEnd(ptCursor:CPoint):void{
             this._inDrag = false;
         }
         ScrollX(delta:number):void{
             this._x = delta;
         }
         GetVisibleCellRange():CCellRange{
             let scrollY:number = this._y;
             let y:number =0;
             let flag = true;
             let rng = new CCellRange(0,0,0,0,0,0);
             for(let i=0; i<this._nRows;i++){
                 y+= this._rows[i];
                 if(flag && y>= scrollY){
                     rng.rowStartIndex = i;
                     if(scrollY>0) {
                         rng.xPad = scrollY - y;
                     }
                     flag = false;
                 }
                 if(y >= (scrollY+this.clientHeight)){
                     rng.rowEndIndex = i;
                     break;
                 }
             }
             return rng;
         }
         Draw():void{
             let rng:CCellRange = this.GetVisibleCellRange();
             let hTotal:number=this._y;
             this._ctx.translate(0.5,0.5);
             this._ctx.save();
             this._ctx.fillStyle=CLR_BAR_FILL;
             this._ctx.fillRect(this._x,this._y,this._w,this.clientHeight);
             this._ctx.fillStyle = CLR_BAR_TEXT;
             this._ctx.strokeStyle = CLR_BAR_SEP;
             this._ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
             this._ctx.textBaseline = "middle";
             this._ctx.textAlign = "center";
             this._ctx.beginPath();
             for(let i=rng.rowStartIndex; i<rng.rowEndIndex;i++){
                 let name:string = i+"";
                 this._ctx.fillText(name, FIXED_CELL_WIDTH / 2, hTotal + CELL_HEIGHT / 2);
                 hTotal+=this._rows[i];
                 this._ctx.moveTo(this._x,hTotal);
                 this._ctx.lineTo(this._x+this._w,hTotal);
             }
             this._ctx.moveTo(this._x+this._w,0);
             this._ctx.lineTo(this._x+this._w,this.clientHeight);
             this._ctx.stroke();
             this._ctx.restore();
         }
         drawDragLine():void{

         }
     }
 }