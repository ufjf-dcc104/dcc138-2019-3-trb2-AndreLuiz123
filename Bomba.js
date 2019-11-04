function Bomba(modelo){
    exemplo = {
        x : -10,
        y : -10,
        raio: 16,
        alcance: 3,
        mc : -1,
        ml : -1,
        grid: undefined,
        tempoExplosao: 0
    }

    Object.assign(this, exemplo, modelo);
}

Bomba.prototype.desenhar = function(ctx){
    if(this.x>0 && this.y>0){
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}

Bomba.prototype.explodir = function(){
    for(var i = 0; i<this.alcance; i++)
    {
        if(this.mc+i<8 && this.grid.cells[this.mc+i][this.ml].tipo != 1)
            this.grid.cells[this.mc+i][this.ml].tipo = 2;
        else
        break;
    }

    for(var i = 0; i<this.alcance; i++)
    {
        if(this.mc-i>=0 && this.grid.cells[this.mc-i][this.ml].tipo != 1)
            this.grid.cells[this.mc-i][this.ml].tipo = 2;
        else
        break;
    }

    for(var i = 0; i<this.alcance; i++)
    {
        if(this.ml+i<8 && this.grid.cells[this.mc][this.ml+i].tipo != 1)
            this.grid.cells[this.mc][this.ml+i].tipo = 2;
        else
        break;
    }

    for(var i = 0; i<this.alcance; i++)
    {
        if(this.ml-i>=0 && this.grid.cells[this.mc][this.ml-i].tipo != 1)
            this.grid.cells[this.mc][this.ml-i].tipo = 2;
        else
        break;
    }
}

Bomba.prototype.processoExplosao = function(dt){
    if(this.x>0 && this.y>0)
        this.tempoExplosao-=dt;
    
    if(this.tempoExplosao <=0 && this.x>0 && this.y>0)
    {
        this.explodir();
        this.x = -10;
        this.y = -10;
    }

}

Bomba.prototype.encontraCell = function(){
    if(this.x>0 && this.y>0)
    {
        this.mc = Math.floor(this.x/64);
        this.ml = Math.floor(this.y/64);
    }else
    {
        this.mc = -1;
        this.ml = -1;
    }
}