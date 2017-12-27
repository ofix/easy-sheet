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
 * @Date      2017/12/22
 * @Time      10:43
 */
/// <reference path="Draggable.ts"/>
namespace EasySheet {
    export class CTopBar extends CDraggable{
        protected nCols;
        protected cols:number[];
        constructor(nCols:number){
            super();
            this.nCols = nCols;
            this.cols = [];
            for(let i=0; i<this.nCols;i++){
                this.cols.push(TOP_BAR_CELL_WIDTH);
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
        getColName(index:number){
            let name = '';
            let i = Math.floor(index / 26);
            if ( i > 0) {
                name += this.getColName(i-1);
            }
            return name+String.fromCharCode(index % 26 + 65);
        }
        draw(){
            let wTotal:number=LEFT_BAR_CELL_WIDTH;
            this.cols.forEach((v,i)=>{
                ctx.save();
                let name:string = this.getColName(i);
                ctx.fillStyle=CLR_BAR_FILL;
                ctx.fillRect(wTotal,0,v,BAR_CELL_HEIGHT);
                ctx.font = DEFAULT_FONT_SIZE + 'px '+"Arial";
                ctx.textBaseline = "middle";
                ctx.textAlign = 'center';
                ctx.fillStyle=CLR_BAR_TEXT;
                ctx.fillText(name,wTotal+v/2,BAR_CELL_HEIGHT/2);
                wTotal+=v;
                ctx.strokeStyle=CLR_BAR_SEP;
                ctx.moveTo(wTotal,0);
                ctx.lineTo(wTotal,BAR_CELL_HEIGHT);
                ctx.stroke();
                ctx.restore();
            });
        }
    }
}