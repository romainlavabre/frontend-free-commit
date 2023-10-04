export default function useEventDispatcher() {

    return {
        subscribe: async (event, recipient) => {
            document.addEventListener(event, recipient);
        },
        unsubscribe: async (event, recipient) => {
            document.removeEventListener(event, recipient);
        },
        launcher: async (event, data) => {
            const customEvent = new CustomEvent(event);
            customEvent['data'] = data;
            document.dispatchEvent(customEvent);
        }
    }
}
