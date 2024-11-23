import {LocalDateTime} from "@js-joda/core";

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
        },
        appendDatetime: dataUrl => {
            return new Promise((resolve, reject) => {
                const localDateTime = LocalDateTime.now();
                const img = new Image();
                const canvas = document.createElement("canvas");
                const context = canvas.getContext('2d');

                img.onload = async () => {
                    const imageHeight = img.height;
                    const imageWidth = img.width;
                    canvas.height = imageHeight;
                    canvas.width = imageWidth;

                    context.drawImage(img, 0, 0, imageWidth, imageHeight);
                    context.fillStyle = "#e8e3e5";
                    context.font = `${(imageWidth * 30) / 1280}px sans-serif`;
                    context.textAlign = "end";
                    context.fillText(
                        `Le ${localDateTime.dayOfMonth()}/${localDateTime.monthValue()}/${localDateTime.year()} à ${localDateTime.hour()}:${localDateTime.minute() < 10 ? "0" + localDateTime.minute() : localDateTime.minute()}`,
                        imageWidth - 5,
                        imageHeight - 5
                    );

                    resolve(canvas.toDataURL().replace("data:image/png;base64,", ""))
                }

                img.src = dataUrl;
                img.onerror = reject;

                canvas.toDataURL().replace("data:image/png;base64,", "");
            })
        }
    }
}