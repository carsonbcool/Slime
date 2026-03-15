// This file handles the drawing of the ball and slimes
function newBall(radius, color) {
  var img = new Image();
  img.src = "vball.png"; // Ensure this is lowercase on GitHub!
  
  return {
    radius: radius,
    color: color,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    rotation: 0,
    render: function() {
      var xPix = this.x * pixelsPerUnitX;
      var yPix = courtYPix - (this.y * pixelsPerUnitY);
      var radiusPix = this.radius * pixelsPerUnitY + 2;

      // Add rotation like the original game
      this.rotation += this.velocityX / 100;
      
      ctx.save();
      ctx.translate(xPix, yPix);
      ctx.rotate(this.rotation);
      ctx.drawImage(img, -radiusPix, -radiusPix, radiusPix * 2, radiusPix * 2);
      ctx.restore();
    }
  };
}

function newSlime(radius, color) {
  var img = new Image();
  // P1 is Red (#f00), P2 is Green (#0f0)
  img.src = (color === '#f00') ? "slime175red.png" : "slime175green.png";

  return {
    radius: radius,
    color: color,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    render: function() {
      var xPix = this.x * pixelsPerUnitX;
      var yPix = courtYPix - (this.y * pixelsPerUnitY);
      var radiusPix = this.radius * pixelsPerUnitY;

      // Draw the slime image
      ctx.drawImage(img, xPix - radiusPix, yPix - radiusPix, radiusPix * 2, radiusPix);
      
      // Draw the Eye (the classic tournament look)
      var onLeft = (this.color === '#f00'); 
      var eyeX = this.x + (onLeft ? 1 : -1) * this.radius / 4;
      var eyeY = this.y + this.radius / 2;
      var eyeXPix = eyeX * pixelsPerUnitX;
      var eyeYPix = courtYPix - (eyeY * pixelsPerUnitY);

      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(eyeXPix, eyeYPix, radiusPix / 4, 0, Math.PI * 2);
      ctx.fill();

      // Pupil follows the ball
      var dx = ball.x - eyeX;
      var dy = eyeY - ball.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(eyeXPix + (radiusPix/8 * dx/dist), eyeYPix + (radiusPix/8 * dy/dist), radiusPix / 8, 0, Math.PI * 2);
      ctx.fill();
    }
  };
}
