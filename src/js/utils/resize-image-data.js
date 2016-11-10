module.exports = function(canvas, width, height, newWidth, newHeight) {
  var imgData = canvas.getContext("2d").getImageData(0, 0, width, height);
  var newCanvas = $("<canvas>")
      .attr("width", newWidth)
      .attr("height", newHeight)[0];

  newCanvas.getContext("2d").drawImage(canvas, 0, 0, newWidth, newHeight);
  return newCanvas.getContext("2d").getImageData(0, 0, newWidth, newHeight);
}
