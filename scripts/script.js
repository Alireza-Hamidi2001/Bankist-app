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

welcomeEl.innerHTML = `
            <svg class="icon__bubble">
                <use xlink:href="./SVGs/sprite.svg#icon-bubbles2"></use>
            </svg>
            <p class='welcome__animation'>Hey there . Welcome to bankist project , log in first .</p>`;

balance__money.textContent = "2,555.00 $";
summary_LOGOUT.textContent = "00:00";

const displayMovements = function (movements, dates) {
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

    // -Note- calc the IN & OUT summary
    const positive__movements = movements
        .filter((posMov) => posMov > 0)
        .reduce((acc, cur) => acc + cur, 0);
    const negative__movements = movements
        .filter((posMov) => posMov < 0)
        .reduce((acc, cur) => acc + cur, 0);
    summary_IN.textContent = positive__movements;
    summary_OUT.textContent = Math.abs(negative__movements);
    summary_INTEREST.textContent = positive__movements + negative__movements;
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

/////////////////////////////////////// -SECTION-
// HANDLE LOGIN
const login = (username, pin) => {
    const selectedAccount = accounts.find(
        (curAccount) => curAccount.userName === username,
    );
    console.log(selectedAccount.id);

    if (selectedAccount?.pin === pin) {
        // نمایش موومنت‌ها بعد از لاگین موفق
        // -Note- SHOWING THE UI
        displayMovements(selectedAccount.movements, selectedAccount.date);

        welcomeEl.innerHTML = `
        <svg class="icon__bubble">
        <use xlink:href="./SVGs/sprite.svg#icon-bubbles2"></use>
        </svg>
        <p>Welcome back, ${selectedAccount.owner.split(" ")[0]} .</p>`;

        app__container.classList.add("show");
    } else {
        welcomeEl.innerHTML = `
        <svg class="icon__bubble">
        <use xlink:href="./SVGs/sprite.svg#icon-bubbles2"></use>
        </svg>
        <p>Username or Password is invalid .</p>`;
    }
};

form__btn.addEventListener("click", (e) => {
    e.preventDefault();
    const username__value = form__username.value;
    const pin__value = Number(form__pin.value);
    // guard class
    if (!username__value || !pin__value) {
        form__username.classList.add("warning");
        form__pin.classList.add("warning");

        setTimeout(() => {
            form__username.classList.remove("warning");
            form__pin.classList.remove("warning");
        }, 2000);

        // return;
    } else {
        login(username__value, pin__value);
    }
});
