export const boardDefault = [
    [
        "",
        "",
        "",
        "",
        ""
    ],
    [
        "",
        "",
        "",
        "",
        ""
    ],
    [
        "",
        "",
        "",
        "",
        ""
    ],
    [
        "",
        "",
        "",
        "",
        ""
    ],
    [
        "",
        "",
        "",
        "",
        ""
    ],
    [
        "",
        "",
        "",
        "",
        ""
    ],
];
export const hintDefault = [
    "",
    "",
    "",
    "",
    "",
    "",
]
export const generateNumber = (digit) => {
    var number = Math.floor(Math.random() * 9 * 10 ** digit) + 10 ** digit;
    console.log(number);
    return number;
};
