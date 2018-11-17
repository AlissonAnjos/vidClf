let video;
let classifier;
let label = '';
let prob;

function setup() {
  createCanvas(600, 550);
  video = createCapture(VIDEO).hide(); //usa a webcam

  classifier = ml5.imageClassifier('MobileNet', video, modelReady);

}

function draw() {
	background(0);
  image(video, 0, 0);
  fill(255, 0, 0);
  noStroke();
  textSize(25);
  textAlign(CENTER);
  text('Name: ' + label, width / 2, height - 50);
  text('Probability = ' + prob + '%', width / 2, height - 20);
}

function modelReady() {
  console.log('model ready');
  classifier.predict(gotResult);
}

function gotResult(err, results) {
  if (err) {
    console.error(err);
  } else {
  //  console.log(results);
    label = results[0].className;
    prob = (int)(results[0].probability * 100);
    classifier.predict(gotResult);
  }
}