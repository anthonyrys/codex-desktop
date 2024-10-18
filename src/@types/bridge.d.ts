import { Bridge } from '../main/bridge';

declare global {
    interface Window {
        Bridge: typeof Bridge;
    }
}
