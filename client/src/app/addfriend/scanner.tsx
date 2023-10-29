// import { useEffect, useRef } from 'react';
// import jsQR from 'jsqr';

// const QRScanner = () => {
//   const videoRef = useRef();
//   const canvasRef = useRef();

//   useEffect(() => {
//     const video = videoRef.current;
//     const canvasElement = canvasRef.current;
//     const canvas = canvasElement.getContext('2d');
//     const loadingMessage = "⌛ Loading video...";

//     navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
//       video.srcObject = stream;
//       video.setAttribute("playsInline", true);
//       video.play();
//       requestAnimationFrame(tick);
//     });

//     const tick = () => {
//       loadingMessage.innerText = "⌛ Loading video...";
//       if (video.readyState === video.HAVE_ENOUGH_DATA) {
//         loadingMessage.hidden = true;
//         canvasElement.hidden = false;
//         outputContainer.hidden = false;

//         canvasElement.height = video.videoHeight;
//         canvasElement.width = video.videoWidth;
//         canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
//         var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
//         var code = jsQR(imageData.data, imageData.width, imageData.height, {
//           inversionAttempts: "dontInvert",
//         });
//         if (code) {
//           drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
//           drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
//           drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
//           drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
//           outputMessage.hidden = true;
//           outputData.parentElement.hidden = false;
//           outputData.innerText = code.data;
//         } else {
//           outputMessage.hidden = false;
//           outputData.parentElement.hidden = true;
//         }
//       }
//       requestAnimationFrame(tick);
//     };

//     const drawLine = (begin, end, color) => {
//       canvas.beginPath();
//       canvas.moveTo(begin.x, begin.y);
//       canvas.lineTo(end.x, end.y);
//       canvas.lineWidth = 4;
//       canvas.strokeStyle = color;
//       canvas.stroke();
//     };
//   }, []);

//   return (
//     <div className="max-w-3xl mx-auto my-8 p-8 border border-gray-300">
//       <h1 className="text-3xl font-bold mb-4">jsQR Demo</h1>
//       <a href="https://github.com/cozmo/jsQR" target="_blank" rel="noopener noreferrer" className="text-blue-500">
//         View documentation on Github
//       </a>
//       <p>Pure JavaScript QR code decoding library.</p>
//       <div id="loadingMessage" className="text-center p-8 bg-gray-200">
//         🎥 Unable to access video stream (please make sure you have a webcam enabled)
//       </div>
//       <canvas id="canvas" ref={canvasRef} className="hidden"></canvas>
//       <div id="output" className="hidden bg-gray-200 p-4 mt-4">
//         <div id="outputMessage">No QR code detected.</div>
//         <div hidden>
//           <b>Data:</b> <span id="outputData"></span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QRScanner;