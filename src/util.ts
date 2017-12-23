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
/// <reference path="point.ts"/>
/// <reference path="rect.ts"/>

function isPointInRect(pt:CPoint,rect:CRect):boolean{
     return (pt.x >= rect.x && pt.x <= rect.x
        && pt.y>=rect.y && pt.y <= rect.y);
}
function isRectEmpty(rect:CRect):boolean{
    return (rect.w==0 || rect.h==0);
}
function makeRect(pt1:CPoint,pt2:CPoint):CRect{
    let ptTopLeft:CPoint;
    let ptRightBottom:CPoint;
    if(pt1.x>pt2.x){
        ptTopLeft = pt2;
        ptRightBottom =pt1;
    }
}