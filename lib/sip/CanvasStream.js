const getCanvasStream = () => {
    const WIDTH = 800;
    const HEIGHT = 800;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '10px';
    canvas.style.left = '10px';
    canvas.style.visibility = 'hidden';
    canvas.style.transform = 'scale(0.2)';
    canvas.style.transformOrigin = 'top left';
    document.body.appendChild(canvas);

    const context = canvas.getContext('2d');

    if (!context) {
        return;
    }

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    context.fillStyle = '#FF00FF';
    // рисуем красный прямоугольничек
    context.strokeStyle = "#000";
    context.fillStyle = "#f00";
    context.beginPath();
    context.fillRect(WIDTH/4,HEIGHT/4,WIDTH/2,HEIGHT/2);
    context.closePath();
    context.stroke();
    context.fill();

    window.context = context;

    const audioContext = new AudioContext();
    const audioDestinationNode = audioContext.createMediaStreamDestination();

    return mixedStream = new MediaStream([
        audioDestinationNode.stream.getAudioTracks()[0],
        canvas.captureStream(30).getVideoTracks()[0]
    ]);
}
