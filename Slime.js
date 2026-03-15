function newBall(radius, color) {
  var img = new Image();
  img.src = "vball.png";
  
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

      this.rotation += this.velocityX / 100;
      
      ctx.save();
      ctx.translate(xPix, yPix);
      ctx.rotate(this.rotation);
      ctx.drawImage(img, -radiusPix, -radiusPix, radiusPix * 2, radiusPix * 2);
      ctx.restore();
    }
  };
}

function newSlime(onLeft, radius, color) {
  var img = new Image();
  // P1 (Left) is Green, P2 (Right/AI) is Red
  img.src = onLeft ? "slime175green.png" : "slime175red.png";

  return {
    onLeft: onLeft,
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

      // Draw the Slime
      ctx.drawImage(img, xPix - radiusPix, yPix - radiusPix, radiusPix * 2, radiusPix);
      
      // Fix the Eyes: Flip position based on which side they are on
      var eyeX = this.x + (this.onLeft ? 1 : -1) * this.radius / 4;
      var eyeY = this.y + this.radius / 2;
      var eyeXPix = eyeX * pixelsPerUnitX;
      var eyeYPix = courtYPix - (eyeY * pixelsPerUnitY);

      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(eyeXPix, eyeYPix, radiusPix / 4, 0, Math.PI * 2);
      ctx.fill();

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
