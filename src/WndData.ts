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
    export class CWndData extends CDraggable{
        protected x:number;
        protected y:number;
        protected w:number;
        protected h:number;
        protected nRows:number;
        protected nCols:number;
        protected rows:any[];
        protected cols:any[];
        protected wnd:CWnd;
        protected ctx:CanvasRenderingContext2D;
        constructor(nRows:number,nCols:number){
            super();
            this.x = LEFT_BAR_CELL_WIDTH;
            this.y = BAR_CELL_HEIGHT;
            this.nRows = nRows;
            this.nCols = nCols;
            this.rows = [];
            this.cols = [];
            this.wnd = new CWnd("wnd-data","100",LEFT_BAR_CELL_WIDTH,BAR_CELL_HEIGHT,5000,9000);
            this.ctx = this.wnd.context;
        }
        onDragStart(ptCursor:CPoint):void{
            this.inDrag = true;
        }
        onDragging(ptCursor:CPoint):void{

        }
        onDragEnd(ptCursor:CPoint):void{
            this.inDrag = false;
        }
        getItemXY(nRow:number,nCol:number):CPoint{
            let pt = new CPoint();
            pt.x = nCol*TOP_BAR_CELL_WIDTH;
            pt.y = nRow*BAR_CELL_HEIGHT;
            return pt;
        }
        draw():void{
            let ctx = this.ctx;
            for(let i=0; i<this.nRows; i++){
                for(let j=0; j<this.nCols;j++){
                    ctx.save();
                    let xy = this.getItemXY(i,j);
                    ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
                    ctx.textBaseline="middle";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#000";
                    ctx.fillText(""+i+j,xy.x+TOP_BAR_CELL_WIDTH/2,xy.y+BAR_CELL_HEIGHT/2);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }
}