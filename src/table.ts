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
/// <reference path="lib/jquery.d.ts"/>
namespace EasySheet {
    export class CTable{
        protected nRow:number;
        protected nCol:number;
        protected dRows:any[];
        protected readonly DEFAULT_ROWS:number = 1000;
        protected readonly DEFAULT_COLS:number = 52;
        constructor(nRow:number,nCol:number){
            this.nRow = nRow;
            this.nCol = nCol;
        }
    }
}