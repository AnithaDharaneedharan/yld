class Lazy {
  constructor() {
    this.memory = [];
  }

  add(fn, ...arg) {
    const obj = {
      func: fn,
      param: arg,
    };
    this.memory.push(obj);
    return this;
  }

  evaluate(arg) {
    const finalArray = [];

    for (let i = 0; i < arg.length; i++) {
      let prevArg = arg[i];
      for (let j = 0; j < this.memory.length; j++) {
        const paramValue1 = this.memory[j].param;
        const arg1 = this.memory[j].func(...paramValue1, prevArg);
        prevArg = arg1;
      }
      finalArray.push(prevArg);
    }

    return finalArray;
  }
}

const lazy = new Lazy();
lazy.add(function timesTwo(a) {
  return a * 2;
});
lazy.add((a, b, c) => a + b + c, 1, 1);
lazy.add((a, b) => a + b, 0.5);

const res = lazy.evaluate([5, 10, 20, 40]);
console.log(res);

// 1. a = 1 , b = 2  add = 3
// 2. a = 1,  b = 10 add = 11
// [3, 11]

//// lazy.add((x) => console.log(x), "hello")
//lazy.add(() => console.log("bye"), 7)
