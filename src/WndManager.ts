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
 * @Time      13:59
 */
/// <reference path="Wnd.ts"/>
namespace EasySheet{
    export class CWndManager{
        protected static _instance:CWndManager= null;
        protected wndList:CWnd[];
        protected topMostWndList:CWnd[];
        private constructor() {
            this.wndList = [];
            this.topMostWndList = [];
        }
        static instance(){
            if(CWndManager._instance === null){
                CWndManager._instance = new CWndManager();
            }
            return CWndManager._instance;
        }
        registerWnd(wnd:CWnd):void{
            this.wndList.push(wnd);
        }
        setWndTopMost(wnd:CWnd):void{
            if(this.isWndExist(wnd)){

            }else {
                this.topMostWndList.unshift(wnd);
            }
        }
        isWndExist(wnd:CWnd){
            let exist:boolean = false;
            for(let i=0,len=this.wndList.length; i<len;i++){
                if(this.wndList[i].name == wnd.name){
                    exist = true;
                    break;
                }
            }
            return exist;
        }
    }
}

