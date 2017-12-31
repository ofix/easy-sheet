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
 * @Time      13:59
 */
/// <reference path="WndManager.ts"/>
namespace EasySheet{
    export class CWnd{
        protected _name:string;
        protected _x:number;
        protected _y:number;
        protected _w:number;
        protected _h:number;
        protected _clientW:number;
        protected _clientH:number;
        protected _bFixed:boolean;
        protected _zIndex:string;
        protected _div:HTMLDivElement;
        protected _canvas:HTMLCanvasElement;
        protected _ctx:CanvasRenderingContext2D;
        constructor(name:string){
            this._name = name;
        }
        CreateWindow(zIndex:string,x:number,y:number,clientWidth:number,clientHeight:number,width:number,height:number,bFixed:boolean=false) {
            this._x=x;
            this._y=y;
            this._w = width;
            this._h = height;
            this._clientW = clientWidth;
            this._clientH = clientHeight;
            this._zIndex = zIndex;
            this._bFixed = bFixed;
            this.CreateCanvas();
        }
        get x():number{
            return this._x;
        }
        get y():number{
            return this._y;
        }
        get width():number{
            return this._w;
        }
        get height():number{
            return this._h;
        }
        get clientWidth():number{
            return this._clientW;
        }
        get clientHeight():number{
            return this._clientH;
        }
        get zIndex():string{
            return this._zIndex;
        }
        get name():string{
            return this._name;
        }
        get visualHeight():number{
            return this._div.clientHeight;
        }
        get contentHeight():number{
            return this._h;
        }
        get context():CanvasRenderingContext2D{
            return this._ctx;
        }
        CreateCanvas(): void {
            this._div = document.createElement('div');
            this._div.id = 'd-'+this.name;
            this._div.style.position = this._bFixed?"fixed":"absolute";
            this._div.style.left = this._x+"px";
            this._div.style.top = this._y+"px";
            this._div.style.zIndex = this._zIndex;

            this._canvas = document.createElement('canvas');
            this._canvas.id = this.name;
            this._canvas.style.position = "relative";
            this._canvas.style.left ="0px";
            this._canvas.style.top = "0px";
            this._canvas.width = this._w;
            this._canvas.height = this._h;
            this._div.appendChild(this._canvas);
            document.body.appendChild(this._div);
            CWndManager.instance().registerWnd(this);
            this._ctx = this._canvas.getContext("2d");
        }
    }
}

