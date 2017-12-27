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
        protected x:number;
        protected y:number;
        protected w:number;
        protected h:number;
        protected bFixed:boolean;
        protected zIndex:string;
        protected canvas:HTMLCanvasElement;
        protected render2D:CanvasRenderingContext2D;
        constructor(name:string,zIndex:string,x:number,y:number,width:number,height:number,bFixed:boolean=false) {
            this.x=x;
            this.y=y;
            this.w = width;
            this.h = height;
            this._name = name;
            this.zIndex = zIndex;
            this.bFixed = bFixed;
            this.createCanvas();
        }
        get name():string{
            return this._name;
        }
        createCanvas(): void {
            this.canvas = document.createElement('canvas');
            this.canvas.id = this.name;
            this.canvas.style.position = this.bFixed?"fixed":"absolute";
            this.canvas.style.left = this.x+"px";
            this.canvas.style.top = this.y+"px";
            this.canvas.style.zIndex = this.zIndex;
            this.canvas.width = this.w;
            this.canvas.height = this.h;
            document.body.appendChild(this.canvas);
            CWndManager.instance().registerWnd(this);
            this.render2D = this.canvas.getContext("2d");
            this.render2D.translate(0.5,0.5);
        }
        get context():CanvasRenderingContext2D{
            return this.render2D;
        }
    }
}
