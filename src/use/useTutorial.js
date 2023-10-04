import useEventDispatcher from "./useEventDispatcher";
import event from "../event/event";
import TutorialModal from "../component/tutorial/TutorialModal";

export default function () {
    const eventDispatcher = useEventDispatcher();

    return {
        open: tutorial => {
            eventDispatcher.launcher(event.OPEN_MODAL, {
                component: <TutorialModal component={tutorial.component}/>
            });
        }
    }
}
