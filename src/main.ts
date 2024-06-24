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

// ==============================================================================================================================================
let name = "bob"; // неявна типізація (не використовується)
let name: string = "bob"; // явна типізація (цим будемо користуватися)

// ======================================== типізація об`єктів (індексовані значення зміна індексованого списку) =============================================
// квадратні дужки потроібні щоб позначити що працюємо із ключами об`єкта (можн key, модна props можна як хоч)
interface List {
  [key: string]: number | null;
}

type Fruits = {
  apples: number;
  banana: number;
  oranges: number;
};

const fruits: List = {
  apples: 10,
  banana: 15,
  oranges: 25,
  pineapple: 10,
  peach: null,
};
const electronisc: List = {
  phones: 20,
  tablets: 10,
  monitors: 23,
};
// ========================================== Generics ==========================================================================================
// generic динамічно підставляє типи під час того як функція використовується
// записуватись буде в <T>

function getFirstElement<T>(array: T[]): T | undefined {
  return array[0];
}
const numberArray = [10, 20, 30];
const stringArray = ["hello", "world", "typescript"];
const objectArray = [{ name: "Alice" }, { name: "Bob" }];

console.log(getFirstElement(numberArray));
console.log(getFirstElement(stringArray));
console.log(getFirstElement(objectArray));

// ===================================== Об`єкт з динамічними ключами (generic для об`єктів) =============================================
// букви можуть бути різними, але ми використовуємо T(type) i K(key)
// "K extends keyof T" перевіряє чи належить значення К  до ключа Т (можна писати не тільки одну букву Т чи К, а можна і слово)

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = {
  name: "John",
  age: 30,
  occupation: "Engineer",
};

const name = getProperty(person, "name"); //John
const age = getProperty(person, "age"); //30
const gender = getProperty(person, "gender"); //undefined бо ключа "gender" немає

// =================================== інструменти generic ====================================================================================
// оновлення даних користувача
interface UserProfile {
  username: string;
  email: string;
  age: number;
}

const originalProfile: UserProfile = {
  username: "johndoe",
  email: "john.doe@example.com",
  age: 28,
};

// наприклад така функція оновлюватиме профіль ашого користувача:
function updateUserProfile(
  profile: UserProfile, // тут ми приймаємо об`єкт такої структури як UserProfile
  updates: Partial<UserProfile> // цей об`єкт містить ключі зі списку UserProfile, але ми не знаємо які саме і в якому порядку (не може містити ключі, яких немає в UserProfile) тобто їх поряжок і кількість не важливий, але всі вопни повинні бути з інтерфейсу UserProfile
) {
  return { ...profile, ...updates };
}

const updatedProfile = updateProfile(originalProfile, {
  email: "new.john.doe@example.com",
  age: 29,
});

// ============================================== інструкція Readonly ==========================================================================================s
// за допомогою методу Readonly можна захищати дані від зміни, модемо читати але не можемо перезаписати.
interface User {
  id: number;
  name: string;
}

const user1: Readonly<User> = {
  id: 100,
  name: "bob",
};

user1.id = 201; // Буде помилка, бо змінити значення ключа не можна
user1.name = "John"; // Буде помилка, бо змінити значення ключа не можна

// ============================================= Інструмент Pick ==========================================================================================
// він потрібен щоб не засмічувати додатковими інтерфейсами, якщо треба тільки декілька ключів з вже існуючого інтерфейсу
interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  hireDate: Date; // це вбудований тип в Type Script він створений спеціально для дати
}

const fullEmployeeInfo: Employee = {
  id: 101,
  name: "John Doe",
  email: "john.doe@example.com",
  department: "Engineering",
  hireDate: new Date("2020-01-10"),
};

function displayInfo(
  fullEmployeeInfo: Employee
): Pick<Employee, "name" | "email"> {
  // через метод Pick підключаємо інтерфейс Employee і вказуємо які поля з нього ми очікуємо він перевірить наш return (можна не тільки для return, просто в даному прикладі так)
  return {
    name: fullEmployeeInfo.name,
    email: fullEmployeeInfo.email,
  };
}

// ============================================= метод Omit ==========================================================================================
// метод commit видаляє частинку інтерфейса
const fullEmployeeInfo: Employee = {
  id: 101,
  name: "John Doe",
  email: "john.doe@example.com",
  department: "Engineering",
  hireDate: new Date("2020-01-10"),
};
// будеом повертати такий же самий об`єкт як і наш основний(fullEmployeeInfo), але без одного поля
function displayInfo(fullEmployeeInfo: Employee): Omit<Employee, "hireDate"> {
  // тут так само як і в методі Pick (тільки тепер Omit) ми вказуємо спочатку тип нашого об`єкту Employee, а потім другим значенням вказуємо який ключ приховаємо
  return {
    name: fullEmployeeInfo.name,
    email: fullEmployeeInfo.email,
    department: fullEmployeeInfo.department,
    id: fullEmployeeInfo.id,
  };
}

// ============================================= метод Record ==========================================================================================
function recordTemperatures(temps: number[]): Record<string, number> {
  //тут після вказання метод ми очікуємо об`єкт, в якому першим значенням буде string, а другим number
  let temperatureRecord: Record<string, number> = {};

  // interface List {
  // [key: string]: number | null;
  // }
  // під капотом працює як типізація об`єктів вище (тілкьи ця штука багаторазова, а Record застосується лише раз і тип новий не створить)

  temps.forEach((temp, index) => {
    temperatureRecord[`day${index + 1}`] - temp;
  });
  return temperatureRecord;
}

const weeklyTemps = [22, 24, 23, 25, 24, 26, 27];
const tempRecord = recordTemperatures(weeklyTemps);
console.log(tempRecord);

[{ day1: 22 }, { day2: 24 }];
// =========================================================================================

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  hireDate: Date;
}
// створюємо новий інтерфейс, який буде мати всі значення крім дати найму hireDate
type employeeBasicInfo = Omit<Employee, "hireDate">;
