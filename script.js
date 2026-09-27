/* =========================================
   LOGIN ACCESS CONTROL SYSTEM
========================================= */

let isLoggedIn = false;

let currentRole = "user";

/* =========================================
   CHECK LOGIN STATUS
========================================= */

window.onload = function(){

    initializeDemoAccount();
    restoreAuthSession();
    showLoginView();
};

function initializeDemoAccount(){

    const existing = JSON.parse(localStorage.getItem("allUsers") || "[]");
    if(existing.length > 0) return;

    const demoUsers = [
        {
            id:"1",
            fullName:"John Student",
            email:"student@revive.com",
            phone:"9876543210",
            password:"password123",
            role:"user"
        },
        {
            id:"2",
            fullName:"Sarah Wellness",
            email:"sarah@revive.com",
            phone:"9876543211",
            password:"secure456",
            role:"user"
        }
    ];

    localStorage.setItem("allUsers", JSON.stringify(demoUsers));
}

/* =========================================
   LOCKED FEATURE MESSAGE
========================================= */

function requireLogin(){

    if(!isLoggedIn){

        createPopup(
        `
        🔒 ACCESS DENIED<br><br>

        Please login or register first
        to access platform features.
        `
        );

        return false;
    }

    return true;
}

function restoreAuthSession(){

    const savedSession =
    localStorage.getItem("authSession");

    if(!savedSession){
        return;
    }

    try{

        const session = JSON.parse(savedSession);

        if(session && session.isLoggedIn){
            isLoggedIn = true;
            currentRole = session.user?.role || "user";
            unlockPlatform();
        }

    }catch(error){
        console.error("Auth restore failed:", error);
    }
}

function showLoginView(){

    const slider = document.getElementById("authSlider");

    if(slider){
        slider.classList.remove("is-signup");
    }
}

function showSignupView(){

    const slider = document.getElementById("authSlider");

    if(slider){
        slider.classList.add("is-signup");
    }
}

function handleLoginSubmit(event) {
    event.preventDefault();

    const identifier = document.getElementById("loginIdentifier").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    // Only require both fields to contain something
    if (!identifier || !password) {
        alert("Please enter email/phone and password.");
        return;
    }

    // Demo login: accept any non-empty email/phone and password
    const demoUser = {
        id: "demo-user",
        fullName: identifier,
        email: identifier,
        phone: identifier,
        role: "user"
    };

    localStorage.setItem(
        "authSession",
        JSON.stringify({
            isLoggedIn: true,
            user: demoUser
        })
    );

    isLoggedIn = true;
    currentRole = "user";

    alert(`✅ Welcome, ${identifier}!`);

    unlockPlatform();
}

function handleSignupSubmit(event){

    event.preventDefault();

    const fullName = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phone = document.getElementById("signupPhone").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;

    if(!fullName || !email || !password || !confirmPassword){
        alert("Please fill in all required fields.");
        return;
    }

    if(password !== confirmPassword){
        alert("Passwords do not match.");
        return;
    }

    const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");

    if(allUsers.find(u => u.email === email)){
        alert("Email already registered.");
        return;
    }

    const newUser = {
        id:Date.now().toString(),
        fullName,
        email,
        phone,
        password,
        role:"user"
    };

    allUsers.push(newUser);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));

    localStorage.setItem(
        "authSession",
        JSON.stringify({
            isLoggedIn:true,
            user:{id:newUser.id, fullName:newUser.fullName, email:newUser.email, phone:newUser.phone, role:"user"}
        })
    );

    isLoggedIn = true;
    currentRole = "user";

    alert(`✅ Account created! Welcome, ${fullName}.`);
    unlockPlatform();
}

function handleSocialLogin(provider){

    const email = prompt(`Enter your ${provider} email`, "user@example.com");
    if(!email) return;

    const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
    let user = allUsers.find(u => u.email === email);

    if(!user){
        user = {
            id:Date.now().toString(),
            fullName:`${provider} User`,
            email,
            phone:"",
            password:"",
            role:"user"
        };
        allUsers.push(user);
        localStorage.setItem("allUsers", JSON.stringify(allUsers));
    }

    localStorage.setItem(
        "authSession",
        JSON.stringify({
            isLoggedIn:true,
            user:{id:user.id, fullName:user.fullName, email:user.email, phone:user.phone, role:"user"}
        })
    );

    isLoggedIn = true;
    currentRole = "user";

    alert(`✅ Signed in with ${provider}!`);
    unlockPlatform();
}

/* =========================================
   MOTIVATIONAL QUOTES
========================================= */

const quotes = [

"Small daily improvements lead to success.",
"Your future depends on your habits.",
"Discipline creates freedom.",
"Stay focused and never give up.",
"Balance technology with real life.",
"Your mind deserves peace.",
"Digital wellness is self-care.",
"Be stronger than distractions.",
"Growth begins outside comfort zones.",
"Consistency beats motivation.",
"Stay positive and keep learning.",
"Rest is productive too.",
"Take care of your mental health.",
"Healthy habits create healthy futures.",
"Focus on progress, not perfection.",
"Discipline is choosing between what you want now and what you want most.",
"Small daily improvements lead to stunning long-term results.",
"Your future is created by what you do today.",
"Success begins with self-control.",
"Focus on progress, not perfection.",
"Every moment spent wisely builds your future.",
"Digital balance creates mental peace.",
"A healthy mind creates a healthy life.",
"Do not let screens control your dreams.",
"Your habits shape your destiny.",
"Take breaks. Recharge your mind.",
"Consistency beats motivation.",
"Protect your mental wellness daily.",
"Silence your distractions and strengthen your focus.",
"The strongest people master their mind.",
"Sleep is the foundation of success.",
"Growth begins outside your comfort zone.",
"Self-care is productive.",
"Your attention is your power.",
"Spend more time creating than scrolling.",
"Rest is not laziness.",
"Healthy habits build healthy futures.",
"Discipline creates freedom.",
"Every healthy choice matters.",
"Reduce screen time and increase life time.",
"Focus is the new superpower.",
"Choose real connections over digital addiction.",
"Success requires sacrifice and consistency.",
"Take care of your mind like your body.",
"A peaceful mind performs better.",
"Strong minds create successful lives.",
"Learn to disconnect to reconnect.",
"Control your screen before it controls you.",
"Balance technology with wellness.",
"Productivity grows through discipline.",
"Peace begins when comparison ends.",
"Digital wellness is self-respect.",
"Healthy routines create successful students.",
"The mind grows where attention flows.",
"Protect your energy wisely.",
"Reading feeds the mind.",
"Hydration improves concentration.",
"Exercise improves mental strength.",
"Every step toward wellness counts.",
"Positivity changes everything.",
"Dream big and work silently.",
"Your goals deserve your focus.",
"Smart habits build smart futures.",
"Break bad habits before they break you.",
"Real happiness exists beyond screens.",
"Mindfulness improves every moment.",
"Be stronger than your excuses.",
"Success starts with healthy routines.",
"Study with focus, not pressure.",
"Healthy sleep improves healthy thinking.",
"Digital detox improves real life.",
"Invest in yourself daily.",
"Your potential is limitless.",
"Choose growth over comfort.",
"Energy flows where focus goes.",
"Peaceful minds make better decisions.",
"Learn something valuable every day.",
"Control distractions before they control you.",
"Your brain deserves rest too.",
"Healthy students become successful leaders.",
"Create more memories offline.",
"The best project you can improve is yourself.",
"Strong habits create strong character.",
"Mental wellness is true wealth.",
"Confidence grows through action.",
"One focused hour is better than endless scrolling.",
"Protect your peace at all costs.",
"Positive thoughts create positive outcomes.",
"Your time is your life. Use it wisely.",
"Discipline today creates success tomorrow.",
"Less scrolling. More living.",
"A focused student becomes a successful professional.",
"Every sunrise is a new opportunity.",
"Do not waste today worrying about tomorrow.",
"Believe in your ability to grow.",
"Healthy routines improve mental clarity.",
"Focus on becoming better every day.",
"Success is built through consistency.",
"Train your mind to stay calm.",
"Your wellbeing matters.",
"Time spent improving yourself is never wasted.",
"Make your future proud.",
"Do not trade your dreams for distractions.",
"Balance creates happiness.",
"Wellness is the key to productivity.",
"Healthy minds inspire healthy lives.",
"Stay patient with your growth.",
"Your mental health deserves attention.",
"Discipline turns goals into reality.",
"Digital wellness creates real happiness.",
"Keep learning. Keep growing.",
"Focus on what truly matters.",
"Rest your eyes and refresh your mind.",
"Healthy choices create brighter futures.",
"Success is earned through daily effort.",

];

function changeQuote(){

    const quote =
    document.getElementById("quote");

    quote.style.opacity = 0;

    setTimeout(() => {

        const randomIndex =
        Math.floor(
            Math.random() * quotes.length
        );

        quote.innerHTML =
        `"${quotes[randomIndex]}"`;

        quote.style.opacity = 1;

    },300);
}

/* =========================================
   SCREEN TIME
========================================= */

/* =========================================
   AUTOMATIC SCREEN ACTIVITY TRACKER
========================================= */

let totalSeconds = 0;

let isScreenActive = true;

/* =========================================
   TIMER UPDATE
========================================= */

/* =========================================
   DEVICE UPTIME TRACKER
========================================= */

/*
   Tracks total device usage time
   from first platform launch.

   Persists even after refresh/reopen.
*/

let totalUsageSeconds = 0;

let trackerInterval;

/* =========================================
   INITIALIZE TRACKER
========================================= */

function initializeDeviceTracker(){

    const savedSeconds =
    localStorage.getItem(
        "deviceUsageSeconds"
    );

    if(savedSeconds){

        totalUsageSeconds =
        parseInt(savedSeconds);
    }

    startDeviceTracking();
}

/* =========================================
   START TRACKING
========================================= */

function startDeviceTracking(){

    trackerInterval =
    setInterval(() => {

        totalUsageSeconds++;

        localStorage.setItem(
            "deviceUsageSeconds",
            totalUsageSeconds
        );

        updateUsageUI();

        checkWellnessAlerts();

    },1000);
}

/* =========================================
   UPDATE TIMER UI
========================================= */

function updateUsageUI(){

    const hrs =
    String(
        Math.floor(totalUsageSeconds / 3600)
    ).padStart(2,"0");

    const mins =
    String(
        Math.floor(
            (totalUsageSeconds % 3600)/60
        )
    ).padStart(2,"0");

    const secs =
    String(
        totalUsageSeconds % 60
    ).padStart(2,"0");

    document.getElementById("timer")
    .innerHTML =
    `${hrs}:${mins}:${secs}`;

    updateUsageStatus();
}

/* =========================================
   USAGE STATUS
========================================= */

function updateUsageStatus(){

    const status =
    document.getElementById(
        "activityStatus"
    );

    const hours =
    totalUsageSeconds / 3600;

    if(hours < 2){

        status.className =
        "active-status";

        status.innerHTML =
        "🟢 Healthy Usage";

    }else if(hours < 5){

        status.className =
        "warning-status";

        status.innerHTML =
        "🟡 Moderate Usage";

    }else{

        status.className =
        "inactive-status";

        status.innerHTML =
        "🔴 High Screen Usage";
    }
}

/* =========================================
   SMART WELLNESS ALERTS
========================================= */

function checkWellnessAlerts(){

    /* Every 30 mins */

    if(totalUsageSeconds % 1800 === 0){

        createPopup(
        `
        💧 Wellness Reminder<br><br>

        Take a short break,
        drink water and relax your eyes.
        `
        );
    }

    /* Every 2 hours */

    if(totalUsageSeconds % 7200 === 0){

        createPopup(
        `
        ⚠ Extended Screen Usage<br><br>

        Consider taking a longer
        digital detox break.
        `
        );
    }
}

/* =========================================
   PAGE VISIBILITY
========================================= */

document.addEventListener(
"visibilitychange",

function(){

    if(document.hidden){

        console.log(
        "Tracking continues in session."
        );

    }else{

        console.log(
        "Device tracking resumed."
        );
    }
});

/* =========================================
   START TRACKER
========================================= */

initializeDeviceTracker();

/* =========================================
   WELLNESS HABITS
========================================= */

const habitData = {

sleep: `
<h3>🌙 Sleep Well</h3>
<ul>
<li>Improves concentration.</li>
<li>Boosts memory power.</li>
<li>Reduces stress.</li>
<li>Improves mood.</li>
<li>Increases energy.</li>
<li>Strengthens immunity.</li>
<li>Supports brain health.</li>
<li>Prevents tiredness.</li>
<li>Improves productivity.</li>
<li>Improves learning.</li>
<li>Enhances emotional balance.</li>
<li>Helps recovery.</li>
<li>Reduces anxiety.</li>
<li>Improves focus.</li>
<li>Creates healthy routine.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Sleep is self-care."</p>
<p>"Rest today for success tomorrow."</p>
<p>"Recharge your body and mind."</p>
`,

exercise: `
<h3>🏃 Exercise Daily</h3>
<ul>
<li>Improves fitness.</li>
<li>Boosts confidence.</li>
<li>Reduces stress.</li>
<li>Improves heart health.</li>
<li>Builds discipline.</li>
<li>Increases energy.</li>
<li>Improves flexibility.</li>
<li>Supports weight management.</li>
<li>Improves sleep.</li>
<li>Boosts mental health.</li>
<li>Strengthens muscles.</li>
<li>Improves focus.</li>
<li>Enhances positivity.</li>
<li>Improves stamina.</li>
<li>Supports productivity.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Strong body, strong mind."</p>
<p>"Fitness is self-respect."</p>
<p>"Push yourself every day."</p>
`,

meditation: `
<h3>🧘 Meditation</h3>
<ul>
<li>Calms the mind.</li>
<li>Reduces anxiety.</li>
<li>Improves focus.</li>
<li>Boosts mindfulness.</li>
<li>Improves emotional control.</li>
<li>Enhances peace.</li>
<li>Improves patience.</li>
<li>Improves sleep.</li>
<li>Reduces overthinking.</li>
<li>Boosts positivity.</li>
<li>Improves mental clarity.</li>
<li>Supports happiness.</li>
<li>Improves awareness.</li>
<li>Supports stress management.</li>
<li>Improves concentration.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Peace begins within."</p>
<p>"Calm mind, successful life."</p>
<p>"Meditation fuels the soul."</p>
`,

reading: `
<h3>📚 Reading Books</h3>
<ul>
<li>Improves vocabulary.</li>
<li>Boosts knowledge.</li>
<li>Enhances creativity.</li>
<li>Improves memory.</li>
<li>Builds imagination.</li>
<li>Improves focus.</li>
<li>Reduces stress.</li>
<li>Improves communication.</li>
<li>Builds confidence.</li>
<li>Improves writing skills.</li>
<li>Encourages discipline.</li>
<li>Supports learning.</li>
<li>Improves thinking ability.</li>
<li>Reduces screen addiction.</li>
<li>Creates lifelong learning.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Readers become leaders."</p>
<p>"Books feed the brain."</p>
<p>"Knowledge grows daily."</p>
`,

hydration: `
<h3>💧 Stay Hydrated</h3>
<ul>
<li>Boosts energy.</li>
<li>Improves concentration.</li>
<li>Prevents dehydration.</li>
<li>Improves skin health.</li>
<li>Supports digestion.</li>
<li>Maintains body temperature.</li>
<li>Reduces headaches.</li>
<li>Flushes toxins.</li>
<li>Improves mood.</li>
<li>Supports body organs.</li>
<li>Improves circulation.</li>
<li>Supports brain function.</li>
<li>Reduces tiredness.</li>
<li>Improves fitness.</li>
<li>Supports overall health.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Water is life."</p>
<p>"Hydrate to dominate."</p>
<p>"Healthy body starts with water."</p>
`,

studybreak: `
<h3>⏸ Study Breaks</h3>
<ul>
<li>Refreshes the brain.</li>
<li>Improves focus.</li>
<li>Boosts productivity.</li>
<li>Prevents burnout.</li>
<li>Improves memory retention.</li>
<li>Reduces stress.</li>
<li>Improves creativity.</li>
<li>Supports healthy study habits.</li>
<li>Prevents eye strain.</li>
<li>Boosts motivation.</li>
<li>Improves concentration.</li>
<li>Supports balance.</li>
<li>Reduces fatigue.</li>
<li>Improves learning.</li>
<li>Makes studying enjoyable.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Breaks improve performance."</p>
<p>"Rest to learn better."</p>
<p>"Recharge your brain."</p>
`,

journaling: `
<h3>📝 Journaling</h3>
<ul>
<li>Organizes thoughts.</li>
<li>Reduces stress.</li>
<li>Improves self-awareness.</li>
<li>Boosts creativity.</li>
<li>Tracks growth.</li>
<li>Improves mindfulness.</li>
<li>Improves emotional health.</li>
<li>Builds confidence.</li>
<li>Encourages positivity.</li>
<li>Improves memory.</li>
<li>Supports goal tracking.</li>
<li>Helps problem solving.</li>
<li>Reduces overthinking.</li>
<li>Supports mental wellness.</li>
<li>Improves decision making.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Write your growth story."</p>
<p>"Journaling clears the mind."</p>
<p>"Thoughts become clearer on paper."</p>
`,

family: `
<h3>👨‍👩‍👧 Family Time</h3>
<ul>
<li>Strengthens relationships.</li>
<li>Creates happiness.</li>
<li>Improves support system.</li>
<li>Reduces loneliness.</li>
<li>Builds trust.</li>
<li>Improves communication.</li>
<li>Creates memories.</li>
<li>Supports emotional health.</li>
<li>Boosts positivity.</li>
<li>Builds confidence.</li>
<li>Improves social skills.</li>
<li>Creates peaceful environment.</li>
<li>Improves emotional balance.</li>
<li>Supports growth.</li>
<li>Reduces stress.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Family is life's greatest blessing."</p>
<p>"Love grows together."</p>
<p>"Strong families build strong minds."</p>
`,

nature: `
<h3>🌿 Nature Walk</h3>
<ul>
<li>Reduces stress.</li>
<li>Improves breathing.</li>
<li>Boosts positivity.</li>
<li>Refreshes the brain.</li>
<li>Improves focus.</li>
<li>Supports fitness.</li>
<li>Improves creativity.</li>
<li>Enhances peace.</li>
<li>Improves sleep.</li>
<li>Supports mindfulness.</li>
<li>Reduces anxiety.</li>
<li>Creates happiness.</li>
<li>Refreshes the body.</li>
<li>Connects with nature.</li>
<li>Supports mental health.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Nature heals silently."</p>
<p>"Fresh air refreshes the soul."</p>
<p>"Walk in nature and find peace."</p>
`,

music: `
<h3>🎵 Relaxing Music</h3>
<ul>
<li>Reduces stress.</li>
<li>Improves mood.</li>
<li>Boosts concentration.</li>
<li>Improves sleep.</li>
<li>Creates relaxation.</li>
<li>Supports emotional balance.</li>
<li>Reduces anxiety.</li>
<li>Boosts motivation.</li>
<li>Refreshes the mind.</li>
<li>Supports mindfulness.</li>
<li>Improves productivity.</li>
<li>Creates happiness.</li>
<li>Supports mental wellness.</li>
<li>Calms the nervous system.</li>
<li>Improves meditation.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Music heals the soul."</p>
<p>"Relax and listen."</p>
<p>"Every melody carries peace."</p>
`,

gratitude: `
<h3>🙏 Gratitude Practice</h3>
<ul>
<li>Improves happiness.</li>
<li>Builds positivity.</li>
<li>Reduces stress.</li>
<li>Improves relationships.</li>
<li>Boosts confidence.</li>
<li>Encourages optimism.</li>
<li>Improves emotional health.</li>
<li>Supports mindfulness.</li>
<li>Improves satisfaction.</li>
<li>Builds peace of mind.</li>
<li>Boosts motivation.</li>
<li>Reduces negativity.</li>
<li>Improves mental wellness.</li>
<li>Creates joy.</li>
<li>Improves social connections.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Gratitude changes everything."</p>
<p>"Be thankful daily."</p>
<p>"Small blessings matter."</p>
`,

healthyfood: `
<h3>🥗 Healthy Eating</h3>
<ul>
<li>Improves energy.</li>
<li>Boosts immunity.</li>
<li>Supports brain function.</li>
<li>Improves concentration.</li>
<li>Supports healthy weight.</li>
<li>Improves mood.</li>
<li>Prevents diseases.</li>
<li>Improves digestion.</li>
<li>Boosts productivity.</li>
<li>Supports fitness.</li>
<li>Improves sleep.</li>
<li>Creates healthy habits.</li>
<li>Supports overall wellness.</li>
<li>Improves stamina.</li>
<li>Enhances positivity.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Eat healthy, stay healthy."</p>
<p>"Good food fuels success."</p>
<p>"Healthy habits build healthy lives."</p>
`,

time: `
<h3>⏳ Time Management</h3>
<ul>
<li>Improves productivity.</li>
<li>Reduces stress.</li>
<li>Builds discipline.</li>
<li>Improves focus.</li>
<li>Helps meet deadlines.</li>
<li>Creates balance.</li>
<li>Improves planning skills.</li>
<li>Boosts confidence.</li>
<li>Improves efficiency.</li>
<li>Encourages success.</li>
<li>Reduces procrastination.</li>
<li>Supports learning.</li>
<li>Creates healthy routine.</li>
<li>Improves organization.</li>
<li>Supports goal achievement.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Time is your greatest asset."</p>
<p>"Manage time wisely."</p>
<p>"Every minute matters."</p>
`,

goal: `
<h3>🎯 Goal Setting</h3>
<ul>
<li>Improves focus.</li>
<li>Boosts motivation.</li>
<li>Creates direction.</li>
<li>Encourages discipline.</li>
<li>Builds confidence.</li>
<li>Improves productivity.</li>
<li>Supports success.</li>
<li>Encourages growth.</li>
<li>Improves planning.</li>
<li>Boosts consistency.</li>
<li>Supports learning.</li>
<li>Improves determination.</li>
<li>Encourages positivity.</li>
<li>Creates purpose.</li>
<li>Supports achievement.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Dream big, start small."</p>
<p>"Goals create success."</p>
<p>"Stay focused on your vision."</p>
`,

positivity: `
<h3>😊 Positive Thinking</h3>
<ul>
<li>Improves mental health.</li>
<li>Reduces stress.</li>
<li>Builds confidence.</li>
<li>Boosts happiness.</li>
<li>Improves relationships.</li>
<li>Encourages optimism.</li>
<li>Supports growth mindset.</li>
<li>Improves emotional balance.</li>
<li>Reduces negativity.</li>
<li>Improves productivity.</li>
<li>Supports motivation.</li>
<li>Improves self-esteem.</li>
<li>Creates peaceful mindset.</li>
<li>Improves resilience.</li>
<li>Supports healthy lifestyle.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Positive mind, positive life."</p>
<p>"Choose positivity daily."</p>
<p>"Your mindset shapes your future."</p>
`,

digitaldetox: `
<h3>📵 Digital Detox</h3>
<ul>
<li>Reduces screen addiction.</li>
<li>Improves focus.</li>
<li>Improves sleep.</li>
<li>Boosts mental peace.</li>
<li>Improves social life.</li>
<li>Reduces eye strain.</li>
<li>Improves productivity.</li>
<li>Supports mindfulness.</li>
<li>Reduces stress.</li>
<li>Creates balance.</li>
<li>Boosts concentration.</li>
<li>Supports healthy habits.</li>
<li>Improves emotional health.</li>
<li>Encourages outdoor activities.</li>
<li>Improves overall wellness.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Disconnect to reconnect."</p>
<p>"Real life matters too."</p>
<p>"Balance technology wisely."</p>
`,

breathing: `
<h3>🌬 Deep Breathing</h3>
<ul>
<li>Reduces stress instantly.</li>
<li>Calms the nervous system.</li>
<li>Improves oxygen flow.</li>
<li>Boosts focus.</li>
<li>Improves relaxation.</li>
<li>Supports emotional balance.</li>
<li>Reduces anxiety.</li>
<li>Improves mindfulness.</li>
<li>Improves sleep.</li>
<li>Refreshes the mind.</li>
<li>Supports heart health.</li>
<li>Improves meditation.</li>
<li>Improves concentration.</li>
<li>Creates peace.</li>
<li>Improves emotional control.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Breathe in peace."</p>
<p>"Every breath is a fresh start."</p>
<p>"Calm breathing creates calm thinking."</p>
`,

selfcare: `
<h3>💖 Self Care</h3>
<ul>
<li>Improves mental wellness.</li>
<li>Boosts confidence.</li>
<li>Reduces stress.</li>
<li>Improves happiness.</li>
<li>Supports emotional balance.</li>
<li>Creates peace of mind.</li>
<li>Improves productivity.</li>
<li>Encourages positivity.</li>
<li>Builds healthy habits.</li>
<li>Improves relationships.</li>
<li>Supports physical health.</li>
<li>Reduces burnout.</li>
<li>Improves motivation.</li>
<li>Builds self-respect.</li>
<li>Supports personal growth.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Self care is important."</p>
<p>"Take care of yourself."</p>
<p>"You deserve peace and happiness."</p>
`,

focus: `
<h3>🎯 Focus Practice</h3>
<ul>
<li>Improves concentration.</li>
<li>Reduces distractions.</li>
<li>Boosts productivity.</li>
<li>Improves learning.</li>
<li>Improves memory.</li>
<li>Builds discipline.</li>
<li>Supports success.</li>
<li>Improves efficiency.</li>
<li>Encourages consistency.</li>
<li>Reduces procrastination.</li>
<li>Improves confidence.</li>
<li>Supports goal achievement.</li>
<li>Improves clarity.</li>
<li>Builds healthy habits.</li>
<li>Enhances performance.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Focus creates success."</p>
<p>"Avoid distractions."</p>
<p>"Concentration builds excellence."</p>
`,

yoga: `
<h3>🧘 Yoga</h3>
<ul>
<li>Improves flexibility.</li>
<li>Reduces stress.</li>
<li>Improves balance.</li>
<li>Boosts mental peace.</li>
<li>Improves breathing.</li>
<li>Supports fitness.</li>
<li>Improves posture.</li>
<li>Improves sleep.</li>
<li>Strengthens muscles.</li>
<li>Boosts positivity.</li>
<li>Supports mindfulness.</li>
<li>Improves emotional health.</li>
<li>Reduces anxiety.</li>
<li>Improves concentration.</li>
<li>Creates calmness.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Yoga connects body and mind."</p>
<p>"Peace begins on the yoga mat."</p>
<p>"Stretch, breathe and relax."</p>
`,

kindness: `
<h3>🤝 Kindness</h3>
<ul>
<li>Improves relationships.</li>
<li>Creates happiness.</li>
<li>Builds positivity.</li>
<li>Improves emotional health.</li>
<li>Encourages empathy.</li>
<li>Reduces stress.</li>
<li>Boosts confidence.</li>
<li>Strengthens social bonds.</li>
<li>Builds trust.</li>
<li>Improves communication.</li>
<li>Creates peaceful environment.</li>
<li>Improves teamwork.</li>
<li>Encourages compassion.</li>
<li>Improves life satisfaction.</li>
<li>Supports mental wellness.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Kindness changes lives."</p>
<p>"Be the reason someone smiles."</p>
<p>"Small acts create big impact."</p>
`,

social: `
<h3>👥 Healthy Social Life</h3>
<ul>
<li>Reduces loneliness.</li>
<li>Improves happiness.</li>
<li>Builds confidence.</li>
<li>Improves communication skills.</li>
<li>Supports emotional health.</li>
<li>Creates support system.</li>
<li>Improves teamwork.</li>
<li>Builds trust.</li>
<li>Boosts positivity.</li>
<li>Improves social skills.</li>
<li>Encourages motivation.</li>
<li>Improves relationships.</li>
<li>Reduces stress.</li>
<li>Creates meaningful memories.</li>
<li>Supports mental wellness.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Healthy friendships matter."</p>
<p>"Connection creates strength."</p>
<p>"Good company improves life."</p>
`,

budget: `
<h3>💰 Money Management</h3>
<ul>
<li>Reduces financial stress.</li>
<li>Improves discipline.</li>
<li>Encourages saving habits.</li>
<li>Improves planning.</li>
<li>Builds responsibility.</li>
<li>Creates stability.</li>
<li>Boosts confidence.</li>
<li>Supports future goals.</li>
<li>Prevents unnecessary spending.</li>
<li>Improves decision making.</li>
<li>Builds independence.</li>
<li>Creates peace of mind.</li>
<li>Supports balanced lifestyle.</li>
<li>Improves organization.</li>
<li>Encourages smart habits.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Save today for tomorrow."</p>
<p>"Smart spending creates freedom."</p>
<p>"Money management is life management."</p>
`,

creativity: `
<h3>🎨 Creativity</h3>
<ul>
<li>Improves imagination.</li>
<li>Boosts problem solving.</li>
<li>Encourages innovation.</li>
<li>Improves confidence.</li>
<li>Reduces stress.</li>
<li>Supports emotional expression.</li>
<li>Improves focus.</li>
<li>Enhances learning.</li>
<li>Boosts productivity.</li>
<li>Encourages originality.</li>
<li>Creates happiness.</li>
<li>Improves flexible thinking.</li>
<li>Supports mental wellness.</li>
<li>Builds self-expression.</li>
<li>Encourages growth mindset.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Creativity makes life colorful."</p>
<p>"Every idea begins with imagination."</p>
<p>"Think differently and grow."</p>
`,

learning: `
<h3>📖 Continuous Learning</h3>
<ul>
<li>Improves knowledge.</li>
<li>Builds confidence.</li>
<li>Supports career growth.</li>
<li>Improves memory.</li>
<li>Enhances creativity.</li>
<li>Boosts productivity.</li>
<li>Improves focus.</li>
<li>Encourages curiosity.</li>
<li>Builds problem solving skills.</li>
<li>Supports adaptability.</li>
<li>Improves communication.</li>
<li>Creates opportunities.</li>
<li>Improves decision making.</li>
<li>Supports personal growth.</li>
<li>Encourages success.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Learning never stops."</p>
<p>"Knowledge is true power."</p>
<p>"Grow daily through learning."</p>
`,

confidence: `
<h3>💪 Self Confidence</h3>
<ul>
<li>Improves decision making.</li>
<li>Boosts positivity.</li>
<li>Encourages leadership.</li>
<li>Improves communication.</li>
<li>Supports goal achievement.</li>
<li>Reduces fear.</li>
<li>Improves social skills.</li>
<li>Builds resilience.</li>
<li>Supports success.</li>
<li>Encourages motivation.</li>
<li>Improves emotional balance.</li>
<li>Boosts productivity.</li>
<li>Improves relationships.</li>
<li>Encourages self-respect.</li>
<li>Supports mental wellness.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Believe in yourself."</p>
<p>"Confidence creates opportunities."</p>
<p>"You are stronger than doubts."</p>
`,

routine: `
<h3>📅 Daily Routine</h3>
<ul>
<li>Builds discipline.</li>
<li>Improves productivity.</li>
<li>Reduces stress.</li>
<li>Improves time management.</li>
<li>Supports healthy habits.</li>
<li>Improves focus.</li>
<li>Boosts consistency.</li>
<li>Encourages balance.</li>
<li>Improves organization.</li>
<li>Supports goal achievement.</li>
<li>Reduces procrastination.</li>
<li>Improves sleep schedule.</li>
<li>Boosts motivation.</li>
<li>Improves efficiency.</li>
<li>Creates stability.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Consistency creates success."</p>
<p>"Daily habits shape your future."</p>
<p>"Small routines create big results."</p>
`,

cleanliness: `
<h3>🧼 Cleanliness</h3>
<ul>
<li>Improves health.</li>
<li>Prevents diseases.</li>
<li>Creates positive environment.</li>
<li>Boosts confidence.</li>
<li>Improves focus.</li>
<li>Supports organization.</li>
<li>Reduces stress.</li>
<li>Improves productivity.</li>
<li>Creates discipline.</li>
<li>Improves hygiene.</li>
<li>Supports mental wellness.</li>
<li>Improves lifestyle.</li>
<li>Boosts positivity.</li>
<li>Encourages responsibility.</li>
<li>Creates peaceful surroundings.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Clean space, clear mind."</p>
<p>"Clean habits create healthy lives."</p>
<p>"Hygiene reflects self-respect."</p>
`,

leadership: `
<h3>👑 Leadership Skills</h3>
<ul>
<li>Improves confidence.</li>
<li>Boosts communication skills.</li>
<li>Encourages teamwork.</li>
<li>Improves decision making.</li>
<li>Builds responsibility.</li>
<li>Supports career growth.</li>
<li>Improves problem solving.</li>
<li>Encourages motivation.</li>
<li>Builds resilience.</li>
<li>Improves organization.</li>
<li>Supports success.</li>
<li>Boosts productivity.</li>
<li>Improves emotional intelligence.</li>
<li>Encourages innovation.</li>
<li>Creates positive influence.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Leaders inspire others."</p>
<p>"Leadership begins with self-discipline."</p>
<p>"Great leaders create change."</p>
`,

discipline: `
<h3>⚡ Discipline</h3>
<ul>
<li>Improves focus.</li>
<li>Builds consistency.</li>
<li>Supports goal achievement.</li>
<li>Improves productivity.</li>
<li>Reduces procrastination.</li>
<li>Encourages responsibility.</li>
<li>Improves self-control.</li>
<li>Boosts confidence.</li>
<li>Supports healthy habits.</li>
<li>Improves time management.</li>
<li>Encourages success.</li>
<li>Improves organization.</li>
<li>Supports mental strength.</li>
<li>Improves learning.</li>
<li>Creates balanced lifestyle.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Discipline creates freedom."</p>
<p>"Success follows consistency."</p>
<p>"Stay committed to your goals."</p>
`,

communication: `
<h3>🗣 Communication Skills</h3>
<ul>
<li>Improves relationships.</li>
<li>Boosts confidence.</li>
<li>Supports teamwork.</li>
<li>Improves understanding.</li>
<li>Encourages leadership.</li>
<li>Builds trust.</li>
<li>Improves social skills.</li>
<li>Supports career growth.</li>
<li>Improves emotional intelligence.</li>
<li>Encourages collaboration.</li>
<li>Reduces misunderstandings.</li>
<li>Improves presentations.</li>
<li>Boosts positivity.</li>
<li>Supports problem solving.</li>
<li>Improves networking.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Communication builds connections."</p>
<p>"Speak clearly and confidently."</p>
<p>"Words have power."</p>
`,

mindfulness: `
<h3>🧠 Mindfulness</h3>
<ul>
<li>Improves focus.</li>
<li>Reduces stress.</li>
<li>Boosts emotional balance.</li>
<li>Improves concentration.</li>
<li>Supports mental wellness.</li>
<li>Encourages positivity.</li>
<li>Improves patience.</li>
<li>Reduces anxiety.</li>
<li>Improves awareness.</li>
<li>Supports relaxation.</li>
<li>Improves sleep quality.</li>
<li>Enhances self-control.</li>
<li>Boosts happiness.</li>
<li>Supports healthy thinking.</li>
<li>Creates inner peace.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Live in the present moment."</p>
<p>"Mindfulness creates peace."</p>
<p>"Awareness changes everything."</p>
`,

teamwork: `
<h3>🤝 Teamwork</h3>
<ul>
<li>Improves cooperation.</li>
<li>Builds trust.</li>
<li>Improves communication.</li>
<li>Encourages leadership.</li>
<li>Boosts productivity.</li>
<li>Supports problem solving.</li>
<li>Improves social skills.</li>
<li>Creates positive environment.</li>
<li>Encourages collaboration.</li>
<li>Improves confidence.</li>
<li>Supports learning.</li>
<li>Builds friendships.</li>
<li>Improves creativity.</li>
<li>Encourages responsibility.</li>
<li>Supports success.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Together everyone achieves more."</p>
<p>"Teamwork creates success."</p>
<p>"Unity is strength."</p>
`,

stress: `
<h3>😌 Stress Management</h3>
<ul>
<li>Improves mental health.</li>
<li>Reduces anxiety.</li>
<li>Improves focus.</li>
<li>Boosts emotional balance.</li>
<li>Improves sleep.</li>
<li>Supports productivity.</li>
<li>Improves relationships.</li>
<li>Boosts positivity.</li>
<li>Supports healthy habits.</li>
<li>Improves decision making.</li>
<li>Creates peace of mind.</li>
<li>Reduces burnout.</li>
<li>Improves energy levels.</li>
<li>Supports happiness.</li>
<li>Improves concentration.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Stay calm under pressure."</p>
<p>"Peace is power."</p>
<p>"Relax your mind and body."</p>
`,

hobbies: `
<h3>🎯 Healthy Hobbies</h3>
<ul>
<li>Reduces stress.</li>
<li>Boosts creativity.</li>
<li>Improves happiness.</li>
<li>Supports mental wellness.</li>
<li>Improves focus.</li>
<li>Encourages relaxation.</li>
<li>Builds confidence.</li>
<li>Improves productivity.</li>
<li>Creates positive routine.</li>
<li>Encourages learning.</li>
<li>Improves emotional balance.</li>
<li>Supports personal growth.</li>
<li>Reduces screen addiction.</li>
<li>Creates enjoyment.</li>
<li>Improves social interaction.</li>
</ul>
<h3>✨ Motivation</h3>
<p>"Hobbies refresh the mind."</p>
<p>"Do what makes you happy."</p>
<p>"Creative hobbies build healthy minds."</p>
`,

};


/* =========================================
   OPEN HABIT
========================================= */

function openHabit(habit){

    const details =
    document.getElementById("habitDetails");

    const title =
    document.getElementById("habitTitle");

    const content =
    document.getElementById("habitContent");

    if(!habitData[habit]){

        content.innerHTML =
        `
        <div class="habit-content-box">
            <h3>Coming Soon</h3>
            <p>This wellness habit content is being added.</p>
        </div>
        `;

    }else{

        content.innerHTML =
        `
        <div class="habit-content-box">
            ${habitData[habit]}
        </div>
        `;
    }

    title.innerHTML =
    "✨ " + habit.toUpperCase() + " WELLNESS GUIDE";

    details.style.display = "block";
}

/* =========================================
   CLOSE HABIT
========================================= */

function closeHabit(){

    document.getElementById("habitDetails").style.display =
    "none";

    document.querySelector(".wellness-section")
    .scrollIntoView({
        behavior:"smooth"
    });
}

/* =========================================
   NOTIFICATION
========================================= */

function showNotification(){

    alert("⏰ Time to take a healthy break!");
}

/* =========================================
   SAFETY SYSTEM
========================================= */

/* =========================================
   REAL DEVICE MOVEMENT SPEED TRACKER
========================================= */

let watchID = null;

function startSpeedTracking(){

    if(!navigator.geolocation){

        alert("Geolocation is not supported.");

        return;
    }

    watchID =
    navigator.geolocation.watchPosition(

        (position) => {

            let speed =
            position.coords.speed;

            // speed comes in meters/second

            if(speed === null){

                document.getElementById("speedResult")
                .innerHTML =
                "⚠ Unable to detect movement speed.";

                return;
            }

            let speedMS =
            speed.toFixed(2);

            let speedKMH =
            (speed * 3.6).toFixed(2);

            let statusHTML = "";

if(speed > 10){

    statusHTML =
    `
    <div class="danger-status">
        ⚠ HIGH SPEED DETECTED
    </div>
    `;

}else{

    statusHTML =
    `
    <div class="safe-status">
        ✅ SAFE MOVEMENT
    </div>
    `;
}

document.getElementById("speedResult")
.innerHTML =
`
<div>

    🚀 LIVE SPEED TRACKER

    <br><br>

    <div class="speed-number">
        ${speedMS}
    </div>

    m/s

    <br><br>

    ${speedKMH} km/h

    ${statusHTML}

</div>
`;

            /* ==============================
               AUTO CALL SAFETY ALERT
            ============================== */

            if(speed > 10){

                showSpeedWarning();
            }

        },

        (error) => {

            document.getElementById("speedResult")
            .innerHTML =
            "❌ Location permission denied.";

        },

        {
            enableHighAccuracy:true,
            maximumAge:0,
            timeout:5000
        }
    );
}

/* =========================================
   SPEED WARNING POPUP
========================================= */

function showSpeedWarning(){

    createPopup(
    `
    ⚠ SAFETY ALERT<br><br>

    Device moving above 10 m/s.<br><br>

    Incoming calls should be automatically declined for safety.
    `
    );
}

/* =========================================
   STOP SPEED TRACKING
========================================= */

function stopSpeedTracking(){

    if(watchID !== null){

        navigator.geolocation.clearWatch(watchID);

        watchID = null;

        document.getElementById("speedResult")
        .innerHTML =
        "🛑 Speed tracking stopped.";
    }
}

/* =========================================
   SMART AUTO NOTIFICATIONS
========================================= */

function createPopup(message){

    const popup =
    document.createElement("div");

    popup.className =
    "popup-notification";

    popup.innerHTML = message;

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.remove();

    },5000);
}

/* =========================================
   BREAK REMINDERS
========================================= */

setInterval(() => {

    createPopup(
    "⏰ Wellness Break Reminder!<br><br>Take a 5-minute break and relax your eyes."
    );

}, 120000);

/* =========================================
   HYDRATION REMINDER
========================================= */

setInterval(() => {

    createPopup(
    "💧 Hydration Alert!<br><br>Drink water and stay refreshed."
    );

}, 180000);

/* =========================================
   POSTURE REMINDER
========================================= */

setInterval(() => {

    createPopup(
    "🪑 Posture Reminder!<br><br>Sit straight and relax your shoulders."
    );

}, 240000);

/* =========================================
   DIGITAL DETOX ALERT
========================================= */

setInterval(() => {

    createPopup(
    "📵 Digital Detox Reminder!<br><br>Spend a few minutes away from screens."
    );

}, 300000);

/* =========================================
   MOTIVATIONAL ALERTS
========================================= */

const motivationAlerts = [

"✨ You are stronger than distractions.",

"🌟 Small healthy habits create big success.",

"💙 Your mental health matters.",

"🚀 Stay focused on your goals.",

"📚 Learn more, scroll less.",

"🌱 Progress happens daily.",

"😊 Balance technology with real life."

];

setInterval(() => {

    const random =
    Math.floor(Math.random() *
    motivationAlerts.length);

    createPopup(
    motivationAlerts[random]
    );

}, 150000);

/* =========================================
   NIGHT WELLNESS ALERT
========================================= */

function nightReminder(){

    const now = new Date();

    const hour = now.getHours();

    if(hour >= 22){

        createPopup(
        "🌙 Late Night Alert!<br><br>Reduce screen usage and prepare for sleep."
        );
    }
}

setInterval(nightReminder,600000);

/* =========================================
   SCREEN LIMIT WARNING
========================================= */

function screenLimitWarning(){

    const seconds = 0;

    if(seconds >= 3600){

        createPopup(
            "⚠️ High Screen Usage!<br><br>You have used the device continuously for 1 hour."
        );

    }
}

setInterval(screenLimitWarning,60000);

/* =====================================
   USER TABS
===================================== */

function showUserLogin(){

    document.getElementById("userLoginBox")
    .style.display = "flex";

    document.getElementById("userRegisterBox")
    .style.display = "none";

    document.getElementById("userLoginTab")
    .classList.add("active-tab");

    document.getElementById("userRegisterTab")
    .classList.remove("active-tab");
}

function showUserRegister(){

    document.getElementById("userLoginBox")
    .style.display = "none";

    document.getElementById("userRegisterBox")
    .style.display = "flex";

    document.getElementById("userRegisterTab")
    .classList.add("active-tab");

    document.getElementById("userLoginTab")
    .classList.remove("active-tab");
}

/* =====================================
   ADMIN TABS
===================================== */

function showAdminLogin(){

    document.getElementById("adminLoginBox")
    .style.display = "flex";

    document.getElementById("adminRegisterBox")
    .style.display = "none";

    document.getElementById("adminLoginTab")
    .classList.add("active-tab");

    document.getElementById("adminRegisterTab")
    .classList.remove("active-tab");
}

function showAdminRegister(){

    document.getElementById("adminLoginBox")
    .style.display = "none";

    document.getElementById("adminRegisterBox")
    .style.display = "flex";

    document.getElementById("adminRegisterTab")
    .classList.add("active-tab");

    document.getElementById("adminLoginTab")
    .classList.remove("active-tab");
}

/* =========================================
   UNLOCK PLATFORM
========================================= */

function unlockPlatform(){

    document.getElementById("mainPlatform")
    .style.display = "block";

    document.querySelector(".auth-main-container")
    .style.display = "none";

    createPopup(
    `
    🚀 Platform Unlocked Successfully
    `
    );
}

/* =========================================
   LOGOUT
========================================= */

/* =========================================
   LOGOUT FUNCTION
========================================= */

function logout(){

    isLoggedIn = false;

    currentRole = "";

    localStorage.removeItem("authSession");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentRole");

    document.getElementById("mainPlatform").style.display = "none";
    document.querySelector(".auth-main-container").style.display = "flex";

    showLoginView();

    window.scrollTo({top:0, behavior:"smooth"});

    alert("👋 Logged out successfully");
}

/* =========================================
   DARK/LIGHT MODE SYSTEM
========================================= */

let darkMode = true;

/* =========================================
   LOAD SAVED THEME
========================================= */

window.addEventListener(
"load",

function(){

    const savedTheme =
    localStorage.getItem("theme");

    if(savedTheme === "light"){

        enableLightMode();
    }
});

/* =========================================
   TOGGLE THEME
========================================= */

function toggleTheme(){

    document.body.classList.toggle(
    "light-mode"
    );

    const themeBtn =
    document.getElementById(
    "themeBtn"
    );

    if(
        document.body.classList.contains(
        "light-mode"
        )
    ){

        themeBtn.innerHTML = "☀️";

    }

    else{

        themeBtn.innerHTML = "🌙";
    }
}

/* =========================================
   LIGHT MODE
========================================= */

function enableLightMode(){

    document.body.classList.add(
    "light-mode"
    );

    document.getElementById("themeBtn")
    .innerHTML =
    "☀ Light Mode";

    darkMode = false;

    localStorage.setItem(
    "theme",
    "light"
    );
}

/* =========================================
   DARK MODE
========================================= */

function enableDarkMode(){

    document.body.classList.remove(
    "light-mode"
    );

    document.getElementById("themeBtn")
    .innerHTML =
    "🌙 Dark Mode";

    darkMode = true;

    localStorage.setItem(
    "theme",
    "dark"
    );
}

function analyzeScreenTime(){

    let time =
    document.getElementById("dailyTime").value;

    let result="";

    if(time <= 3){

        result="✅ Safe Usage Level";

    } else if(time <= 6){

        result="⚠ Moderate Usage Level";

    } else{

        result="🚨 High Risk Digital Addiction";
    }

    document.getElementById(
    "screenResult"
    ).innerHTML=result;
}

function checkMentalHealth(){

    let stress =
    document.getElementById("stressLevel").value;

    let result="";

    if(stress==="Low"){

        result="😊 Low Stress Level";

    } else if(stress==="Moderate"){

        result="😐 Moderate Stress Level";

    } else{

        result="⚠ High Stress Level";
    }

    document.getElementById(
    "mentalResult"
    ).innerHTML=result;
}

let relaxInterval;

function startRelaxTimer(activity,seconds){

    clearInterval(relaxInterval);

    document.getElementById(
    "relaxStatus"
    ).innerHTML =
    "🟢 " + activity + " Started";

    let time = seconds;

    relaxInterval = setInterval(()=>{

        let mins =
        Math.floor(time/60);

        let secs =
        time%60;

        document.getElementById(
        "relaxTimer"
        ).innerHTML =
        `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;

        if(time<=0){

            clearInterval(relaxInterval);

            document.getElementById(
            "relaxStatus"
            ).innerHTML =
            "✅ Session Complete. You are refreshed!";
        }

        time--;

    },1000);
}

function sendSupportMessage(){

    let name =
    document.getElementById(
    "supportName"
    ).value;

    if(name===""){

        document.getElementById(
        "supportResult"
        ).innerHTML =
        "⚠ Please fill all details";

        return;
    }

    document.getElementById(
    "supportResult"
    ).innerHTML =
    "✅ Support request sent successfully. A counselor will contact you soon.";
}

function submitFeedback(){

    let name =
    document.getElementById(
    "feedbackName"
    ).value;

    let email =
    document.getElementById(
    "feedbackEmail"
    ).value;

    let suggestion =
    document.getElementById(
    "feedbackSuggestion"
    ).value;

    if(name==="" || email==="" || suggestion===""){

        document.getElementById(
        "feedbackResult"
        ).innerHTML =
        "⚠ Please fill all fields";

        return;
    }

    document.getElementById(
    "feedbackResult"
    ).innerHTML =
    "✅ Thank you! Your feedback has been submitted successfully.";

    document.getElementById("feedbackName").value="";
    document.getElementById("feedbackEmail").value="";
    document.getElementById("feedbackSuggestion").value="";
}

function toggleFAQ(item){

    let answer =
    item.querySelector("p");

    if(answer.style.display==="block"){

        answer.style.display="none";

    }else{

        answer.style.display="block";
    }
}

function random(min,max){
   return Math.floor(Math.random()*(max-min+1))+min;
}

const recommendationsList = [
"Take a 10-minute eye break",
"Do breathing exercises",
"Reduce social media for 30 mins",
"Drink water now",
"Try 1-hour digital detox",
"Walk outside for 15 minutes",
"Read a book for 20 mins",
"Practice meditation",
"Stretch your body",
"Sleep 30 minutes earlier",
"Disable unnecessary notifications",
"Do focus study session",
"Listen to calm music",
"Call a friend instead of texting",
"Write gratitude journal",
"Practice yoga",
"Take screen-free lunch break",
"Use night mode",
"Keep phone away while studying",
"Do mindfulness practice"
];

const challenges = [
"1-Hour No Phone Challenge",
"Focus Hour Challenge",
"Screen-Free Morning",
"Weekend Detox Challenge",
"30-Min Reading Challenge",
"Mindful Break Challenge",
"Hydration Challenge",
"Outdoor Walk Challenge"
];

function openDashboardInfo(type){

let title="";
let content="";

if(type==="screen"){

let today=random(2,9);
let week=random(18,45);

title="📱 Screen Time Statistics";

content=`
<h3>Today's Usage</h3>
<p>Device Usage Today: <b>${today} Hours</b></p>
<p>Weekly Average: <b>${week} Hours</b></p>
<p>Most Active Period: ${random(6,11)} PM</p>
<p>Unlock Count: ${random(35,120)} Times</p>
<p>Status: ${today<4?"Healthy Usage":"Needs Reduction"}</p>
`;
}

if(type==="wellness"){

let score=random(55,98);

title="💚 Wellness Score";

content=`
<h3>Current Wellness Score</h3>
<p><b>${score}%</b></p>
<p>Focus Level: ${random(70,95)}%</p>
<p>Stress Control: ${random(60,90)}%</p>
<p>Sleep Balance: ${random(65,95)}%</p>
<p>Status: ${score>80?"Excellent":"Needs Improvement"}</p>
`;
}

if(type==="progress"){

title="📊 Progress Report";

content=`
<h3>Overall Device Usage Improvement</h3>
<p>Last Week Usage: ${random(20,40)} hrs</p>
<p>This Week Usage: ${random(10,30)} hrs</p>
<p>Improvement: ${random(5,35)}%</p>
<p>Screen Reduction Success: Positive Trend</p>
<p>Productivity Growth: ${random(10,40)}%</p>
`;
}

if(type==="challenges"){

let completed = challenges
.sort(()=>0.5-Math.random())
.slice(0,4);

title="🏆 Challenges Completed";

content=`
<h3>Completed Challenges</h3>
<p>${completed.join("<br>")}</p>
`;
}

if(type==="recommendations"){

let recs = recommendationsList
.sort(()=>0.5-Math.random())
.slice(0,8);

title="✨ Personalized Recommendations";

content=`
<h3>New Random Suggestions</h3>
<p>${recs.join("<br>")}</p>
`;
}

document.getElementById("dashboardTitle").innerHTML=title;
document.getElementById("dashboardContent").innerHTML=content;
document.getElementById("dashboardDetails").style.display="block";

document.getElementById("dashboardDetails")
.scrollIntoView({behavior:"smooth"});
}

function closeDashboardInfo(){
document.getElementById("dashboardDetails").style.display="none";
}

let pomodoroTime = 1500;
let pomodoroInterval;
let isBreak = false;

function updatePomodoro(){
    let minutes = Math.floor(pomodoroTime / 60);
    let seconds = pomodoroTime % 60;

    document.getElementById("pomodoroTimer").innerText =
        `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}

function startPomodoro(){

    clearInterval(pomodoroInterval);

    pomodoroInterval = setInterval(() => {

        pomodoroTime--;

        updatePomodoro();

        if(pomodoroTime <= 0){

            clearInterval(pomodoroInterval);

            if(!isBreak){
                alert("Focus Session Complete! Take a 5 min break.");
                pomodoroTime = 300;
                document.getElementById("pomodoroStatus").innerText="Break Time";
                isBreak = true;
            }else{
                alert("Break Complete! Start Focus Session.");
                pomodoroTime = 1500;
                document.getElementById("pomodoroStatus").innerText="Focus Session";
                isBreak = false;
            }

            updatePomodoro();
        }

    },1000);
}

function pausePomodoro(){
    clearInterval(pomodoroInterval);
}

function resetPomodoro(){
    clearInterval(pomodoroInterval);
    pomodoroTime = 1500;
    isBreak = false;
    document.getElementById("pomodoroStatus").innerText="Focus Session";
    updatePomodoro();
}

updatePomodoro();

function togglePassword(inputId, icon){

    const input = document.getElementById(inputId);

    if(input.type === "password"){
        input.type = "text";
        icon.innerHTML = "🙈";
    }else{
        input.type = "password";
        icon.innerHTML = "👁️";
    }
}

function goToSection(sectionId){

    document.getElementById(sectionId).scrollIntoView({
        behavior:"smooth",
        block:"start"
    });

}

function saveFeedback(){

let name =
document
.getElementById("feedbackName")
.value;

let email =
document
.getElementById("feedbackEmail")
.value;

let text =
document
.getElementById("feedbackText")
.value;

if(
!name ||
!email ||
!text
){

alert(
"Fill all fields"
);

return;

}

let feedbacks =
JSON.parse(
localStorage
.getItem(
"feedbacks"
)
) || [];

feedbacks.push({

name,
email,
text,

date:
new Date()
.toLocaleString()

});

localStorage.setItem(

"feedbacks",

JSON.stringify(
feedbacks
)

);

alert(
"Feedback Saved"
);

showFeedback();

document
.getElementById(
"feedbackName"
).value="";

document
.getElementById(
"feedbackEmail"
).value="";

document
.getElementById(
"feedbackText"
).value="";

}

function showFeedback(){

let data =
JSON.parse(
localStorage
.getItem(
"feedbacks"
)
)||[];

let output="";

data.forEach(f=>{

output+=`

<div class="feedback-card">

<h3>${f.name}</h3>

<p>${f.email}</p>

<p>${f.text}</p>

<small>${f.date}</small>

</div>

`;

});

document
.getElementById(
"feedbackList"
).innerHTML
=
output;

}

showFeedback();

/* filepath: c:\Users\priya\OneDrive\Documents\digital-wellness-project\web\script.js */
function toggleMenu(){

    const menu = document.getElementById("sidebarMenu");
    const backdrop = document.getElementById("sidebarBackdrop");

    if(!menu || !backdrop){
        return;
    }

    const isOpen = document.body.classList.contains("menu-open");

    document.body.classList.toggle("menu-open", !isOpen);
    menu.classList.toggle("open", !isOpen);

    backdrop.style.display = !isOpen ? "block" : "none";
}

function closeMenu(){

    const menu = document.getElementById("sidebarMenu");
    const backdrop = document.getElementById("sidebarBackdrop");

    if(menu){
        menu.classList.remove("open");
    }

    document.body.classList.remove("menu-open");

    if(backdrop){
        backdrop.style.display = "none";
    }
}

function goToSection(sectionId) {

    const section = document.getElementById(sectionId) || document.querySelector(".timer-card");

    if (!section) {
        console.log("Section not found:", sectionId);
        return;
    }

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    closeMenu();
}


function openTopTab(sectionId) {

   const section = document.getElementById(sectionId) || document.querySelector(".timer-card");

    if (!section) {
        console.log("Top tab section not found:", sectionId);
        return;
    }

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    if (typeof closeMenu === "function") {
        closeMenu();
    }
}