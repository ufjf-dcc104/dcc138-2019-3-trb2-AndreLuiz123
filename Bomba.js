function Bomba(modelo){
    exemplo = {
        x : -10,
        y : -10,
        raio: 16,
        alcance: 3,
        mc : -1,
        ml : -1,
        grid: undefined,
        tempoExplosao: 0,
        tempoExplosao2: 0,
        corBomba: "red"
    }

    Object.assign(this, exemplo, modelo);
}

Bomba.prototype.desenhar = function(ctx){
    if(this.x>0 && this.y>0){
        ctx.fillStyle = this.corBomba;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}

Bomba.prototype.explodir = function(){
    for(var i = 0; i<this.alcance; i++)
    {
        if(this.mc+i<this.grid.COLUMNS && this.grid.cells[this.mc+i][this.ml].tipo != 1)
        {
            this.grid.cells[this.mc+i][this.ml].tipo = 3;
        }
        else
        break;
    }

    for(var i = 0; i<this.alcance; i++)
    {
        if(this.mc-i>=0 && this.grid.cells[this.mc-i][this.ml].tipo != 1)
        {
            this.grid.cells[this.mc-i][this.ml].tipo = 3;
        }
        else
        break;


    }

    for(var i = 0; i<this.alcance; i++)
    {
        if(this.ml+i<this.grid.LINES && this.grid.cells[this.mc][this.ml+i].tipo != 1)
        {
            this.grid.cells[this.mc][this.ml+i].tipo = 3;
        }
        else
        break;
    }

    for(var i = 0; i<this.alcance; i++)
    {
        if(this.ml-i>=0 && this.grid.cells[this.mc][this.ml-i].tipo != 1)
        {
            this.grid.cells[this.mc][this.ml-i].tipo = 3;
        }
        else
        break;
    }
    this.grid.cells[this.mc][this.ml].tipo = 3;
}


Bomba.prototype.acabaExplodir = function(){
    for(var i = 1; i<this.alcance; i++)
    {
        if(this.mc+i<this.grid.COLUMNS && this.grid.cells[this.mc+i][this.ml].tipo === 3)
        {
            this.grid.cells[this.mc+i][this.ml].tipo = 0;
        }
        else
        break;
    }

    for(var i = 1; i<this.alcance; i++)
    {
        if(this.mc-i>=0 && this.grid.cells[this.mc-i][this.ml].tipo === 3)
        {
            this.grid.cells[this.mc-i][this.ml].tipo = 0;
        }
        else
        break;


    }

    for(var i = 1; i<this.alcance; i++)
    {
        if(this.ml+i<this.grid.LINES && this.grid.cells[this.mc][this.ml+i].tipo === 3)
        {
            this.grid.cells[this.mc][this.ml+i].tipo = 0;
        }
        else
        break;
    }

    for(var i = 1; i<this.alcance; i++)
    {
        if(this.ml-i>=0 && this.grid.cells[this.mc][this.ml-i].tipo === 3)
        {
            this.grid.cells[this.mc][this.ml-i].tipo = 0;
        }
        else
        break;
    }

    this.grid.cells[this.mc][this.ml].tipo = 0;
}

Bomba.prototype.processoExplosao = function(dt){
    if(this.x>0 && this.y>0)
    {
        this.tempoExplosao-=dt;
    }
    
    if(this.tempoExplosao <=1 && this.x>0 && this.y>0)
    {
        this.explodir();
    }

}

Bomba.prototype.processoExplosao2 = function(dt){
    if(this.x>0 && this.y>0)
    {
        this.tempoExplosao-=dt;
    }
    
    if(this.tempoExplosao <=0 && this.x>0 && this.y>0)
    {
        this.acabaExplodir();
        this.x = -10;
        this.y = -10;
    }
}

Bomba.prototype.encontraCell = function(){
     if(this.x>0 && this.y>0)
    {
        this.mc = Math.floor(this.x/64);
        this.ml = Math.floor(this.y/64);
        if(this.tempoExplosao>=1)
        this.grid.cells[this.mc][this.ml].tipo = 4;
        else
        this.grid.cells[this.mc][this.ml].tipo = 3;
    }else
    {
        this.mc = -1;
        this.ml = -1;
    }
}