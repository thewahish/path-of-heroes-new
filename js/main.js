document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize the main game
    try {
        window.game = new window.PathOfHeroes();
        window.game.init();
    } catch (error) {
        console.error('Failed to create or initialize game instance:', error);
        alert('A critical error occurred and the game cannot start. Please refresh the page.');
        return;
    }

    // 2. Initialize the debugger, passing it the game instance
    try {
        window.debugger = new window.Debugger(window.game);
        window.debugger.init();
    } catch (error) {
        console.error('Failed to initialize debugger:', error);
        // We don't alert here, as the debugger is non-essential
    }

    // Helper function to safely add event listeners using IDs.
    const safeAddListener = (id, event, callback) => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener(event, callback);
        } else {
            console.warn(`Element with ID '${id}' not found. Cannot add listener.`);
        }
    };
    
    // This function wraps the callback to ensure window.game exists before executing.
    const gameAction = (action) => {
        return () => {
            if (window.game) {
                action(window.game);
            } else {
                console.error('window.game is not available for this action.');
            }
        };
    };

    // --- Attach all game-related button listeners ---
    safeAddListener('lang-toggle-btn', 'click', gameAction(game => game.toggleLanguage()));
    safeAddListener('battle-inventory-btn', 'click', gameAction(game => game.showInventory()));
    safeAddListener('btn-new-game', 'click', gameAction(game => game.showCharacterSelect()));
    // ... all other listeners from the previous version remain here
});