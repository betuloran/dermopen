export default function makeUnique(array: any[],num?:number) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (array[i] === array[j] && i !== j) {
                if(num)
                    array[i] = Math.floor(Math.random()*num);
                else
                array[i] = Math.floor(Math.random() * 15);
            }
        }
    }

    return array;
}