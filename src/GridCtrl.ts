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
 * @Time      09:20
 */
/// <reference path="Cell.ts"/>
/// <reference path="Draggable.ts"/>
/// <reference path="Wnd.ts"/>
/// <reference path="Const.ts"/>
/// <reference path="Point.ts"/>
/// <reference path="CellRange.ts"/>
/// <reference path="ActiveCell.ts"/>
/// <reference path="State.ts"/>
/// <reference path="EventNotifier.ts"/>
/// <reference path="Message.ts"/>
namespace EasySheet{
    import CEventNotifier = Core.CEventNotifier;
    import NM_GRID_SELECT_RANGE = Core.NM_GRID_SELECT_RANGE;
    import NM_GRID_SELECT_CELL = Core.NM_GRID_SELECT_CELL;
    import NM_ROW_DRAG_START = Core.NM_ROW_DRAG_START;
    import NM_ROW_DRAGGING = Core.NM_ROW_DRAGGING;
    import NM_ROW_DRAG_END = Core.NM_ROW_DRAG_END;
    import NM_COLUMN_DRAG_START = Core.NM_COLUMN_DRAG_START;
    import NM_COLUMN_DRAGGING = Core.NM_COLUMN_DRAGGING;
    import NM_COLUMN_DRAG_END = Core.NM_COLUMN_DRAG_END;
    export class CGridCtrl{
        protected _x:number;
        protected _y:number;
        protected _w:number;
        protected _h:number;
        protected _nRows:number;
        protected _nCols:number;
        protected _rows:any[];
        protected _cols:any[];
        protected _inRowDrag:boolean;
        protected _inColumnDrag:boolean;
        protected _dragDashX:number;
        protected _dragDashY:number;
        protected _parent:CView;
        protected _cacheExist:boolean;
        protected _ctx:CanvasRenderingContext2D;
        protected _cacheCanvas:HTMLCanvasElement;
        protected _cacheCtx:CanvasRenderingContext2D;
        protected _canvasList:any[];
        protected _visibleRng:CCellRange;
        protected _activeCell:CActiveCell;
        protected _activeEndCell:CActiveCell;
        protected _activeRange:CActiveRange[]; // 0 选中整行, -1 没有选中，>0 选中某个单元格
        protected _gridState:number;
        protected _bLeftMouseDown:boolean;
        protected _bRightMouseDown:boolean;
        protected _bSelectCell:boolean;
        protected _bInEdit:boolean;
        protected _cells:string[][];
        protected _lastEditCell:CActiveCell;
        constructor(parentWnd:CView,nRows:number,nCols:number){
            this._parent = parentWnd;
            this._nRows = nRows;
            this._nCols = nCols;
            this._x = 0;
            this._y = 0;
            this._w = nCols*CELL_WIDTH;
            this._h = nRows*CELL_HEIGHT;
            this._rows = [];
            this._cols = [];
            this._canvasList = [];
            this._cacheExist = false;
            this._bLeftMouseDown = false;
            this._bRightMouseDown = false;
            this._bSelectCell = false;
            this._bInEdit = false;
            for(let i=0; i<nRows;i++){
                this._rows.push(CELL_HEIGHT);
            }
            for(let j=0; j<nCols;j++){
                this._cols.push(CELL_WIDTH);
            }
            this._cells = [];
            this._visibleRng = new CCellRange(0,nRows,0,nCols,0,0);
            this._activeCell = new CActiveCell(0,0);
            this._activeEndCell = new CActiveCell(0,0);
            this._lastEditCell = new CActiveCell(0,0);
            this._activeRange = [];
            this._gridState = GDS_SELECT_CELL;
            this._activeRange.push(new CActiveRange(this._activeCell,this._activeCell));
            this._ctx = this._parent.context;
            this.CreateCacheCtx();
            this.MakeCanvasList();
            this._inColumnDrag = false;
            this._inRowDrag = false;
            this._dragDashX = 0;
            this._dragDashY = 0;
            CEventNotifier.On(NM_ROW_DRAG_START,this.OnRowDragStart);
            CEventNotifier.On(NM_ROW_DRAGGING,this.OnRowDragging);
            CEventNotifier.On(NM_ROW_DRAG_END,this.OnRowDragEnd);
            CEventNotifier.On(NM_COLUMN_DRAG_START,this.OnColumnDragStart);
            CEventNotifier.On(NM_COLUMN_DRAGGING,this.OnColumnDragging);
            CEventNotifier.On(NM_COLUMN_DRAG_END,this.OnColumnDragEnd);
        }
        get colOffset():number{
            return this._parent.colOffset;
        }
        get rowOffset():number{
            return this._parent.rowOffset;
        }
        get clientWidth():number{
            return this._parent.clientWidth;
        }
        get clientHeight():number{
            return this._parent.clientHeight;
        }
        get gridState():number{
            return this._gridState;
        }
        get bInEdit():boolean{
            return this._bInEdit;
        }
        set bInEdit(bInEdit:boolean){
            this._bInEdit = bInEdit;
        }
        set gridState(state:number){
            this._gridState = state;
        }
        get activeCell():CActiveCell{
            return this._activeCell;
        }
        get activeRow():number{
            return this._activeCell.iRow;
        }
        set activeRow(iRow:number){
            this._activeCell.iRow = iRow;
        }
        get activeColumn():number{
            return this._activeCell.iCol;
        }
        set activeColumn(iCol:number){
            this._activeCell.iCol = iCol;
        }
        get activeEndRow():number{
            return this._activeEndCell.iRow;
        }
        set activeEndRow(iRow:number){
            this._activeEndCell.iRow = iRow;
        }
        get activeEndColumn():number{
            return this._activeEndCell.iCol;
        }
        set activeEndColumn(iCol:number){
            this._activeEndCell.iCol = iCol;
        }
        SetItemText(iRow:number,iCol:number,text:string):void{
            if(!text){
                return;
            }
            if(!this._cells[iRow]){
                this._cells[iRow] = [];
            }
            this._cells[iRow][iCol] = text;
        }
        GetItemText(iRow:number,iCol:number):string{
            if(this._cells[iRow] && this._cells[iRow][iCol]) {
                return this._cells[iRow][iCol];
            }
            return '';
        }
        MakeCanvasList():void{
            // console.log("make-list 1 ",now());
            // for(let i=0; i<1000;i++) {
            //     let canvas: HTMLCanvasElement;
            //     let ctx: CanvasRenderingContext2D;
            //     canvas = document.createElement("canvas");
            //     canvas.width = this._w;
            //     canvas.height = this._h;
            //     ctx = canvas.getContext("2d");
            //     this._canvasList.push(canvas);
            //     this._canvasList.push(ctx);
            // }
            // console.log("canvas_list = ",this._canvasList.length);
            // console.log("make-list 2 ",now());
        }
        CreateCacheCtx():void{
            this._cacheCanvas = document.createElement("canvas");
            this._cacheCanvas.width = this._w;
            this._cacheCanvas.height = this._h;
            this._cacheCtx = this._cacheCanvas.getContext("2d");
        }
        OnRowDragStart = (dragDashY:number):void=>{
            this._inRowDrag = true;
            this._dragDashY = dragDashY;
            this._parent.Draw();
        };
        OnRowDragging = (dragDashY:number):void=>{
            this._dragDashY = dragDashY;
            this._parent.Draw();
        };
        OnRowDragEnd =(dragRowIndex:number,dragRowHeight:number):void=>{
            this._inRowDrag = false;
            this._rows[dragRowIndex] = dragRowHeight;
            this._parent.Draw();
        };
        OnColumnDragStart = (dragDashX:number):void=>{
            this._inColumnDrag = true;
            this._dragDashX = dragDashX;
            this._parent.Draw();
        };
        OnColumnDragging = (dragDashX:number):void=>{
            this._dragDashX = dragDashX;
            this._parent.Draw();
        };
        OnColumnDragEnd=(dragColumnIndex:number,dragColumnWidth:number):void=>{
            this._inColumnDrag = false;
            this._cols[dragColumnIndex] = dragColumnWidth;
            this._parent.Draw();
        };
        OnKeyDirLeft():void{
            this.gridState = GDS_SELECT_CELL;
            this._activeCell.Left();
        }
        OnKeyDirRight():void{
            this.gridState = GDS_SELECT_CELL;
            this._activeCell.Right();
        }
        OnKeyDirUp():void{
            this.gridState = GDS_SELECT_CELL;
            this._activeCell.Up();
        }
        OnKeyDirDown():void{
            this.gridState = GDS_SELECT_CELL;
            this._activeCell.Down();
        }
        OnMouseMove(ptMouse:CPoint):void{
            if(this._bLeftMouseDown){
                this._bSelectCell = false;
                let pos:CPos = this.GetCellPos(ptMouse);
                this._activeEndCell.iRow = pos.iRow;
                this._activeEndCell.iCol = pos.iCol;
                this.gridState = GDS_SELECT_RANGE;
                CEventNotifier.Trigger(NM_GRID_SELECT_RANGE,this._activeCell,this._activeEndCell,true);
            }
        }
        OnEnterEdit(ptMouse:CPoint):void{
            if(ptMouse.x <= this._parent.rowOffset || ptMouse.y <= this._parent.colOffset){
                return;
            }
            this.bInEdit = true;
        }
        OnLeaveEdit():void{
            this.bInEdit = false;
            this._lastEditCell = this._activeCell;
            let $cell = $('#es-editable-cell');
            let text:string = $cell.text();
            this.SetItemText(this._lastEditCell.iRow,this._lastEditCell.iCol,text);
            $cell.empty().hide();
        }
        OnLeftMouseDown(ptMouse:CPoint):void{
            //因为GridCtrl上面是ColumnCtrl和RowCtrl
            if(ptMouse.x <= this._parent.rowOffset || ptMouse.y <= this._parent.colOffset){
                return;
            }
            this.OnLeaveEdit();
            this._bLeftMouseDown = true;
            let pos:CPos = this.GetCellPos(ptMouse);
            this._activeCell.iRow = pos.iRow;
            this._activeCell.iCol = pos.iCol;
            if( pos.iRow!= -1 || pos.iCol != -1){
                this.gridState = GDS_SELECT_CELL;
                CEventNotifier.Trigger(NM_GRID_SELECT_CELL);
            }
        }
        OnLeftMouseUp(ptMouse:CPoint):void{
            this._bLeftMouseDown = false;
        }
        OnRightMouseDown(ptMouse:CPoint):void{
            this._bRightMouseDown = false;
        }
        OnRightMouseUp(ptMouse:CPoint):void{
            this._bRightMouseDown = true;
        }
        GetRowWidth():number{
            return this._w;
        }
        GetColHeight():number{
            return this._h;
        }
        GetCellPos(ptCursor:CPoint):CPos{
            for(let i= this._visibleRng.rowStartIndex; i<this._visibleRng.rowEndIndex; i++){
                for(let j=this._visibleRng.colStartIndex; j<this._visibleRng.colEndIndex; j++){
                    let pt = this.GetItemXY(i,j);
                    pt.x = pt.x-this._x;
                    pt.y = pt.y-this._y;
                    let w = this._cols[j];
                    let h = this._rows[i];
                    if(IsPtInRect(ptCursor,pt.x,pt.y,w,h)){
                        return new CPos(i,j);
                    }
                }
            }
            return new CPos(-1,-1);
        }
        GetItemXY(iRow:number,iCol:number):CPoint{
            let pt = new CPoint(this.rowOffset,this.colOffset);
            for(let i=0; i<iCol;i++){
                pt.x += this._cols[i];
            }
            for(let j=0; j<iRow; j++){
                pt.y += this._rows[j];
            }
            return pt;
        }
        //利用图片函数滚动窗口
        ScrollWindow(deltaX:number,deltaY:number):void{
            this._x = this._x+deltaX;
            this._y = this._y+deltaY;
            if((deltaX>0) || ((deltaY>0) && (deltaY<this.clientHeight))) {
                this.Draw();
            }
        }
        GetVisibleCellRange():CCellRange{
            let xOffset:number = this._x;
            let yOffset:number = this._y;
            let x:number =0;
            let y:number =0;
            let flagX = true;
            let flagY = true;
            let rng = new CCellRange(0,0,0,0,0,0);
            for(let i=0; i<this._nRows;i++){
                x+= this._rows[i];
                if(flagX && x>= xOffset){
                    rng.rowStartIndex = i;
                    if(xOffset >0) {
                        rng.xPad = xOffset - x;
                    }
                    flagX = false;
                }
                if(x >=(xOffset+this.clientHeight)){
                    rng.rowEndIndex = i;
                    break;
                }
            }

            for(let j=0; j<this._nCols;j++){
                y+=this._cols[j];
                if(flagY && y>=yOffset){
                    rng.colStartIndex = j;
                    if(yOffset>0) {
                        rng.yPad = yOffset - y;
                    }
                    flagY = false;
                }
                if(y>=(yOffset+this.clientWidth)){
                    rng.colEndIndex = j;
                    break;
                }
            }
            this._visibleRng = rng;
            return rng;
        }
        Draw():void{
            let rng:CCellRange = this.GetVisibleCellRange();
            this.DrawVisibleCellRange(rng);
        }
        static editableCell():HTMLDivElement{
            let $cell = $('#es-editable-cell');
            if($cell.length == 0) {
                let editor: HTMLDivElement = document.createElement('div');
                editor.contentEditable = 'true';
                editor.style.position = "fixed";
                editor.style.border = "2px solid #000";
                editor.style.zIndex = "100000";
                editor.style.whiteSpace = "nowrap";
                editor.style.fontSize = DEFAULT_FONT_SIZE + 'px';
                editor.style.fontFamily = 'Aerial';
                editor.style.verticalAlign = 'middle';
                editor.style.outline = 'none';
                editor.style.webkitAppearance = 'none';
                editor.style.background = "#FFF";
                editor.id = "es-editable-cell";
                document.body.appendChild(editor);
                return editor;
            }else{
                $cell.show();
                return <HTMLDivElement>document.getElementById('es-editable-cell');
            }
        }
        DrawVisibleCellRange(rng:CCellRange):void{
            let x:number = rng.xPad+this.rowOffset;
            let y:number = rng.yPad+this.colOffset;
            this._ctx.save();
            this._ctx.translate(rng.xPad+0.5,rng.yPad+0.5);
            // Fill Background
            this._ctx.beginPath();
            this._ctx.fillStyle = "#FFF";
            this._ctx.fillRect(0,0,this.clientWidth,this.clientHeight);
            this._ctx.strokeStyle = "#C5C5C5";
            this._ctx.closePath();

            // // Draw Row Lines
            this._ctx.beginPath();
            for(let i=rng.rowStartIndex; i<rng.rowEndIndex;i++){
                this._ctx.moveTo(x,y+this._rows[i]);
                this._ctx.lineTo(x+this.clientWidth,y+this._rows[i]);
                y += this._rows[i];
            }
            // // Draw Column Lines
            for(let j=rng.colStartIndex;j<rng.colEndIndex;j++){
                this._ctx.moveTo(x+this._cols[j],0);
                this._ctx.lineTo(x+this._cols[j],this.clientHeight);
                x += this._cols[j];
            }
            this._ctx.stroke();
            // // Draw Grid Cells
            this._ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
            this._ctx.textBaseline="middle";
            this._ctx.textAlign = "left";
            for(let i=rng.rowStartIndex; i<rng.rowEndIndex; i++){
                for(let j=rng.colStartIndex; j<rng.colEndIndex; j++){
                    let pt = this.GetItemXY(i,j);
                    let text = this.GetItemText(i,j);
                    if(text) {
                        let wText:number = this._ctx.measureText(text).width;
                        this._ctx.fillStyle = "#FFF";
                        this._ctx.fillRect(pt.x+1, pt.y+1, wText, this._rows[i]-2);
                        this._ctx.fillStyle = "#000";
                        this._ctx.fillText(text, pt.x+3, pt.y+CELL_HEIGHT/2);
                    }
                }
            }
            // Draw Active Cell
            if(this.gridState === GDS_SELECT_CELL) {
                if (this.activeRow != -1 && this.activeColumn != -1) {
                    let pt = this.GetItemXY(this.activeRow, this.activeColumn);
                    let w = this._cols[this.activeColumn];
                    let h = this._rows[this.activeRow];
                    this._ctx.strokeStyle = CLR_ACTIVE_CELL;
                    this._ctx.lineWidth = 3;
                    this._ctx.strokeRect(pt.x, pt.y, w, h);
                    // Draw Active Copy Anchor
                    this._ctx.strokeStyle = '#FFFFFF';
                    this._ctx.lineWidth = 2;
                    this._ctx.fillStyle = CLR_ACTIVE_CELL;
                    this._ctx.fillRect(pt.x + w - 3, pt.y + h - 3, 6, 6);
                    this._ctx.strokeRect(pt.x + w - 3, pt.y + h - 3, 6, 6);
                }
            }
            // Draw active row
            if(this.gridState === GDS_SELECT_ROW){
                let pt:CPoint = this.GetItemXY(this.activeRow,rng.colStartIndex);
                this._ctx.fillStyle = "rgba(234,236,245,0.25)";
                this._ctx.strokeStyle = CLR_ACTIVE_CELL;
                this._ctx.lineWidth = 3;
                this._ctx.fillRect(pt.x,pt.y,this.clientWidth,this._rows[this.activeRow]);
                this._ctx.strokeRect(pt.x,pt.y,this.clientWidth,this._rows[this.activeRow]);
                // Draw Active Copy Anchor
                this._ctx.strokeStyle = '#FFFFFF';
                this._ctx.lineWidth = 2;
                this._ctx.fillStyle = CLR_ACTIVE_CELL;
                this._ctx.fillRect(pt.x, pt.y+this._rows[this.activeRow], 6, 6);
                this._ctx.strokeRect(pt.x,pt.y+this._rows[this.activeRow], 6, 6);
            }
            // Draw active column
            if(this.gridState === GDS_SELECT_COLUMN){
                let pt:CPoint = this.GetItemXY(rng.rowStartIndex,this.activeColumn);
                this._ctx.fillStyle = "rgba(234,236,245,0.25)";
                this._ctx.strokeStyle = CLR_ACTIVE_CELL;
                this._ctx.lineWidth = 3;
                this._ctx.fillRect(pt.x,pt.y,this._cols[this.activeColumn],this.clientHeight);
                this._ctx.strokeRect(pt.x,pt.y,this._cols[this.activeColumn],this.clientHeight);
                // Draw Active Copy Anchor
                this._ctx.strokeStyle = '#FFFFFF';
                this._ctx.lineWidth = 2;
                this._ctx.fillStyle = CLR_ACTIVE_CELL;
                this._ctx.fillRect(pt.x+this._cols[this.activeColumn],pt.y,6, 6);
                this._ctx.strokeRect(pt.x+this._cols[this.activeColumn],pt.y,6, 6);
            }
            if(this.gridState === GDS_SELECT_RANGE){
                let rowStart = Math.min(this.activeRow,this.activeEndRow);
                let colStart = Math.min(this.activeColumn,this.activeEndColumn);
                let rowEnd = Math.max(this.activeRow,this.activeEndRow);
                let colEnd = Math.max(this.activeColumn,this.activeEndColumn);
                let pt1 = this.GetItemXY(rowStart, colStart);
                let pt2 = this.GetItemXY(rowEnd,colEnd);
                let w = pt2.x-pt1.x + this._cols[colEnd];
                let h = pt2.y-pt1.y + this._rows[rowEnd];
                this._ctx.strokeStyle = CLR_ACTIVE_CELL;
                this._ctx.lineWidth = 3;
                this._ctx.strokeRect(pt1.x, pt1.y, w, h);
                // Draw Active Copy Anchor
                this._ctx.strokeStyle = '#FFFFFF';
                this._ctx.lineWidth = 2;
                this._ctx.fillStyle = CLR_ACTIVE_CELL;
                this._ctx.fillRect(pt1.x + w - 3, pt1.y + h - 3, 6, 6);
                this._ctx.strokeRect(pt1.x + w - 3, pt1.y + h - 3, 6, 6);
            }
            if(this.bInEdit){
                let editor:HTMLDivElement = CGridCtrl.editableCell();
                let pt: CPoint = this.GetItemXY(this.activeRow, this.activeColumn);
                let w: number = this._cols[this.activeColumn];
                let h: number = this._rows[this.activeRow];
                editor.style.left = pt.x-1 + "px";
                editor.style.top = pt.y-1 + "px";
                editor.style.width = w-1 + "px";
                editor.style.height = h + "px";
            }
            // draw column drag dash line
            if(this._inColumnDrag) {
                this._ctx.strokeStyle = CLR_BAR_SEP;
                let hWin = $(window).height();
                drawDashLine(this._ctx, this._dragDashX, 0, this._dragDashX, hWin, 5);
            }
            // draw row drag dash line
            if(this._inRowDrag) {
                this._ctx.strokeStyle = CLR_BAR_SEP;
                let wWin = $(window).width();
                drawDashLine(this._ctx, 0,this._dragDashY, wWin, this._dragDashY, 5);
            }
            this._ctx.restore();
        }
    }
}