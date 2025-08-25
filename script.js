// Data
const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: "Alireza Hamidi",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: "Farimah Hamidi",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4]; // [ { } , { }  , { }  ,{ } ]

// // // // // ELEMENTS // // // // //
const form__username = document.querySelector(".header__input--user");
const form__pin = document.querySelector(".header__input--pin");
const form__btn = document.querySelector(".header__login");

const welcomeEl = document.querySelector(".welcome");
const balance__money = document.querySelector(".app__money");
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

balance__money.textContent = "2 555.00 $";
summary_IN.textContent = "0000";
summary_OUT.textContent = "1111";
summary_INTEREST.textContent = "2222";
summary_LOGOUT.textContent = "00:00";

const displayMovements = function (movements) {
    movements.map(function (mov, i) {
        const status = mov < 0;
        const HTMLmovement = `
        <div class="box__cashMovement">
            <div class="box__status ${
                status ? "box__status-withdraw" : "box__status-deposite"
            } ">${status ? "Withdraw" : "Deposite"}</div>
            <div class="box__date">13/03/2020</div>
            <div class="box__amount">${mov} $</div>
        </div>`;
        movements__box.innerHTML += HTMLmovement;
    });
};
displayMovements(account1.movements);

accounts.map(
    (account) =>
        (account.userName = account.owner
            .toLocaleLowerCase()
            .split(" ")
            .map((word) => word[0])
            .join("")),
);
// console.log(accounts);

// HANDLE LOGIN
const login = (username, pin) => {
    const selectedAccount = accounts.find(
        (curAccount) => curAccount.userName === username,
    );

    selectedAccount?.pin === pin
        ? (welcomeEl.innerHTML = `<svg class="icon__bubble">
                <use xlink:href="./SVGs/sprite.svg#icon-bubbles2"></use>
            </svg>
            <p>Welcome back, ${selectedAccount.owner.split(" ")[0]} .</p>`)
        : (welcomeEl.innerHTML = `<svg class="icon__bubble">
                <use xlink:href="./SVGs/sprite.svg#icon-bubbles2"></use>
            </svg>
            <p>Username or Password is invalid .</p>`);
};

form__btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click");
    const username__value = form__username.value;
    const pin__value = Number(form__pin.value);
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
