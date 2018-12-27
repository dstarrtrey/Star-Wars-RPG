const DROIDS = {
    bb8: {
        name: "BB8 Astromech Droid",
        hp: 110,
        ap: 7,
        cap: 15,
        img: "assets/images/bb8.jpg",
        color: "blue"
    },
    c3po: {
        name: "C-3PO Protocol Droid",
        hp: 150,
        ap: 9,
        cap: 30,
        img: "assets/images/c3po.jpg",
        color: "blue"
    },
    r2d2: {
        name: "R2-D2 Astromech Droid",
        hp: 180,
        ap: 10,
        cap: 50,
        img: "assets/images/r2d2.jpg",
        color: "blue"
    },
    gonkDroid: {
        name: "GNK (Gonk) Power Droid",
        hp: 200,
        ap: 11,
        cap: 60,
        img: "assets/images/gonk_droid.jpg",
        color: "yellow"
    },
    mouseDroid: {
        name: "MSE-6 (Mouse) Repair Droid",
        hp: 98,
        ap: 6,
        cap: 10,
        img: "assets/images/mouse_droid.jpg",
        color: "red"
    },
    battleDroid: {
        name: "B1 Battle Droid",
        hp: 175,
        ap: 9,
        cap: 32,
        img: "assets/images/battle_droid.jpg",
        color: "red"
    },
    droideka: {
        name: "Droideka Battle Droid",
        hp: 190,
        ap: 11,
        cap: 55,
        img: "assets/images/droideka.jpg",
        color: "red"
    }
};
$(document).ready(function(){
    const droidArr = Object.keys(DROIDS);
    const enemyArr = Object.keys(DROIDS);
    let fighter;
    let defender;
    const newEnemy = (enemy) => {
        $(".enemy").off("click");
        enemyArr.splice(enemyArr.indexOf(droidArr[enemy.classList[0]]),1);
        $("#enemies-label").text(`Additional enemies Remaining: ${enemyArr.length}`);
        $("#attack-btn").removeClass("hidden");
        $("#defender").html(`<img class="grid-item ${DROIDS[droidArr[enemy.classList[0]]].color}-img" width="100%" src="${DROIDS[droidArr[enemy.classList[0]]].img}">`);
        $("#defender-names").html(`<div class="$name ${DROIDS[droidArr[enemy.classList[0]]].color}-caption">${DROIDS[droidArr[enemy.classList[0]]].name}</div>`);
        $("#defender-hp").html(`<div class="hp ${DROIDS[droidArr[enemy.classList[0]]].color}-caption" id="enemy-hp">${DROIDS[droidArr[enemy.classList[0]]].hp}</div>`);
        $("#defender-label").text(`Your current enemy is: ${DROIDS[droidArr[enemy.classList[0]]].name}`);
        $("#btn-instructions").text("Press the attack button to fight");
        $(`.${enemy.classList[0]}`).remove();
        console.log("enemyArr: ",enemyArr);
        console.log("droidArr: ",droidArr);
        defender = DROIDS[droidArr[enemy.classList[0]]];
        console.log("defender: ",defender);
        $("#attack-btn").on("click", function(){
            battle(fighter, defender);
        });
    };
    const newAttacker = (attacker) => {
        $("#enemies-label").text("Choose an enemy to fight");
        $("#attacker-label").text(`Your fighter is: ${DROIDS[droidArr[attacker.classList[0]]].name}`);
        $("#attacker").html(`<img class="grid-item ${DROIDS[droidArr[attacker.classList[0]]].color}-img" width="100%" src="${DROIDS[droidArr[attacker.classList[0]]].img}">`);
        $("#attacker-names").html(`<div class="name ${DROIDS[droidArr[attacker.classList[0]]].color}-caption">${DROIDS[droidArr[attacker.classList[0]]].name}</div>`);
        $("#attacker-hp").html(`<div class="hp ${DROIDS[droidArr[attacker.classList[0]]].color}-caption" id="my-hp">${DROIDS[droidArr[attacker.classList[0]]].hp}</div>`);
        for(let y = 0; y < droidArr.length; y++){
            if(y !=attacker.classList[0]){
                $("#enemies").append(`<img class="${y} enemy grid-item ${DROIDS[droidArr[y]].color}-img" width="100%" src="${DROIDS[droidArr[y]].img}">`);
                $("#enemies-names").append(`<div class="${y} enemy name ${DROIDS[droidArr[y]].color}-caption">${DROIDS[droidArr[y]].name}</div>`);
                $("#enemies-hp").append(`<div class="${y} enemy hp ${DROIDS[droidArr[y]].color}-caption">${DROIDS[droidArr[y]].hp}</div>`);
            }
        }
        fighter = DROIDS[droidArr[attacker.classList[0]]];
        enemyArr.splice(enemyArr.indexOf(droidArr[attacker.classList[0]]),1);
        console.log("fighter: ",fighter);
    };
    const reset = () => {
        $("#attacker-label").text("Choose your attacker");
        $("#enemies").empty();
        $("#enemies-label").empty();
        $("#defender-label").empty();
        $("#defender").empty();
        $("#attack-btn").addClass("hidden");
        for(let x = 0; x < droidArr.length; x++){
            $("#attacker").append(`<img class="${x} attacker grid-item ${DROIDS[droidArr[x]].color}-img" width="100%" src="${DROIDS[droidArr[x]].img}">`); 
            $("#attacker-names").append(`<div class="${x} attacker name ${DROIDS[droidArr[x]].color}-caption">${DROIDS[droidArr[x]].name}</div>`);
            $("#attacker-hp").append(`<div class="${x} attacker hp ${DROIDS[droidArr[x]].color}-caption">${DROIDS[droidArr[x]].hp}</div>`);            
        }
    };
    const battle = (atkObj, defObj) => {
        defObj.hp-=atkObj.ap;
        $("#enemy-hp").text(defObj.hp);
        if(defObj.hp > 0){
            atkObj.hp-=defObj.cap;
            if(atkObj.hp <= 0){
                $("#attack-btn").off("click");
                $("#btn-instructions").text("You have been defeated. Reload to play again. (try harder this time)")
                $("#btn-instructions").addClass("failure");
            }
            $("#my-hp").text(atkObj.hp);
            $("#damages").html(`<div>${defObj.name} dealt ${defObj.cap} to you.</div><div>You dealt ${atkObj.ap} damage to ${defObj.name}.`);
            atkObj.ap+=atkObj.ap;
        }else{
            $("#attack-btn").off("click");
            if(enemyArr.length>0){
                atkObj.ap+=atkObj.ap;
                $("#defender-label").text(`You defeated ${defObj.name}. Select a new enemy.`);
                $("#defender").append(`<img class="x" src="assets/images/big x.png">`);
                $(".enemy").on("click", function(){
                    newEnemy(this);
                });
            }else{
                $("#defender-label").text("");
                $("#defender").append(`<img class="x" src="assets/images/big x.png">`);
                $("#btn-instructions").text("Your droid has proven its mettle! You win! Reload to play again.");
                $("#btn-instructions").addClass("victory");
            }
        }        
    };
    const newGame = () => {
        reset();
        $(".attacker").on("click", function(){
            newAttacker(this);
            $(".enemy").on("click", function(){
                newEnemy(this);
            });
        });
    }
    newGame();
});