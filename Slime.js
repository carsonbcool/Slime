// This file handles the drawing and "blueprints" for the ball and slimes
function newBall(radius, color) {
  var img = new Image();
  img.src = "vball.png"; // Must be lowercase on GitHub!

  return {
    radius: radius,
    color: color,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    render: function() {
      // Calculate position based on pixelsPerUnit from index.html
      var xPix = this.x * pixelsPerUnit;
      // courtY is roughly 80% of the canvas height
      var courtY = gameHeight * 0.8; 
      var yPix = courtY - (this.y * pixelsPerUnit);
      var radiusPix = this.radius * pixelsPerUnit;

      // Draw the ball image
      ctx.drawImage(img, xPix - radiusPix, yPix - radiusPix, radiusPix * 2, radiusPix * 2);
    }
  };
}

function newSlime(radius, color) {
  var img = new Image();
  // If the color passed in is Red (#f00), use red image, otherwise green
  img.src = (color === '#f00') ? "slime175red.png" : "slime175green.png";

  return {
    radius: radius,
    color: color,
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    render: function() {
      var xPix = this.x * pixelsPerUnit;
      var courtY = gameHeight * 0.8;
      var yPix = courtY - (this.y * pixelsPerUnit);
      var radiusPix = this.radius * pixelsPerUnit;

      // Draw the slime image (Slimes are half-circles, so height is radiusPix)
      ctx.drawImage(img, xPix - radiusPix, yPix - radiusPix, radiusPix * 2, radiusPix);
    }
  };
}

