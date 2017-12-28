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
         constructor(maxRow:number=100){
             super();
             this.nRows = maxRow;
             this.rows = [];
             this.wnd = new CWnd("wnd-left-bar","990",0,0,LEFT_BAR_CELL_WIDTH,BAR_CELL_HEIGHT*this.nRows,true);
             this.ctx = this.wnd.context;
             this.yScrollDelta = 0;
             for(let i=0; i<this.nRows;i++){
                 this.rows.push(BAR_CELL_HEIGHT);
             }
         }
         onDragStart(ptCursor:CPoint):void{
            this.inDrag = true;
         }
         onDragging(ptCursor:CPoint):void{
         }
         onDragEnd(ptCursor:CPoint):void{
             this.inDrag = false;
         }
         onScroll(delta:number):void{
                this.yScrollDelta += delta;
         }
         draw():void{
            let hTotal:number=0;
            this.rows.forEach((v,i)=>{
                this.ctx.translate(0,this.yScrollDelta);
                this.ctx.save();
                let name:string = ""+i;
                this.ctx.fillStyle=CLR_BAR_FILL;
                this.ctx.fillRect(0,hTotal,LEFT_BAR_CELL_WIDTH,v);
                if(i>0) {
                    this.ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
                    this.ctx.textBaseline = "middle";
                    this.ctx.textAlign = "center";
                    this.ctx.fillStyle = CLR_BAR_TEXT;
                    this.ctx.fillText(name, LEFT_BAR_CELL_WIDTH / 2, hTotal + BAR_CELL_HEIGHT / 2);
                }
                hTotal+=v;
                this.ctx.strokeStyle=CLR_BAR_SEP;
                this.ctx.moveTo(0,hTotal);
                this.ctx.lineTo(LEFT_BAR_CELL_WIDTH,hTotal);
                this.ctx.stroke();
                this.ctx.restore();
            });
         }
         drawDragLine():void{

         }
     }
 }