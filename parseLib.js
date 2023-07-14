function env() {
    let conversion = new Map();
    let powers = new Map();

    let special = "1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,10,20,30,40,50,60,70,80,90".split(',');
    let special_str = "one,two,three,four,five,six,seven,eight,nine,eleven,twelve,thirteen,fourteen,fifteen,sixteen,seventeen,eighteen,nineteen,ten,twenty,thirty,forty,fifty,sixty,seventy,eighty,ninety".split(',');
    let power_names = " , thousand , million , billion , trillion , quadrillion , quintillion , sextillion , septillion , octillion , nonillion ".split(',');
    special.forEach((number, idx) => {
        conversion.set(number, special_str[idx]);
    })
    power_names.forEach((name, idx) => {
        powers.set(idx, name);
    })
    return {
        conversion,
        powers
    };
}

function num2string(number, env) {
    if ((/^00+$/.test(number)) || number === "") {
        return "";
    }

    number = number.replace(/^0+/, "");
    let power = Math.floor((number.length - 1) / 3);
    let extra = (number.length - 1) % 3;

    if (extra == 0) {
        return env.conversion.get(number[0]) + env.powers.get(power) + num2string(number.slice(1), env);
    } else if (extra == 1) {
        let head;
        if ((number[0] == 1) || ((number[1] == 0))) {
            head = env.conversion.get(number.slice(0, 2));
        } else {
            head = env.conversion.get(number[0] + "0") + "-" + env.conversion.get(number[1]);
        }
        return head + env.powers.get(power) + num2string(number.slice(2), env);
    } else if (extra == 2) {
        return env.conversion.get(number[0]) + " hundred " + num2string(number.slice(1, 3), env) + env.powers.get(power) + num2string(number.slice(3), env);
    }
}

export function parse(number) {
    let Env = env();
    return num2string(number, Env).trim();
}