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
 * @Date      2017/12/23
 * @Time      23:36
 */
/// <reference path="Point.ts"/>
/// <reference path="Rect.ts"/>
/// <reference path="App.ts"/>

function isPointInRect(pt:CPoint,rect:CRect):boolean{
     return ((pt.x >= rect.x) && (pt.x <= rect.x + rect.w)
        && (pt.y>=rect.y) && (pt.y <= rect.y+rect.h));
}
function IsPtInRect(pt:CPoint, xStart:number, yStart:number, width:number, height:number){
    return ((pt.x >= xStart) && (pt.x <= xStart + width )&&
    (pt.y >= yStart) && (pt.y < yStart + height));
}
function ScreenToClient(pt:CPoint){
    pt.x -= app.view.rowOffset;
    pt.y -= app.view.colOffset;
    return pt;
}
function drawDashLine(ctx:CanvasRenderingContext2D, x1:number, y1:number, x2:number, y2:number, dashLength:number) {
    let dashLen: number = dashLength === undefined ? 5 : dashLength,
        xPos: number = x2 - x1, //得到横向的宽度;
        yPos: number = y2 - y1, //得到纵向的高度;
        numDashes = Math.floor(Math.sqrt(xPos * xPos + yPos * yPos) / dashLen);
    ctx.beginPath();
    ctx.lineWidth = 1;
    //利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
    for (let i = 0; i < numDashes; i++) {
        if (i % 2 === 0) {
            ctx.moveTo(x1 + (xPos / numDashes) * i, y1 + (yPos / numDashes) * i);
            //有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
        } else {
            ctx.lineTo(x1 + (xPos / numDashes) * i, y1 + (yPos / numDashes) * i);
        }
    }
    ctx.stroke();
}
function ClientToScreen(pt:CPoint){
    pt.x += app.view.rowOffset;
    pt.y += app.view.colOffset;
    return pt;
}
function isRectEmpty(rect:CRect):boolean{
    return (rect.w==0 || rect.h==0);
}
function makeRect(pt1:CPoint,pt2:CPoint):CRect{
    let ptTopLeft:CPoint;
    let ptRightBottom:CPoint;
    if((pt1.x>=pt2.x)&&(pt1.y>=pt2.y)){
        ptTopLeft = pt1;
        ptRightBottom =pt2;
    }else if((pt1.x>=pt2.x)&&(pt1.y<=pt2.y)){
        ptTopLeft = new CPoint(pt2.x,pt1.y);
        ptRightBottom = new CPoint(pt1.x,pt2.y);
    }else if((pt1.x<=pt2.x)&&(pt1.y>=pt2.y)){
        ptTopLeft = new CPoint(pt1.x,pt2.y);
        ptRightBottom = new CPoint(pt2.x,pt1.y);
    }else if((pt1.x<=pt2.x)&&(pt1.y<=pt2.y)){
        ptTopLeft = pt2;
        ptRightBottom = pt1;
    }
    return (new CRect()).setRect(ptTopLeft,ptRightBottom);
}
function now():string{
    let date:Date = new Date();
    let hour:string = padZero(date.getHours());
    let minute:string = padZero(date.getMinutes());
    let second:string = padZero(date.getSeconds());
    let millSecond:string = padZero(date.getMilliseconds());
    return (hour+":"+minute+":"+second+":"+millSecond);
}
function padZero(digit:number):string{
    if(digit<10){
        return "0"+digit;
    }
    return digit+"";
}
function sameSign(x:number,y:number){
    return ((x<0 && y<0) ||(x>0 && y>0));
}