/* ==========================================================================
   利餘金鰲買 - 遊戲核心邏輯 (JavaScript Core)
   ========================================================================== */

// --- 1. 現代化高吸引力商品資料庫定義 ---
const ITEMS = [
    {
        id: 1,
        name: "極致降噪 AirPods Pro 耳機",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#3b82f6" stroke="#1e293b" stroke-width="4"/><rect x="34" y="32" width="13" height="24" rx="6" fill="#ffffff" stroke="#1e293b" stroke-width="3"/><path d="M 40 56 L 40 72" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/><rect x="53" y="32" width="13" height="24" rx="6" fill="#ffffff" stroke="#1e293b" stroke-width="3"/><path d="M 59 56 L 59 72" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/></svg>`,
        basePrice: 500,
        suggestPrice: 7000,
        isNeed: null, 
        desc: "極致主動降噪，享受純淨音質與無干擾世界"
    },
    {
        id: 2,
        name: "網紅手搖飲四季厚奶茶 100 杯",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#f59e0b" stroke="#1e293b" stroke-width="4"/><path d="M 36 38 L 40 76 A 4 4 0 0 0 44 80 L 56 80 A 4 4 0 0 0 60 76 L 64 38 Z" fill="#ffedd5" stroke="#1e293b" stroke-width="3"/><rect x="33" y="32" width="34" height="6" fill="#ef4444" stroke="#1e293b" stroke-width="3" rx="2"/><path d="M 50 32 L 56 16" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/></svg>`,
        basePrice: 200,
        suggestPrice: 6000,
        isNeed: null,
        desc: "每日一杯療癒靈魂，享受爆棚的甜蜜幸福感"
    },
    {
        id: 3,
        name: "知名人氣樂團演唱會特區門票",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#ec4899" stroke="#1e293b" stroke-width="4"/><g transform="rotate(-15 50 50)"><rect x="24" y="36" width="52" height="28" rx="4" fill="#ffffff" stroke="#1e293b" stroke-width="3"/><circle cx="34" cy="50" r="4" fill="#ec4899" stroke="#1e293b" stroke-width="1.5"/><line x1="46" y1="44" x2="68" y2="44" stroke="#1e293b" stroke-width="2.5"/><line x1="46" y1="52" x2="68" y2="52" stroke="#1e293b" stroke-width="2.5"/></g></svg>`,
        basePrice: 1000,
        suggestPrice: 6800,
        isNeed: null,
        desc: "搖滾第一排震撼視聽，此生必去的燃魂狂歡夜"
    },
    {
        id: 4,
        name: "極致防寒 GORE-TEX 機能外套",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#10b981" stroke="#1e293b" stroke-width="4"/><path d="M 32 42 L 40 36 L 50 46 L 60 36 L 68 42 L 68 76 L 32 76 Z" fill="#059669" stroke="#1e293b" stroke-width="3"/><path d="M 50 46 L 50 76" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round"/></svg>`,
        basePrice: 1000,
        suggestPrice: 12000,
        isNeed: null,
        desc: "頂級機能面料，全天候防風防水、保暖透氣"
    },
    {
        id: 5,
        name: "捷安特公路碳纖維單車",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#06b6d4" stroke="#1e293b" stroke-width="4"/><circle cx="34" cy="62" r="12" fill="none" stroke="#1e293b" stroke-width="3"/><circle cx="66" cy="62" r="12" fill="none" stroke="#1e293b" stroke-width="3"/><path d="M 34 62 L 48 44 L 62 44 L 66 62 M 48 44 L 54 62 M 44 38 L 52 38" fill="none" stroke="#1e293b" stroke-width="3" stroke-linejoin="round"/></svg>`,
        basePrice: 1000,
        suggestPrice: 15000,
        isNeed: null,
        desc: "極速破風、輕量操控，享受公路的奔馳快感"
    },
    {
        id: 6,
        name: "全球植樹與減碳計畫支持專案",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#84cc16" stroke="#1e293b" stroke-width="4"/><path d="M 50 75 L 50 45" stroke="#78350f" stroke-width="4" stroke-linecap="round"/><path d="M 50 45 C 38 45 32 30 50 22 C 68 30 62 45 50 45 Z" fill="#22c55e" stroke="#1e293b" stroke-width="3"/></svg>`,
        basePrice: 200,
        suggestPrice: 1000,
        isNeed: null,
        desc: "為地球種下綠意生機，攜手守護綠色未來"
    },
    {
        id: 7,
        name: "任天堂 Switch 2 豪華同捆組",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#a855f7" stroke="#1e293b" stroke-width="4"/><rect x="28" y="38" width="44" height="24" rx="4" fill="#ffffff" stroke="#1e293b" stroke-width="3"/><rect x="28" y="38" width="10" height="24" rx="2" fill="#ef4444" stroke="#1e293b" stroke-width="2"/><rect x="62" y="38" width="10" height="24" rx="2" fill="#3b82f6" stroke="#1e293b" stroke-width="2"/><circle cx="33" cy="50" r="2" fill="#1e293b"/><circle cx="67" cy="50" r="2" fill="#1e293b"/></svg>`,
        basePrice: 500,
        suggestPrice: 13000,
        isNeed: null,
        desc: "次世代熱門旗艦主機，派對聚會的歡樂焦點"
    },
    {
        id: 8,
        name: "頂級健檢與重大傷病平安保險",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#14b8a6" stroke="#1e293b" stroke-width="4"/><path d="M 50 28 L 68 36 L 68 55 C 68 68, 50 75, 50 75 C 50 75, 32 68, 32 55 L 32 36 Z" fill="#ffffff" stroke="#1e293b" stroke-width="3"/><path d="M 44 52 L 49 57 L 58 46" fill="none" stroke="#14b8a6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        basePrice: 500,
        suggestPrice: 5000,
        isNeed: null,
        desc: "全方位健康安全保障，打造最堅實的安心後盾"
    },
    {
        id: 9,
        name: "精美特製家人生日大禮包",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#f43f5e" stroke="#1e293b" stroke-width="4"/><rect x="32" y="44" width="36" height="32" rx="2" fill="#ffffff" stroke="#1e293b" stroke-width="3"/><path d="M 50 44 L 50 76 M 32 60 L 68 60" stroke="#f43f5e" stroke-width="3"/><path d="M 50 44 C 42 36, 42 26, 50 44 C 58 26, 58 36, 50 44 Z" fill="#f43f5e" stroke="#1e293b" stroke-width="2.5"/></svg>`,
        basePrice: 300,
        suggestPrice: 2000,
        isNeed: null,
        desc: "滿載溫暖心意的客製驚喜，獻上最珍貴的感動"
    },
    {
        id: 10,
        name: "NVIDIA RTX 5080 頂級顯示卡",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#475569" stroke="#1e293b" stroke-width="4"/><rect x="26" y="34" width="48" height="32" rx="3" fill="#22c55e" stroke="#1e293b" stroke-width="3"/><circle cx="42" cy="50" r="10" fill="#334155" stroke="#1e293b" stroke-width="3"/><circle cx="58" cy="50" r="10" fill="#334155" stroke="#1e293b" stroke-width="3"/></svg>`,
        basePrice: 2000,
        suggestPrice: 36000,
        isNeed: null,
        desc: "怪獸級頂級光追效能，征服所有 3A 遊戲大作"
    },
    {
        id: 11,
        name: "東京五天四夜奢華雙人自由行",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#60a5fa" stroke="#1e293b" stroke-width="4"/><path d="M 24 55 Q 50 25 76 55 Z" fill="#ffffff" stroke="#1e293b" stroke-width="3"/><path d="M 18 55 L 82 55 Q 82 60 76 60 L 24 60 Q 18 60 18 55 Z" fill="#ef4444" stroke="#1e293b" stroke-width="3"/><path d="M 50 35 L 50 55" stroke="#1e293b" stroke-width="3"/></svg>`,
        basePrice: 3000,
        suggestPrice: 40000,
        isNeed: null,
        desc: "漫步繁華澀谷與富士山景，享受極致放鬆假期"
    },
    {
        id: 12,
        name: "iPad Pro M4 + Apple Pencil 組合",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#3b82f6" stroke="#1e293b" stroke-width="4"/><rect x="28" y="30" width="44" height="40" rx="3" fill="#ffffff" stroke="#1e293b" stroke-width="3"/><rect x="32" y="34" width="36" height="32" fill="#1e293b"/><line x1="72" y1="26" x2="82" y2="46" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/></svg>`,
        basePrice: 2000,
        suggestPrice: 35000,
        isNeed: null,
        desc: "超強 M4 晶片，學習筆記與數位繪圖創作神器"
    },
    {
        id: 13,
        name: "Tesla Model 3 自駕體驗一日券",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#6366f1" stroke="#1e293b" stroke-width="4"/><path d="M 28 64 Q 50 32 72 64 Z" fill="#ef4444" stroke="#1e293b" stroke-width="3"/><rect x="30" y="58" width="40" height="10" fill="#ffffff" stroke="#1e293b" stroke-width="3" rx="2"/><circle cx="38" cy="68" r="6" fill="#1e293b"/><circle cx="62" cy="68" r="6" fill="#1e293b"/></svg>`,
        basePrice: 500,
        suggestPrice: 5000,
        isNeed: null,
        desc: "感受貼背加速與頂尖科技，體驗未來智慧駕馭"
    },
    {
        id: 14,
        name: "日常必需超柔抽取式衛生紙一箱",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#94a3b8" stroke="#1e293b" stroke-width="4"/><rect x="30" y="38" width="40" height="34" rx="3" fill="#ffffff" stroke="#1e293b" stroke-width="3"/><ellipse cx="50" cy="38" rx="20" ry="6" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/></svg>`,
        basePrice: 200,
        suggestPrice: 800,
        isNeed: null,
        desc: "頂級親膚絲柔觸感，每日居家生活必備首選"
    },
    {
        id: 15,
        name: "生成式 AI 與全套程式實戰課程",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#0284c7" stroke="#1e293b" stroke-width="4"/><rect x="28" y="32" width="44" height="30" rx="3" fill="#ffffff" stroke="#1e293b" stroke-width="3"/><path d="M 40 62 L 32 74 L 68 74 L 60 62 Z" fill="#64748b" stroke="#1e293b" stroke-width="3" stroke-linejoin="round"/><path d="M 42 42 L 48 48 L 58 38" fill="none" stroke="#22c55e" stroke-width="3.5" stroke-linecap="round"/></svg>`,
        basePrice: 1000,
        suggestPrice: 8000,
        isNeed: null,
        desc: "掌握前沿 AI 實戰技術，全面升級未來競爭力"
    },
    {
        id: 16,
        name: "智慧健康手環與運動心率手錶",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#10b981" stroke="#1e293b" stroke-width="4"/><circle cx="50" cy="50" r="20" fill="none" stroke="#ffffff" stroke-width="5"/><rect x="42" y="32" width="16" height="36" rx="4" fill="#ffffff" stroke="#1e293b" stroke-width="3"/><rect x="45" y="42" width="10" height="16" fill="#1e293b"/></svg>`,
        basePrice: 500,
        suggestPrice: 8000,
        isNeed: null,
        desc: "24小時健康與活力管理，時尚運動隨身教練"
    },
    {
        id: 17,
        name: "流浪動物之家暖心飼料捐贈",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#fb7185" stroke="#1e293b" stroke-width="4"/><path d="M 38 46 C 30 38, 42 28, 50 38 C 58 28, 70 38, 62 46 L 50 58 Z" fill="#ffffff" stroke="#1e293b" stroke-width="3"/><path d="M 50 64 L 50 74" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round"/></svg>`,
        basePrice: 200,
        suggestPrice: 2000,
        isNeed: null,
        desc: "為毛孩送上一份溫飽與愛，用善意溫暖世界"
    },
    {
        id: 18,
        name: "煙霧探測與強化型滅火器組",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#ef4444" stroke="#1e293b" stroke-width="4"/><rect x="42" y="38" width="16" height="36" rx="2" fill="#ffffff" stroke="#1e293b" stroke-width="3"/><rect x="40" y="32" width="20" height="6" fill="#ef4444" stroke="#1e293b" stroke-width="2"/><path d="M 58 42 Q 68 46 64 58" fill="none" stroke="#1e293b" stroke-width="3"/></svg>`,
        basePrice: 300,
        suggestPrice: 2500,
        isNeed: null,
        desc: "高敏度預警與高效滅火，滴水不漏守護居家安全"
    },
    {
        id: 19,
        name: "極致美味頂級和牛燒肉雙人套餐",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#b45309" stroke="#1e293b" stroke-width="4"/><path d="M 32 45 C 32 35, 68 35, 68 45 C 68 62, 32 62, 32 45 Z" fill="#ffffff" stroke="#1e293b" stroke-width="3"/><path d="M 40 45 Q 50 38 60 45 M 36 50 Q 50 46 64 50" fill="none" stroke="#ef4444" stroke-width="3"/></svg>`,
        basePrice: 500,
        suggestPrice: 5000,
        isNeed: null,
        desc: "頂級霜降和牛入口即化，尊榮非凡的舌尖饗宴"
    },
    {
        id: 20,
        name: "星巴克特選咖啡豆與手沖精品壺",
        svg: `<svg viewBox="0 0 100 100" class="item-vector"><circle cx="50" cy="50" r="42" fill="#15803d" stroke="#1e293b" stroke-width="4"/><path d="M 34 46 L 62 46 L 58 74 L 38 74 Z" fill="#ffffff" stroke="#1e293b" stroke-width="3"/><path d="M 62 52 L 68 52 C 72 52, 72 62, 68 62 L 56 62" fill="none" stroke="#1e293b" stroke-width="3"/><path d="M 30 36 L 66 36 L 50 46 Z" fill="#1e293b"/></svg>`,
        basePrice: 300,
        suggestPrice: 3000,
        isNeed: null,
        desc: "職人級手沖咖啡美學，品味香醇濃郁的優雅時光"
    }
];

// --- 2. 遊戲狀態管理 ---
const gameState = {
    playerName: "金鰲買的快樂鯉魚",
    wallet: 20000,          
    plannedSaving: 0,       
    budgets: {},            
    wonItems: [],           
    
    // 拍賣會控制
    currentAuctionIdx: 0,   
    currentPrice: 0,        
    currentLeader: "無",    
    bidCountdown: 3,        
    countdownTimer: null,   
    npcActionTimer: null,   
    isAuctionActive: false, 
    auctionLogs: [],        
    bidCount: 0,            
    hasPlayerPlacedBid: false, 
    
    // 生存挑戰控制
    survivalRound: 1,
    survivalEvents: [],     
    survivalWallet: 20000,  
    selectedCardIds: [],    
    
    // 統計數據
    classifyAccuracy: 0,    
    deviationTotal: 0
};

// --- NPC 設定與 AI 參數 ---
const NPCS = {
    ming: {
        name: "小明",
        avatar: "👦",
        style: "衝動狂熱",
        dialogues: {
            start: ["這東西看起來超酷的！我一定要標到！", "不管怎樣，先加個價再說！"],
            bid: ["我出高價！", "這好東西不能被搶走！", "我要加碼！"],
            lose: ["可惡，我的錢不夠了...", "好想要喔，竟然被標走了..."],
            win: ["哈哈！這東西是我的了！開心！", "得標囉！真劃算！"]
        },
        shouldBid: (item, currentPrice) => {
            const maxWillingPrice = item.suggestPrice * 1.4;
            if (currentPrice >= maxWillingPrice) return false;
            
            const ratio = currentPrice / maxWillingPrice;
            const probability = 0.85 - (ratio * 0.5); 
            return Math.random() < probability;
        }
    },
    hua: {
        name: "阿華",
        avatar: "👨",
        style: "理性克制",
        dialogues: {
            start: ["這東西有它的實用價值，我研究一下價格。", "理財第一步就是不要亂花錢。"],
            bid: ["這個價格還算合理，我出價。", "量入為出，我跟進一次。"],
            lose: ["這價格太瘋狂了，我放棄。", "不值得花這麼多錢，留著儲蓄更好。"],
            win: ["這符合我的預算規劃，很好。", "理性出價，得標順理成章。"]
        },
        shouldBid: (item, currentPrice) => {
            const maxWillingPrice = item.suggestPrice * 0.95;
            if (currentPrice >= maxWillingPrice) return false;
            
            const isUseful = [4, 8, 14, 15, 18].includes(item.id);
            const baseProb = isUseful ? 0.6 : 0.25;
            return Math.random() < baseProb;
        }
    },
    mei: {
        name: "美美",
        avatar: "👧",
        style: "跟風模仿",
        dialogues: {
            start: ["小明想買？那我也想看一看。", "哇，大家都想要這個嗎？"],
            bid: ["大家都在搶，我也要湊熱鬧！", "不能輸給你們，我也加碼！"],
            lose: ["算了，隨便啦～", "嗚嗚，大家搶得好兇喔。"],
            win: ["搶到了！大家都看我！", "嘿幕，我也擁有一件了。"]
        },
        shouldBid: (item, currentPrice, bidCount) => {
            const maxWillingPrice = item.suggestPrice * 1.15;
            if (currentPrice >= maxWillingPrice) return false;
            
            let probability = 0.2 + (bidCount * 0.1); 
            if (probability > 0.8) probability = 0.8;
            return Math.random() < probability;
        }
    }
};

// --- Web Audio API 音效合成器 ---
const SoundEffects = {
    ctx: null,
    
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },
    
    playClick() {
        try {
            this.init();
            const ctx = this.ctx;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = "sine";
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
            
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) { console.log(e); }
    },
    
    playGavel() {
        try {
            this.init();
            const ctx = this.ctx;
            
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.type = "triangle";
            osc1.frequency.setValueAtTime(140, ctx.currentTime);
            osc1.frequency.linearRampToValueAtTime(30, ctx.currentTime + 0.25);
            gain1.gain.setValueAtTime(0.45, ctx.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
            
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.type = "sine";
            osc2.frequency.setValueAtTime(950, ctx.currentTime);
            osc2.frequency.linearRampToValueAtTime(450, ctx.currentTime + 0.08);
            gain2.gain.setValueAtTime(0.25, ctx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
            
            osc1.start();
            osc1.stop(ctx.currentTime + 0.25);
            osc2.start();
            osc2.stop(ctx.currentTime + 0.08);
        } catch (e) { console.log(e); }
    },
    
    playCountdown() {
        try {
            this.init();
            const ctx = this.ctx;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = "sine";
            osc.frequency.setValueAtTime(880, ctx.currentTime); 
            
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        } catch (e) { console.log(e); }
    },
    
    playSuccess() {
        try {
            this.init();
            const ctx = this.ctx;
            const notes = [523.25, 659.25, 783.99, 1046.50]; 
            notes.forEach((freq, idx) => {
                const time = ctx.currentTime + idx * 0.08;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.type = "triangle";
                osc.frequency.setValueAtTime(freq, time);
                
                gain.gain.setValueAtTime(0.15, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
                
                osc.start(time);
                osc.stop(time + 0.3);
            });
        } catch (e) { console.log(e); }
    },
    
    playFail() {
        try {
            this.init();
            const ctx = this.ctx;
            const notes = [392.00, 349.23, 311.13, 261.63]; 
            notes.forEach((freq, idx) => {
                const time = ctx.currentTime + idx * 0.1;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(freq, time);
                
                gain.gain.setValueAtTime(0.1, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + 0.35);
                
                osc.start(time);
                osc.stop(time + 0.35);
            });
        } catch (e) { console.log(e); }
    }
};

// --- 3. 初始化與頁面切換控制 ---

document.addEventListener("DOMContentLoaded", () => {
    initWelcomeScreen();
    bindGlobalEvents();
    initDraggableMascot(); 
    assignRandomNpcAvatars(); 
});

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add("active");
        window.scrollTo(0, 0);
    }
}

function showToast(message, type = "info") {
    const toast = document.getElementById("toast-message");
    toast.textContent = message;
    toast.className = "toast show";
    
    toast.style.border = "3px solid #1e293b";
    toast.style.boxShadow = "4px 4px 0px #1e293b";
    
    if (type === "error") {
        toast.style.backgroundColor = "var(--danger)";
        toast.style.color = "white";
    } else if (type === "success") {
        toast.style.backgroundColor = "var(--success)";
        toast.style.color = "#1e293b";
    } else {
        toast.style.backgroundColor = "var(--gold)";
        toast.style.color = "#1e293b";
    }
    
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}

function assignRandomNpcAvatars() {
    const avatars = [
        "image/CAH01.svg",
        "image/CAH02.svg",
        "image/CAH03.svg",
        "image/CAH04.svg",
        "image/CAH05.svg",
        "image/CAH06.svg"
    ];
    
    for (let i = avatars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [avatars[i], avatars[j]] = [avatars[j], avatars[i]];
    }
    
    document.getElementById("npc-avatar-ming").src = avatars[0];
    document.getElementById("npc-avatar-hua").src = avatars[1];
    document.getElementById("npc-avatar-mei").src = avatars[2];
    
    const playerAvatarSrc = avatars[3];
    document.getElementById("npc-avatar-player").src = playerAvatarSrc;
    
    document.getElementById("budget-player-avatar").src = playerAvatarSrc;
    document.getElementById("auction-player-avatar").src = playerAvatarSrc;
    document.getElementById("classify-player-avatar").src = playerAvatarSrc;
    document.getElementById("survival-player-avatar").src = playerAvatarSrc;
    document.getElementById("result-player-avatar").src = playerAvatarSrc;
}

// --- 4. 歡迎畫面邏輯 ---
function initWelcomeScreen() {
    const btnStart = document.getElementById("btn-start-game");
    const inputName = document.getElementById("player-name");
    
    inputName.value = ""; 
    
    btnStart.addEventListener("click", () => {
        SoundEffects.playClick(); 
        
        const nameVal = inputName.value.trim();
        if (nameVal) {
            gameState.playerName = nameVal;
        } else {
            gameState.playerName = "金鰲買的快樂鯉魚"; 
        }
        
        document.getElementById("budget-player-name").textContent = gameState.playerName;
        document.getElementById("auction-player-name").textContent = gameState.playerName;
        document.getElementById("classify-player-name").textContent = gameState.playerName;
        document.getElementById("survival-player-name").textContent = gameState.playerName;
        document.getElementById("npc-name-player").textContent = gameState.playerName;
        document.getElementById("result-player-name").textContent = gameState.playerName; 
        
        initBudgetScreen();
        showScreen("screen-budget");
        showToast("歡迎！請先進行儲蓄與預算規劃。");
    });
}

// --- 5. 預算規劃畫面邏輯 ---
function initBudgetScreen() {
    const budgetListContainer = document.getElementById("goods-budget-list");
    budgetListContainer.innerHTML = ""; 
    
    ITEMS.forEach(item => {
        gameState.budgets[item.id] = 0;
        
        const card = document.createElement("div");
        card.className = "goods-budget-card";
        card.innerHTML = `
            <div class="goods-meta">
                <div class="goods-vector-box">${item.svg}</div>
                <div class="goods-info">
                    <span class="goods-name">${item.name}</span>
                    <div class="goods-ad-desc">${item.desc}</div>
                    <span class="goods-suggest">底價: $${item.basePrice} | 建議預算: $${item.suggestPrice}</span>
                </div>
            </div>
            <input type="number" id="budget-input-${item.id}" min="0" step="100" placeholder="0" class="budget-input-field" data-item-id="${item.id}">
        `;
        budgetListContainer.appendChild(card);
    });
    
    const savingInput = document.getElementById("saving-amount");
    savingInput.addEventListener("input", () => {
        SoundEffects.playClick();
        calculateBudgetSummary();
    });
    
    document.querySelectorAll(".budget-input-field").forEach(input => {
        input.addEventListener("input", () => {
            SoundEffects.playClick();
            const itemId = parseInt(input.dataset.itemId);
            let val = parseInt(input.value);
            if (isNaN(val) || val < 0) val = 0;
            gameState.budgets[itemId] = val;
            calculateBudgetSummary();
        });
    });
    
    calculateBudgetSummary();
}

function calculateBudgetSummary() {
    const savingInput = document.getElementById("saving-amount");
    let savingVal = parseInt(savingInput.value);
    if (isNaN(savingVal) || savingVal < 0) savingVal = 0;
    if (savingVal > 20000) {
        savingVal = 20000;
        savingInput.value = 20000;
    }
    
    gameState.plannedSaving = savingVal;
    
    let goodsBudgetSum = 0;
    Object.values(gameState.budgets).forEach(b => {
        goodsBudgetSum += b;
    });
    
    const totalAllocated = savingVal + goodsBudgetSum;
    const remaining = 20000 - totalAllocated;
    
    const budgetRemainingEl = document.getElementById("budget-remaining");
    budgetRemainingEl.textContent = `NT$ ${remaining.toLocaleString()}`;
    
    if (remaining < 0) {
        budgetRemainingEl.className = "value text-red";
        document.getElementById("btn-submit-budget").disabled = true;
    } else {
        budgetRemainingEl.className = "value text-green";
        document.getElementById("btn-submit-budget").disabled = false;
    }
    
    document.getElementById("summary-saving").textContent = `NT$ ${savingVal.toLocaleString()}`;
    document.getElementById("summary-goods").textContent = `NT$ ${goodsBudgetSum.toLocaleString()}`;
    
    const summaryTotalEl = document.getElementById("summary-total");
    summaryTotalEl.textContent = `NT$ ${totalAllocated.toLocaleString()} / NT$ 20,000`;
    if (totalAllocated > 20000) {
        summaryTotalEl.style.color = "var(--danger)";
    } else {
        summaryTotalEl.style.color = "var(--text-primary)";
    }
}

function bindGlobalEvents() {
    const btnSubmitBudget = document.getElementById("btn-submit-budget");
    btnSubmitBudget.addEventListener("click", () => {
        SoundEffects.playClick();
        
        let goodsBudgetSum = 0;
        Object.values(gameState.budgets).forEach(b => {
            goodsBudgetSum += b;
        });
        
        if (gameState.plannedSaving + goodsBudgetSum > 20000) {
            showToast("預算加總已超過 NT$ 20,000，請調降金額！", "error");
            return;
        }
        
        gameState.wallet = 20000 - gameState.plannedSaving; 
        gameState.wonItems = [];
        gameState.currentAuctionIdx = 0;
        
        updateAuctionHeader();
        showScreen("screen-auction");
        showToast("拍賣會開始！祝您順利得標所需商品。");
        
        setTimeout(() => {
            startAuctionItem(0);
        }, 1000);
    });
    
    document.querySelectorAll(".btn-bid").forEach(btn => {
        btn.addEventListener("click", () => {
            SoundEffects.playClick();
            if (!gameState.isAuctionActive) return;
            const addVal = parseInt(btn.dataset.add);
            placePlayerBid(gameState.currentPrice + addVal);
        });
    });
    
    const btnCustomBid = document.getElementById("btn-custom-bid");
    btnCustomBid.addEventListener("click", () => {
        SoundEffects.playClick();
        if (!gameState.isAuctionActive) return;
        const customInput = document.getElementById("custom-bid-amount");
        const bidVal = parseInt(customInput.value);
        if (isNaN(bidVal)) {
            showToast("請輸入合法的出價金額！", "error");
            return;
        }
        placePlayerBid(bidVal);
        customInput.value = "";
    });
    
    const btnPass = document.getElementById("btn-pass-bid");
    btnPass.addEventListener("click", () => {
        SoundEffects.playClick();
        if (!gameState.isAuctionActive) return;
        handlePlayerPass();
    });
    
    const btnSkipAll = document.getElementById("btn-skip-all-auctions");
    btnSkipAll.addEventListener("click", () => {
        SoundEffects.playClick();
        skipAllAuctions();
    });
    
    const btnExportPng = document.getElementById("btn-export-png");
    btnExportPng.addEventListener("click", () => {
        SoundEffects.playClick();
        exportReportToPng();
    });
    
    const btnFinishClassify = document.getElementById("btn-finish-classify");
    btnFinishClassify.addEventListener("click", () => {
        SoundEffects.playClick();
        initSurvivalScreen();
        showScreen("screen-survival");
        showToast("進入生存戰挑戰！");
    });
    
    document.getElementById("btn-restart").addEventListener("click", () => {
        SoundEffects.playClick();
        gameState.playerName = "金鰲買的快樂鯉魚";
        gameState.wallet = 20000;
        gameState.plannedSaving = 0;
        gameState.budgets = {};
        gameState.wonItems = [];
        gameState.currentAuctionIdx = 0;
        gameState.selectedCardIds = [];
        gameState.survivalRound = 1;
        
        document.getElementById("player-name").value = ""; 
        showScreen("screen-welcome");
    });
}

function skipAllAuctions() {
    if (confirm("確定要跳過剩下所有的商品競標嗎？跳過後剩下未競標的商品您將『不會得標』，並直接以當前已得標的商品與餘額進入商品分類頁面。")) {
        clearInterval(gameState.npcActionTimer);
        clearInterval(gameState.countdownTimer);
        
        // 剩下的商品直接跳過，玩家不購買任何新商品，保持當前已得標列表與錢包餘額
        
        endAuctionPhase();
    }
}

function exportReportToPng() {
    const captureArea = document.getElementById("report-capture-area");
    
    if (!window.html2canvas) {
        showToast("正在嘗試加載備用 PNG 渲染元件，請稍候...");
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
        script.onload = () => {
            showToast("元件載入成功！再次為您匯出...");
            exportReportToPng();
        };
        script.onerror = () => {
            showToast("元件加載失敗，請檢查網路連線或直接截圖！", "error");
        };
        document.head.appendChild(script);
        return;
    }
    
    showToast("正在生成高解析度診斷報告圖片，請稍候...");
    
    window.html2canvas(captureArea, {
        scale: 1.6, 
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true, 
        logging: true,
        onclone: function(clonedDoc) {
            clonedDoc.querySelectorAll(".item-vector").forEach(svg => {
                svg.style.width = "40px";
                svg.style.height = "40px";
                svg.setAttribute("width", "40");
                svg.setAttribute("height", "40");
            });
            clonedDoc.querySelectorAll(".result-player-avatar-container").forEach(container => {
                const nameChar = gameState.playerName ? gameState.playerName.charAt(0) : "金";
                container.innerHTML = `
                    <div style="
                        width: 66px; 
                        height: 66px; 
                        background: #fde047; 
                        border: 3px solid #1e293b; 
                        border-radius: 50%; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        font-size: 28px; 
                        font-weight: 900; 
                        color: #1e293b;
                        box-shadow: 2px 2px 0px #1e293b;
                    ">${nameChar}</div>
                `;
                container.style.width = "66px";
                container.style.height = "66px";
            });
        }
    }).then(canvas => {
        try {
            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = `理財性格診斷報告-${gameState.playerName}.png`;
            link.href = dataUrl;
            link.click();
            showToast("診斷報告 PNG 匯出成功！", "success");
        } catch (exportErr) {
            console.error("Canvas toDataURL Failed, trying Blob...", exportErr);
            try {
                canvas.toBlob((blob) => {
                    if (blob) {
                        const blobUrl = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.download = `理財性格診斷報告-${gameState.playerName}.png`;
                        link.href = blobUrl;
                        link.click();
                        showToast("診斷報告 PNG 匯出成功 (Blob)！", "success");
                    } else {
                        showToast("圖片轉化失敗，請截圖保存報告書！", "error");
                    }
                }, "image/png");
            } catch (blobErr) {
                console.error("Blob export failed:", blobErr);
                showToast("匯出受瀏覽器安全限制阻擋，請直接截圖保存！", "error");
            }
        }
    }).catch(err => {
        showToast("PNG 匯出出錯，請重試或直接截圖！", "error");
        console.error("html2canvas Error:", err);
    });
}

function updateAuctionHeader() {
    document.getElementById("auction-wallet").textContent = `NT$ ${gameState.wallet.toLocaleString()}`;
    document.getElementById("auction-savings").textContent = `NT$ ${gameState.plannedSaving.toLocaleString()}`;
}

// --- 6. 模擬拍賣會核心邏輯 ---

function startAuctionItem(index) {
    if (index >= ITEMS.length) {
        endAuctionPhase();
        return;
    }
    
    gameState.currentAuctionIdx = index;
    const item = ITEMS[index];
    
    gameState.currentPrice = item.basePrice;
    gameState.currentLeader = "無";
    gameState.bidCountdown = 3;
    gameState.bidCount = 0;
    gameState.hasPlayerPlacedBid = false;
    gameState.isAuctionActive = true;
    
    document.getElementById("auction-item-number").textContent = `${index + 1} / ${ITEMS.length}`;
    
    const imgBox = document.getElementById("auction-item-img");
    imgBox.innerHTML = item.svg;
    
    document.getElementById("auction-item-name").textContent = item.name;
    document.getElementById("auction-item-desc").textContent = item.desc;
    document.getElementById("auction-item-index-tag").textContent = `項目 #${index + 1}`;
    
    const userPlannedBudget = gameState.budgets[item.id] || 0;
    document.getElementById("auction-item-budget-tag").textContent = `我的規劃預算: NT$ ${userPlannedBudget.toLocaleString()}`;
    
    document.getElementById("auction-start-price").textContent = `NT$ ${item.basePrice.toLocaleString()}`;
    document.getElementById("auction-current-price").textContent = `NT$ ${item.basePrice.toLocaleString()}`;
    
    const leaderEl = document.getElementById("auction-current-leader");
    leaderEl.textContent = "無";
    leaderEl.className = "value text-blue";
    
    document.getElementById("bid-countdown").textContent = "3";
    document.getElementById("bid-countdown").style.color = "var(--gold)";
    document.getElementById("bid-status-text").textContent = "出價中...";
    
    document.querySelectorAll(".npc-card").forEach(card => {
        card.className = "npc-card";
        card.querySelector(".npc-bid-state").textContent = "觀察中";
    });
    hideNpcBubbles();
    
    triggerAuctioneerSpeech(`項目 #${index + 1}【${item.name}】開拍！底價 NT$ ${item.basePrice}。`);
    
    startNpcAiLoop();
    startCountdownLoop();
}

function triggerAuctioneerSpeech(text) {
    const bubble = document.getElementById("auctioneer-bubble");
    bubble.textContent = text;
    bubble.classList.add("show");
    
    setTimeout(() => {
        if (bubble.textContent === text) {
            bubble.classList.remove("show");
        }
    }, 4000);
}

function hideNpcBubbles() {
    document.querySelectorAll(".npc-bubble").forEach(b => b.classList.remove("show"));
}

function showNpcBubble(npcId, text) {
    const bubble = document.getElementById(`bubble-${npcId}`);
    if (bubble) {
        bubble.textContent = text;
        bubble.classList.add("show");
        setTimeout(() => {
            bubble.classList.remove("show");
        }, 3000);
    }
}

function startNpcAiLoop() {
    if (gameState.npcActionTimer) clearInterval(gameState.npcActionTimer);
    
    gameState.npcActionTimer = setInterval(() => {
        if (!gameState.isAuctionActive) return;
        
        const item = ITEMS[gameState.currentAuctionIdx];
        const npcKeys = ["ming", "hua", "mei"];
        const randomNpcKey = npcKeys[Math.floor(Math.random() * npcKeys.length)];
        const npc = NPCS[randomNpcKey];
        
        if (gameState.currentLeader === npc.name) return;
        
        if (npc.shouldBid(item, gameState.currentPrice, gameState.bidCount)) {
            const addOptions = [100, 200, 300];
            const bidInc = addOptions[Math.floor(Math.random() * addOptions.length)];
            const newBidPrice = gameState.currentPrice + bidInc;
            
            executeBid(npc.name, newBidPrice, randomNpcKey);
        }
    }, 1200); 
}

function startCountdownLoop() {
    if (gameState.countdownTimer) clearInterval(gameState.countdownTimer);
    
    gameState.countdownTimer = setInterval(() => {
        if (!gameState.isAuctionActive) return;
        if (gameState.currentLeader === "無") return;
        
        gameState.bidCountdown--;
        
        const countdownEl = document.getElementById("bid-countdown");
        countdownEl.textContent = gameState.bidCountdown;
        
        if (gameState.bidCountdown === 2) {
            SoundEffects.playCountdown(); 
            countdownEl.style.color = "var(--warning)";
            triggerAuctioneerSpeech(`${gameState.currentLeader} 出價 NT$ ${gameState.currentPrice}！一次！`);
        } else if (gameState.bidCountdown === 1) {
            SoundEffects.playCountdown();
            countdownEl.style.color = "var(--danger)";
            triggerAuctioneerSpeech(`${gameState.currentPrice} 元，兩次！還有沒有人要出價？`);
        } else if (gameState.bidCountdown <= 0) {
            handleAuctionSold();
        }
    }, 1500);
}

function executeBid(bidderName, amount, npcKey = null) {
    SoundEffects.playClick(); 
    
    gameState.currentPrice = amount;
    gameState.currentLeader = bidderName;
    gameState.bidCountdown = 4; 
    gameState.bidCount++;
    
    document.getElementById("auction-current-price").textContent = `NT$ ${amount.toLocaleString()}`;
    
    const leaderEl = document.getElementById("auction-current-leader");
    leaderEl.textContent = bidderName;
    
    document.querySelectorAll(".npc-card").forEach(card => card.classList.remove("active-bidder"));
    
    if (bidderName === "本組 (玩家)") {
        leaderEl.className = "value player-leading-active animate-pulse-lead";
        
        const playerCard = document.getElementById("npc-player");
        playerCard.classList.add("active-bidder");
        playerCard.querySelector(".npc-bid-state").textContent = `出價 $${amount}`;
        
        const playerBanter = ["這件好，我跟！", "不能輸給小明！", "這個我一定要搶到！", "對我來說這超重要！"];
        const phrase = playerBanter[Math.floor(Math.random() * playerBanter.length)];
        showNpcBubble("player", phrase);
    } else {
        leaderEl.className = "value npc-leading-active";
        gameState.hasPlayerPlacedBid = true;
        
        if (npcKey) {
            const npcCard = document.getElementById(`npc-${npcKey}`);
            npcCard.classList.add("active-bidder");
            npcCard.querySelector(".npc-bid-state").textContent = `出價 $${amount}`;
            
            const npc = NPCS[npcKey];
            const bidDialogues = npc.dialogues.bid;
            const dialogue = bidDialogues[Math.floor(Math.random() * bidDialogues.length)];
            showNpcBubble(npcKey, dialogue);
        }
    }
    
    const gavel = document.getElementById("gavel-container");
    gavel.classList.remove("strike");
    void gavel.offsetWidth; 
    gavel.classList.add("strike");
}

function placePlayerBid(amount) {
    if (amount <= gameState.currentPrice) {
        showToast("出價金額必須大於當前最高出價！", "error");
        return;
    }
    
    if (amount > gameState.wallet) {
        showToast(`資金不足！您的可用餘額為 NT$ ${gameState.wallet.toLocaleString()}（已扣除儲蓄）。`, "error");
        return;
    }
    
    executeBid("本組 (玩家)", amount);
    showToast(`您成功出價 NT$ ${amount.toLocaleString()}！`, "success");
}

function handlePlayerPass() {
    showToast("您放棄了這項商品競標。");
    gameState.isAuctionActive = false; 
    finishNpcOnlyAuction();
}

function finishNpcOnlyAuction() {
    clearInterval(gameState.npcActionTimer);
    clearInterval(gameState.countdownTimer);
    
    const item = ITEMS[gameState.currentAuctionIdx];
    let activePrice = gameState.currentPrice;
    let activeLeader = gameState.currentLeader;
    
    if (activeLeader === "無") {
        const npcKeys = ["ming", "hua", "mei"];
        activeLeader = NPCS[npcKeys[Math.floor(Math.random() * npcKeys.length)]].name;
        activePrice = item.basePrice;
    } else {
        const npcKeys = ["ming", "hua", "mei"];
        const extraBids = Math.floor(Math.random() * 3); 
        for (let i = 0; i < extraBids; i++) {
            const bidder = NPCS[npcKeys[Math.floor(Math.random() * npcKeys.length)]].name;
            if (bidder !== activeLeader) {
                activePrice += 100 + Math.floor(Math.random() * 3) * 100;
                activeLeader = bidder;
            }
        }
    }
    
    gameState.currentPrice = activePrice;
    gameState.currentLeader = activeLeader;
    
    handleAuctionSold();
}

function handleAuctionSold() {
    gameState.isAuctionActive = false;
    clearInterval(gameState.npcActionTimer);
    clearInterval(gameState.countdownTimer);
    
    SoundEffects.playGavel(); 
    
    const item = ITEMS[gameState.currentAuctionIdx];
    const finalPrice = gameState.currentPrice;
    const winner = gameState.currentLeader;
    
    const gavel = document.getElementById("gavel-container");
    gavel.classList.add("strike");
    
    document.getElementById("bid-status-text").textContent = "成交！";
    document.getElementById("bid-countdown").textContent = "✓";
    document.getElementById("bid-countdown").style.color = "var(--success)";
    
    triggerAuctioneerSpeech(`咚！【${item.name}】由 ${winner} 以 NT$ ${finalPrice} 得標！`);
    
    if (winner === "本組 (玩家)") {
        gameState.wallet -= finalPrice; 
        gameState.wonItems.push({
            id: item.id,
            name: item.name,
            svg: item.svg, 
            finalPrice: finalPrice,
            isNeed: null,              
            userClassification: null,  
            userReason: ""             
        });
        
        updateAuctionHeader();
        addWonItemBadge(item);
        showToast(`恭喜得標！已扣款 NT$ ${finalPrice.toLocaleString()}。`, "success");
    } else {
        let winnerKey = "ming";
        if (winner === "阿華") winnerKey = "hua";
        if (winner === "美美") winnerKey = "mei";
        
        const npc = NPCS[winnerKey];
        const winDialogues = npc.dialogues.win;
        showNpcBubble(winnerKey, winDialogues[Math.floor(Math.random() * winDialogues.length)]);
    }
    
    setTimeout(() => {
        startAuctionItem(gameState.currentAuctionIdx + 1);
    }, 2800);
}

function addWonItemBadge(item) {
    const list = document.getElementById("won-items-list");
    const empty = list.querySelector(".empty-won");
    if (empty) empty.remove();
    
    const badge = document.createElement("div");
    badge.className = "won-item-badge";
    badge.innerHTML = item.svg; 
    
    badge.title = `【得標商品】${item.name}\n【商品底價】NT$ ${item.basePrice}\n【得標金額】NT$ ${gameState.currentPrice}\n【商品描述】${item.desc}`;
    list.appendChild(badge);
}

function endAuctionPhase() {
    initClassifyScreen();
    showScreen("screen-classify");
    showToast("拍賣會結束！請進行商品分類。");
}

// --- 7. 商品分類邏輯 ---
function initClassifyScreen() {
    const grid = document.getElementById("classify-cards-grid");
    const noItemsPanel = document.getElementById("no-items-to-classify");
    const btnFinish = document.getElementById("btn-finish-classify");
    
    grid.innerHTML = "";
    
    if (gameState.wonItems.length === 0) {
        noItemsPanel.style.display = "block";
        btnFinish.disabled = false;
        document.getElementById("classify-progress-text").textContent = "0 / 0";
        document.getElementById("classify-accuracy-text").textContent = "100%"; 
        return;
    }
    
    noItemsPanel.style.display = "none";
    btnFinish.disabled = true;
    
    gameState.wonItems.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "classify-card";
        card.id = `classify-card-${item.id}`;
        card.innerHTML = `
            <div class="classify-vector-container">${item.svg}</div>
            <span class="classify-name">${item.name}</span>
            <span class="classify-price">得標價: $${item.finalPrice}</span>
            
            <div class="classify-choices">
                <button class="choice-btn btn-need" data-idx="${index}" data-choice="need">需要 △</button>
                <button class="choice-btn btn-want" data-idx="${index}" data-choice="want">想要 ？</button>
            </div>
            
            <div class="reason-input-area" id="reason-area-${item.id}" style="display:none; margin-top:12px; width:100%;">
                <input type="text" id="reason-input-${item.id}" placeholder="請寫下您的主張理由..." 
                       style="width:100%; padding:10px; border-radius:8px; border:3px solid #1e293b; background:white; color:#1e293b; font-size:13px; font-weight:700; outline:none;"
                       value="${item.userReason || ''}">
                <button class="btn-save-reason btn btn-primary" data-idx="${index}" style="padding:6px 12px; font-size:11px; margin-top:6px; width:100%;">
                    確認理財主張
                </button>
            </div>
            
            <span class="feedback-tag" id="feedback-tag-${item.id}" style="display:none"></span>
        `;
        grid.appendChild(card);
    });
    
    document.querySelectorAll(".choice-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            SoundEffects.playClick();
            const idx = parseInt(btn.dataset.idx);
            const choice = btn.dataset.choice;
            handleClassifyChoice(idx, choice, btn);
        });
    });
    
    grid.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-save-reason")) {
            SoundEffects.playClick();
            const idx = parseInt(e.target.dataset.idx);
            saveItemReason(idx);
        }
    });
    
    updateClassifyProgress();
}

function handleClassifyChoice(idx, choice, clickedBtn) {
    const item = gameState.wonItems[idx];
    const card = document.getElementById(`classify-card-${item.id}`);
    const reasonArea = document.getElementById(`reason-area-${item.id}`);
    
    item.userClassification = (choice === "need");
    
    const parent = clickedBtn.parentElement;
    parent.querySelector(".btn-need").classList.remove("active-need");
    parent.querySelector(".btn-want").classList.remove("active-want");
    
    if (choice === "need") {
        clickedBtn.classList.add("active-need");
    } else {
        clickedBtn.classList.add("active-want");
    }
    
    reasonArea.style.display = "block";
    card.classList.remove("correct"); 
    
    updateClassifyProgress();
}

function saveItemReason(idx) {
    const item = gameState.wonItems[idx];
    const reasonInput = document.getElementById(`reason-input-${item.id}`);
    const reasonText = reasonInput.value.trim();
    
    if (!reasonText) {
        showToast("請輸入您將此商品歸類為需要/想要的理由！", "error");
        return;
    }
    
    item.userReason = reasonText;
    
    const card = document.getElementById(`classify-card-${item.id}`);
    const feedbackTag = document.getElementById(`feedback-tag-${item.id}`);
    
    card.classList.add("correct");
    feedbackTag.style.display = "block";
    feedbackTag.className = "feedback-tag correct";
    feedbackTag.textContent = "已自訂主張 ✓";
    
    showToast(`成功記錄您對【${item.name}】的理財主張！`, "success");
    updateClassifyProgress();
}

function updateClassifyProgress() {
    const total = gameState.wonItems.length;
    let classifiedAndReasonedCount = 0;
    
    gameState.wonItems.forEach(item => {
        if (item.userClassification !== null && item.userReason !== "") {
            classifiedAndReasonedCount++;
        }
    });
    
    document.getElementById("classify-progress-text").textContent = `${classifiedAndReasonedCount} / ${total}`;
    
    if (total > 0) {
        const accuracy = Math.round((classifiedAndReasonedCount / total) * 100);
        gameState.classifyAccuracy = accuracy; 
        document.getElementById("classify-accuracy-text").textContent = `${accuracy}%`;
    } else {
        document.getElementById("classify-accuracy-text").textContent = "100%";
    }
    
    const btnFinish = document.getElementById("btn-finish-classify");
    if (classifiedAndReasonedCount === total) {
        btnFinish.disabled = false;
    } else {
        btnFinish.disabled = true;
    }
}

// --- 8. 「利餘之戰」生存挑戰邏輯 ---
const SURVIVAL_EVENT_CARDS = [
    {
        id: 1,
        title: "突發健康危機！",
        desc: "流感季節來襲，你因嚴重流感高燒不退，被迫住院治療一週。醫療費與工作停擺損失大增！",
        baseCost: 5000,
        defenseId: 8, 
        defenseName: "健康檢查與平安保險",
        successText: "幸好你得標了【健康檢查與平安保險】，保險公司支付了全部醫療費用！本次危機花費為 $0 元。",
        failText: "由於你沒有購買【平安保險】，你必須自行支付全額醫療與病房費用，可用資金減少了 NT$ 5,000！"
    },
    {
        id: 2,
        title: "廚房意外失火！",
        desc: "煮食時不慎引起電線起火，且火勢迅速蔓延！若沒有立刻滅火，將造成廚房嚴重燒毀損壞。",
        baseCost: 5000,
        defenseId: 18, 
        defenseName: "煙霧探測與滅火器組",
        successText: "還好你標到了【煙霧探測與滅火器組】，在火勢剛起時迅速撲滅！僅虛驚一場，本次維修花費為 $0 元。",
        failText: "你沒有任何滅火裝備，只能眼看廚房煙霧瀰漫，最後花費大量資金重新裝潢，資金減少了 NT$ 5,000！"
    },
    {
        id: 3,
        title: "超級寒流侵襲！",
        desc: "北極寒流南下，氣溫瞬間驟降至攝氏 6 度，並伴隨冷雨狂風。若無防寒外套將受凍生病就醫。",
        baseCost: 2000,
        defenseId: 4, 
        defenseName: "GORE-TEX 機能外套",
        successText: "幸好你在拍賣會上買了【GORE-TEX 機能外套】，穿在身上溫暖舒適。本次低溫特報花費 $0 元。",
        failText: "你缺乏充足 of 防寒衣物，在寒雨中受凍生病就醫。掛號與藥物費共花費了 NT$ 2,000！"
    },
    {
        id: 4,
        title: "AI 程式能力特優檢定！",
        desc: "學校舉行生成式 AI 與程式應用大賽，表現特優者能獲得專屬獎學金 NT$ 8,000 元！",
        baseCost: 0,
        reward: 8000,
        defenseId: 15, 
        defenseName: "AI與程式實戰線上課程",
        successText: "你標得了【AI與程式實戰線上課程】！透過努力學習，你在檢定中取得特優，獲得獎學金 NT$ 8,000 元！",
        failText: "因為沒有系統性學習（無 AI 程式課程），你未能通過高難度的檢定門檻，錯失了獲得獎學金的機會。"
    },
    {
        id: 5,
        title: "統一發票開獎奇蹟！",
        desc: "這期統一發票開獎囉！這是一次命運與福報的對決。平常若有多支持環保公益或流浪動物，發票將有更高的中獎機率！",
        baseCost: 0,
        reward: 5000,
        defenseId: [6, 17], 
        defenseName: "環保公益商品",
        successText: "因為你購買了【綠碳計畫支持】或【浪浪飼料認養】做公益！累積好福氣！發票中了頭獎 NT$ 5,000 元！",
        failText: "雖然你按時兌獎，但沒有做公益的運氣加持，最後只有一張發票中了普獎 NT$ 200 元。"
    },
    {
        id: 6,
        title: "突發意外：手機摔碎！",
        desc: "走路看手機不小心與人相撞，手機摔在柏油路上，螢幕碎裂。無任何拍賣商品能防範此意外！",
        baseCost: 3500,
        defenseId: null, 
        defenseName: "無",
        successText: "",
        failText: "悲劇！手機螢幕碎裂必須維修。由於這是突發日常意外，沒有商品能防範，你必須從儲蓄（緊急預備金）中直接扣除維修費 NT$ 3,500 元！這考驗了你平時的儲蓄習慣！"
    }
];

function initSurvivalScreen() {
    gameState.survivalRound = 1;
    gameState.selectedCardIds = [];
    
    gameState.survivalWallet = gameState.wallet + gameState.plannedSaving;
    
    document.getElementById("survival-player-name").textContent = gameState.playerName;
    updateSurvivalWalletUI();
    document.getElementById("survival-round").textContent = `回合 1 / 6`;
    
    const logContainer = document.getElementById("event-log-container");
    logContainer.innerHTML = `<div class="event-placeholder-text">點擊左側 1~6 數字卡牌進行抽卡...</div>`;
    
    renderDefenseBadges();
    renderSurvivalCards();
}

function updateSurvivalWalletUI() {
    document.getElementById("survival-wallet").textContent = `NT$ ${gameState.survivalWallet.toLocaleString()}`;
    document.getElementById("health-bar-value").textContent = `NT$ ${gameState.survivalWallet.toLocaleString()}`;
    
    let percent = (gameState.survivalWallet / 20000) * 100;
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;
    
    const bar = document.getElementById("financial-health-bar");
    bar.style.width = `${percent}%`;
    
    bar.className = "health-bar";
    if (percent < 25) {
        bar.classList.add("danger");
    } else if (percent < 50) {
        bar.classList.add("warning");
    }
}

function renderDefenseBadges() {
    const container = document.getElementById("survival-badges");
    container.innerHTML = "";
    
    const defenseItems = [
        { id: 8, emoji: '<i class="fa-solid fa-shield-halved"></i>', name: "保險" },
        { id: 18, emoji: '<i class="fa-solid fa-fire-extinguisher"></i>', name: "滅火器" },
        { id: 4, emoji: '<i class="fa-solid fa-shirt"></i>', name: "機能外套" },
        { id: 15, emoji: '<i class="fa-solid fa-graduation-cap"></i>', name: "AI 課程" },
        { id: 6, emoji: '<i class="fa-solid fa-book"></i>', name: "綠碳計畫" },
        { id: 17, emoji: '<i class="fa-solid fa-hand-holding-heart"></i>', name: "流浪動物認養" }
    ];
    
    let hasAny = false;
    defenseItems.forEach(d => {
        const isBought = gameState.wonItems.some(item => item.id === d.id);
        if (isBought) {
            hasAny = true;
            const badge = document.createElement("div");
            badge.className = "shield-badge";
            badge.innerHTML = d.emoji;
            badge.title = `已裝備防禦: ${d.name}`;
            container.appendChild(badge);
        }
    });
    
    if (!hasAny) {
        container.innerHTML = `<span style="font-size:12px; color:var(--text-muted)">無防禦裝備</span>`;
    }
}

function renderSurvivalCards() {
    const grid = document.getElementById("survival-cards-grid");
    grid.innerHTML = "";
    
    for (let i = 1; i <= 6; i++) {
        const card = document.createElement("div");
        card.className = "flip-card";
        card.id = `flip-card-${i}`;
        card.dataset.cardId = i;
        card.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">${i}</div>
                <div class="flip-card-back" id="card-back-${i}">
                    <!-- 背面資訊將在翻轉時填入 -->
                </div>
            </div>
        `;
        
        card.addEventListener("click", () => {
            if (gameState.selectedCardIds.includes(i)) return;
            handleCardFlip(i);
        });
        
        grid.appendChild(card);
    }
}

function handleCardFlip(cardId) {
    gameState.selectedCardIds.push(cardId);
    
    const event = SURVIVAL_EVENT_CARDS.find(e => e.id === cardId);
    
    const cardEl = document.getElementById(`flip-card-${cardId}`);
    cardEl.classList.add("flipped", "disabled");
    
    const backEl = document.getElementById("card-back-" + cardId);
    
    const warningTriangleSvg = `
        <svg viewBox="0 0 24 24" class="vector-alert-triangle">
            <path d="M12 2L2 22h20L12 2z M12 9v6 M12 17h.01" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    
    backEl.innerHTML = `
        <div class="back-card-content">
            ${warningTriangleSvg}
            <h4 class="event-card-title">${event.title}</h4>
            <p class="event-card-desc">${event.desc}</p>
        </div>
    `;
    
    resolveSurvivalEvent(event);
}

function resolveSurvivalEvent(event) {
    let cost = 0;
    let profit = 0;
    let isDefended = false;
    let logType = "info";
    let logText = "";
    
    if (event.defenseId !== null) {
        if (Array.isArray(event.defenseId)) {
            isDefended = gameState.wonItems.some(item => event.defenseId.includes(item.id));
        } else {
            isDefended = gameState.wonItems.some(item => item.id === event.defenseId);
        }
    }
    
    if (isDefended) {
        SoundEffects.playSuccess(); 
        if (event.reward) {
            profit = event.reward;
            logText = event.successText;
            logType = "success";
        } else {
            cost = 0;
            logText = event.successText;
            logType = "success";
        }
    } else {
        if (event.reward) {
            if (event.id === 5) {
                profit = 200;
                logText = event.failText;
                logType = "warn";
                SoundEffects.playSuccess(); 
            } else {
                profit = 0;
                logText = event.failText;
                logType = "warn";
                SoundEffects.playFail();
            }
        } else {
            cost = event.baseCost;
            logText = event.failText;
            logType = "danger";
            SoundEffects.playFail(); 
        }
    }
    
    gameState.survivalWallet = gameState.survivalWallet + profit - cost;
    updateSurvivalWalletUI();
    
    const logContainer = document.getElementById("event-log-container");
    const placeholder = logContainer.querySelector(".event-placeholder-text");
    if (placeholder) placeholder.remove();
    
    const entry = document.createElement("div");
    entry.className = `log-entry ${logType}`;
    entry.innerHTML = `
        <div class="log-title">${event.title}</div>
        <p>${logText}</p>
        <p style="font-weight:700; margin-top:5px; font-family:var(--font-outfit);">
            ${profit > 0 ? `+ 獲得 NT$ ${profit.toLocaleString()}` : ""}
            ${cost > 0 ? `- 扣除 NT$ ${cost.toLocaleString()}` : ""}
            ${profit === 0 && cost === 0 ? "資金無變動" : ""}
        </p>
    `;
    logContainer.appendChild(entry);
    logContainer.scrollTop = logContainer.scrollHeight; 
    
    if (gameState.survivalWallet <= 0) {
        handleBankruptcy();
        return;
    }
    
    if (gameState.survivalRound < 6) {
        gameState.survivalRound++;
        document.getElementById("btn-next-round").style.display = "block";
    } else {
        document.getElementById("btn-show-results").style.display = "block";
    }
    
    const btnNext = document.getElementById("btn-next-round");
    btnNext.onclick = () => {
        SoundEffects.playClick();
        document.getElementById("survival-round").textContent = `回合 ${gameState.survivalRound} / 6`;
        btnNext.style.display = "none";
    };
    
    const btnShowResults = document.getElementById("btn-show-results");
    btnShowResults.onclick = () => {
        SoundEffects.playSuccess(); 
        showScreen("screen-result");
        generateReport();
    };
}

function handleBankruptcy() {
    SoundEffects.playFail(); 
    showToast("財務透支！您的資金已經用罄，宣告破產！", "error");
    
    const logContainer = document.getElementById("event-log-container");
    const entry = document.createElement("div");
    entry.className = "log-entry danger";
    entry.innerHTML = `
        <div class="log-title">🚨 財務宣告破產！</div>
        <p>您的總資產（現金+儲蓄）已低於 $0。這代表您在拍賣會上花費過度、沒有妥善預留緊急儲蓄，或是沒有購買保險/滅火器等商品來抵禦風險。</p>
    `;
    logContainer.appendChild(entry);
    
    document.getElementById("btn-next-round").style.display = "none";
    const btnShowResults = document.getElementById("btn-show-results");
    btnShowResults.style.display = "block";
    btnShowResults.textContent = "查看財務診斷書";
    btnShowResults.onclick = () => {
        showScreen("screen-result");
        generateReport(true); 
    };
}

// --- 9. 理財診斷報告書生成 ---
function generateReport(isBankrupt = false) {
    const finalBalance = gameState.survivalWallet;
    
    let totalSpend = 0;
    gameState.wonItems.forEach(item => {
        totalSpend += item.finalPrice;
    });
    
    document.getElementById("r-spend").textContent = `NT$ ${totalSpend.toLocaleString()}`;
    document.getElementById("r-planned-saving").textContent = `NT$ ${gameState.plannedSaving.toLocaleString()}`;
    
    const delta = finalBalance - (20000 - totalSpend); 
    const deltaEl = document.getElementById("r-survival-delta");
    if (delta >= 0) {
        deltaEl.textContent = `+ NT$ ${delta.toLocaleString()}`;
        deltaEl.className = "val text-green";
    } else {
        deltaEl.textContent = `- NT$ ${Math.abs(delta).toLocaleString()}`;
        deltaEl.className = "val text-red";
    }
    
    document.getElementById("r-final-balance").textContent = `NT$ ${finalBalance.toLocaleString()}`;
    if (isBankrupt || finalBalance <= 0) {
        document.getElementById("r-final-balance").className = "val text-red";
    } else {
        document.getElementById("r-final-balance").className = "val text-gold";
    }
    
    document.getElementById("r-classify-acc").textContent = `${gameState.classifyAccuracy}%`;
    
    const titleEl = document.getElementById("character-title");
    const descEl = document.getElementById("character-desc");
    
    if (isBankrupt) {
        titleEl.innerHTML = `衝動透支購物狂 <i class="fa-solid fa-circle-dollar-to-slot"></i>`;
        titleEl.className = "text-dark"; // 統一用黑色粗體字樣式
        descEl.textContent = "你的資金在生存挑戰中歸零。你在拍賣會上可能過於衝動與其他 NPC 競價，導致買了過多昂貴但非必需的『想要』商品（如和牛、旅遊），卻沒有存下足夠的『緊急預備金』，也沒有購買『平安保險』或『滅火器組』來防範未來的財務風險。建議學習『先存錢，再消費』，並合理區分需要與想要！";
    } else {
        const hasInsurance = gameState.wonItems.some(i => i.id === 8);
        const hasExtinguisher = gameState.wonItems.some(i => i.id === 18);
        const hasCharity = gameState.wonItems.some(i => [6, 17].includes(i.id));
        const finalAccuracy = gameState.classifyAccuracy;
        
        if (finalBalance >= 15000) {
            titleEl.innerHTML = `保守儲蓄守財奴 <i class="fa-solid fa-vault"></i>`;
            titleEl.className = "text-dark";
            descEl.textContent = "你的最終資金高達 NT$ " + finalBalance.toLocaleString() + " 元！你在拍賣會上非常節制，幾乎沒買什麼商品。雖然這讓你有極高的安全感，但你也可能錯失了一些能防護風險（如保險）或投資自己（如 AI 線上課程）的商品。理財不僅是省錢，更要學會聰明地分配預算！";
        } else if (hasInsurance && hasExtinguisher && finalAccuracy >= 80) {
            titleEl.innerHTML = `精打細算金利餘 <i class="fa-solid fa-crown"></i>`;
            titleEl.className = "text-dark";
            descEl.textContent = "恭喜你！你獲得了最頂級的理財評價。你在預算規劃中寫下合理儲蓄，在拍賣會上冷靜克制，順利標得『平安保險』與『家庭滅火器』來移轉生活風險。在商品分類上你也非常清晰，這讓你在生存挑戰中游刃有餘，成功保全了資產。你是當之無愧的金融理財達人！";
        } else if (hasCharity) {
            // 優化「愛心滿滿公益天使」的展示：黑色字，不出現嬰兒 emoji 👼，改用 Font Awesome 圖標，滿足使用者要求！
            titleEl.innerHTML = `愛心滿滿公益天使 <i class="fa-solid fa-hand-holding-heart text-red"></i>`;
            titleEl.className = "text-dark"; // 黑色字
            descEl.textContent = "你在拍賣會中支持了減碳植樹或認養了流浪動物。你在意社會責任，並且因此在生存挑戰中獲得了幸運發票的加持回饋！雖然這並非傳統的獲利投資，但為社會提供價值能創造心靈滿足與意外的好報。不過也要記得為自己的未來做好基礎的風險防範（如保險）喔！";
        } else {
            titleEl.innerHTML = `小資生活體驗家 <i class="fa-solid fa-bicycle"></i>`;
            titleEl.className = "text-dark";
            descEl.textContent = "你的理財表現平穩。你在拍賣會上買到了一些自己感興趣的商品，在生存挑戰中雖有虧損但也安全過關。你的理財主張展現了獨立的思考，但在預防未知風險（如保險）或預算規劃精準度上，還有更進一步的調優空間。多練習如何縮小『預估預算』與『實際花費』的偏差值！";
        }
    }
    
    generateDeviationTable();
}

function generateDeviationTable() {
    const tbody = document.getElementById("deviation-table-body");
    tbody.innerHTML = "";
    
    let deviationSum = 0;
    
    ITEMS.forEach(item => {
        const planned = gameState.budgets[item.id] || 0;
        const wonItem = gameState.wonItems.find(i => i.id === item.id);
        const actual = wonItem ? wonItem.finalPrice : 0;
        
        if (planned > 0 || actual > 0) {
            const dev = planned - actual;
            deviationSum += Math.abs(dev);
            
            let classificationText = "";
            if (wonItem) {
                classificationText = wonItem.userClassification ? " (需要 △)" : " (想要 ？)";
            }
            
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <div style="width:28px; height:28px; flex-shrink:0;">${item.svg}</div>
                        <div>
                            <span style="font-weight:900;">${item.name}</span>
                            <span style="font-size:10px; color:var(--text-secondary)">${classificationText}</span>
                            ${wonItem && wonItem.userReason ? `<br><span style="font-size:10px; color:var(--text-muted); font-style:italic">理由: ${wonItem.userReason}</span>` : ""}
                        </div>
                    </div>
                </td>
                <td>NT$ ${planned.toLocaleString()}</td>
                <td>${actual > 0 ? `NT$ ${actual.toLocaleString()}` : `<span style="color:var(--text-muted)">未得標</span>`}</td>
                <td style="color: ${dev >= 0 ? "var(--success)" : "var(--danger)"}">
                    ${dev >= 0 ? `+ $${dev.toLocaleString()}` : `- $${Math.abs(dev).toLocaleString()}`}
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
    
    gameState.deviationTotal = deviationSum;
    
    if (tbody.innerHTML === "") {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted)">沒有任何預算或得標記錄</td></tr>`;
    }
}

// --- 10. 吉祥物拖曳功能實作 ---
function initDraggableMascot() {
    const mascot = document.getElementById("draggable-mascot");
    if (!mascot) return;
    
    let isDragging = false;
    let startX, startY;
    let initialLeft, initialTop;
    
    mascot.addEventListener("mousedown", dragStart);
    mascot.addEventListener("touchstart", dragStart, { passive: false });
    
    function dragStart(e) {
        SoundEffects.init();
        
        const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
        
        isDragging = true;
        startX = clientX;
        startY = clientY;
        
        const rect = mascot.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        
        mascot.style.bottom = "auto";
        mascot.style.right = "auto";
        mascot.style.left = `${initialLeft}px`;
        mascot.style.top = `${initialTop}px`;
        
        mascot.style.cursor = "grabbing";
        
        if (e.type === "touchstart") {
            document.addEventListener("touchmove", dragMove, { passive: false });
            document.addEventListener("touchend", dragEnd);
        } else {
            document.addEventListener("mousemove", dragMove);
            document.addEventListener("mouseup", dragEnd);
        }
        
        if (e.cancelable) e.preventDefault();
    }
    
    function dragMove(e) {
        if (!isDragging) return;
        
        const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
        
        const dx = clientX - startX;
        const dy = clientY - startY;
        
        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;
        
        const mascotWidth = mascot.offsetWidth;
        const mascotHeight = mascot.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        if (newLeft < 0) newLeft = 0;
        if (newLeft > windowWidth - mascotWidth) newLeft = windowWidth - mascotWidth;
        
        if (newTop < 0) newTop = 0;
        if (newTop > windowHeight - mascotHeight) newTop = windowHeight - mascotHeight;
        
        mascot.style.left = `${newLeft}px`;
        mascot.style.top = `${newTop}px`;
        
        if (e.type === "touchmove" && e.cancelable) {
            e.preventDefault();
        }
    }
    
    function dragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        mascot.style.cursor = "grab";
        
        document.removeEventListener("mousemove", dragMove);
        document.removeEventListener("mouseup", dragEnd);
        document.removeEventListener("touchmove", dragMove);
        document.removeEventListener("touchend", dragEnd);
    }
}
