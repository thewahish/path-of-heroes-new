As your **master game studio production manager**, I’ll create a consolidated **Master Development Prompt (v27)** for **Path of Heroes / طريق الأبطال**, incorporating all features, instructions, and code from the provided **Game Bible**, the **Development Priority Plan**, and relevant details from previous prompts (e.g., v26). This prompt will reflect the **mobile-only, portrait-only** mandate, removing all desktop/landscape references, and ensure all game logic is embedded in a single `index.html` file with modular comments (e.g., `// Combat System Start/End`) for future splitting. The prompt will include the complete feature set, development instructions, and the latest `index.html` code, optimized for touch input and bilingual (English/Arabic) support. It will be structured to prevent bloat, support logical testing phases, and serve as a standalone “Game Bible” for a new chat session.

To avoid truncation, the prompt will be segmented into manageable artifacts, each with clear merge instructions, maintaining the `artifact_id` (`6e07e013-7b81-44eb-93a3-4257a9b4ce6d`) and assigning new `artifact_version_id` values. The `index.html` code will be provided separately with its own `artifact_id`, updated to reflect the mobile-only focus.

---

### 📜 Master Development Prompt (v28) - Segmented

#### Segment 1: Game Overview and Core Gameplay


```markdown
# Path of Heroes – Master Development Prompt (v28)

## 🎮 Game Overview

**Title:** Path of Heroes / طريق الأبطال  
**Genre:** 2D top-down, turn-based roguelike dungeon crawler (inspired by Hades, Dead Cells, Slay the Spire, Diablo)  
**Platform:** Mobile-only web game (HTML/CSS/JS), PWA-ready for Android/iOS  
**Orientation:** Strictly portrait mode on all screens  
**Technology:** Single `index.html` file with all game logic embedded in `<script>` tags for testing, structured with modular comments (e.g., `// Combat System Start/End`) for future splitting into `js/` files (e.g., `combat.js`, `inventory.js`). Do not generate separate JS files unless explicitly requested to conserve usage limits.  
**Languages:** Fully bilingual (English/Arabic) with dynamic RTL text switching using `data-i18n`. UI layout remains fixed; only text content changes.  
**Visual Style:** Dark fantasy with Arabic/English fusion, high contrast, low saturation, glowing effects for rare items  
**Input:** Touch-only with on-screen buttons and gestures (e.g., tap, swipe)  
**Demo Scope:** 20 floors, 4 biomes, 3 playable characters  
**GitHub:** [https://github.com/thewahish/path-of-heroes-rpg](https://github.com/thewahish/path-of-heroes-rpg)  
**Current Status:** ~55% complete (start screen, character selection, partial combat UI, partial inventory UI, shrine UI, localization system)

## 🔨 Visual System & Color Scheme

- **Dark RPG Palette:**  
  - Background: `radial-gradient(ellipse at center, #1a0f0a 0%, #0d0604 40%, #000000 100%)` (fallback)  
  - Shrine Background: `url('assets/bg_shrine_dark_forest.jpg')`  
  - Primary: `#d4a656` (Dark gold)  
  - Secondary: `#5c4423` (Saddle brown)  
  - Text: `#f8e4c0` (Wheat)  
  - Health: `linear-gradient(90deg, #8b0000, #ff4500, #ff6347)`  
  - Mana: `linear-gradient(90deg, #191970, #4169e1, #87ceeb)`  
- **UI Glow:** Glowing outlines for Rare+ loot (pending)  
- **Rarity Colors (Planned):**  
  - Common: Gray (#95a5a6)  
  - Uncommon: Green (#27ae60)  
  - Rare: Blue (#3498db)  
  - Epic: Purple (#9b59b6)  
  - Mythic: Orange (#e67e22)  
  - Legendary: Gold (#f1c40f)  
- **Fonts:**  
  - English: Cinzel (titles, buttons), Noto Sans (labels)  
  - Arabic: Noto Sans Arabic (Bold for buttons, Medium for text)  
- **Assets:** Transparent `.png` files for characters (`taha.png`, `mais.png`, `ibrahim.png`), enemies, items; consistent aspect ratios, scalable for mobile  
- **UI Design Principles:**  
  - Fixed layout in portrait mode; touch-friendly buttons (≥100px) and gestures (tap, swipe).  
  - Bilingual text switching with `data-i18n` and `aria-label` for accessibility.  
  - Vertical stacks or swipeable carousels for all UI elements.

## 🚄 Core Gameplay Loop

- **Structure:** Roguelike with procedural floors, permanent death penalties, and item loss.  
- **Progression:** 20 floors across 4 biomes; boss every 5th floor. Players fight enemies, loot gear, level up, visit shops/shrines.  
- **Narrative Events:** Short story prompts before shops, shrines, bosses (e.g., “You feel an ancient energy stir…”).  
- **Death Penalty:** Lose 90% gold, all non-equipped items; respawn at biome start:  
  - Floors 1–5 → Floor 1  
  - Floors 6–10 → Floor 6  
  - Floors 11–15 → Floor 11  
  - Floors 16–20 → Floor 16  
- **Checkpoints:** Autosave every 5th floor, preserving XP, level, equipped gear, progress.  
- **Demo Completion:** Modal after Floor 20 boss: “You have beaten the demo! Please support us via our Kickstarter page.”  
- **Cinematics (Planned):** Play after character selection and before first battle, with music.

## 🧙 Playable Classes

| Class     | Character            | Resource  | Role         | Specialization           |
|-----------|---------------------|-----------|--------------|-------------------------|
| Warrior   | Taha / طه          | 🟣 Vigor  | Tank / Melee | AoE strikes, high DEF   |
| Sorceress | Mais / ميس         | 🔵 Mana   | Ranged Mage  | AoE, CC, Elemental Wheel|
| Rogue     | Ibrahim / إبراهيم  | 🟢 Energy | Assassin     | Traps, high SPD & Crit  |

- **Progression:** Max level 20; abilities unlock at Levels 1, 5, 10, 15 (currently 1 ability each: Heavy Strike, Fireball, Backstab).  
- **Stats:** HP, ATK, DEF, SPD, Crit; growth per level.  
- **Resources:** Vigor (+2/turn), Mana (+3/turn), Energy (+4/turn).  
- **Note:** UI currently shows generic MP; class-specific resources pending.

**Character Data Example:**
```javascript
// Character Data Start
taha: {
  id: 'taha',
  name: { en: "Taha", ar: "طه" },
  title: { en: "Steel Knight", ar: "الفارس الفولاذي" },
  desc: { en: "A stalwart defender with unmatched courage.", ar: "مدافع صامد بشجاعة لا تُضاهى." },
  sprite: '⚔️',
  stats: { hp: 120, maxHP: 120, atk: 15, def: 12, spd: 8, crit: "10%" },
  resource: { type: "vigor", current: 25, max: 25, regen: 2 }
}
mais: {
  id: 'mais',
  name: { en: "Mais", ar: "ميس" },
  title: { en: "Arcane Weaver", ar: "نساجة السحر" },
  desc: { en: "A master of mystical arts and elemental magic.", ar: "سيدة الفنون السحرية والسحر الأولي." },
  sprite: '🔮',
  stats: { hp: 80, maxHP: 80, atk: 20, def: 8, spd: 12, crit: "15%" },
  resource: { type: "mana", current: 30, max: 30, regen: 3 }
}
ibrahim: {
  id: 'ibrahim',
  name: { en: "Ibrahim", ar: "إبراهيم" },
  title: { en: "Shadow Blade", ar: "نصل الظل" },
  desc: { en: "A swift and deadly assassin who strikes from the shadows.", ar: "قاتل سريع ومميت يضرب من الظلال." },
  sprite: '🗡️',
  stats: { hp: 100, maxHP: 100, atk: 18, def: 10, spd: 15, crit: "20%" },
  resource: { type: "energy", current: 20, max: 20, regen: 4 }
}
// Character Data End
```

## ⚔️ Combat System - Start
```



#### Segment 2: Combat System and Biomes


```markdown
## ⚔️ Combat System - Start

- **Mechanics:** Turn-based, initiative based on SPD stat.  
- **Actions:** Tap buttons for Attack, Skill, Defend (pending), Flee.  
- **Critical Hits:** Warrior (10%), Sorceress (15%), Rogue (20%).  
- **Status Effects (Planned):** Poison (DoT, stacks up to 3), Burn (high DoT, short duration), Freeze (skip turns), Stun (skip action), Shield (blocks damage), Regen (restores HP); displayed as icons/text under combatant name.  
- **Elemental Wheel (Planned):** Fire > Ice > Nature > Shadow > Fire.  
- **Combat UI (Partially Implemented):**  
  - Layout (Portrait-Only):  
    - Top: Hero HUD (name, sprite, HP, resource, stats).  
    - Below: Enemy HUD (name, sprite, HP, status effects).  
    - Center: Scrolling combat log (fades after 3–5 seconds, max 4 lines).  
    - Bottom: Touch-friendly action buttons (≥100px, Attack, Skill, Flee).  
  - Accessibility: `aria-label` and ARIA roles (e.g., `role="button"`) for screen readers.  
  - Example HTML:  
    ```html
    <div class="container hidden" id="battle-screen">
      <div class="hero-hud">
        <div class="char-sprite-placeholder" id="hero-sprite"></div>
        <h3 data-i18n="char_name" id="hero-name"></h3>
        <p>❤️ HP: <span class="bar hp-bar"><span class="fill" id="hero-hp-fill"></span></span> <span id="hp-value"></span></p>
        <p id="hero-resource"></p>
      </div>
      <div class="enemy-hud">
        <div class="char-sprite-placeholder" id="enemy-sprite"></div>
        <h3 data-i18n="enemy_name" id="enemy-name"></h3>
        <p>❤️ HP: <span class="bar hp-bar"><span class="fill" id="enemy-hp-fill"></span></span> <span id="enemy-hp-value"></span></p>
      </div>
      <div id="combat-log"></div>
      <div class="action-buttons">
        <button data-i18n="attack" aria-label="Attack">🪓 Attack</button>
        <button data-i18n="skill" aria-label="Skill">🎯 Skill</button>
        <button data-i18n="flee" aria-label="Flee">🚪 Flee</button>
      </div>
    </div>
    ```
  - CSS (Portrait-Only):  
    ```css
    .hero-hud, .enemy-hud {
      width: 100%;
      max-width: 300px;
      text-align: center;
      margin-bottom: 1rem;
    }
    .bar {
      display: inline-block;
      width: 150px;
      height: 10px;
      background: #333;
      border: 1px solid #5c4423;
      border-radius: 5px;
    }
    .hp-bar .fill {
      background: linear-gradient(90deg, #8b0000, #ff4500);
      height: 100%;
      border-radius: 5px;
    }
    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      max-width: 300px;
    }
    .action-buttons button {
      background: #2d1e12;
      border: 2px solid #5c4423;
      color: #f8e4c0;
      padding: 0.8rem;
      font-size: 1rem;
      border-radius: 8px;
      min-height: 50px;
      touch-action: manipulation;
    }
    #combat-log {
      position: absolute;
      top: 50%;
      width: 100%;
      text-align: center;
      font-family: 'Noto Sans', sans-serif;
      color: #f8e4c0;
      opacity: 0.85;
    }
    .log-entry {
      animation: fadeOut 4s forwards;
      margin: 5px 0;
      font-size: 0.9rem;
    }
    @keyframes fadeOut {
      0% { opacity: 1; }
      90% { opacity: 0.4; }
      100% { opacity: 0; }
    }
    ```

## 🔍 Biomes & Floor Layout

- **Floors and Biomes:**  
  | Floors | Biome         | Enemies                           | Boss              |
  |--------|---------------|-----------------------------------|-------------------|
  | 1–5    | Ancient Ruins | Skeletons, Slimes                 | Lich King         |
  | 6–10   | Frozen Wastes | Frost Wolves, Ice Elementals      | Frost Dragon      |
  | 11–15  | Cursed Forest | Treants, Witches                  | Ancient Tree Lord |
  | 16–20  | Shadow Realm  | Voidwalkers, Demons               | Shadow Overlord   |
- **Mechanics:**  
  - Procedural generation for floors (pending).  
  - Enemy scaling: +15% stats per floor, +50% for bosses.  
  - Current: 2 enemy types (Skeleton Warrior, Goblin); planned: 13+ types.  
  - Bosses have intro quotes, unique moves, custom drops (pending).

## ☠️ Death & Roguelike Mechanics - Start
```



#### Segment 3: Death Mechanics, Inventory, and Shops


```markdown
## ☠️ Death & Roguelike Mechanics - Start

- **On Death:** Lose 90% gold, all non-equipped items; respawn at biome start (Floors 1, 6, 11, 16).  
- **Checkpoints:** Autosave every 5th floor, preserving XP, level, equipped gear, progress.  
- **Death Modal (Pending):**  
  - Content: “You Died”, “90% gold lost. Restarting at floor checkpoint.”, “Respawn” button.  
  - Example HTML:  
    ```html
    <div class="modal hidden" id="death-modal">
      <h2 data-i18n="you_died">You Died</h2>
      <p data-i18n="death_message">90% gold lost. Restarting at floor checkpoint.</p>
      <button data-i18n="respawn" aria-label="Respawn">Respawn</button>
    </div>
    ```

## 💼 Inventory & Loot

- **Gear Slots:** 8 slots (Head, Shoulders, Chest, Legs, Feet, Hands, Weapon, Accessory).  
- **Loot Naming:** `[Prefix] [Base] of [Suffix]` (e.g., “Ancient Sword of the Lich King”).  
- **Prefixes:** Cursed, Swift, Enchanted, Rusted, Frozen, etc.  
- **Suffixes:** of Shadows, of the Lich, of Nature, etc.  
- **Rarity System (Pending):**  
  ```javascript
  // Rarity System Start
  const RARITIES = {
    common: { chance: 50, color: "#95a5a6", statMult: 1.0 },
    uncommon: { chance: 30, color: "#27ae60", statMult: 1.2 },
    rare: { chance: 15, color: "#3498db", statMult: 1.5 },
    epic: { chance: 4, color: "#9b59b6", statMult: 2.0 },
    mythic: { chance: 0.8, color: "#e67e22", statMult: 2.8 },
    legendary: { chance: 0.2, color: "#f1c40f", statMult: 3.5 }
  };
  // Rarity System End
  ```
- **Item Level (Pending):**  
  - Formula: `ItemLevel = (ATK + DEF + bonusEffectScore) × rarityMultiplier + classAffinity`.  
  - Bonuses: +Crit (+5), Regen (+7), class affinity (+10%).  
- **Equip Behavior:** Tap item for modal (Equip/Inspect/Discard); if slot filled, “Replace & sell for X gold?” modal (pending).  
- **Inventory UI (Partially Implemented):**  
  - Layout (Portrait-Only): Vertical stack (top: 8 gear slots, bottom: scrollable 10-slot grid).  
  - Controls: “Sort” (rarity/name), “Sell Common”, “Back” buttons.  
  - Example HTML:  
    ```html
    <div class="container hidden" id="inventory-screen">
      <h2 data-i18n="inventory_title">Inventory & Equipment</h2>
      <div class="inventory-container">
        <div class="character-panel">
          <h3 data-i18n="char_name"></h3>
          <p>❤️ HP: <span class="bar hp-bar"><span class="fill"></span></span> <span id="hp-value"></span></p>
          <p id="resource-value"></p>
          <ul class="gear-list">
            <li data-i18n="slot_head">Head: <span data-i18n="none">None</span></li>
            <li data-i18n="slot_weapon">Weapon: <span data-i18n="item_iron_sword">Iron Sword</span></li>
          </ul>
        </div>
        <div class="inventory-grid">
          <div class="item-slot"><img src="assets/items/rusty_sword.png" data-i18n="item_rusty_sword" aria-label="Rusty Sword"></div>
        </div>
        <div class="inventory-controls">
          <button data-i18n="sort_items">Sort</button>
          <button data-i18n="sell_common">Sell Common</button>
        </div>
      </div>
      <button class="back-btn" data-i18n="back">Back</button>
    </div>
    ```

## 🏪 Shops, Shrines & Potions

- **Shops (Pending):**  
  - Appear after boss floors (5, 10, 15, 20) and randomly (1/3 chance every 3 floors).  
  - Theme: Candlelit merchant stall.  
  - Functions: Buy weapons/armor/potions (e.g., Frozen Sword: ATK+10, 120 gold), sell via condensed inventory, upgrade with duplicates.  
  - UI (Portrait-Only): Vertical stack with merchant name, gold display, swipeable item carousel (image, name, stats, price, “Buy”/“Compare” buttons), “Sell Items” button.  
  - Example HTML:  
    ```html
    <div class="container hidden" id="shop-screen">
      <h2 data-i18n="shop_title">Merchant – Floor X</h2>
      <div class="player-gold" data-i18n="gold">💰 Gold: <span id="gold-amount">0</span></div>
      <div class="shop-carousel">
        <div class="item-card">
          <img src="assets/items/frozen_sword.png" data-i18n="item_frozen_sword" aria-label="Frozen Sword">
          <h3 data-i18n="item_frozen_sword">Frozen Sword</h3>
          <p data-i18n="item_frozen_sword_stats">ATK +10, Freeze chance</p>
          <p data-i18n="item_frozen_sword_price">💰 120</p>
          <button data-i18n="buy">Buy</button>
          <button data-i18n="compare">Compare</button>
        </div>
      </div>
      <button class="sell-btn" data-i18n="sell_items">Sell Items</button>
    </div>
    ```
  - CSS (Portrait-Only):  
    ```css
    .shop-carousel {
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      gap: 1rem;
      padding: 1rem;
      width: 100%;
      max-width: 300px;
    }
    .item-card {
      min-width: 200px;
      scroll-snap-align: center;
      background: #1a120a;
      border: 2px solid #d4a656;
      border-radius: 10px;
      padding: 1rem;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .item-card img {
      width: 80px;
      height: 80px;
      object-fit: contain;
    }
    .sell-btn {
      background: #2d1e12;
      border: 2px solid #5c4423;
      color: #f8e4c0;
      padding: 0.8rem;
      font-size: 1rem;
      border-radius: 8px;
      min-height: 50px;
      touch-action: manipulation;
    }
    ```
- **Shrines (Partially Implemented):**  
  - Random spawn (1 per 3–4 floors).  
  - Theme: Ancient stone altar with `bg_shrine_dark_forest.jpg`.  
  - Functions: Blessings (e.g., Wrath of Fallen: +15% ATK, Stoneheart Ward: Shield 20 dmg, Spirit’s Gift: Regen 3 HP/turn), healing (30%), stat boosts, or gear; may cost gold/sacrifice (pending).  
  - UI (Portrait-Only): Vertical stack with title, narrative text, scrollable blessing list (3 cards).  
  - Example HTML: Included in `index.html` (see Segment 7).  
- **Potions (Pending):**  
  - Types: Healing (HP), Energy (resource), Antidote (cure status), Elixir (buffs, e.g., shield, +crit).  
  - Usable in combat (counts as turn).

## 🏪 Shops, Shrines & Potions - End
## 🖥 UI/UX and Screens - Start
```



#### Segment 4: UI/UX, Technical Architecture, and Development Plan


```markdown
## 🖥 UI/UX and Screens - Start

- **Start Screen (Implemented):**  
  - Layout (Portrait-Only): Centered vertical menu (New Game, Load Game, Options), top-right language toggle, bilingual title, credits footer.  
  - Style: Dark stone texture, animated fog (pending).  
  - Example HTML: Included in `index.html` (see Segment 7).  
- **Character Selection (Implemented):**  
  - Layout (Portrait-Only): Top-mounted buttons (Taha, Mais, Ibrahim), single card below with sprite, name, title, stats, description.  
  - Controls: Tap buttons to switch heroes; “Start Journey” and “Back” buttons.  
  - Example HTML: Included in `index.html`.  
- **Combat UI (Partially Implemented):** See Combat System.  
- **Inventory UI (Partially Implemented):** See Inventory & Loot.  
- **Shrine UI (Partially Implemented):** See Shops, Shrines & Potions.  
- **Shop UI (Pending):** See Shops, Shrines & Potions.  
- **Load Game Screen (Pending):**  
  - Modal with 3 save slots (Name, Class, Floor, Time); “Continue”, “Delete Slot” buttons.  
  - Example HTML:  
    ```html
    <div class="modal hidden" id="load-game-screen">
      <h2 data-i18n="load_game_title">Load Game</h2>
      <div class="save-slots">
        <div class="save-slot" data-slot="1">
          <p data-i18n="save_slot">Name: <span data-i18n="char_taha_name">Taha</span>, Class: Warrior, Floor: 5, Time: 2h</p>
          <button data-i18n="continue">Continue</button>
          <button data-i18n="delete_slot">Delete Slot</button>
        </div>
      </div>
      <button data-i18n="back">Back</button>
    </div>
    ```
- **Narrative Events (Pending):**  
  - Modal with story snippets for shops, shrines, bosses.  
  - Example HTML:  
    ```html
    <div class="modal hidden" id="narrative-event">
      <p data-i18n="narrative_text">You stumble upon a forgotten shrine glowing in the dark...</p>
      <button data-i18n="continue">Continue</button>
    </div>
    ```
- **Cinematics (Pending):** Play after character selection and before first battle.  
- **Demo Completion Modal (Pending):** See Core Gameplay Loop.

## 🔧 Technical Architecture

- **Current State:** All logic in `index.html` with embedded JS, structured with modular comments (e.g., `// Combat System Start/End`).  
- **Future Plan:** Extract JS into `js/` files (e.g., `combat.js`, `inventory.js`) when requested.  
- **File Architecture (Planned):**
  ```
  path-of-heroes-rpg/
  ├─ index.html
  ├─ css/
  │  ├─ main.css
  │  ├─ animations.css
  │  ├─ rtl.css
  ├─ js/
  │  ├─ core/
  │  │  ├─ config.js
  │  │  ├─ localization.js
  │  │  ├─ state.js
  │  │  ├─ game.js
  │  ├─ systems/
  │  │  ├─ combat.js
  │  │  ├─ inventory.js
  │  │  ├─ progression.js
  │  │  ├─ merchant.js
  │  │  ├─ audio.js
  │  │  ├─ status.js
  │  ├─ entities/
  │  │  ├─ player.js
  │  │  ├─ enemy.js
  │  │  ├─ item.js
  │  ├─ ui/
  │  │  ├─ renderer.js
  │  │  ├─ animations.js
  │  └─ main.js
  ├─ assets/
  │  ├─ images/ (characters/, enemies/, items/, bg_shrine_dark_forest.jpg)
  │  ├─ audio/ (music/, sfx/)
  │  └─ data/ (localization.json, items.json, abilities.json)
  └─ tools/
     ├─ localization_export.js
     ├─ localization_import.js
     ├─ asset_export.js
  ```
- **Performance:** GPU acceleration, optimized for mobile PWA (60 FPS on mid-range devices).  

## 📅 Development Priority Plan

**Objective:** Deliver a mobile-only, portrait-only demo with 20 floors, 4 biomes, 3 characters, and core systems in `index.html`. Prevent bloat by prioritizing essential gameplay and testing in phases.

**Principles:**
- Build MVPs per phase for mobile testing.
- Test in mobile Chrome/Safari via PWA for portrait mode and touch input.
- Defer complex features (status effects, cinematics, audio) until core systems are stable.
- Embed JS in `index.html` with modular comments; do not generate separate JS files unless requested.
- Ensure EN/AR support with `data-i18n` and `aria-label`.

**Phases:**

1. **Core Gameplay Loop and Character Selection (2–3 weeks)**  
   - Features: Start screen, character selection (Taha, Mais, Ibrahim), basic combat (Attack, Skill, Flee), progression, localization.  
   - Deliverables: Playable loop in `index.html`.  
   - Testing: Verify UI, combat, leveling, EN/AR switching in PWA.

2. **Inventory System and Floor Progression (2–3 weeks)**  
   - Features: Vertical inventory UI, Floors 1–5, enemy scaling.  
   - Deliverables: Multi-floor loop with equippable items.  
   - Testing: Check inventory actions, floor transitions, localization.

3. **Shrine System and Death Mechanics (2 weeks)**  
   - Features: Scrollable shrine UI, buffs, death penalties, modal.  
   - Deliverables: Shrines and death/respawn loop.  
   - Testing: Validate buffs, death penalties, modal in portrait mode.

4. **Shop System and Checkpoints (2 weeks)**  
   - Features: Swipeable shop carousel, Floor 5 checkpoint.  
   - Deliverables: Shop interactions, saved progress.  
   - Testing: Confirm transactions, save/load functionality.

5. **Localization Export/Import and Combat Polish (1–2 weeks)**  
   - Features: CSV export/import, Defend action.  
   - Deliverables: Localization tools, polished combat.  
   - Testing: Verify CSV handling, Defend action.

6. **Biomes, Bosses, and Demo Completion (3–4 weeks)**  
   - Features: Floors 6–20, bosses, cinematics, demo modal.  
   - Deliverables: Complete 20-floor demo.  
   - Testing: Check biomes, boss fights, cinematics, modal.

7. **Optional Enhancements (2–3 weeks, optional)**  
   - Features: Status effects, audio, JS splitting.  
   - Deliverables: Enhanced demo with separate JS files.  
   - Testing: Validate effects, audio, modular JS.

**Timeline:** ~12–15 weeks (excluding Phase 7).

## 🛠️ Development Instructions - Start
```



#### Segment 5: Development Instructions and Localization


```markdown
## 🛠️ Development Instructions - Start

- **Resume Development:**  
  - Test `index.html` for UI rendering (start screen, character selection, shrine) with Taha, Mais, Ibrahim.  
  - Verify EN/AR switching with `data-i18n` and `aria-label`.  
  - Test character selection (top buttons, single card), combat (tap buttons, log), shrine (scrollable list).  
  - Focus on implementing `inventory.js`, `combat.js`, `merchant.js`, `localization_export.js`, `localization_import.js`, shrine logic in `index.html`.  
- **Single HTML for Testing:**  
  - Embed all logic in `index.html` within `<script>` tags, using modular comments (e.g., `// Combat System Start/End`).  
  - Support future splitting with modular patterns (e.g., IIFE, `window` exports).  
  - Do not generate separate JS files unless requested.  
  - Splitting Process (when requested):  
    1. Extract commented sections (e.g., `// Combat System Start/End`) into `js/` files (e.g., `combat.js`).  
    2. Update `index.html` with `<script src="js/...">` tags.  
    3. Test modular setup for identical functionality.  
    4. Keep backup of single-file `index.html`.  
- **Code Segmentation:**  
  - Break large outputs (e.g., `index.html`) into ~200–300 line segments in `` tags.  
  - Divide by logical sections (e.g., HTML, JS systems).  
  - Include duplicate comments (e.g., `// Combat System Start`) for merging.  
  - Test segments in CodePen.  
  - Example Merge for JS in `index.html`:  
    - Segment 1: `// Game State Start` to `// Combat System Start`.  
    - Segment 2: `// Combat System Start` to `// Localization System Start`.  
    - Merge: Combine in `<script>`, remove duplicate comments.  
- **Localization Export/Import:**  
  - Embed `localization_export.js` and `localization_import.js` in `index.html` under `// Localization Export Start/End` and `// Localization Import Start/End`.  
  - Export `localization.json` to `localization.csv` (columns: `key`, `en`, `ar`).  
  - Import edited CSV to update `localization.json` and UI via `updateLocalization()`.  
  - Example CSV:  
    ```
    key,en,ar
    char_taha_name,Taha,طه
    attack,🪓 Attack,🪓 هجوم
    ```
- **Testing Strategy:**  
  - Test in mobile Chrome/Safari via PWA for portrait mode, touch input.  
  - Verify EN/AR text, `aria-label`, touch-friendly controls (≥100px buttons, swipeable carousels).  
  - Metrics: No crashes, 60 FPS, full localization.  
  - Regression test previous phase features.  
- **Localization Notes:** Update `localization.json` with all UI text:  
  ```json
  {
    "game_title": { "en": "Path of Heroes", "ar": "طريق الأبطال" },
    "new_game": { "en": "New Game", "ar": "لعبة جديدة" },
    "load_game": { "en": "Load Game", "ar": "تحميل لعبة" },
    "options": { "en": "Options", "ar": "خيارات" },
    "choose_hero": { "en": "Choose Your Hero", "ar": "اختر بطلك" },
    "start_journey": { "en": "Start Journey", "ar": "ابدأ الرحلة" },
    "back": { "en": "Back", "ar": "العودة" },
    "lang_en": { "en": "EN", "ar": "EN" },
    "lang_ar": { "en": "عربي", "ar": "عربي" },
    "hp": { "en": "HP", "ar": "صحة" },
    "atk": { "en": "Attack", "ar": "هجوم" },
    "def": { "en": "Defense", "ar": "دفاع" },
    "spd": { "en": "Speed", "ar": "سرعة" },
    "crit": { "en": "Crit", "ar": "حاسم" },
    "char_taha_name": { "en": "Taha", "ar": "طه" },
    "char_taha_title": { "en": "Steel Knight", "ar": "الفارس الفولاذي" },
    "char_taha_desc": { "en": "A stalwart defender with unmatched courage.", "ar": "مدافع صامد بشجاعة لا تُضاهى." },
    "char_mais_name": { "en": "Mais", "ar": "ميس" },
    "char_mais_title": { "en": "Arcane Weaver", "ar": "نساجة السحر" },
    "char_mais_desc": { "en": "A master of mystical arts and elemental magic.", "ar": "سيدة الفنون السحرية والسحر الأولي." },
    "char_ibrahim_name": { "en": "Ibrahim", "ar": "إبراهيم" },
    "char_ibrahim_title": { "en": "Shadow Blade", "ar": "نصل الظل" },
    "char_ibrahim_desc": { "en": "A swift and deadly assassin who strikes from the shadows.", "ar": "قاتل سريع ومميت يضرب من الظلال." },
    "shrine_title": { "en": "A Mysterious Shrine", "ar": "معبد غامض" },
    "shrine_text": { "en": "You feel an ancient energy stir...", "ar": "تشعر بطاقة قديمة تتحرك..." },
    "blessing_wrath": { "en": "⚔️ Wrath of the Fallen", "ar": "⚔️ غضب الساقطين" },
    "blessing_wrath_effect": { "en": "+15% Attack until end of biome", "ar": "+15% هجوم حتى نهاية المنطقة" },
    "blessing_stoneheart": { "en": "🛡 Stoneheart Ward", "ar": "🛡 درع قلب الحجر" },
    "blessing_stoneheart_effect": { "en": "Gain a shield that blocks 20 damage", "ar": "اكتساب درع يمنع 20 ضررًا" },
    "blessing_spirit": { "en": "🌿 Spirit’s Gift", "ar": "🌿 هدية الروح" },
    "blessing_spirit_effect": { "en": "Regenerate 3 HP per turn", "ar": "تجديد 3 نقاط صحة لكل دور" },
    "accept": { "en": "Accept", "ar": "قبول" },
    "scroll_indicator": { "en": "", "ar": "" },
    "you_died": { "en": "You Died", "ar": "لقد مت" },
    "death_message": { "en": "90% gold lost. Restarting at floor checkpoint.", "ar": "فقدان 90% من الذهب. إعادة البدء من نقطة التفتيش." },
    "respawn": { "en": "Respawn", "ar": "إعادة الظهور" },
    "inventory_title": { "en": "Inventory & Equipment", "ar": "المخزون والتجهيزات" },
    "slot_head": { "en": "Head", "ar": "الرأس" },
    "slot_weapon": { "en": "Weapon", "ar": "السلاح" },
    "none": { "en": "None", "ar": "لا شيء" },
    "item_iron_sword": { "en": "Iron Sword", "ar": "سيف حديدي" },
    "item_rusty_sword": { "en": "Rusty Sword", "ar": "سيف صدئ" },
    "sort_items": { "en": "Sort", "ar": "فرز" },
    "sell_common": { "en": "Sell Common", "ar": "بيع العادي" },
    "shop_title": { "en": "Merchant – Floor X", "ar": "التاجر – الطابق X" },
    "item_frozen_sword": { "en": "Frozen Sword", "ar": "السيف المتجمد" },
    "item_frozen_sword_stats": { "en": "ATK +10, Freeze chance", "ar": "هجوم +10، فرصة التجميد" },
    "item_frozen_sword_price": { "en": "💰 120", "ar": "💰 120" },
    "buy": { "en": "Buy", "ar": "شراء" },
    "compare": { "en": "Compare", "ar": "مقارنة" },
    "sell_items": { "en": "Sell Items", "ar": "بيع العناصر" },
    "narrative_text": { "en": "You stumble upon a forgotten shrine...", "ar": "تتعثر على معبد منسي..." },
    "continue": { "en": "Continue", "ar": "متابعة" }
  }
  ```

## 🛠️ Development Instructions - End
## 🌟 Success Metrics - Start
```



#### Segment 6: Success Metrics and Merge Instructions


```markdown
## 🌟 Success Metrics - Start

- **Demo Complete When:** 20 floors, 4 biomes, inventory, shops, shrines, save/load, cinematics, and demo modal implemented.  
- **Current Status:** ~55% complete (start screen, character selection, partial combat/inventory/shrine UI, localization).  

## 🛠️ Merge Instructions for Master Prompt (v27)

To combine into a single `PathOfHeroes_MasterPrompt_v27.md`:
1. Create `PathOfHeroes_MasterPrompt_v27.md`.
2. Copy **Segment 1** in full (`## 🎮 Game Overview` to `## ⚔️ Combat System - Start`).
3. Append **Segment 2**, removing duplicate `## ⚔️ Combat System - Start`.
4. Append **Segment 3**, removing duplicate `## ☠️ Death & Roguelike Mechanics - Start`.
5. Append **Segment 4**, removing duplicate `## 🖥 UI/UX and Screens - Start`.
6. Append **Segment 5**, removing duplicate `## 🛠️ Development Instructions - Start`.
7. Append **Segment 6**, removing duplicate `## 🌟 Success Metrics - Start`.
8. Ensure file ends with `## 🌟 Success Metrics - End`.

## 🌟 Success Metrics - End
```



---

### 📝 Updated index.html (Mobile-Only, Portrait-Only)

This is the complete, mobile-only `index.html`, incorporating the Game Bible’s code, updated for portrait mode, touch input, and all v27 features (e.g., shrine UI, localization). All JS is embedded with modular comments.

```html

```html
<!DOCTYPE html>
<html lang="en" id="html-root">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Path of Heroes</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Noto+Sans:wght@400;600&family=Noto+Sans+Arabic:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --font-main: 'Cinzel', serif;
            --font-ui: 'Noto Sans', sans-serif;
            --font-arabic: 'Noto Sans Arabic', sans-serif;
            --color-bg: #0d0d0d;
            --color-surface: #1a120a;
            --color-primary: #d4a656;
            --color-text: #f8e4c0;
            --color-border: #5c4423;
            --color-button: #2d1e12;
        }

        body {
            margin: 0;
            font-family: var(--font-ui);
            background-color: var(--color-bg);
            color: var(--color-text);
            overflow-x: hidden;
        }

        .hidden {
            display: none !important;
        }

        .container {
            padding: 1rem;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
        }

        .lang-toggle {
            position: absolute;
            top: 1rem;
            right: 1rem;
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
            z-index: 100;
        }

        .lang-toggle button {
            background: var(--color-button);
            border: 1px solid var(--color-primary);
            color: var(--color-text);
            padding: 0.5rem 1rem;
            font-size: 1rem;
            font-family: var(--font-ui);
            border-radius: 5px;
            touch-action: manipulation;
        }

        .lang-toggle button.active {
            background-color: var(--color-primary);
            color: var(--color-bg);
        }

        h1, h2, h3 {
            font-family: var(--font-main);
            color: var(--color-primary);
            text-align: center;
        }

        /* Main Menu */
        #main-menu h1 {
            font-size: 2.5rem;
            margin-bottom: 2rem;
        }
        .main-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
            max-width: 300px;
        }
        .main-buttons button {
            background: var(--color-button);
            border: 2px solid var(--color-border);
            color: var(--color-text);
            padding: 0.8rem;
            font-size: 1.2rem;
            border-radius: 8px;
            min-height: 60px;
            touch-action: manipulation;
        }

        /* Character Selection */
        #character-select h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        .character-selectors {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1rem;
            width: 100%;
            max-width: 300px;
        }
        .character-selectors button {
            padding: 0.8rem;
            background: var(--color-button);
            border: 2px solid var(--color-border);
            color: var(--color-text);
            font-family: var(--font-main);
            font-size: 1.1rem;
            border-radius: 8px;
            min-height: 50px;
            touch-action: manipulation;
        }
        .character-selectors button.active {
            border-color: var(--color-primary);
            box-shadow: 0 0 10px var(--color-primary);
        }

        .character-card {
            border: 2px solid var(--color-primary);
            border-radius: 12px;
            background: var(--color-surface);
            padding: 1.5rem;
            width: 100%;
            max-width: 300px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            text-align: center;
        }

        .char-sprite-placeholder {
            width: 100px;
            height: 100px;
            background-color: #000;
            border-radius: 50%;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
        }

        .character-info {
            text-align: center;
        }
        .character-info h2 {
            margin: 0 0 0.25rem 0;
            font-size: 1.5rem;
        }
        .character-info h3 {
            font-style: italic;
            color: var(--color-text);
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
        }
        .character-info ul {
            list-style: none;
            padding: 0;
            text-align: start;
            font-size: 1rem;
        }

        .bottom-buttons {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-top: 1rem;
            width: 100%;
            max-width: 300px;
        }
        .bottom-buttons button {
            background: var(--color-button);
            border: 2px solid var(--color-border);
            color: var(--color-text);
            padding: 0.8rem;
            font-size: 1rem;
            border-radius: 8px;
            min-height: 50px;
            touch-action: manipulation;
        }
        .bottom-buttons button.primary {
            border-color: var(--color-primary);
        }

        /* Shrine Screen */
        #shrine-screen {
            background: url('assets/bg_shrine_dark_forest.jpg') no-repeat center center;
            background-size: cover;
            padding: 1rem;
            color: var(--color-text);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        #shrine-screen h2 {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        .flavor-text {
            font-family: var(--font-ui);
            font-size: 1rem;
            color: #ccc;
            margin-bottom: 1rem;
            text-align: center;
        }
        .blessing-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            overflow-y: auto;
            max-height: 60vh;
            width: 100%;
            max-width: 300px;
        }
        .blessing-card {
            background: rgba(20, 20, 20, 0.9);
            border: 2px solid var(--color-primary);
            border-radius: 10px;
            padding: 1rem;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .blessing-card h3 {
            font-size: 1.2rem;
            margin: 0.5rem 0;
        }
        .blessing-card p {
            font-family: var(--font-ui);
            font-size: 0.9rem;
            color: #ccc;
            margin: 0.5rem 0;
        }
        .blessing-card button {
            background: var(--color-button);
            border: 2px solid var(--color-border);
            color: var(--color-text);
            padding: 0.5rem;
            font-size: 1rem;
            border-radius: 8px;
            min-height: 40px;
            touch-action: manipulation;
        }
        .blessing-card button:hover {
            box-shadow: 0 0 10px var(--color-primary);
        }
        .scroll-indicator {
            display: flex;
            justify-content: center;
            gap: 5px;
            margin-top: 0.5rem;
            font-family: var(--font-ui);
            font-size: 0.8rem;
            color: #ccc;
        }

        /* Combat Screen */
        .hero-hud, .enemy-hud {
            width: 100%;
            max-width: 300px;
            text-align: center;
            margin-bottom: 1rem;
        }
        .bar {
            display: inline-block;
            width: 150px;
            height: 10px;
            background: #333;
            border: 1px solid #5c4423;
            border-radius: 5px;
        }
        .hp-bar .fill {
            background: linear-gradient(90deg, #8b0000, #ff4500);
            height: 100%;
            border-radius: 5px;
        }
        .action-buttons {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
            max-width: 300px;
        }
        .action-buttons button {
            background: #2d1e12;
            border: 2px solid #5c4423;
            color: #f8e4c0;
            padding: 0.8rem;
            font-size: 1rem;
            border-radius: 8px;
            min-height: 50px;
            touch-action: manipulation;
        }
        #combat-log {
            position: absolute;
            top: 50%;
            width: 100%;
            text-align: center;
            font-family: 'Noto Sans', sans-serif;
            color: #f8e4c0;
            opacity: 0.85;
        }
        .log-entry {
            animation: fadeOut 4s forwards;
            margin: 5px 0;
            font-size: 0.9rem;
        }
        @keyframes fadeOut {
            0% { opacity: 1; }
            90% { opacity: 0.4; }
            100% { opacity: 0; }
        }

        /* Modals */
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 200;
        }
        .modal h2 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
        }
        .modal p {
            font-size: 1rem;
            margin-bottom: 1rem;
            text-align: center;
        }
        .modal button {
            background: #2d1e12;
            border: 2px solid #5c4423;
            color: #f8e4c0;
            padding: 0.8rem;
            font-size: 1rem;
            border-radius: 8px;
            min-height: 50px;
            touch-action: manipulation;
        }

        [dir="rtl"] {
            font-family: var(--font-arabic);
        }
        [dir="rtl"] .main-buttons button,
        [dir="rtl"] .character-selectors button,
        [dir="rtl"] .bottom-buttons button,
        [dir="rtl"] .blessing-card button,
        [dir="rtl"] .modal button {
            font-family: var(--font-arabic);
        }
        [dir="rtl"] .character-info ul {
            text-align: end;
        }
    </style>
</head>
<body>
    <!-- Language Toggle -->
    <div class="lang-toggle">
        <button onclick="setLang('en')" id="lang-btn-en" class="active" data-i18n="lang_en">EN</button>
        <button onclick="setLang('ar')" id="lang-btn-ar" data-i18n="lang_ar">عربي</button>
    </div>

    <!-- Start Screen -->
    <div class="container" id="main-menu">
        <h1 data-i18n="game_title">Path of Heroes</h1>
        <div class="main-buttons">
            <button onclick="showCharacterSelect()" data-i18n="new_game">New Game</button>
            <button onclick="showLoadGame()" data-i18n="load_game">Load Game</button>
            <button onclick="showOptions()" data-i18n="options">Options</button>
        </div>
    </div>

    <!-- Character Selection -->
    <div class="container hidden" id="character-select">
        <h1 data-i18n="choose_hero">Choose Your Hero</h1>
        <div class="character-selectors" id="character-selectors"></div>
        <div class="character-card">
            <div id="char-sprite" class="char-sprite-placeholder"></div>
            <div class="character-info">
                <h2 id="char-name" data-i18n="char_name"></h2>
                <h3 id="char-title" data-i18n="char_title"></h3>
                <p id="char-desc" data-i18n="char_desc"></p>
                <ul id="char-stats"></ul>
            </div>
        </div>
        <div class="bottom-buttons">
            <button class="primary" onclick="startGame()" data-i18n="start_journey">Start Journey</button>
            <button onclick="showMainMenu()" data-i18n="back">Back</button>
        </div>
    </div>

    <!-- Shrine Screen -->
    <div class="container hidden" id="shrine-screen">
        <h2 data-i18n="shrine_title">A Mysterious Shrine</h2>
        <p class="flavor-text" data-i18n="shrine_text">You feel an ancient energy stir...</p>
        <div class="blessing-options" role="list">
            <div class="blessing-card" role="listitem" data-i18n="blessing_wrath" aria-label="Wrath of the Fallen: +15% Attack until end of biome">
                <h3 data-i18n="blessing_wrath">⚔️ Wrath of the Fallen</h3>
                <p data-i18n="blessing_wrath_effect">+15% Attack until end of biome</p>
                <button data-i18n="accept" aria-label="Accept">Accept</button>
            </div>
            <div class="blessing-card" role="listitem" data-i18n="blessing_stoneheart" aria-label="Stoneheart Ward: Gain a shield that blocks 20 damage">
                <h3 data-i18n="blessing_stoneheart">🛡 Stoneheart Ward</h3>
                <p data-i18n="blessing_stoneheart_effect">Gain a shield that blocks 20 damage</p>
                <button data-i18n="accept" aria-label="Accept">Accept</button>
            </div>
            <div class="blessing-card" role="listitem" data-i18n="blessing_spirit" aria-label="Spirit's Gift: Regenerate 3 HP per turn">
                <h3 data-i18n="blessing_spirit">🌿 Spirit’s Gift</h3>
                <p data-i18n="blessing_spirit_effect">Regenerate 3 HP per turn</p>
                <button data-i18n="accept" aria-label="Accept">Accept</button>
            </div>
        </div>
        <div class="scroll-indicator" data-i18n="scroll_indicator" aria-label="Scroll position"></div>
    </div>

    <!-- Battle Screen -->
    <div class="container hidden" id="battle-screen">
        <div class="hero-hud">
            <div class="char-sprite-placeholder" id="hero-sprite"></div>
            <h3 data-i18n="char_name" id="hero-name"></h3>
            <p>❤️ HP: <span class="bar hp-bar"><span class="fill" id="hero-hp-fill"></span></span> <span id="hp-value"></span></p>
            <p id="hero-resource"></p>
        </div>
        <div class="enemy-hud">
            <div class="char-sprite-placeholder" id="enemy-sprite"></div>
            <h3 data-i18n="enemy_name" id="enemy-name"></h3>
            <p>❤️ HP: <span class="bar hp-bar"><span class="fill" id="enemy-hp-fill"></span></span> <span id="enemy-hp-value"></span></p>
        </div>
        <div id="combat-log"></div>
        <div class="action-buttons">
            <button data-i18n="attack" aria-label="Attack">🪓 Attack</button>
            <button data-i18n="skill" aria-label="Skill">🎯 Skill</button>
            <button data-i18n="flee" aria-label="Flee">🚪 Flee</button>
        </div>
    </div>

    <!-- Modals -->
    <div class="modal hidden" id="death-modal">
        <h2 data-i18n="you_died">You Died</h2>
        <p data-i18n="death_message">90% gold lost. Restarting at floor checkpoint.</p>
        <button data-i18n="respawn" aria-label="Respawn">Respawn</button>
    </div>
    <div class="modal hidden" id="narrative-event">
        <p data-i18n="narrative_text">You stumble upon a forgotten shrine...</p>
        <button data-i18n="continue">Continue</button>
    </div>

    <script>
        // Game State Start
        const GameState = {
            player: null,
            currentFloor: 1,
            language: 'en',
            gold: 0,
            inventory: [],
            equipped: { head: null, shoulders: null, chest: null, legs: null, feet: null, hands: null, weapon: null, accessory: null }
        };
        // Game State End

        // Character System Start
        const characterData = {
            taha: {
                id: 'taha',
                name: { en: "Taha", ar: "طه" },
                title: { en: "Steel Knight", ar: "الفارس الفولاذي" },
                desc: { en: "A stalwart defender with unmatched courage.", ar: "مدافع صامد بشجاعة لا تُضاهى." },
                sprite: '⚔️',
                stats: { hp: 120, maxHP: 120, atk: 15, def: 12, spd: 8, crit: "10%" },
                resource: { type: "vigor", current: 25, max: 25, regen: 2 }
            },
            mais: {
                id: 'mais',
                name: { en: "Mais", ar: "ميس" },
                title: { en: "Arcane Weaver", ar: "نساجة السحر" },
                desc: { en: "A master of mystical arts and elemental magic.", ar: "سيدة الفنون السحرية والسحر الأولي." },
                sprite: '🔮',
                stats: { hp: 80, maxHP: 80, atk: 20, def: 8, spd: 12, crit: "15%" },
                resource: { type: "mana", current: 30, max: 30, regen: 3 }
            },
            ibrahim: {
                id: 'ibrahim',
                name: { en: "Ibrahim", ar: "إبراهيم" },
                title: { en: "Shadow Blade", ar: "نصل الظل" },
                desc: { en: "A swift and deadly assassin who strikes from the shadows.", ar: "قاتل سريع ومميت يضرب من الظلال." },
                sprite: '🗡️',
                stats: { hp: 100, maxHP: 100, atk: 18, def: 10, spd: 15, crit: "20%" },
                resource: { type: "energy", current: 20, max: 20, regen: 4 }
            }
        };
        // Character System End

        // Localization System Start
        const i18nData = {
            en: {
                game_title: "Path of Heroes",
                new_game: "New Game",
                load_game: "Load Game",
                options: "Options",
                choose_hero: "Choose Your Hero",
                start_journey: "Start Journey",
                back: "Back",
                hp: "HP",
                atk: "Attack",
                def: "Defense",
                spd: "Speed",
                crit: "Crit",
                lang_en: "EN",
                lang_ar: "عربي",
                shrine_title: "A Mysterious Shrine",
                shrine_text: "You feel an ancient energy stir...",
                blessing_wrath: "⚔️ Wrath of the Fallen",
                blessing_wrath_effect: "+15% Attack until end of biome",
                blessing_stoneheart: "🛡 Stoneheart Ward",
                blessing_stoneheart_effect: "Gain a shield that blocks 20 damage",
                blessing_spirit: "🌿 Spirit’s Gift",
                blessing_spirit_effect: "Regenerate 3 HP per turn",
                accept: "Accept",
                scroll_indicator: "",
                you_died: "You Died",
                death_message: "90% gold lost. Restarting at floor checkpoint.",
                respawn: "Respawn",
                inventory_title: "Inventory & Equipment",
                slot_head: "Head",
                slot_weapon: "Weapon",
                none: "None",
                item_iron_sword: "Iron Sword",
                item_rusty_sword: "Rusty Sword",
                sort_items: "Sort",
                sell_common: "Sell Common",
                shop_title: "Merchant – Floor X",
                item_frozen_sword: "Frozen Sword",
                item_frozen_sword_stats: "ATK +10, Freeze chance",
                item_frozen_sword_price: "💰 120",
                buy: "Buy",
                compare: "Compare",
                sell_items: "Sell Items",
                narrative_text: "You stumble upon a forgotten shrine...",
                continue: "Continue"
            },
            ar: {
                game_title: "طريق الأبطال",
                new_game: "لعبة جديدة",
                load_game: "تحميل لعبة",
                options: "الخيارات",
                choose_hero: "اختر بطلك",
                start_journey: "ابدأ الرحلة",
                back: "العودة",
                hp: "صحة",
                atk: "هجوم",
                def: "دفاع",
                spd: "سرعة",
                crit: "حاسم",
                lang_en: "EN",
                lang_ar: "عربي",
                shrine_title: "معبد غامض",
                shrine_text: "تشعر بطاقة قديمة تتحرك...",
                blessing_wrath: "⚔️ غضب الساقطين",
                blessing_wrath_effect: "+15% هجوم حتى نهاية المنطقة",
                blessing_stoneheart: "🛡 درع قلب الحجر",
                blessing_stoneheart_effect: "اكتساب درع يمنع 20 ضررًا",
                blessing_spirit: "🌿 هدية الروح",
                blessing_spirit_effect: "تجديد 3 نقاط صحة لكل دور",
                accept: "قبول",
                scroll_indicator: "",
                you_died: "لقد مت",
                death_message: "فقدان 90% من الذهب. إعادة البدء من نقطة التفتيش.",
                respawn: "إعادة الظهور",
                inventory_title: "المخزون والتجهيزات",
                slot_head: "الرأس",
                slot_weapon: "السلاح",
                none: "لا شيء",
                item_iron_sword: "سيف حديدي",
                item_rusty_sword: "سيف صدئ",
                sort_items: "فرز",
                sell_common: "بيع العادي",
                shop_title: "التاجر – الطابق X",
                item_frozen_sword: "السيف المتجمد",
                item_frozen_sword_stats: "هجوم +10، فرصة التجميد",
                item_frozen_sword_price: "💰 120",
                buy: "شراء",
                compare: "مقارنة",
                sell_items: "بيع العناصر",
                narrative_text: "تتعثر على معبد منسي...",
                continue: "متابعة"
            }
        };

        function setLang(lang) {
            GameState.language = lang;
            document.getElementById('html-root').dir = lang === 'ar' ? 'rtl' : 'ltr';
            document.getElementById('lang-btn-en').classList.toggle('active', lang === 'en');
            document.getElementById('lang-btn-ar').classList.toggle('active', lang === 'ar');
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.dataset.i18n;
                if (i18nData[lang][key]) {
                    el.textContent = i18nData[lang][key];
                    el.setAttribute('aria-label', i18nData.en[key]);
                }
            });
            if (!document.getElementById('character-select').classList.contains('hidden')) {
                populateSelectorButtons();
                updateCharacterDisplay();
            }
        }

        async function loadLocalization() {
            try {
                const response = await fetch('assets/data/localization.json');
                if (!response.ok) throw new Error('Failed to fetch localization.json');
                return await response.json();
            } catch (error) {
                console.error('Localization load failed:', error);
                return i18nData;
            }
        }

        function updateLocalization(data) {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.dataset.i18n;
                if (data[key]) {
                    el.textContent = data[key][GameState.language];
                    el.setAttribute('aria-label', data[key].en);
                }
            });
        }
        // Localization System End

        // Navigation System Start
        function showScreen(screenId) {
            document.querySelectorAll('.container, .modal').forEach(container => {
                container.classList.add('hidden');
            });
            document.getElementById(screenId).classList.remove('hidden');
        }

        function showMainMenu() { showScreen('main-menu'); }
        function showCharacterSelect() {
            showScreen('character-select');
            populateSelectorButtons();
            selectHero(GameState.player?.id || 'taha');
        }
        function showOptions() { showScreen('options-screen'); }
        function showLoadGame() { showScreen('load-game-screen'); }
        // Navigation System End

        // Character System Start
        function populateSelectorButtons() {
            const container = document.getElementById('character-selectors');
            container.innerHTML = '';
            Object.keys(characterData).forEach(heroId => {
                const button = document.createElement('button');
                button.textContent = characterData[heroId].name[GameState.language];
                button.setAttribute('data-i18n', `char_${heroId}_name`);
                button.setAttribute('aria-label', characterData[heroId].name.en);
                button.onclick = () => selectHero(heroId);
                button.id = `btn-${heroId}`;
                container.appendChild(button);
            });
        }

        function selectHero(heroId) {
            GameState.player = { id: heroId, ...characterData[heroId] };
            updateCharacterDisplay();
            document.querySelectorAll('.character-selectors button').forEach(btn => {
                btn.classList.remove('active');
            });
            document.getElementById(`btn-${heroId}`).classList.add('active');
        }

        function updateCharacterDisplay() {
            const char = GameState.player || characterData.taha;
            const lang = GameState.language;
            document.getElementById('char-sprite').textContent = char.sprite;
            document.getElementById('char-name').textContent = char.name[lang];
            document.getElementById('char-name').setAttribute('data-i18n', `char_${char.id}_name`);
            document.getElementById('char-title').textContent = char.title[lang];
            document.getElementById('char-title').setAttribute('data-i18n', `char_${char.id}_title`);
            document.getElementById('char-desc').textContent = char.desc[lang];
            document.getElementById('char-desc').setAttribute('data-i18n', `char_${char.id}_desc`);
            const statsList = document.getElementById('char-stats');
            statsList.innerHTML = '';
            Object.entries(char.stats).forEach(([key, value]) => {
                const li = document.createElement('li');
                li.textContent = `${i18nData[lang][key] || key.toUpperCase()}: ${value}`;
                statsList.appendChild(li);
            });
        }
        // Character System End

        // Game Start Start
        function startGame() {
            alert(`Starting game with ${GameState.player.name[GameState.language]
