let net;
let outputImgData;
let outputImg;
let outputImgContainer;
let video;
let modelReady = false;
let startPredict = false;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(200, 200);
  video.hide();
  net = new p5ml.TransformNet('models/rain_princess', modelLoaded);
  outputImgContainer = createImg('images/input.jpg', 'image');
  outputImgContainer.parent('output-container');
}

function draw() {
  if (startPredict && modelReady) {
    predict();
  }
}

function modelLoaded() {
  console.log('model loaded');
  modelReady = true;
}

function togglePredicting() {
  startPredict = !startPredict;
}

function predict() {
  outputImgData = net.predict(video.elt);
  outputImg = p5ml.array3DToImage(outputImgData);
  outputImgContainer.elt.src = outputImg.src;
}
