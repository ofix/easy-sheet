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
         protected _yScrollDelta:number;
         protected _x:number;
         protected _y:number;
         protected _inDrag:boolean;
         constructor(parentWnd:CView,nRows:number){
             super("es-row-ctrl");
             this._parent = parentWnd;
             this._x=0;
             this._y=0;
             this._nRows = nRows;
             this._rows = [];
             this._yScrollDelta=0;
             this._ctx = this._parent.context;
             for(let i=0; i<this._nRows;i++){
                 this._rows.push(BAR_CELL_HEIGHT);
             }
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
         scrollY(delta:number):void{
             // this._yScrollDelta = delta*53;
             // this._y += this._yScrollDelta;
             // if(this._y>0){
             //     this._y=0;
             //     this._yScrollDelta =0;
             // }
             // if(this._y<(this.wnd.visualHeight-this.wnd.contentHeight)){
             //     this._y = this.wnd.visualHeight - this.wnd.contentHeight;
             //     this._yScrollDelta = 0;
             // }
         }
         Draw():void{
            let hTotal:number=0;
            this._ctx.translate(0,this._yScrollDelta);
            this._ctx.save();
            this._ctx.fillStyle=CLR_BAR_FILL;
            this._ctx.fillRect(0,0,LEFT_BAR_CELL_WIDTH,BAR_CELL_HEIGHT*this._nRows);
            this._ctx.fillStyle = CLR_BAR_TEXT;
            this._ctx.strokeStyle = CLR_BAR_SEP;
            this._ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
            this._ctx.textBaseline = "middle";
            this._ctx.textAlign = "center";
            this._rows.forEach((v,i)=>{
                if(i>0) {
                    let name:string = ""+i;
                    this._ctx.fillText(name, LEFT_BAR_CELL_WIDTH / 2, hTotal + BAR_CELL_HEIGHT / 2);
                }
                hTotal+=v;
                this._ctx.beginPath();
                this._ctx.moveTo(0,hTotal);
                this._ctx.lineTo(LEFT_BAR_CELL_WIDTH,hTotal);
                this._ctx.stroke();
            });
            this._ctx.restore();
         }
         drawDragLine():void{

         }
     }
 }