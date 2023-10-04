export default function () {
    return (base64, contentType, name) => {
        const anchor = document.createElement('a');
        anchor.href = `data:${contentType};base64,${base64}`;
        anchor.target = '_blank';
        anchor.download = name;
        anchor.click();
    };
}
