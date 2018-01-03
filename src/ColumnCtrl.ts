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
    export class CColumnCtrl extends CWnd implements IDraggable{
        readonly CELL_BLANK:number = 16;
        protected _nCols;
        protected _cols:number[];
        protected _inDrag:boolean;
        constructor(nCols:number){
            super("es-col-ctrl");
            let wWin = $(window).width();
            this.CreateWindow("1000",FIXED_CELL_WIDTH,0,wWin-18,CELL_HEIGHT,nCols*CELL_WIDTH,CELL_HEIGHT,true);
            this._nCols = nCols;
            this._cols = [];
            for(let i=0; i<this._nCols; i++){
                this._cols.push(CELL_WIDTH);
            }
        }
        OnDragStart(ptCursor:CPoint):void{
            this._inDrag = true;
        }
        OnDragging(ptCursor:CPoint):void{
        }
        OnDragEnd(ptCursor:CPoint):void{
            this._inDrag = false;
        }
        OnSize(wWin:number,hWin:number):void{
            this._clientW = wWin-18;
            this._clientH = CELL_HEIGHT;
            this.Draw();
        }
        getColName(index:number){
            let name = '';
            let i = Math.floor(index / 26);
            if ( i > 0) {
                name += this.getColName(i-1);
            }
            return name+String.fromCharCode(index % 26 + 65);
        }
        Draw(){
            let wTotal:number=FIXED_CELL_WIDTH;
            this._ctx.save();
            this._ctx.translate(0.5,0.5);
            this._ctx.fillStyle=CLR_BAR_FILL;
            this._ctx.fillRect(this._x,this._y,this.clientWidth,this.clientHeight);

            this._ctx.font = DEFAULT_FONT_SIZE + 'px '+"Arial";
            this._ctx.textBaseline = "middle";
            this._ctx.textAlign = 'center';
            this._ctx.strokeStyle=CLR_BAR_SEP;
            this._ctx.fillStyle=CLR_BAR_TEXT;
            this._cols.forEach((v, i)=>{
                let name:string = this.getColName(i);
                console.log(name,wTotal+v/2,CELL_HEIGHT/2);
                this._ctx.fillText(name,wTotal+v/2,CELL_HEIGHT/2);
                wTotal+=v;
                this._ctx.moveTo(wTotal,0);
                this._ctx.lineTo(wTotal,CELL_HEIGHT);
            });
            this._ctx.strokeStyle = CLR_BAR_SEP;
            this._ctx.moveTo(this._x,this._h-1);
            this._ctx.lineTo(this._x+this.clientWidth-18,this._h-1);
            this._ctx.stroke();
            this._ctx.restore();
        }
    }
}