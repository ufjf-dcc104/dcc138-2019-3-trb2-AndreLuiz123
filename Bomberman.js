function Bomberman(modelo){
    exemplo = {
        x : 10,
        y : 10,
        vx : 0,
        vy : 0,
        w: 32,
        h: 32,
        bombas: 1
    }

    Object.assign(this, exemplo, modelo);
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

Bomberman.prototype.controlePorTeclas = function(dt){
    
}