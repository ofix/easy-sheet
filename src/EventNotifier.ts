/*
 * CEventNotify file is part of EasySheet.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author    code lighter
 * @copyright https://github.com/ofix
 * @qq        981326632
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 * @Date      2018/1/5
 * @Time      22:43
 */
namespace Core{
     export class CEventNotifier{
        protected static _handlers:Function[][] = [];
        static AddListener(type:number,callback:Function){
            if(CEventNotifier._handlers.length<type){
                CEventNotifier._handlers.length = type;
            }
            if(typeof CEventNotifier._handlers[type] == "undefined"){
                CEventNotifier._handlers[type] = [];
            }
            CEventNotifier._handlers[type].push(callback);
        }
        static RemoveListener(type:number,callback:Function){
            let events:Function[] = CEventNotifier._handlers[type];
            for(let i=0,len=events.length; i<len;i++){
                if(events[i] == callback){
                    events.splice(i,1);
                    break;
                }
            }
        }
        static Trigger(type:number,...data){
            if (CEventNotifier._handlers[type] instanceof Array) {
                let handlers:Function[] = CEventNotifier._handlers[type];
                for (let i = 0, len = handlers.length; i < len; i++) {
                    handlers[i].apply(this, data);
                }
            }
        }
        static On(type:number,callback:Function){
            CEventNotifier.AddListener(type,callback);
        }
        static Off(type:number,callback:Function){
            CEventNotifier.RemoveListener(type,callback);
        }
    }
 }