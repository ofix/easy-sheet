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
    $("#d-es-view").scroll(function(){
        let scrollLeft:number = $('#d-es-view').scrollLeft();
        console.log("before_scroll",now());
        app.view.ScrollX(scrollLeft);
        app.view.Draw();
        console.log("after_scroll",now());
    });
});

