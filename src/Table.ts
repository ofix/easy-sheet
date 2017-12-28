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
 * @Time      22:31
 */
/// <reference path="WndLeftBar.ts"/>
/// <reference path="WndTopBar.ts"/>
/// <reference path="WndCorner.ts"/>
/// <reference path="WndData.ts"/>
namespace EasySheet {
    export class CTable{
        protected nRow:number;
        protected nCol:number;
        protected data:CWndData;   // 数据区
        protected corner:CWndCorner;  // 左上角
        protected leftBar:CWndLeftBar;// 顶部行
        protected topBar:CWndTopBar;  // 左侧列
        constructor(nRow:number,nCol:number){
            this.nRow=nRow;
            this.nCol=nCol;
            this.leftBar=new CWndLeftBar(nRow);
            this.topBar=new CWndTopBar(nCol);
            this.corner=new CWndCorner(LEFT_BAR_CELL_WIDTH,BAR_CELL_HEIGHT);
            this.data=new CWndData(nRow,nCol);
        }
        draw(){
            this.leftBar.draw();
            this.topBar.draw();
            this.corner.draw();
            this.data.draw();
        }
    }
}