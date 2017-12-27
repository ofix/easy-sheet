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
 * @Time      9:56
 */
namespace EasySheet{
    export class CCanvas{
        id:string;
        canvas:HTMLCanvasElement;
        render2D:CanvasRenderingContext2D;
        width:number;
        height:number;
        constructor(id:string,width:number,height:number) {
            this.id = id;
            this.width = width;
            this.height = height;
        }
        getRender2D(){
            return this.render2D;
        }
        createCanvas(width: number, height: number): void {
            this.canvas = <HTMLCanvasElement>document.getElementById(this.id);
            this.canvas.width = width;
            this.canvas.height = height;
            document.body.appendChild(this.canvas);
        }
        clear(){
            this.render2D.fillStyle = "#FFF";
            this.render2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        bootstrap(){
            this.createCanvas(this.width,this.height);
            this.render2D = this.canvas.getContext("2d");
            this.clear();
            ctx = this.render2D;
        }
    }
}

