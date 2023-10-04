export default function useClipboard() {
    return (text) => navigator.clipboard.writeText(text);
}
