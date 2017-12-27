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
 * @Date      2017/12/27
 * @Time      09:38
 */

namespace EasySheet{
   export abstract class CDraggable{
        protected inDrag:boolean;
        constructor(){
            this.inDrag=false;
        }
        abstract onDragStart(ptCursor:CPoint):void;
        abstract onDragging(ptCursor:CPoint):void;
        abstract onDragEnd(ptCursor:CPoint):void;
    }
}
