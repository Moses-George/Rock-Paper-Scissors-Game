const btns = document.querySelectorAll(".btn");
const close = document.querySelector(".close");
const showRules = document.querySelector(".rules");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".rules-modal");
const resultContainer = document.querySelector(".picked"); 
const result = document.querySelector(".result");
const game = document.querySelector(".rps");
const player = document.querySelector(".player-img");
const playerGradient = document.querySelector(".player-picked__item");
const computer = document.querySelector(".computer-img");
const computerGradient = document.querySelector(".computer-picked__item");
const playAgain = document.querySelector(".play");
const score = document.querySelector(".my-score");
const outcome = document.querySelector(".outcome");

const playerWins1 = document.querySelector(".player-wins-1");
const playerWins2 = document.querySelector(".player-wins-2");
const computerWins1 = document.querySelector(".computer-wins-1");
const computerWins2 = document.querySelector(".computer-wins-2");
const growing = document.querySelectorAll(".grow");


const closeModal = () => {
    backdrop.style.visibility = "hidden";
    modal.classList.remove("slide-down");
};

showRules.addEventListener('click', () => {
    backdrop.style.visibility = "visible";
    modal.classList.add("slide-down");
});

close.addEventListener('click', () => {
    closeModal();
});

backdrop.addEventListener('click', () => {
    closeModal();
});

const highlightScore = () => {
    score.classList.add("bump");
    setTimeout(() => {
        score.classList.remove("bump");
    }, 300);
};

let btnClicked = "", computerPlayedItem = "";

btns.forEach(btn => {

    btn.addEventListener('click', (e) => {
        console.log(btn.dataset.item)

        const myScore = score.textContent;
        let currentScore = Number(myScore);

        const items = ["rock", "paper", "scissors", "lizard", "spock"];

        computerPlayedItem = items[Math.floor(Math.random() * 5)];

        btnClicked = btn.dataset.item;

        const timer = setInterval(() => {
            computer.setAttribute("src", "./images/icon-" + items[Math.floor(Math.random() * 5)] + ".svg");
            computerGradient.classList.add(items[Math.floor(Math.random() * 5)]);
            computerGradient.classList.remove(items[Math.floor(Math.random() * 5)]);
            computer.style.transform = "rotate(360deg)"
        }, 50);

        game.style.display = "none";
        resultContainer.style.display = "grid";
        playAgain.disabled = true;

        player.setAttribute("src", "./images/icon-" + btnClicked + ".svg");
        playerGradient.classList.add(btnClicked);

        setTimeout(() => {

            clearInterval(timer);

            playAgain.disabled = false;

            items.forEach(a=> {
                if (computerGradient.classList.contains(a)) {
                    computerGradient.classList.remove(a);
                }
            });

            computer.setAttribute("src", "./images/icon-" + computerPlayedItem + ".svg");
            computerGradient.classList.add(computerPlayedItem);

            if (btnClicked === computerPlayedItem) {
                result.innerHTML = "YOU TIED";
            }
            else if (btnClicked === "scissors" && computerPlayedItem === "paper" ||
                btnClicked === "paper" && computerPlayedItem === "rock" ||
                btnClicked === "rock" && computerPlayedItem === "lizard" ||
                btnClicked === "lizard" && computerPlayedItem === "spock" ||
                btnClicked === "spock" && computerPlayedItem === "scissors" ||
                btnClicked === "scissors" && computerPlayedItem === "lizard" ||
                btnClicked === "paper" && computerPlayedItem === "spock" ||
                btnClicked === "rock" && computerPlayedItem === "scissors" ||
                btnClicked === "lizard" && computerPlayedItem === "paper" ||
                btnClicked === "spock" && computerPlayedItem === "rock") {

                result.innerHTML = "YOU WIN";
                currentScore += 1;
                score.textContent = currentScore;
                highlightScore();
                playerWins1.classList.add("circle-1");
                playerWins2.classList.add("circle-2");
            }
            else {
                result.innerHTML = "YOU LOSE";
                result.classList.add("failed");
                computerGradient.scrollIntoView({behavior: 'smooth'});
                computerWins1.classList.add("circle-1");
                computerWins2.classList.add("circle-2");
                if (myScore === "0") {
                    score.textContent = 0;
                } else {
                    currentScore -= 1;
                    score.textContent = currentScore;
                    highlightScore();
                }
            }
        }, 2000)

    });
});

playAgain.addEventListener('click', () => {
    
    game.style.display = "grid";
    resultContainer.style.display = "none";

    playerGradient.classList.remove(btnClicked);
    computerGradient.classList.remove(computerPlayedItem);

    result.classList.remove("failed");
    result.innerHTML = "";

    growing.forEach(clas=> {
        if (clas.classList.contains("circle-1")) {
            clas.classList.remove("circle-1");
        }
        if (clas.classList.contains("circle-2")) {
            clas.classList.remove("circle-2");
        }
    });

});