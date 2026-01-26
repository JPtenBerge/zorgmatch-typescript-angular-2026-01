

let x: number = 42;
let y: string = 'hoi';


let z: any = 'hoi'; // doe maar zoals JavaScript - "you are on your own"

let wow: unknown = 'qwerty';


function bla(n: unknown) {

    // n.toString();

    if (typeof n !== 'string') {
        throw new Error('qq');
    }


    console.log(n);
    dezeDan(+n);

}

function dezeDan(n: number) {
    bla(n);
}

bla(z);
z.toString();


let dinges1: string = undefined;
let dinges2: number = null;
let dinges3: bigint = undefined;
let dinges4: boolean = null;

function doeIets(ding: string | number) {
    
    ding.toString();

    if (typeof ding === 'bigint') {
        console.log(ding.toString());
    }
}


// number
// bigint
// boolean
// string
// string[]
// object
// undefined
// null
// any
// unknown


// [TestMethod] attribuut
// @Test annotations
// @Component() decorator
