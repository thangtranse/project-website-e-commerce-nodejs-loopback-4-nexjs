import { LocalStorage } from "src/constants";
/**
 * Không sử dụng khi ứng dụng đọc ghi state liên tục
 */
export default class StateLoader {

    loadState() {
        try {
            let serializedState = localStorage.getItem(LocalStorage.STATE_LOADER);
            if (serializedState === null) {
                return this.initializeState();
            }
            return JSON.parse(serializedState);
        }
        catch (err) {
            return this.initializeState();
        }
    }

    saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem(LocalStorage.STATE_LOADER, serializedState);
        }
        catch (err) {
        }
    }

    initializeState() {
        return {}
    };
}