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
interface IRect{
    x:number;
    y:number;
    w:number;
    h:number;
}
class CRect implements IRect{
    public x:number;
    public y:number;
    public w:number;
    public h:number;
    constructor(x:number,y:number,w:number,h:number){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }
    constructor(ptLeftTop:IPoint={x:0,y:0},ptRightBottom:IPoint={x:0,y:0}){
            this.x = ptLeftTop.x;
            this.y = ptLeftTop.y;
            this.w = ptRightBottom.x-ptLeftTop.x;
            this.h = ptRightBottom.y-ptLeftTop.y;
    }
}