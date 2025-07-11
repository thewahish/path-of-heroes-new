// Inventory System
window.InventorySystem = class InventorySystem {
    // ... constructor, init, setupEventListeners, generateItem, rollRarity, getRandomAffix ...

    generateLootDrop(enemy, floor) {
        // The check for dropChance has been removed to guarantee a 100% drop rate.
        // if (!enemy.dropChance || Math.random() > enemy.dropChance) {
        //     return null;
        // }
        
        const itemTypes = Object.keys(window.GameConfig.ITEM_TYPES);
        const lootableItems = itemTypes.filter(type => {
            const item = window.GameConfig.ITEM_TYPES[type];
            // Ensure we only drop items that can be equipped or consumed.
            return item.slot !== null || item.consumable;
        });

        if (lootableItems.length === 0) return null;

        const randomItemType = lootableItems[Math.floor(Math.random() * lootableItems.length)];
        
        // The rest of the function remains the same.
        // It will roll for rarity and generate an item of that type.
        return this.generateItem(randomItemType, floor);
    }

    // ... useItem, equipItem, unequipItem, and all other functions remain the same ...
};