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
/// <reference path="app.ts"/>
/// <reference path="Point.ts"/>
/// <reference path="Keyboard.ts"/>
import KEY = EasySheet.KEY;
$(function(){
    $(window).resize(function() {
        app.OnSize();
    });
    $(document).on("mousemove","#es-view",function(e){
       let pt:CPoint = new CPoint(e.pageX,e.pageY);
       app.view.OnMouseMove(pt);
    });
    $(document).on("mousemove","#es-col-ctrl",function(e){
        let pt:CPoint = new CPoint(e.pageX,e.pageY);
        app.view.OnMouseMove(pt);
    });
    $(document).on("mousedown","#es-view",function(e){
        let pt:CPoint = new CPoint(e.pageX,e.pageY);
        if(e.button == 0){
            app.view.OnLeftMouseDown(pt);
        }else if(e.button == 2){
            app.view.OnRightMouseDown(pt);
        }
    });
    $(document).on("mouseup","#es-view",function(e){
        let pt:CPoint = new CPoint(e.pageX,e.pageY);
        if(e.button == 0){
            app.view.OnLeftMouseUp(pt);
        }else if(e.button == 2){
            app.view.OnRightMouseUp(pt);
        }
    });
    $(document).on("dblclick","#es-view",function(e){
        let pt:CPoint = new CPoint(e.pageX,e.pageY);
        if(e.button == 0){
            app.view.OnDblClick(pt);
        }else if(e.button == 2){
        }
    });
    $(document).on('char',"#es-view",function(e){
       console.log(JSON.stringify(e));
    });
    $(document).on("mousedown","#es-col-ctrl",function(e){
        let pt:CPoint = new CPoint(e.pageX,e.pageY);
        if(e.button == 0){
            app.view.OnLeftMouseDown(pt);
        }else if(e.button == 2){
            app.view.OnRightMouseDown(pt);
        }
    });
    $(document).on("keydown","body",function(e){
       switch(e.keyCode){
           case KEY.LEFT:
               app.view.OnKeyDirLeft();
               break;
           case KEY.RIGHT:
               app.view.OnKeyDirRight();
               break;
           case KEY.UP:
               app.view.OnKeyDirUp();
               break;
           case KEY.DOWN:
               app.view.OnKeyDirDown();
               break;
           default:
               break;
       }
    });
    $(document).on("keyup","#es-view",function(e){

    });


});

