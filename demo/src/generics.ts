class Lijstje<T> {
  add(item: T) {}
}

let getallen = new Lijstje<number>();
getallen.add(42);
let tekstjes = new Lijstje<string>();
tekstjes.add("hoi");

class Generator<T> {
  constructor(
    private currentValue: T,
    private func: (current: T) => T,
  ) {}

  next() {
    this.currentValue = this.func(this.currentValue);
    console.log('curr val:', this.currentValue);
  }
}

let getallenGen = new Generator<number>(0, (x) => x + 2);
getallenGen.next();
getallenGen.next();
getallenGen.next();

let stringGen = new Generator<string>('', (x) => x + '.');
stringGen.next();
stringGen.next();
stringGen.next();

interface Meetbaar {
    length: number;
}

class LongestValue<T extends Meetbaar> {
    currentLongestValue: T;

    constructor(init: T) {
        this.currentLongestValue = init;
    }

    check(value: T) {
        if (value.length > this.currentLongestValue.length) {
            this.currentLongestValue = value;
        }
    }
}

let veelGetallen = new LongestValue<number[]>([]);
veelGetallen.check([1,2,3]);
veelGetallen.check([1]);
veelGetallen.check([1,2]);
veelGetallen.check([1,2,3,4,5,6,7,8]);
veelGetallen.check([1,2,3,4,5]);

console.log(veelGetallen.currentLongestValue);


let veelTekstjes = new LongestValue<string>('');
veelTekstjes.check('hoi');
veelTekstjes.check('doei');
veelTekstjes.check('later');
veelTekstjes.check('toedeledokie');
veelTekstjes.check('uuhh');
veelTekstjes.check('mazzel');

console.log(veelTekstjes.currentLongestValue);

// conditional type

function spyOn<T, P extends keyof T>(obj: T, methodName: T[P] extends Function ? P : never) {
    return obj[methodName];
}

let objjjjj = {
    doeIets() { return 12; },
    currentValue: 'hallo daar'
}
spyOn(objjjjj, 'doeIets');