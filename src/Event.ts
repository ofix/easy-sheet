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
 * @Date      2017/12/28
 * @Time      11:00
 */
/// <reference path="lib/jquery.d.ts"/>
$(function(){
    $(document).on("mousewheel","#wnd-left-bar",function(event, delta){
        app.wndLeftBar.onScroll(delta);
        if(delta>0) {
            console.log("向上滚动");
        }else{
            console.log("向下滚动");
        }
    });
    $(document).on("scroll","#wnd-data",function(){
        console.log("我在滚动 wnd-data!");
    });
    $(document).on('click','#wnd-left-bar',function(){
       console.log("wozai 单击");
    });
});

