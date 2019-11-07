function Bomberman(modelo, map){
    exemplo = {
        x : 10,
        y : 10,
        vx : 0,
        vy : 0,
        w: 32,
        h: 32,
        mc1:0,
        ml1:0,
        mc2:0,
        ml2:0,
        bombas: [],
        nBombas: 1,
        bombaAtual: 0,
        corBomberman: "blue",
        podeInvocar: true,
        perdeu: false
    }

    this.map = map;

    Object.assign(this, exemplo, modelo);
    bombaNova = new Bomba({grid : map});
    this.bombas.push(bombaNova);

}

Bomberman.prototype.desenhar = function(ctx){
    ctx.fillStyle = this.corBomberman;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
}

Bomberman.prototype.mover = function(dt){
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;


    this.encontraCell();
    this.encontraCell2();

    this.aplicaRestricoes(dt);
    this.cooldown = this.cooldown - dt;
}

Bomberman.prototype.controlePorTeclas = function(opcoes){
    this.vx = 0;
    this.vy = 0;
    if(opcoes.teclas.esquerda){if(this.x>0)this.vx -= 50;}
    if(opcoes.teclas.direita){if(this.x+this.w<this.map.SIZE*this.map.COLUMNS)this.vx += 50;}
    if(opcoes.teclas.cima){if(this.y>0)this.vy -= 50;}
    if(opcoes.teclas.baixo){if(this.y+this.h<this.map.SIZE*this.map.LINES)this.vy += 50;}
    if(opcoes.teclas.espaco){this.invocaBomba()}
}

Bomberman.prototype.controlePorTeclas2 = function(opcoes){
    this.vx = 0;
    this.vy = 0;

    if(opcoes.teclas.A){if(this.x>0)this.vx -= 50;}
    if(opcoes.teclas.D){if(this.x+this.w<this.map.SIZE*this.map.COLUMNS)this.vx += 50;}
    if(opcoes.teclas.W){if(this.y>0)this.vy -= 50;}
    if(opcoes.teclas.S){if(this.y+this.h<this.map.SIZE*this.map.LINES)this.vy += 50;}
    if(opcoes.teclas.E){this.invocaBomba()}
}

Bomberman.prototype.aplicaRestricoes = function (dt) {

    var dnx;
    var dx;
    dx = this.vx * dt;
    dnx = dx;
    dy = this.vy * dt;
    dny = dy;
    if(this.mc1>=1 && this.mc1<this.map.COLUMNS)
    {
        if (dx > 0 && (this.map.cells[this.mc1 + 1][this.ml1].tipo != 0) && this.map.cells[this.mc1 + 1][this.ml1].tipo != 03 ){
            dnx = this.map.SIZE * (this.mc1 + 1) - (this.x + this.w);
            dx = Math.min(dnx, dx);
        }
        if (dx < 0 && (this.map.cells[this.mc1 - 1][this.ml1].tipo != 0) && this.map.cells[this.mc1 - 1][this.ml1].tipo != 03 ){
            dnx = this.map.SIZE * (this.mc1 - 1 + 1) - (this.x-1);
            dx = Math.max(dnx, dx);
        }
    }

    if(this.ml1>=1 && this.ml1<this.map.LINES)
    {
        if (dy > 0 && (this.map.cells[this.mc1][this.ml1 + 1].tipo != 0) && this.map.cells[this.mc1][this.ml1 + 1].tipo != 03 ){
            dny = this.map.SIZE * (this.ml1 + 1) - (this.y + this.h);
            dy = Math.min(dny, dy);
        }
        if (dy < 0 && (this.map.cells[this.mc1][this.ml1 - 1].tipo != 0) && this.map.cells[this.mc1][this.ml1 - 1].tipo != 03 ){
            dny = this.map.SIZE * (this.ml1 - 1 + 1) - (this.y - 1);
            dy = Math.max(dny, dy);
        }
    }

    if(this.mc2>=1 && this.mc2<this.map.COLUMNS)
    {
        if (dx > 0 && (this.map.cells[this.mc2 + 1][this.ml2].tipo != 0 && this.map.cells[this.mc2 + 1][this.ml2].tipo != 3)) {
            dnx = this.map.SIZE * (this.mc2 + 1) - (this.x + this.w);
            dx = Math.min(dnx, dx);
        }
        if (dx < 0 && (this.map.cells[this.mc2 - 1][this.ml2].tipo != 0 && this.map.cells[this.mc2 - 1][this.ml2].tipo != 3)) {
            dnx = this.map.SIZE * (this.mc2 - 1 + 1) - (this.x-1);
            dx = Math.max(dnx, dx);
        }
    }

    if(this.ml2>=1 && this.ml2<this.map.LINES)
    {
        if (dy > 0 && (this.map.cells[this.mc2][this.ml2 + 1].tipo != 0 && this.map.cells[this.mc2][this.ml2 + 1].tipo != 3)) {
            dny = this.map.SIZE * (this.ml2 + 1) - (this.y + this.h);
            dy = Math.min(dny, dy);
        }
        if (dy < 0 && (this.map.cells[this.mc2][this.ml2 - 1].tipo != 0 && this.map.cells[this.mc2][this.ml2 - 1].tipo != 3)) {
            dny = this.map.SIZE * (this.ml2 - 1 + 1) - (this.y - 1);
            dy = Math.max(dny, dy);
        }
    }

    if(this.mc2>=1 && this.mc2<this.map.COLUMNS)
    {
        if (dx > 0 && (this.map.cells[this.mc2 + 1][this.ml1].tipo != 0 && this.map.cells[this.mc2 + 1][this.ml1].tipo != 3)) {
            dnx = this.map.SIZE * (this.mc2 + 1) - (this.x + this.w);
            dx = Math.min(dnx, dx);
        }
        if (dx < 0 && (this.map.cells[this.mc2 - 1][this.ml1].tipo != 0 && this.map.cells[this.mc2 - 1][this.ml1].tipo != 3)) {
            dnx = this.map.SIZE * (this.mc2 - 1 + 1) - (this.x-1);
            dx = Math.max(dnx, dx);
        }
    }

    if(this.ml1>=1 && this.ml1<this.map.LINES)
    {
        if (dy > 0 && (this.map.cells[this.mc2][this.ml1 + 1].tipo != 0 && this.map.cells[this.mc2][this.ml1 + 1].tipo != 3)) {
            dny = this.map.SIZE * (this.ml1 + 1) - (this.y + this.h);
            dy = Math.min(dny, dy);
        }
        if (dy < 0 && (this.map.cells[this.mc2][this.ml1 - 1].tipo != 0 && this.map.cells[this.mc2][this.ml1 - 1].tipo != 3)) {
            dny = this.map.SIZE * (this.ml1 - 1 + 1) - (this.y - 1);
            dy = Math.max(dny, dy);
        }
    }

    if(this.mc1>=1 && this.mc1<this.map.COLUMNS)
    {
        if (dx > 0 && (this.map.cells[this.mc1 + 1][this.ml2].tipo != 0) && this.map.cells[this.mc1 + 1][this.ml2].tipo != 03 ){
            dnx = this.map.SIZE * (this.mc1 + 1) - (this.x + this.w);
            dx = Math.min(dnx, dx);
        }
        if (dx < 0 && (this.map.cells[this.mc1 - 1][this.ml2].tipo != 0) && this.map.cells[this.mc1 - 1][this.ml2].tipo != 03 ){
            dnx = this.map.SIZE * (this.mc1 - 1 + 1) - (this.x-1);
            dx = Math.max(dnx, dx);
        }
    }

    if(this.ml2>=1 && this.ml2<this.map.LINES)
    {
        if (dy > 0 && (this.map.cells[this.mc1][this.ml2 + 1].tipo != 0) && this.map.cells[this.mc1][this.ml2 + 1].tipo != 03 ){
            dny = this.map.SIZE * (this.ml2 + 1) - (this.y + this.h);
            dy = Math.min(dny, dy);
        }
        if (dy < 0 && (this.map.cells[this.mc1][this.ml2 - 1].tipo != 0) && this.map.cells[this.mc1][this.ml2 - 1].tipo != 03 ){
            dny = this.map.SIZE * (this.ml2 - 1 + 1) - (this.y - 1);
            dy = Math.max(dny, dy);
        }
    }
    
    this.vy = dy / dt;
    this.x = this.x + dx;
    this.y = this.y + dy;

    var MAXX = this.map.SIZE * this.map.COLUMNS - this.w / 2;
    var MAXY = this.map.SIZE * this.map.LINES - this.h / 2;

    if (this.x > MAXX) this.x = MAXX;
    if (this.y > MAXY) {
        this.y = MAXY;
        this.vy = 0;
    }
    if (this.x - this.w / 2 < 0) this.x = 0 + this.w / 2;
    if (this.y - this.h / 2 < 0) this.y = 0 + this.h / 2;

}


Bomberman.prototype.invocaBomba = function(){

    if(this.bombas[this.bombaAtual].x>0 && this.bombas[this.bombaAtual].x>0)
    this.podeInvocar = false;
    else
    this.podeInvocar = true;

    if(this.podeInvocar)
    {
        this.bombas[this.bombaAtual].x = Math.floor(this.x/this.map.SIZE)*this.map.SIZE + this.map.SIZE/2;
        this.bombas[this.bombaAtual].y = Math.floor(this.y/this.map.SIZE)*this.map.SIZE + this.map.SIZE/2;
        
        this.bombas[this.bombaAtual].tempoExplosao = 2*3;
        
        this.bombaAtual++;
        
        if(this.bombaAtual+1>this.nBombas)
        this.bombaAtual = 0;
    }
}

Bomberman.prototype.encontraCell = function(){
        this.mc1 = Math.floor(this.x/this.map.SIZE);
        this.ml1 = Math.floor(this.y/this.map.SIZE);
}

Bomberman.prototype.encontraCell2 = function(){
    this.mc2 = Math.floor((this.x+this.w)/this.map.SIZE);
    this.ml2 = Math.floor((this.y+this.h)/this.map.SIZE);
}

Bomberman.prototype.verificaSePerdeu = function(){
    if(this.map.cells[this.mc1][this.ml1].tipo === 3)
    {
        this.perdeu = true;
    }
}