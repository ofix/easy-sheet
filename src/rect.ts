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
 * @Time      23:31
 */
/// <reference path="point.ts"/>
class CRect{
    public x:number;
    public y:number;
    public w:number;
    public h:number;
    constructor(x:number=0,y:number=0,w:number=0,h:number=0){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }
    setRect(ptLeftTop:CPoint,ptRightBottom:CPoint):CRect{
            this.x = ptLeftTop.x;
            this.y = ptLeftTop.y;
            this.w = ptRightBottom.x-ptLeftTop.x;
            this.h = ptRightBottom.y-ptLeftTop.y;
            return this;
    }
}