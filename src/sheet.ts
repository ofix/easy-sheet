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
        constructor(appId){
            this.appId = appId;
            let $app:any = $('#'+appId);
            let width:number  = $app.width();
            let height:number = $app.height();
        }
        draw(){

        }
        drawTopBar(){

        }
        drawLeftBar(){

        }
    }
}

let currentSheet:EasySheet.CSheet = new EasySheet.CSheet('#easy-sheet');
currentSheet.draw();