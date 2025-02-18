declare global {
    interface Window {
        __TAURI__?: {
            window: {
                appWindow: {
                    setFullscreen: (fullscreen: boolean) => Promise<void>;
                    isFullscreen: () => Promise<boolean>;
                };
            };
        };
    }
}

const isTauri = typeof window !== "undefined" && window.__TAURI__ !== undefined;

export async function setFullscreen(fullscreen: boolean) {
    if (isTauri) {
        try {
            await window.__TAURI__?.window.appWindow.setFullscreen(fullscreen);
        } catch (error) {
            console.error("Failed to set fullscreen:", error);
        }
    } else {
        console.warn("Fullscreen API is not available in this environment");
    }
}

export async function toggleFullscreen() {
    if (isTauri) {
        try {
            const isFullscreen =
                await window.__TAURI__?.window.appWindow.isFullscreen();
            await window.__TAURI__?.window.appWindow.setFullscreen(
                !isFullscreen,
            );
        } catch (error) {
            console.error("Failed to toggle fullscreen:", error);
        }
    } else {
        console.warn("Fullscreen API is not available in this environment");
    }
}

export async function isFullscreen() {
    if (isTauri) {
        try {
            return await window.__TAURI__?.window.appWindow.isFullscreen();
        } catch (error) {
            console.error("Failed to check fullscreen status:", error);
            return false;
        }
    } else {
        console.warn("Fullscreen API is not available in this environment");
        return false;
    }
}
