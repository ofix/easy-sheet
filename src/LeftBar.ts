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
 namespace EasySheet{
     export class CLeftBar extends CDraggable{
         protected nRows:number;
         protected rows:number[];
         constructor(maxRow:number=100){
             super();
             this.nRows = maxRow;
             this.rows = [];
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
         draw():void{
            let hTotal:number=0;
            this.rows.forEach((v,i)=>{
                ctx.save();
                let name:string = ""+i;
                ctx.fillStyle=CLR_BAR_FILL;
                ctx.fillRect(0,hTotal,LEFT_BAR_CELL_WIDTH,v);
                if(i>0) {
                    ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    ctx.fillStyle = CLR_BAR_TEXT;
                    ctx.fillText(name, LEFT_BAR_CELL_WIDTH / 2, hTotal + BAR_CELL_HEIGHT / 2);
                }
                hTotal+=v;
                ctx.strokeStyle=CLR_BAR_SEP;
                ctx.moveTo(0,hTotal);
                ctx.lineTo(LEFT_BAR_CELL_WIDTH,hTotal);
                ctx.stroke();
                ctx.restore();
            });
         }
         drawDragLine():void{

         }
     }
 }