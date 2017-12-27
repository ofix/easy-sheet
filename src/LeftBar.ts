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
         protected rows:CCell[];
         constructor(maxRow:number=100){
             super();
             this.nRows = maxRow;
             this.rows = [];
             this.inDrag = false;
         }
         init(){
             for(let i=0; i<this.nRows;i++){
                 let cell:CCell = new CCell(0,1,DEFAULT_CELL_WIDTH,DEFAULT_CELL_HEIGHT);
                 this.rows.push(cell);
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
            ctx.save();
            this.rows.forEach((v)=>{
                v.draw();
            });
            ctx.restore();
         }
         drawDragLine():void{

         }
     }
 }