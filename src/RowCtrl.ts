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
/// <reference path="View.ts"/>
 namespace EasySheet{
     export class CRowCtrl extends CWnd implements IDraggable{
         protected _nRows:number;
         protected _parent:CView;
         protected _rows:number[];
         protected _ctx:CanvasRenderingContext2D;
         protected _cacheCanvas:HTMLCanvasElement;
         protected _cacheCtx:CanvasRenderingContext2D;
         protected _cacheCreated;
         protected _x:number;
         protected _y:number;
         protected _vx:number;
         protected _vy:number;
         protected _vw:number;
         protected _vh:number;
         protected _inDrag:boolean;
         protected _scrollX:number;
         constructor(parentWnd:CView,nRows:number){
             super("es-row-ctrl");
             this._parent = parentWnd;
             this._x=0;
             this._y=0;
             this._vx=0;
             this._vy=0;
             this._vw=0;
             this._vh=0;
             this._nRows = nRows;
             this._rows = [];
             this._scrollX=0;
             this._cacheCreated = false;
             this._ctx = this._parent.context;
             for(let i=0; i<this._nRows;i++){
                 this._rows.push(CELL_HEIGHT);
             }
             this.CreateCacheCtx();
         }
         CreateCacheCtx():void{
             this._cacheCanvas = document.createElement("canvas");
             this._cacheCanvas.width = this.clientWidth;
             this._cacheCanvas.height = this.clientHeight;
             this._cacheCtx = this._cacheCanvas.getContext("2d");
         }
         get clientWidth():number{
             return FIXED_CELL_WIDTH;
         }
         get clientHeight():number{
             return this._nRows*CELL_HEIGHT;
         }
         get x():number{
             return this._x;
         }
         get y():number{
             return this._y;
         }
         OnDragStart(ptCursor:CPoint):void{
            this._inDrag = true;
         }
         OnDragging(ptCursor:CPoint):void{
         }
         OnDragEnd(ptCursor:CPoint):void{
             this._inDrag = false;
         }
         ScrollX(delta:number):void{
             this._scrollX = delta;
             this._vx = delta;
         }
         Draw():void{
             if(!this._cacheCreated){
                 this.DrawInCache();
                 console.log("row cache");
             }
             console.log("row draw 1",now());
             this._ctx.save();
             this._ctx.drawImage(this._cacheCanvas,0,0,this.clientWidth,this.clientHeight,
                 this._vx,this._vy,this.clientWidth,this.clientHeight);
             this._ctx.restore();
             console.log("row draw 2",now());
         }
         DrawInCache():void{
            let hTotal:number=0;
            this._cacheCtx.save();
            this._cacheCtx.fillStyle=CLR_BAR_FILL;
            this._cacheCtx.fillRect(0,0,FIXED_CELL_WIDTH,CELL_HEIGHT*this._nRows);
            this._cacheCtx.fillStyle = CLR_BAR_TEXT;
            this._cacheCtx.strokeStyle = CLR_BAR_SEP;
            this._cacheCtx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
            this._cacheCtx.textBaseline = "middle";
            this._cacheCtx.textAlign = "center";
            this._cacheCtx.beginPath();
            this._rows.forEach((v,i)=>{
                let name:string = ""+i;
                this._ctx.fillText(name, FIXED_CELL_WIDTH / 2, hTotal + CELL_HEIGHT / 2);
                hTotal+=v;
                this._cacheCtx.moveTo(0,hTotal);
                this._cacheCtx.lineTo(FIXED_CELL_WIDTH,hTotal);
            });
            this._cacheCtx.stroke();
            this._cacheCtx.restore();
            this._cacheCreated = true;
         }
         drawDragLine():void{

         }
     }
 }