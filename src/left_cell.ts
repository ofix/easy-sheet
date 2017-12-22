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
/// <reference path="cell.ts"/>
namespace EasySheet {
    export class CLeftCell extends CCell{
        constructor(x:number=0,y:number=0,width:number=24,height:number=10){
           super(x,y,width,height);
           this.type = this.CELL_LEFT;
        }
    }
}