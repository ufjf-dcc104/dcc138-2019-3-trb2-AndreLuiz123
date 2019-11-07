function Map(modelo) {
    exemplo = {
        cells: [],
        LINES: 32,
        COLUMNS: 32,
        SIZE: 32,
        m:undefined
    }
    Object.assign(this, exemplo, modelo);
    for (var c = 0; c < this.COLUMNS; c++) {
        this.cells[c] = [];
        for (var l = 0; l < this.LINES; l++) {
            exemplo.cells[c][l] = { tipo: 0 };
           
        }
    }
    if (modelo.m) {
        for (var c = 0; c < this.COLUMNS; c++) {
            for (var l = 0; l < this.LINES; l++) {
                this.cells[c][l] = { tipo: modelo.m[l][c] };
            }
        }
    }
}

Map.prototype.desenhar = function (ctx){
    var cor = "black";
    for (var c = 0; c < this.COLUMNS; c++) {
        for (var l = 0; l < this.LINES; l++) {
            switch (this.cells[c][l].tipo) {
                case 0:
                    cor = "tan";
                    break;
                case 1:
                    cor = "darkgrey";
                    break;
                case 2:
                    cor = "red";
                    break;
                case 3:
                    cor = "blue";
                    break;
                case 4:
                    cor = "brown";
                    break;
                default:
                    cor = "black";
            }
            ctx.fillStyle = cor;
            ctx.fillRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
            ctx.strokeStyle = "black";
            ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
        }
    }
}

Map.prototype.voltaCelulaNormal = function(mc, ml, tempoRestante){

    if(this.cells[mc][ml].tipo ===3 && tempoRestante<=0)
    {
        this.cells[mc][ml].tipo = 0;
    } 
}