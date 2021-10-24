function Particle(x, y, r) {
    let options = {
        restitution: 0.4,
        friction: 0,
    }
    x += random(-2,2);
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = "particle"
    this.r = r;
    World.add(world, this.body);

}

Particle.prototype.isOffScreen = function() {
    let x = this.body.position.x;
    return (x < -50 || x > width + 50);
}

Particle.prototype.show = function() {
    fill(51);
    stroke(255);
    let pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r *2);
    pop();
}