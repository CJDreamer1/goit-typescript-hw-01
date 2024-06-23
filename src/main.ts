import "./style.css";

let isDone: boolean = false;

// простих 5 типів - boolean, string, number, undefined, null
const name: string = "Bob";
const lastName: string = "Johnson";
const age: number = 12;
const isHappy: boolean = true;
const budget: null = null;
const status: undefined = undefined;

// помилка, яку видає TS виглядатиме: Type "string" is not assignable     to     type "number"
//                                            ^^ тут він покаже який тип очікується     ^^ тут він покаже який ми вписали
// пишемо змінна: пишемо тип а далі дорівнює і пишемо дані
// ======================================================================================

//  ============================================== типізація об`єкта і типізація функції
type userProfile = {
  username: string;
  age: number;
  isActive: boolean;
};

const user = {
  username: "Bob",
  age: "12",
  isActive: true,
};

function displayUserProfile(user: userProfile) {
  return `User name is ${user.username} he is ${user.age} years old and he is ${user.isActive}`;
}
console.log(displayUserProfile(user));

function logName(name: string) {
  return `${name}`;
}
// =====================================================================================
//  ============================================== типізація масивів чисел =============
function calcTotal(arr: number[]) {
  return arr.reduce((acc, el) => acc + el, 0);
}

const numbersArray = [10, 20, 30, 40];
console.log(calcTotal(numbersArray));
//  ============================================== типізація масивів об`єктів ==========
type User = {
  name: string;
  age: number;
};

// або щоб не створювати тип можна написати цілий приклад в дужках handleusers:(arr: { name: string; age: number }[])
function handleUsers(arr: User[]) {
  const users = [
    { name: "Bob", age: 12 },
    { name: "Carl", age: 13 },
    { name: "Doyle", age: 14 },
  ];

  console.log(handleUsers(users));
}
// =============================================== типізація специфічних
// result: unknown використовуємо при роботі з безендом, коил відповіддю сервера може бути як об`єкт так і null, undefinef, false
function safelyParseJson(jsonString: string) {
  try {
    const result: unknown = JSON.parse(jsonString);
    if (typeof result === "object" && result !== null) {
      return result;
    }
  } catch (error) {
    console.error("Failed to pasre JSON:", error);
  }
  return null;
}
// =============================================== тип any ============
// тип any приймає всі типи даних (без різниці), буль, масив, об`єкт, рядок, число
// також цей тип може бути заглушкою, якщо треба швидко напистаи код, і неясно які типи прийматимуться. Потім звісно треба буде повернутись і змінити на точний тип
function logDetails(value: any) {
  console.log(`Value: ${value}, Type of value: ${typeof value}`);
}
// =============================================== тип ENUM
// він потрібен щоб зібрати значення в конкретний список (словник), який будемо перевикористовувати в коді надалі
enum VehicleType {
  Car = "Car",
  Truck = "Truck",
  Motorcycle = "Motorcycle",
}

function getVehicleType(vehicle: VehicleType) {
  return `The vehicle type is ${vehicle}`;
}
console.log(getVehicleType(VehicleType.Car));
console.log(getVehicleType(VehicleType.Motorcycle));
// =============================================== тип Union Types
// одне значення може мати кілька типів (наприклад якщо це props в React)
function formatInput(input: string | number) {
  if (typeof input === "number") {
    return input.toFixed(2); //ця штука округляє до 2-х знаків після коми
  } else {
    return input.toUpperCase(); //ця штука наппише все капсом
  }
}

// =============================================== тип Literal
// перевіряє не тільки тип, але і значення типу(тобто не тільки тип але і конкретно написати які саме значення прийматимуться)
function lightShower(color: "green" | "yellow" | "red") {
  if (color === "green") {
    console.log("go");
  } else if (color === "yellow") {
    console.log("ready");
  } else if (color === "red") {
    console.log("stop");
  }
}
lightShower("black");
// наприклад якщо викличемо функцію із значенням black як тут у нас - її підкреслить як помилку

// ============================================= типізація повернення (return)
// між ): string { -означає що return в результаті поверне рядок.
// використовується в axios для типізатії повернення результатів з бекенду(якщо не типізувати return то TS покаже помилку)
function logName(name: string): string {
  return `${name}`;
}
// є також функції, які нічого не опвертають (addEventListener, onClick тд)
// тут замість :string пишемо :void бо функція нічого не повертає (тільки виводить console.log() без return)
// найчастіше використовуєтья при типізації Пропсів в React
function logName(name: string): void {
  console.log(`${name}`);
}

// =========================================== типізація never ===============
// використовуєтья для типізації return. Коли функція повертає помилку (catch)
function errorHandler(message: string): never {
  throw new Error(message);
}

// =========================================== типізація інтерфейсу =========
//це інтерфейс. різниця між ним і звичайним тайп об`єктом в тому, що інтерфейсом МОЖНА типізувати класи
interface User {
  name: string;
  age: number;
  lastName?: string; // приклад опціонального ключа (не обов`язкове значення або метод в класі) для типізації пропсів в React
  sayHello(): string; // string тому, що повертає return
  sayBye(): void; // void тому, що не овертає return (а повертає console.log)
  showAge(userAge: number): string; // string бо повертає шаблонний рядок
}
// це звичайний тайп об`єкт. І ним НЕ МОЖНА типізувати класи
type User = {
  name: string;
  age: number;
  lastName?: string; // приклад опціонального ключа (не обов`язкове значення або метод в класі) для типізації пропсів в React
};
// ========================================== типізація методів в об`єкті
const user = {
  name: "Bob",
  age: 12,
  sayHello() {
    return "Hello";
  },
  saayBye() {
    console.log("Bye");
  },
  showAge(userAge: number) {
    return `My age is${userAge}`;
  },
};

//можна типізувати цілий об`єкт :User , а не окремо те, що прийме функція showAge(userAge: number)
const student: User = {
  name: "Bob",
  age: 12,
  sayHello() {
    return "Hello";
  },
  saayBye() {
    console.log("Bye");
  },
  showAge(userAge) {
    //userAge підкреслюється тут бо на 149 стрічці type User перебиває типи
    return `My age is${userAge}`;
  },
};

// =================================================================================================
// ========================================== Generics =============================================
let name = "bob"; // неявна типізація (не використовується)
let name: string = "bob"; // явна типізація (цим будемо користуватися)
