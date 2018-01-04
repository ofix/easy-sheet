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