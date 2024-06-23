function formatInput(input: string | number) {
  if (typeof input === "number") {
    return console.log("enabled");
  } else {
    return console.log("disabled");
  }
}
