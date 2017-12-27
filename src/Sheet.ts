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
    export class CSheet{
        protected appId:string;
        protected $app:any;
        protected w:number;
        protected h:number;
        protected canvas:CCanvas;
        protected table:CTable;
        constructor(appId){
            this.appId = appId;
            this.$app = $('#'+appId);
            this.w = this.$app.width();
            this.h = this.$app.height();
            this.canvas = new CCanvas(this.appId,this.w,this.h);
            this.table = new CTable(1000,52);
        }
        run(){
           this.canvas.bootstrap();

        }
    }
}

let ctx:CanvasRenderingContext2D;
let currentSheet:EasySheet.CSheet = new EasySheet.CSheet('#easy-sheet');
currentSheet.run();