import { Bridge } from '../bridge';

declare global {
    interface Window {
        Bridge: typeof Bridge;
    }
}
