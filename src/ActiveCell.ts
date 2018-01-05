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
 * @Date      2017/1/5
 * @Time      14:05
 */
namespace EasySheet{
    export class CActiveRange{
        public cellStart:CActiveCell;
        public cellEnd:CActiveCell;
        constructor(cellStart:CActiveCell, cellEnd:CActiveCell){
            this.cellStart = cellStart;
            this.cellEnd = cellEnd;
        }
    }
    export class CActiveCell{
        public iRow:number;
        public iColumn:number;
        constructor(iRow:number,iColumn:number){
            this.iRow = iRow;
            this.iColumn = iColumn;
        }
        Left(){
            this.iRow -= 1;
            if(this.iRow<0){
                this.iRow=0;
            }
        }
        Right(){
            this.iRow += 1;
        }
        Up(){
            this.iColumn -=1;
            if(this.iColumn<0){
                this.iColumn=0;
            }
        }
        Down(){
            this.iColumn +=1;
        }
    }
}
