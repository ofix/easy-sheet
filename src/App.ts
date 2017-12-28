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
/// <reference path="WndLeftBar.ts"/>
/// <reference path="WndCorner.ts"/>
/// <reference path="WndLeftBar.ts"/>
/// <reference path="WndTopBar.ts"/>
namespace EasySheet {
    export class CApp{
        protected table:CTable;
        constructor(){
            this.table = new CTable(1000,52);
        }
        run(){
           this.table.draw();
           CWndManager.instance().print();
        }
        get wndLeftBar():CWndLeftBar{
           return this.table.wndLeftBar;
        }
        get wndTopBar():CWndTopBar{
            return this.table.wndTopBar;
        }
        get wndCorner():CWndCorner{
            return this.table.wndCorner;
        }
        get wndData():CWndData{
            return this.table.wndData;
        }
    }
}

let ctx:CanvasRenderingContext2D;
let app:EasySheet.CApp = new EasySheet.CApp();
app.run();