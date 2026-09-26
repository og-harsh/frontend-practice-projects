// 1. Roman English Lyrics
const lyrics = [
    "Ke ab kuch hosh nahi hai tu mujhko pila degi kya",
    "Main peekar jo bhi kahunga tu sabkuch bhula degi kya",
    "Tu baahon mein rakh le do pal phir chahe door hata de",
    "Main god mein rakh loon agar sar tu mujhko sula degi kya",
    "", // Gap
    "Jaati nahi teri yaadein kasam se ke dil ka bharam hai tu",
    "Baaki nahi ab koi sharm jaana ek dharm hai tu",
    "Jo kehti thi mat piyo na meri jaan zeher hai ye",
    "Use dekhta hoon koi gar chhuye ab aur zeher kya piye"
];

// 2. Delay Function
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// 3. Typewriter Logic
async function typewriterLyrics() {
    console.clear();
    console.log("\n"); 

    for (const line of lyrics) {
        
        if(line === "") {
            console.log("\n");
            await sleep(1000); 
            continue;
        }

        for (const char of line.split('')) {
            process.stdout.write(char);
            // Typing Speed: 80ms (Thoda natural speed)
            await sleep(80); 
        }

        console.log(""); 
        // Line ke baad ka pause: 1.5 seconds
        await sleep(1500); 
    }

    console.log("\n");
}

typewriterLyrics();