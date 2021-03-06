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
 * @Time      09:25
 */
/// <reference path="Cell.ts"/>
/// <reference path="Draggable.ts"/>
/// <reference path="Wnd.ts"/>
/// <reference path="Const.ts"/>
/// <reference path="View.ts"/>
/// <reference path="Message.ts"/>
/// <reference path="EventNotifier.ts"/>
 namespace EasySheet{
     import CEventNotifier = Core.CEventNotifier;
     import NM_GRID_SELECT_RANGE = Core.NM_GRID_SELECT_RANGE;
     import NM_GRID_SELECT_CELL = Core.NM_GRID_SELECT_CELL;
     import NM_ROW_DRAGGING = Core.NM_ROW_DRAGGING;
     import NM_ROW_DRAG_START = Core.NM_ROW_DRAG_START;
     import NM_ROW_DRAG_END = Core.NM_ROW_DRAG_END;
     export class CRowCtrl extends CWnd implements IDraggable{
         protected _nRows:number;
         protected _rows:number[];
         protected _ctx:CanvasRenderingContext2D;
         protected _x:number;
         protected _y:number;
         protected _inDrag:boolean;
         protected _dragIndex:number;
         protected _dragDashY:number;
         protected _dragStartY:number;
         protected _visibleRng:CCellRange;
         protected _activeRngList:CActiveCell[][];
         protected _bLeftMouseDown:boolean;
         protected _bRightMouseDown:boolean;
         constructor(nRows:number){
             super("es-row-ctrl");
             let hWin = $(window).height();
             this.CreateWindow("1000",FIXED_CELL_WIDTH,0,FIXED_CELL_WIDTH,hWin,FIXED_CELL_WIDTH,nRows*CELL_HEIGHT,true);
             this._x=0;
             this._y=CELL_HEIGHT;
             this._w=FIXED_CELL_WIDTH;
             this._h=this.clientHeight;
             this._nRows = nRows;
             this._rows = [];
             this._inDrag = false;
             this._dragIndex = -1;
             this._dragDashY = 0;
             this._dragStartY = 0;
             for(let i=0; i<this._nRows;i++){
                 this._rows.push(CELL_HEIGHT);
             }
             this.SetVisibleCellRange();
             this._bLeftMouseDown = false;
             this._bRightMouseDown = false;
             this._activeRngList = [];
             CEventNotifier.On(NM_GRID_SELECT_RANGE,this.OnGridSelectRange);
             CEventNotifier.On(NM_GRID_SELECT_CELL,this.OnGridSelectCell);
         }
         get x():number{
             return this._x;
         }
         get y():number{
             return this._y;
         }
         get visibleRng():CCellRange{
             return this._visibleRng;
         }
         get offsetY():number{
             return CELL_HEIGHT;
         }

         OnSize(wWin:number,hWin:number):void{
            this.Draw();
         }
         OnGridSelectRange = (cellStart:CActiveCell,cellEnd:CActiveCell,bReplace:boolean):void =>{
             if(bReplace){
                 this._activeRngList = [[cellStart,cellEnd]];
             }else{
                 this._activeRngList.push([cellStart,cellEnd]);
             }
         };
         OnGridSelectCell = ():void =>{
             this._activeRngList = [];
         };
         OnDragStart(ptCursor:CPoint,dragIndex:number,dragStartPos:number):void{
            this._inDrag = true;
            this._dragIndex = dragIndex;
            this._dragStartY = dragStartPos;
             CEventNotifier.Trigger(NM_ROW_DRAG_START,this._dragDashY);
         }
         OnDragging(ptCursor:CPoint):void{
             if(this._dragStartY +2 >= ptCursor.y){
                 this._dragDashY = this._dragStartY+2;
             }else{
                 this._dragDashY = ptCursor.y;
             }
             this._rows[this._dragIndex] = this._dragDashY - this._dragStartY;
             CEventNotifier.Trigger(NM_ROW_DRAGGING,this._dragDashY);
         }
         OnDragEnd(ptCursor:CPoint):void{
             this._inDrag = false;
             if(ptCursor.y-2 <this._dragStartY){
                 this._dragDashY = this._dragStartY+2;
             }else{
                 this._dragDashY = ptCursor.y;
             }
             this._rows[this._dragIndex] = this._dragDashY - this._dragStartY;
             CEventNotifier.Trigger(NM_ROW_DRAG_END,this._dragIndex,this._rows[this._dragIndex]);
             this._rows[this._dragIndex] = ptCursor.y - this._dragStartY;
             this._dragIndex = -1;
             this._dragDashY = 0;
             this._dragStartY= 0;
         }
         ScrollX(delta:number):void{
             this._x = delta;
             this.SetVisibleCellRange();
         }
         SetVisibleCellRange():void{
             let scrollY:number = this._y;
             let y:number =0;
             let flag = true;
             let rng = new CCellRange(0,0,0,0,0,0);
             for(let i=0; i<this._nRows;i++){
                 y+= this._rows[i];
                 if(flag && y>= scrollY){
                     rng.rowStartIndex = i;
                     if(scrollY>0) {
                         rng.xPad = scrollY - y;
                     }
                     flag = false;
                 }
                 if(y >= (scrollY+this.clientHeight)){
                     rng.rowEndIndex = i;
                     break;
                 }
             }
             this._visibleRng = rng;
         }
         OnMouseMove(ptMouse:CPoint):void{
             this.OnHitTest(ptMouse);
         }
         OnLeftMouseDown(ptMouse:CPoint):void{
            this._bLeftMouseDown = true;
            this.OnHitTest(ptMouse);
         }
         OnLeftMouseUp(ptMouse:CPoint):void{
            this._bLeftMouseDown = false;
            if (this._inDrag) {
                this.OnDragEnd(ptMouse);
            }
         }
         OnRightMouseDown(ptMouse:CPoint):void{
             this._bRightMouseDown = true;
         }
         OnRightMouseUp(ptMouse:CPoint):void{
             this._bRightMouseDown = false;
         }
         OnHitTest(ptCursor:CPoint):void{
             if(this._bLeftMouseDown) {
                 if(this._inDrag){ //如果当前正在拖拽，需要更新拖拽的位置
                     this.OnDragging(ptCursor);
                 }else {
                     if (ptCursor.x >= 0 && ptCursor.x <= this._w) {
                         let rng: CCellRange = this.visibleRng;
                         let y: number = this.offsetY;
                         for (let i = rng.rowStartIndex; i < rng.rowEndIndex; i++) {
                             if (y + 2 < ptCursor.y && (y + this._rows[i] - 2) > ptCursor.y) {
                                 app.view.gridState = GDS_SELECT_ROW;
                                 app.view.activeColumn = -1;
                                 app.view.activeRow = i;
                                 this._activeRngList = [];
                                 break;
                             }
                             if (ptCursor.y - 2 < y && ptCursor.y + 2 > y) {
                                 if (!this._inDrag) {
                                     this.OnDragStart(ptCursor, i - 1, y - this._rows[i - 1]);
                                     break;
                                 }
                             }
                             y += this._rows[i];
                         }
                     }
                 }
             }else {
                 if (this._inDrag) {
                     this.OnDragEnd(ptCursor);
                 } else {
                     if (ptCursor.x >= 0 && ptCursor.x <= this._w) {
                         let rng: CCellRange = this.visibleRng;
                         let y: number = this.offsetY;
                         for (let i = rng.rowStartIndex; i < rng.rowEndIndex; i++) {
                             y += this._rows[i];
                             if (y - 2 <= ptCursor.y && y + 2 >= ptCursor.y) {
                                 this.ChangeCursor("s-resize");
                                 return;
                             }
                         }
                         this.ChangeCursor("default");
                     }
                 }
             }
         }
         ChangeCursor(cursor:string){
             this._canvas.style.cursor = cursor;
         }
         getColumnY(iRow:number){
             let rng = this.visibleRng;
             let yTotal:number=app.view.colOffset;
             if(iRow>=rng.rowStartIndex&&iRow<=rng.rowEndIndex){
                 for(let i=rng.rowStartIndex;i<=rng.rowEndIndex;i++){
                     if(i== iRow){
                         break;
                     }
                     yTotal+=this._rows[i];
                 }
             }
             return yTotal;
         }
         DrawActiveCell(iRow:number){
             this._ctx.fillStyle = CLR_ACTIVE_COL_FILL;
             this._ctx.strokeStyle = CLR_ACTIVE_COL_BORDER;
             let y:number= this.getColumnY(iRow);
             this._ctx.fillRect(0,y,FIXED_CELL_WIDTH,this._rows[iRow]);
             this._ctx.moveTo(0,y);
             this._ctx.lineTo(FIXED_CELL_WIDTH,y);
             this._ctx.lineTo(FIXED_CELL_WIDTH,y+this._rows[iRow]);
             this._ctx.lineTo(0,y+this._rows[iRow]);
             let name:string= iRow+'';
             this._ctx.fillStyle = CLR_BAR_TEXT;
             this._ctx.fillText(name,FIXED_CELL_WIDTH/2,y+this._rows[iRow]/2);
         }
         Draw():void{
             let rng:CCellRange = this.visibleRng;
             let hTotal:number=this._y;
             this._ctx.save();
             this._ctx.translate(0.5,0.5);
             this._ctx.fillStyle=CLR_BAR_FILL;
             this._ctx.fillRect(this._x,this._y,this._w,this.clientHeight);
             this._ctx.fillStyle = CLR_BAR_TEXT;
             this._ctx.strokeStyle = CLR_BAR_SEP;
             this._ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
             this._ctx.textBaseline = "middle";
             this._ctx.textAlign = "center";
             this._ctx.beginPath();
             let activeRow:number= app.gridCtrl.activeRow;
             for(let i=rng.rowStartIndex; i<rng.rowEndIndex;i++){
                 let name:string = i+"";
                 if(i != activeRow) {
                     this._ctx.fillText(name, this._w / 2, hTotal + this._rows[i]/ 2);
                 }
                 hTotal+=this._rows[i];
                 this._ctx.moveTo(this._x,hTotal);
                 this._ctx.lineTo(this._x+this._w,hTotal);
             }
             this._ctx.moveTo(this._x+this._w,0);
             this._ctx.lineTo(this._x+this._w,this.clientHeight);
             this._ctx.stroke();
             // draw active row
             if(app.view.gridState == GDS_SELECT_CELL) {
                 this.DrawActiveCell(activeRow);
             }else if(app.view.gridState == GDS_SELECT_ROW){
                 this.DrawActiveCell(activeRow);
             }else if(app.view.gridState == GDS_SELECT_COLUMN){
                 for(let j=rng.rowStartIndex;j<rng.rowEndIndex;j++){
                     this.DrawActiveCell(j);
                 }
             }
             // draw active range list
             for(let i=0,len=this._activeRngList.length; i<len;i++){
                 let rng:CActiveCell[] = this._activeRngList[i];
                 let iRowStart:number = Math.min(rng[0].iRow,rng[1].iRow);
                 let iRowEnd:number = Math.max(rng[0].iRow,rng[1].iRow);
                 if(iRowStart >=0 && iRowEnd >=0) {
                     for (let j = iRowStart; j <= iRowEnd; j++) {
                         this.DrawActiveCell(j);
                     }
                 }
             }
             this._ctx.restore();
         }
     }
 }