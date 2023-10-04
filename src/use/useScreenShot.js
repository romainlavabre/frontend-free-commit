export default function () {
    const capture = (video, scaleFactor) => {
        if (scaleFactor == null) {
            scaleFactor = 1;
        }
        var w = video.videoWidth * scaleFactor;
        var h = video.videoHeight * scaleFactor;
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, w, h);
        return canvas;
    }


    return {
        screenShotById: id => {
            const element = document.getElementById(id);
            return capture(element, 1);
        },
        screenShotByClass: classname => {
            const elements = document.getElementsByClassName(classname);
            const result = [];

            for (let i = 0; i < elements.length; i++) {
                result.push(capture(elements[i], 1))
            }

            return result;
        },
        toDataUrl: element => {
            if (Array.isArray(element)) {
                const result = [];

                for (let i = 0; i < element.length; i++) {
                    result.push(capture(element[i], 1).toDataURL("image/png"))
                }

                return result;
            }

            return element.toDataURL("image/png");
        }
    }
}
