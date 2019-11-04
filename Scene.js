function Scene(modelo){
    exemplo = {
        elementos : []
    }

    Object.assign(this, exemplo, modelo);
}

Scene.prototype.desenhar = function(ctx)
{
    for(var i = 0; i<elementos.length; i++)
        elementos[i].desenhar(ctx);

}

Scene.prototype.addElemento = function(elemento)
{
    elementos.push(elemento);
}

