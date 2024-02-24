const truthTableValueContainer = document.querySelector("textarea#truth-table-value");
const responseValueContainer = document.querySelector("div#response-value");

const setResponse = (value) => {
    responseValueContainer.innerHTML = "Target: "+value;
}

const getCleanData = (raw) => {
    let data = raw
        .split('\n')
        .map( line => line.split('\t') )
        .filter( line => line.length > 1 );
    let titles = data.shift();
    data = data.map( row => row.map(number => +number) );
    return {titles, data};
}

const resolve = (data, desc) => {
    const res = Array(data[0].length-1).fill(null)
    switch (desc) {
        case 'specific':
            data = data.filter( row => row.slice(-1)[0] === 1 );
        default:;
    }
    data.forEach((row, _, __) => {
        res.forEach( (_, id, arr2) => {
            res[id] = res[id] === null ? row[id] : res[id] === row[id] ? row[id] : '?'
        });
    } );
    return res;
}

const generateResultMessage = (result, titles) => {
    return  result.reduce( (a, v, i, arr) => {
        return  v === '?' ?  a+'' : a === '' ? a+titles[i] : " & "+a+titles[i]
    } , '');
}

truthTableValueContainer.addEventListener( 'input', (e) => {
    let isInputValid = true;
    if (!isInputValid) {
        console.error("Données non valides")
        //stop execution
        return;
    }
    const {titles, data} = getCleanData(e.currentTarget.value);
    const result = resolve(data, 'specific');
    const message = generateResultMessage(result, titles);
    setResponse(message);
});