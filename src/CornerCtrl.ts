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
 * @Date      2017/12/30
 * @Time      10:24
 */
namespace EasySheet {
    export class CCornerCtrl extends CWnd{
        protected _x:number;
        protected _y:number;
        protected _w:number;
        protected _h:number;
        constructor(){
            super("es-corner-ctrl");
            this._x = 0;
            this._y = 0;
            this._w = FIXED_CELL_WIDTH;
            this._h = CELL_HEIGHT;
            this.CreateWindow("10000",0,0,FIXED_CELL_WIDTH,CELL_HEIGHT,FIXED_CELL_WIDTH,CELL_HEIGHT,true);
        }
        protected DrawTri(){
            this._ctx.save();
            this._ctx.beginPath();
            this._ctx.fillStyle = "#B8B8B8";
            this._ctx.moveTo(this._x+this._w-4,this._y+4);
            this._ctx.lineTo(this._x+this._w-4,this._y+this._h -4);
            this._ctx.lineTo(this._x+this._w-16,this._y+this._h-4);
            this._ctx.closePath();
            this._ctx.fill();
            this._ctx.restore();
        }
        Draw(){
                this._ctx.save();
                this._ctx.strokeStyle=CLR_BAR_SEP;
                this._ctx.fillStyle = CLR_BAR_FILL;
                this._ctx.fillRect(this._x,this._y-1,this._w,this._h);
                this._ctx.moveTo(this._x+this._w,this._y);
                this._ctx.lineTo(this._x+this._w,this._y+CELL_HEIGHT);
                this._ctx.lineTo(this._x,this._y+CELL_HEIGHT);
                this._ctx.stroke();
                this._ctx.restore();
                this.DrawTri();
        }
    }
}