// module aliases
let Engine = Matter.Engine;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Events = Matter.Events;
let engine;
let world;
let particles = [];
let boundaries = [];
let pins = [];
let cols = 15;
let rows = 10;

let bing;
let bong;
function preload() {
  bing = loadSound('bing.mp3');
  bong = loadSound('bong.mp3');
}

function newParticle() {
  let p = new Particle(width/2, 50, 15);
  particles.push(p);
}

function setup() {
  createCanvas(600, 800);
  background(0);
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 5

  function collision(event) {
    console.log.event();

  }

  function collision(event) {
    let pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      let labelA = pairs[i].bodyA.label;
      let labelB = pairs[i].bodyB.label;

      if ((labelA == 'particle' && labelB == 'pin') || (labelA == 'pin' && labelB == 'particle')) {
        let x = random(0,1);
        if (x < 0.5) {
          //bing.play();
        } else {
          //bong.play();
        }
      }
    }
  }
  Events.on(engine, 'collisionStart', collision); 



  newParticle();
  let spacing = width /cols;
  for (let i = 0; i < cols+1; i++) {
    for (let j = 0; j < rows; j++) {
      let x = spacing/2 + i*spacing;
      if (j % 2 == 1) {
        x = i*spacing;
      }
      let y = 2.5* spacing + j * spacing;
      let pin = new Pin(x, y, 4);
      pins.push(pin);
    }
  }
  let b = new Boundary(width / 2, height + 50, width, 100);
  boundaries.push(b);

  for (let i = 0; i < cols+1; i++) {
    x =  i*spacing;
    h = 300;
    w = 8;
    y = height - h/2;
    b = new Boundary(x, y, w, h)
    boundaries.push(b);
  }
}

function draw() {
  background(0);
  if (frameCount % 60 == 0) {
    newParticle();
  }
  Engine.update(engine);
  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    if (particles[i].isOffScreen()) {
      World.remove(world, particles[i].body);
      particles.splice(i, 1);
    }
  }
  for (let i = 0; i < pins.length; i++) {
    pins[i].show();
  }
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
}