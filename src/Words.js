export const generateNumber = (digit) => {
    var arr = [];
    while(arr.length < digit){
        var r = Math.floor(Math.random() * 9);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr.join("");
};
