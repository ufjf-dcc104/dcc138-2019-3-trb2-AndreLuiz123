function Bomberman(modelo, map){
    exemplo = {
        x : 10,
        y : 10,
        vx : 0,
        vy : 0,
        w: 32,
        h: 32,
        bombas: [],
        nBombas: 1,
        bombaAtual: 0,
    }

    Object.assign(this, exemplo, modelo);
    bombaNova = new Bomba({grid : map});
    this.bombas.push(bombaNova);

}

Bomberman.prototype.desenhar = function(ctx){
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
}

Bomberman.prototype.mover = function(dt){
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
}

Bomberman.prototype.controlePorTeclas = function(opcoes){
    this.vx = 0;
    this.vy = 0;
    if(opcoes.teclas.esquerda){if(this.x>0)this.vx -= 50;}
    if(opcoes.teclas.direita){if(this.x+this.w<64*8)this.vx += 50;}
    if(opcoes.teclas.cima){if(this.y>0)this.vy -= 50;}
    if(opcoes.teclas.baixo){if(this.y+this.h<64*8)this.vy += 50;}
    if(opcoes.teclas.espaco){this.invocaBomba()}
}

Bomberman.prototype.invocaBomba = function(){

    this.bombas[this.bombaAtual].x = Math.floor(this.x/64)*64 + 32;
    this.bombas[this.bombaAtual].y = Math.floor(this.y/64)*64 + 32;

    this.bombas[this.bombaAtual].tempoExplosao = 1;

    this.bombaAtual++;

    if(this.bombaAtual+1>this.nBombas)
        this.bombaAtual = 0;
}

Bomberman.prototype.encontraGrade = function(){
    

}