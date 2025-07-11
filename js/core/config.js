// Game Configuration
window.GameConfig = {
    // ... VERSION, DEBUG_MODE, and other configs remain the same ...

    ENEMIES: {
        skeleton_warrior: {
            name: { en: "Skeleton Warrior", ar: "محارب الهيكل العظمي" },
            sprite: "💀",
            baseStats: { hp: 60, attack: 18, defense: 8, speed: 6, crit: 5 },
            xpReward: 25,
            goldReward: 8
            // dropChance property removed
        },
        goblin: {
            name: { en: "Goblin", ar: "عفريت" },
            sprite: "👹",
            baseStats: { hp: 45, attack: 15, defense: 5, speed: 10, crit: 8 },
            xpReward: 20,
            goldReward: 5
            // dropChance property removed
        }
    },

    // ... ABILITIES, XP_CURVE, and other configs remain the same ...
};