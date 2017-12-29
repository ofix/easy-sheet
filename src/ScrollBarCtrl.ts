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
 * @Date      2017/12/29
 * @Time      20:26
 */
/// <reference path="View.ts"/>
namespace EasySheet{
    export class CScrollBarCtrl{
        public static readonly SBC_HORZ = 0;
        public static readonly SBC_VERT = 1;
        protected _x:number;
        protected _y:number;
        protected _w:number;
        protected _h:number;
        protected _name:string;
        protected _parent:CView;
        protected _barClr:string;
        protected _triClr:string;
        protected _bkClr:string;
        protected _bar_style:number;
        protected _ctx:CanvasRenderingContext2D;
        protected _vw:number;
        protected _pos:number;
        protected _page:number;
        protected _view:number;
        constructor(parentWnd:CView,name:string="scroll-bar",barStyle:number=CScrollBarCtrl.SBC_HORZ, x:number,y:number,width:number,height:number=18){
            this._parent = parentWnd;
            this._name = name;
            this._bar_style = barStyle;
            this._x = x;
            this._y = y;
            this._w = width;
            this._h = height;
            this._vw = this._w;
            this._ctx = parentWnd.context;
            this._barClr = "#C1C1C1";
            this._bkClr = "#F1F1F1";
            this._triClr = "#505050";
            this._pos = 0;
            this._page = 0;
            this._view = 0;
        }
        get barColor():string{
            return this._barClr;
        }
        get bkColor():string{
            return this._bkClr;
        }
        get triangleColor():string{
            return this._triClr;
        }
        set barColor(color:string){
            this._barClr = color;
        }
        set bkColor(color:string){
            this._bkClr = color;
        }
        set triangleColor(color:string){
            this._triClr = color;
        }
        SetScrollPos(value:number):void{
            this._pos = value;
        }
        GetScrollPos():number{
            return this._pos;
        }
        SetPageSize(size:number):void{
            this._page = size;
        }
        GetPageSize():number{
            return this._page;
        }
        SetViewSize(size:number):void{
            this._view = size;
        }
        GetViewSize():number{
            return this._view;
        }
        Draw():void{
            this._ctx.translate(0.5,0.5);
            this.DrawBk();
            this.DrawLeftTriangle();
            this.DrawRightTriangle();
            this.DrawBar();
        }
        protected DrawLeftTriangle():void{
            this._ctx.save();
            this._ctx.fillStyle = this._triClr;
            this._ctx.strokeStyle = this._triClr;
            this._ctx.beginPath();
            this._ctx.moveTo(this._x+12,this._y+6);
            this._ctx.lineTo(this._x+12,this._y+this._h-6);
            this._ctx.lineTo(this._x+8,this._y+this._h/2);
            this._ctx.closePath();
            this._ctx.fill();
            this._ctx.restore();

        }
        protected DrawRightTriangle():void{
            this._ctx.save();
            this._ctx.fillStyle = this._triClr;
            this._ctx.strokeStyle = this._triClr;
            this._ctx.beginPath();
            this._ctx.moveTo(this._x+this._w-12,this._y+6);
            this._ctx.lineTo(this._x+this._w-12,this._y+this._h-6);
            this._ctx.lineTo(this._x+this._w-8,this._y+this._h/2);
            this._ctx.closePath();
            this._ctx.fill();
            this._ctx.restore();
        }
        protected DrawBk():void{
            this._ctx.save();
            this._ctx.fillStyle = this._bkClr;
            this._ctx.fillRect(this._x,this._y,this._w,this._h);
            this._ctx.restore();
        }
        protected DrawBar():void{
            this._ctx.save();
            this._ctx.fillStyle = this._barClr;
            let w:number = Math.floor((this._w-40)*(this._view/this._page));
            this._ctx.fillRect(this._x+18,this._y+2,w,this._h-4);
            this._ctx.restore();
        }
    }
}
