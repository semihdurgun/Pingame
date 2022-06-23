export const generateNumber = (digit) => {
    var arr = [];
    while(arr.length < digit){
        var r = Math.floor(Math.random() * 9);
        if(arr[0] === undefined && r === 0) continue;
        else if((arr.indexOf(r) === -1)) arr.push(r);
    }
    return arr.join("");
};
