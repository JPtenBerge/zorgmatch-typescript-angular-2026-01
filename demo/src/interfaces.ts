

// C# / TypeScript

// interfaces beschrijven de vorm van een object.

interface Config {
    baseUrl: string;
}

interface MijnObj {
    x: number;
    y?: string;
}

let obj: MijnObj = {
    x: 24,
    // y: 'qqq'
};


interface A { getal: number; dinges?: string; }
interface B { getal: number; }
interface C { getal: number; dinges?: string; }

let aofb: A | B = { getal: 38 };

let bofa: B = { getal: 42 };

aofb = bofa;
bofa = aofb;



function doeIetsSpannends(hiephoi: A | B) {
    if (isHetEenA(hiephoi)) {
        hiephoi // A
    }
    else {
        hiephoi // B
    }
}

// type guard
function isHetEenA(obj: A | B): obj is A {
    return 'dinges' in obj;
}
function isHetEenC(obj: A | B): obj is C {
    return 'dinges' in obj;
}



// this.http.get<Product[]>('api/products').pipe(x => assertProducts(x)).subscribe()


abstract class Bestand {
    path: string = '';
    size: number = 0;
}

interface BestandOfDirectory extends Bestand {
    folderName: string;
}

let file: BestandOfDirectory = {
    folderName: 'qqq',
    path: 'qqq',
    size: 2
};



// export class HomeCOmponent {

//     ngOnInit() {

//     }
// }