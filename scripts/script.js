// Data
import { account1, account2, account3, account4 } from "./accounts.js";

const accounts = [account1, account2, account3, account4]; // [ { } , { }  , { }  ,{ } ]

// // // // // ELEMENTS // // // // //
const form__username = document.querySelector(".header__input--user");
const form__pin = document.querySelector(".header__input--pin");
const form__btn = document.querySelector(".header__login");

const welcomeEl = document.querySelector(".welcome");
const balance__money = document.querySelector(".app__money");

const app__container = document.querySelector(".app__container");
// TRANSFER
const transfer__to = document.querySelector(".transfer__input-to");
const transfer__amount = document.querySelector(".transfer__input-amount");
const transfer__btn = document.querySelector(".transfer__btn");
// LOAN
const loan__to = document.querySelector(".loan__input-to");
const loan__btn = document.querySelector(".loan__btn");
// CLOSE
const close__user = document.querySelector(".close__input-user");
const close__pin = document.querySelector(".close__input-pin");
const close__btn = document.querySelector(".close__btn");
// SUMMARY
const summary_IN = document.querySelector(".summary__span-in");
const summary_OUT = document.querySelector(".summary__span-out");
const summary_INTEREST = document.querySelector(".summary__span-interest");
const summary_SORT = document.querySelector(".summary__sort");
const summary_LOGOUT = document.querySelector(".summary__span-time");
// BOX
const movements__box = document.querySelector(".one");

// MODDAL
let overlayEl = document.querySelector(".overlay");
let modalEl = document.querySelector(".modal");

// // // // // MODAL__section
const MODAL__handler = function () {
    overlayEl.style.display = "block";
    modalEl.style.display = "block";
    setTimeout(() => {
        overlayEl.style.display = "none";
        modalEl.style.display = "none";
        modalEl.classList.remove("greenBg");
        modalEl.classList.remove("redBg");
    }, 4000);
};
welcomeEl.innerHTML = `
    <div>
        <svg class="icon__bubble">
        <use xlink:href="./SVGs/sprite.svg#icon-bubbles2"></use>
        </svg>
        <div class="welcome__animation">
        Hey there. Welcome to bankist project, log in first.
        </div>
    </div>
    <div class="guides">
        <p class="guide">user: js , pin: 1111</p>
        <p class="guide">user: ah , pin: 2222</p>
        <p class="guide">user: fh , pin: 3333</p>
        <p class="guide">user: ss , pin: 4444</p>
    </div>
`;
summary_LOGOUT.textContent = "00:00";

// // // //  WELCOME__section
const welcome_SECTION = function (selectedAccount) {
    welcomeEl.innerHTML = `
        <svg class="icon__bubble">
        <use xlink:href="./SVGs/sprite.svg#icon-bubbles2"></use>
        </svg>
        <p>Welcome back, ${selectedAccount.owner.split(" ")[0]} .</p>`;

    app__container.classList.add("show");
    console.log(selectedAccount.id);
};

// // // // ERROR__section
const error_SECTION = function () {
    welcomeEl.innerHTML = `
        <svg class="icon__bubble">
        <use xlink:href="./SVGs/sprite.svg#icon-bubbles2"></use>
        </svg>
        <p>Username or Password is invalid .</p>`;
};

const summary__SECTION = function (movements) {
    const positive__movements = movements
        .filter((posMov) => posMov > 0)
        .reduce((acc, cur) => acc + cur, 0);
    const negative__movements = movements
        .filter((posMov) => posMov < 0)
        .reduce((acc, cur) => acc + cur, 0);
    summary_IN.textContent = positive__movements;
    summary_OUT.textContent = Math.abs(negative__movements);
    const balance_VALUE = positive__movements + negative__movements;
    balance__money.textContent = balance_VALUE + " $";
};

// // // //  DISPALY__MOVEMENTS__section
const display_Movements = function (movements, dates) {
    movements.map(function (mov, index) {
        const status = mov < 0;
        const HTMLmovement = `  
        <div class="box__cashMovement">
            <div class="box__status ${
                status ? "box__status-withdraw" : "box__status-deposite"
            } ">${status ? "Withdraw" : "Deposite"}</div>
            <div class="box__date">${dates[index]}</div>
            <div class="box__amount">${mov} $</div>
        </div>`;
        movements__box.innerHTML += HTMLmovement;
    });

    // SECTION__SUMMARY
    summary__SECTION(movements);
};
// displayMovements(account1.movements, account1.date);

accounts.map(
    (account) =>
        (account.userName = account.owner
            .toLocaleLowerCase()
            .split(" ")
            .map((word) => word[0])
            .join("")),
);

//////////////// -SECTION-
// // // // // // SECTION LOGIN
const login_SECTION = (username, pin) => {
    const selectedAccount = accounts.find(
        (curAccount) => curAccount.userName === username,
    );

    if (selectedAccount?.pin === pin) {
        // 01- show WELCOME
        welcome_SECTION(selectedAccount);
        // 02- show MOVEMENTS
        display_Movements(selectedAccount.movements, selectedAccount.date);
    } else {
        // 01- ERROR section
        error_SECTION();
    }
};

form__btn.addEventListener("click", (e) => {
    e.preventDefault();
    let username__value = form__username.value;
    let pin__value = Number(form__pin.value);
    // GUARD__class
    if (!username__value || !pin__value) {
        form__username.classList.add("warning");
        form__pin.classList.add("warning");

        setTimeout(() => {
            form__username.classList.remove("warning");
            form__pin.classList.remove("warning");
        }, 2000);

        // return;
    } else {
        login_SECTION(username__value, pin__value);
        form__username.value = "";
        form__pin.value = "";
    }
});

// // // // // // // // -SECTION-
// // // TRANSFER__section
transfer__btn.addEventListener("click", (e) => {
    e.preventDefault();
    const balance__cur__acc = Number(balance__money.textContent.split(" ")[0]);
    const transfer__value = Number(transfer__amount.value);
    const transfer__receiver = accounts.find(
        (account) =>
            account.owner.split(" ")[0].toLocaleLowerCase() ===
            transfer__to.value,
    );
    // // // GUARD__class
    if (!transfer__value || !transfer__receiver) {
        transfer__amount.classList.add("warning");
        transfer__to.classList.add("warning");
        setTimeout(() => {
            transfer__amount.classList.remove("warning");
            transfer__to.classList.remove("warning");
        }, 2000);
    } else if (transfer__receiver && balance__cur__acc >= transfer__value) {
        modalEl.innerHTML = `
        <p class="showModal">
        &#10003; Transferred value ${transfer__value} to ${transfer__receiver.owner.split(" ")[0]}
        </p>`;
        MODAL__handler();
        modalEl.classList.add("greenBg");
    } else if (!transfer__receiver || balance__cur__acc < transfer__value) {
        modalEl.innerHTML = `
        <p class="showModal">
        &#10007; Wrong the Receiver name or Value .
        </p>`;
        MODAL__handler();
        modalEl.classList.add("redBg");
    }
    transfer__amount.value = "";
    transfer__to.value = "";
});

// console.log(transfer__value, transfer__receiver);
// console.log(transfer__receiver.owner.split(" ")[0]);
