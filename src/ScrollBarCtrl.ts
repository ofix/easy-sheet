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
/// <reference path="Wnd.ts"/>
/// <reference path="Message.ts"/>
/// <reference path="EventNotifier.ts"/>
namespace EasySheet{
    import CEventNotifier = Core.CEventNotifier;
    import SBM_PREV_PAGE = Core.SBM_PREV_PAGE;
    import SBM_NEW_POS = Core.SBM_NEW_POS;
    import SBM_NEXT_PAGE = Core.SBM_NEXT_PAGE;
    export class CScrollBarCtrl extends CWnd implements IDraggable{
        public static readonly SBC_HORZ = 0;
        public static readonly SBC_VERT = 1;
        readonly BLANK = 18;
        protected _x:number;
        protected _y:number;
        protected _w:number;
        protected _h:number;
        protected _name:string;
        protected _parent:CView;
        protected _barClr:string;
        protected _triClr:string;
        protected _bkClr:string;
        protected _barStyle:number;
        protected _ctx:CanvasRenderingContext2D;
        protected _vw:number;
        protected _pos:number;
        protected _page:number;
        protected _view:number;
        protected _inDrag:boolean;
        protected _bLeftMouseDown:boolean;
        protected _bRightMouseDown:boolean;
        constructor(parentWnd:CView,name:string="scroll-bar",barStyle:number=CScrollBarCtrl.SBC_HORZ){
            super("es-scrollbar-ctrl");
            this._parent = parentWnd;
            this._name = name;
            this._barStyle = barStyle;
            if(this._barStyle == CScrollBarCtrl.SBC_HORZ) {
                this._x = 0;
                this._y = parentWnd.clientHeight-18;
                this._w = parentWnd.clientWidth;
                this._h = 18;
            }else{
                this._x = parentWnd.clientWidth-18;
                this._y =0;
                this._w = 18;
                this._h = parentWnd.clientHeight;
            }
            this._bLeftMouseDown = false;
            this._bRightMouseDown = false;
            this._vw = this._w;
            this._ctx = parentWnd.context;
            this._barClr = "#C1C1C1";
            this._bkClr = "#F1F1F1";
            this._triClr = "#505050";
            this._pos = 0;
            this._page = 0;
            this._view = 0;
            CEventNotifier.On(SBM_PREV_PAGE,this.OnPrevPage);
            CEventNotifier.On(SBM_NEXT_PAGE,this.OnNextPage);
            CEventNotifier.On(SBM_NEW_POS,this.OnNewPos);
        }
        OnSize(wWin:number,hWin:number):void{
            if(this._barStyle == CScrollBarCtrl.SBC_HORZ) {
                this._x = 0;
                this._y = hWin-18;
                this._w = wWin;
                this._h = 18;
            }else{
                this._x = wWin-18;
                this._y = 0;
                this._w = 18;
                this._h = hWin;
            }
        }
        OnNewPos =():void=>{

        };
        OnPrevPage =():void=>{

        };
        OnNextPage =():void=>{

        };
        IsPtInPrevPage(ptMouse:CPoint):boolean{
            return (ptMouse.x >= this._x && ptMouse.x <= this._x + this.BLANK
                && ptMouse.y >= this._y && ptMouse.y <= this._y + this.BLANK
            );
        }
        IsPtInNextPage(ptMouse:CPoint):boolean{
            let rx:number = ptMouse.x+this._w-this.BLANK;
            return (ptMouse.x >= rx && ptMouse.x <= rx + this.BLANK
                && ptMouse.y >= this._y && ptMouse.y <= this._y + this.BLANK );
        }
        IsPtInBar(ptMouse:CPoint):boolean{
            let rx:number = ptMouse.x+this._w-this.BLANK;
            return (ptMouse.x >= this._x+this.BLANK && ptMouse.x <= rx
                && ptMouse.y >= this._y && ptMouse.y <= this._y +this.BLANK
            );
        }
        OnHitTest(ptMouse:CPoint):void{
            if(this._bLeftMouseDown) {
                if(this._barStyle == CScrollBarCtrl.SBC_HORZ){
                    if (this.IsPtInPrevPage(ptMouse)) {
                        CEventNotifier.Trigger(SBM_PREV_PAGE);
                        return;
                    }
                    if(this.IsPtInNextPage(ptMouse)){
                        CEventNotifier.Trigger(SBM_NEXT_PAGE);
                        return;
                    }
                    if(this.IsPtInBar(ptMouse)){
                        CEventNotifier.Trigger(SBM_NEW_POS);
                    }
                }
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
        OnLeftMouseDown(ptMouse:CPoint):void{
            this._bLeftMouseDown = true;
        }
        OnLeftMouseUp(ptMouse:CPoint):void{
            this._bLeftMouseDown = false;
        }
        OnRightMouseDown(ptMouse:CPoint):void{
            this._bRightMouseDown = true;
        }
        OnRightMouseUp(ptMouse:CPoint):void{
            this._bRightMouseDown = false;
        }
        OnMouseMove(ptMouse:CPoint):void{

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
            this._ctx.save();
            this._ctx.translate(0.5,0.5);
            this.DrawBk();
            if(this._barStyle == CScrollBarCtrl.SBC_HORZ) {
                this.DrawLeftTriangle();
                this.DrawRightTriangle();
            }else{
                this.DrawUpTriangle();
                this.DrawDownTriangle();
            }
            this.DrawBar();
            this._ctx.restore();
        }
        protected DrawLeftTriangle():void{
            this._ctx.fillStyle = this._triClr;
            this._ctx.strokeStyle = this._triClr;
            this._ctx.beginPath();
            this._ctx.moveTo(this._x+12,this._y+6);
            this._ctx.lineTo(this._x+12,this._y+this._h-6);
            this._ctx.lineTo(this._x+8,this._y+this._h/2);
            this._ctx.closePath();
            this._ctx.fill();
        }
        protected DrawUpTriangle():void{
            this._ctx.fillStyle = this._triClr;
            this._ctx.strokeStyle = this._triClr;
            this._ctx.beginPath();
            this._ctx.moveTo(this._x+this._w/2,this._y+6);
            this._ctx.lineTo(this._x+4,this._y+10);
            this._ctx.lineTo(this._x+this._w-4,this._y+10);
            this._ctx.closePath();
            this._ctx.fill();
        }
        protected DrawDownTriangle():void{
            this._ctx.fillStyle = this._triClr;
            this._ctx.strokeStyle = this._triClr;
            this._ctx.beginPath();
            this._ctx.moveTo(this._x+this._w/2,this._y+this._h-this.BLANK-12);
            this._ctx.lineTo(this._x+4,this._y+this._h-this.BLANK-16);
            this._ctx.lineTo(this._x+this._w-4,this._y+this._h-this.BLANK-16);
            this._ctx.closePath();
            this._ctx.fill();
        }
        protected DrawRightTriangle():void{
            this._ctx.fillStyle = this._triClr;
            this._ctx.strokeStyle = this._triClr;
            this._ctx.beginPath();
            this._ctx.moveTo(this._x+this._w-this.BLANK-12,this._y+6);
            this._ctx.lineTo(this._x+this._w-this.BLANK-12,this._y+this._h-6);
            this._ctx.lineTo(this._x+this._w-this.BLANK-8,this._y+this._h/2);
            this._ctx.closePath();
            this._ctx.fill();
        }
        protected DrawBk():void{
            this._ctx.fillStyle = this._bkClr;
            this._ctx.fillRect(this._x,this._y,this._w,this._h);
        }
        protected DrawBar():void{
            this._ctx.fillStyle = this._barClr;
            if(this._barStyle == CScrollBarCtrl.SBC_HORZ) {
                let w:number = Math.floor((this._w-40)*(this._view/this._page));
                this._ctx.fillRect(this._x + 18, this._y + 2, w, this._h - 4);
            }else{
                let h:number = Math.floor((this._h-40)*(this._view/this._page));
                this._ctx.fillRect(this._x+2,this._y+18,this._x+2,this._y+18+h);
            }
        }
    }
}
