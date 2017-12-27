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
/// <reference path="Table.ts"/>
/// <reference path="Wnd.ts"/>
namespace EasySheet {
    export class CSheet{
        protected w:number;
        protected h:number;
        protected wnd:CWnd;
        protected ctx:CanvasRenderingContext2D;
        protected table:CTable;
        constructor(){
            this.wnd = new CWnd("easy-sheet","100",LEFT_BAR_CELL_WIDTH,BAR_CELL_HEIGHT,4500,9000);
            this.ctx = this.wnd.context;
            this.table = new CTable(1000,52);
        }
        run(){
           this.table.draw();
           CWndManager.instance().print();
        }
    }
}

let ctx:CanvasRenderingContext2D;
let currentSheet:EasySheet.CSheet = new EasySheet.CSheet();
currentSheet.run();