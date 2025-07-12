// js/debug.js
// --- Debugger System ---
window.Debugger = class Debugger {
    constructor(gameInstance) {
        this.game = gameInstance; // Reference to the main game object
        this.debugUpdateInterval = null;
        this.bindMethods();
    }

    bindMethods() {
        this.toggleDebugPanel = this.toggleDebugPanel.bind(this);
        this.updateDebugInfo = this.updateDebugInfo.bind(this);
    }

    init() {
        if (!window.GameConfig.DEBUG_MODE) return;
        
        // Attach click listeners to the debugger UI elements
        const openBtn = document.getElementById('debug-open-btn');
        const closeBtn = document.getElementById('debug-toggle-btn');

        if (openBtn) {
            openBtn.addEventListener('click', this.toggleDebugPanel);
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', this.toggleDebugPanel);
        }
    }

    toggleDebugPanel() {
        const panel = document.getElementById('debug-panel');
        if (!panel) return;

        const isHidden = panel.classList.toggle('hidden');

        if (!isHidden) {
            this.updateDebugInfo();
            this.debugUpdateInterval = setInterval(this.updateDebugInfo, 1000);
        } else {
            clearInterval(this.debugUpdateInterval);
            this.debugUpdateInterval = null;
        }
    }

    updateDebugInfo() {
        const content = document.getElementById('debug-content');
        if (!content || !this.game || !this.game.state) return;

        const state = this.game.state.current;
        content.innerHTML = `
            <p><strong>Ver:</strong> ${window.GameConfig.VERSION}</p>
            <p><strong>Screen:</strong> ${state.currentScreen}</p>
            <p><strong>Player:</strong> ${state.player?.name.en || 'None'}</p>
            <p><strong>Floor:</strong> ${state.currentFloor}</p>
            <p><strong>Gold:</strong> ${state.gold}</p>
            <p><strong>Inv:</strong> ${state.inventory.length}/${window.GameConfig.INVENTORY.maxSlots}</p>
            <p><strong>Battle:</strong> ${state.battleInProgress}</p>
        `;
    }
};