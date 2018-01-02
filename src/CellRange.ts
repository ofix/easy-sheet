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
 namespace EasySheet{
     export class CCellRange{
         public rowStartIndex;
         public rowEndIndex;
         public colStartIndex;
         public colEndIndex;
         public xPad;
         public yPad;
         constructor(rowStartIndex:number,rowEndIndex:number,colStartIndex:number,colEndIndex:number,xPad:number,yPad:number){
             this.rowStartIndex = rowStartIndex;
             this.rowEndIndex = rowEndIndex;
             this.colStartIndex = colStartIndex;
             this.colEndIndex = colEndIndex;
             this.xPad = xPad;
             this.yPad = yPad;
         }
     }
 }