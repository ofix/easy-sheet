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
 * @Time      20:51
 */
/// <reference path="Wnd.ts"/>
namespace EasySheet{
    export class CCorner{
        protected wnd:CWnd;
        protected ctx:CanvasRenderingContext2D;
        protected x:number;
        protected y:number;
        protected w:number;
        protected h:number;
        constructor(width:number,height:number){
            this.x = 0;
            this.y = 0;
            this.w = width;
            this.h = height;
            this.wnd = new CWnd("corner","999",0,0,LEFT_BAR_CELL_WIDTH,BAR_CELL_HEIGHT,true);
            this.ctx = this.wnd.context;
        }
        draw(){
            let ctx = this.ctx;
            ctx.save();
            ctx.strokeRect(this.x,this.y,this.w,this.h);
            ctx.restore();
        }
    }
}
