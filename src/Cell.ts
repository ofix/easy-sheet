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
 * @Date      2017/12/22
 * @Time      10:43
 */
/// <reference path="lib/jquery.d.ts"/>
namespace EasySheet {
    export class CCell{
        protected readonly CELL_NORMAL:number = 1;
        protected readonly CELL_TOP:number = 2;
        protected readonly CELL_LEFT:number = 3;
        protected readonly pTable:any; //指向表格
        protected iRow:number;  //第几行
        protected iCol:number;  //第几列
        protected state:number; //当前状态
        protected x:number; //初始X坐标
        protected y:number; //初始Y坐标
        protected w:number; //宽度
        protected h:number; //高度
        protected fClr:string; //前景色
        protected bClr:string; //背景色
        protected font_size:number; //字体大小
        protected font_bold:boolean; //是否粗体
        protected font_family:string; //字体
        protected text:any;
        protected row:number;  //x轴序号
        protected col:string;  //y轴序号
        protected type:number; //单元格类型
        protected padding:number;//内间距
        constructor(iRow:number,iCol:number,x:number=0,y:number=0,width:number=24,height:number=10){
            this.iRow=iRow;
            this.iCol=iCol;
            this.type = this.CELL_NORMAL;
            this.x = x;
            this.y = y;
            this.w = width;
            this.h = height;
            this.col ='A';
            this.row = 1;
            this.fClr = '#000';
            this.bClr = '#FFF';
            this.font_size = 12;
            this.font_bold = false;
            this.font_family = 'Arial';
            this.text = '';
            this.pTable='';
            this.padding=DEFAULT_CELL_PADDING;
        }
        draw(){

        }
        setPos(iRow:number,iCol:number):void{
            this.iRow=iRow;
            this.iCol=iCol;
        }
        getRow():number{
            return this.row;
        }
        setRow(row:number){
            this.row = row;
        }
        getCol():string{
            return this.col;
        }
        setCol(col:string){
            this.col =col;
        }
        getContent():any{
            return this.text;
        }
        setContent(text:any):void{
            this.text = text;
        }
        getX():number{
            return this.x;
        }
        setX(x:number):void{
            this.x = x;
        }
        getY():number{
            return this.y;
        }
        setY(y:number):void{
            this.y = y;
        }
        getWidth():number{
            return this.w;
        }
        setWidth(width:number):void{
            this.w = width;
        }
        getHeight():number{
            return this.h;
        }
        setHeight(height:number):void{
            this.h = height;
        }
        getBackgroundColor():string{
            return this.bClr;
        }
        setBackgroundColor(color:string):void{
            this.bClr = color;
        }
        getForegroundColor():string{
            return this.fClr;
        }
        setForegroundColor(color:string):void{
            this.fClr = color;
        }
        setFontSize(fontSize:number):void{
            this.font_size = fontSize;
        }
        getFontSize():number{
            return this.font_size;
        }
        setFontFamily(fontFamily:string):void{
            this.font_family = fontFamily;
        }
        getFontFamily():string{
            return this.font_family;
        }
    }
}