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
/// <reference path="LeftBar.ts"/>
/// <reference path="TopBar.ts"/>
namespace EasySheet {
    export class CTable{
        protected nRow:number;
        protected nCol:number;
        protected leftBar:CLeftBar;//顶部行
        protected topBar:CTopBar;//左侧列
        protected rows:any[];//数据区
        constructor(nRow:number,nCol:number){
            this.nRow=nRow;
            this.nCol=nCol;
            this.leftBar=new CLeftBar(nRow);
            this.topBar=new CTopBar(nCol);
            this.rows=[];
        }
        draw(){
            this.leftBar.draw();
            this.topBar.draw();
            // this.rows.forEach((v)=>{
            //     v.draw();
            // });
        }
    }
}