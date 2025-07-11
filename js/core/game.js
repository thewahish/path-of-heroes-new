// Main Game Class
window.PathOfHeroes = class PathOfHeroes {
    constructor() {
        this.initialized = false;
        this.bindMethods();
    }

    bindMethods() {
        this.showMainMenu = this.showMainMenu.bind(this);
        this.showCharacterSelect = this.showCharacterSelect.bind(this);
        this.selectCharacter = this.selectCharacter.bind(this);
        this.startGameRun = this.startGameRun.bind(this);
        this.toggleLanguage = this.toggleLanguage.bind(this);
        this.showInventory = this.showInventory.bind(this);
        this.closeInventory = this.closeInventory.bind(this);
        this.setupCharacterScreen = this.setupCharacterScreen.bind(this);
        this.displayCharacterDetail = this.displayCharacterDetail.bind(this);
        this.updateLanguageDisplay = this.updateLanguageDisplay.bind(this);
        this.updateBattleDisplay = this.updateBattleDisplay.bind(this);
        this.updateBar = this.updateBar.bind(this);
        this.updateElement = this.updateElement.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.defeat = this.defeat.bind(this);
        this.victory = this.victory.bind(this);
        this.enterBattle = this.enterBattle.bind(this);
        this.showLoadGame = this.showLoadGame.bind(this);
        this.showOptions = this.showOptions.bind(this);
        // New Modal functions
        this.showStatsModal = this.showStatsModal.bind(this);
        this.hideStatsModal = this.hideStatsModal.bind(this);
    }

    // ... init, initializeSystems, setupEventListeners, startLoadingSequence remain the same ...

    updateLanguageDisplay() {
        if (!this.localization) return;
        this.localization.updateAllText();
        
        if (this.state.current.currentScreen === 'character-selection') {
            // Need to re-render the current character to update their specific text
            this.setupCharacterScreen();
        }
        if (this.state.current.currentScreen === 'inventory-screen') {
            this.inventory.updateDisplay();
        }
    }

    toggleLanguage() {
        if (!this.localization) return;
        const newLang = this.localization.getCurrentLanguage() === 'en' ? 'ar' : 'en';
        this.localization.switchLanguage(newLang);
        this.updateLanguageDisplay();
    }
    
    setupCharacterScreen() {
        const tabsContainer = document.getElementById('character-tabs');
        if (!tabsContainer) return;
        
        tabsContainer.innerHTML = '';

        if (!window.GameConfig || !window.GameConfig.CHARACTERS) {
            console.error("CRITICAL ERROR: GameConfig.CHARACTERS is not defined. Check config.js.");
            return; 
        }
        
        const characters = Object.values(window.GameConfig.CHARACTERS);
        const currentlySelected = this.state.current.selectedCharacter || characters[0]?.id;

        characters.forEach(char => {
            const tab = document.createElement('button');
            tab.className = 'tab-btn';
            tab.dataset.characterId = char.id;
            tab.textContent = this.localization.getCharacterName(char);
            tab.addEventListener('click', () => this.selectCharacter(char.id));
            tabsContainer.appendChild(tab);
        });

        if (currentlySelected) {
            this.selectCharacter(currentlySelected);
        }
    }
    
    selectCharacter(characterId) {
        document.querySelectorAll('#character-tabs .tab-btn').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.characterId === characterId);
        });

        this.state.current.selectedCharacter = characterId;
        this.displayCharacterDetail(characterId);

        const startBtn = document.getElementById('start-game-btn');
        if (startBtn) {
            startBtn.disabled = false;
        }
    }

    // Refactored for the new design
    displayCharacterDetail(characterId) {
        const contentArea = document.getElementById('character-content-area');
        const characterData = window.GameConfig.CHARACTERS[characterId];
        if (!contentArea || !characterData) {
            if(contentArea) contentArea.innerHTML = '';
            return;
        }
        
        const lang = this.localization.getCurrentLanguage();
        
        // Need a mapping for Core Strengths based on character ID
        const strengths = {
            taha: ['🛡️ High Defense', '❤️ High Health', '💥 Area-of-Effect Strikes'],
            mais: ['🔮 Ranged Magic', '❄️ Elemental Control', '✨ High Mana Regen'],
            ibrahim: ['🗡️ High Critical Hits', '💨 High Speed', '☠️ Assassination']
        };

        const strengthsHtml = (strengths[characterId] || []).map(strength => {
            const [icon, text] = strength.split(' ');
            return `<div class="strength">
                        <span class="strength-icon">${icon}</span>
                        <span class="strength-text">${text}</span>
                    </div>`;
        }).join('');

        contentArea.innerHTML = `
            <div class="main-layout">
                <div class="portrait-panel">${characterData.sprite}</div>
                <div class="info-panel">
                    <div class="hero-name-header">
                        <h2 class="hero-name">${this.localization.getCharacterName(characterData)}</h2>
                        <button class="stats-button" id="open-stats-modal">i</button>
                    </div>
                    <p class="hero-title">${characterData.title[lang]}</p>
                    <p class="hero-desc">${characterData.description[lang]}</p>
                    <div class="core-strengths">${strengthsHtml}</div>
                </div>
            </div>
        `;

        // Update the Stats Modal content
        this.updateStatsModal(characterData);

        // Re-attach the modal open listener for the newly created button
        document.getElementById('open-stats-modal').addEventListener('click', this.showStatsModal);
    }

    updateStatsModal(characterData) {
        const statsGrid = document.getElementById('modal-stats-grid');
        if (!statsGrid) return;

        const statsHtml = Object.keys(characterData.stats)
            .filter(stat => stat !== 'maxHp')
            .map(stat => {
                let locKey;
                switch(stat) {
                    case 'attack': locKey = 'atk'; break;
                    case 'defense': locKey = 'def'; break;
                    case 'speed': locKey = 'spd'; break;
                    default: locKey = stat;
                }

                const label = this.localization.getText(`stat.${locKey}`);
                let value = characterData.stats[stat];
                if (stat === 'hp') value = characterData.stats.maxHp;
                if (stat === 'crit') value = `${value}%`;

                return `<div class="stat-item"><span>${label}:</span> <span>${value}</span></div>`;
            }).join('');

        statsGrid.innerHTML = statsHtml;
    }

    showStatsModal() {
        document.getElementById('stats-modal-overlay').classList.add('visible');
    }

    hideStatsModal(event) {
        const modalOverlay = document.getElementById('stats-modal-overlay');
        // Close if the overlay is clicked directly, or if the close button is clicked
        if (event.target === modalOverlay || event.target.id === 'close-stats-modal') {
            modalOverlay.classList.remove('visible');
        }
    }

    // ... All other methods (startGameRun, enterBattle, updateBattleDisplay, victory, defeat, etc.) remain the same ...
};