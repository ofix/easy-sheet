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
 namespace EasySheet{
     export class CWndLeftBar extends CDraggable{
         protected nRows:number;
         protected rows:number[];
         protected wnd:CWnd;
         protected ctx:CanvasRenderingContext2D;
         protected yScrollDelta:number;
         protected _x:number;
         protected _y:number;
         constructor(maxRow:number=100){
             super();
             this._x=0;
             this._y=0;
             this.nRows = maxRow;
             this.rows = [];
             this.wnd = new CWnd("wnd-left-bar","990",0,0,LEFT_BAR_CELL_WIDTH,BAR_CELL_HEIGHT*this.nRows,true);
             this.ctx = this.wnd.context;
             this.yScrollDelta=0;
             for(let i=0; i<this.nRows;i++){
                 this.rows.push(BAR_CELL_HEIGHT);
             }
         }
         get x():number{
             return this._x;
         }
         get y():number{
             return this._y;
         }
         onDragStart(ptCursor:CPoint):void{
            this.inDrag = true;
         }
         onDragging(ptCursor:CPoint):void{
         }
         onDragEnd(ptCursor:CPoint):void{
             this.inDrag = false;
         }
         scrollY(delta:number):void{
             this.yScrollDelta = delta*53;
             this._y += this.yScrollDelta;
             if(this._y>0){
                 this._y=0;
                 this.yScrollDelta =0;
             }
             if(this._y<(this.wnd.visualHeight-this.wnd.contentHeight)){
                 this._y = this.wnd.visualHeight - this.wnd.contentHeight;
                 this.yScrollDelta = 0;
             }
             this.draw();
         }
         draw():void{
            let hTotal:number=0;
            this.ctx.translate(0,this.yScrollDelta);
            this.ctx.save();
            this.ctx.fillStyle=CLR_BAR_FILL;
            this.ctx.fillRect(0,0,LEFT_BAR_CELL_WIDTH,BAR_CELL_HEIGHT*this.nRows);
            this.ctx.fillStyle = CLR_BAR_TEXT;
            this.ctx.strokeStyle = CLR_BAR_SEP;
            this.ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
            this.ctx.textBaseline = "middle";
            this.ctx.textAlign = "center";
            this.rows.forEach((v,i)=>{
                if(i>0) {
                    let name:string = ""+i;
                    this.ctx.fillText(name, LEFT_BAR_CELL_WIDTH / 2, hTotal + BAR_CELL_HEIGHT / 2);
                }
                hTotal+=v;
                this.ctx.beginPath();
                this.ctx.moveTo(0,hTotal);
                this.ctx.lineTo(LEFT_BAR_CELL_WIDTH,hTotal);
                this.ctx.stroke();
            });
            this.ctx.restore();
         }
         drawDragLine():void{

         }
     }
 }