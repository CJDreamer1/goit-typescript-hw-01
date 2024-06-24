type Status = "open" | "close";

interface Details {
  createAt: Date;
  updateAt: Date;
}

interface page {
  title: string;
  likes: number;
  accounts: string[];
  status: Status;
  details?: Details;
}

const page1: page = {
  title: "The awesome page",
  likes: 100,
  accounts: ["Max", "Anton", "Nikita"],
  status: "open",
  details: {
    createAt: new Date("2021-01-01"),
    updateAt: new Date("2021-05-01"),
  },
};

const page2: page = {
  title: "Python or Js",
  likes: 5,
  accounts: ["Alex"],
  status: "close",
};
