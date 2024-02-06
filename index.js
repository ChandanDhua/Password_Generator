const inputSlider = document.querySelector('[data-lengthSlider]');
const lengthDisplay = document.querySelector('[data-lengthNumber');
const passwordDispaly = document.querySelector('[data-passwordDisplay]');
const copyBtn = document.querySelector('[data-copy]');
const copyMsg = document.querySelector('[data-copy-message]');
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercase');
const numberCheck = document.querySelector('#number');
const symbolCheck = document.querySelector('#symbol');
const indicator = document.querySelector('[data-indicator]');
const generateBtn = document.querySelector('.generateBtn');
const allcheckbox = document.querySelectorAll('input[type=checkbox]');


let password = "";
let passwordLen = 10;
let checkCount = 0;


handleSlider();

// set password length
function handleSlider() {
    inputSlider.value = passwordLen;
    lengthDisplay.innerText = passwordLen;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLen-min)*100/(max-min)) + "% 100%"
}

setIndicator('#ccc');
function setIndicator(color)
{
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRandomInt(min,max)
{
    return Math.floor(Math.random()* (max-min)) + min;
}

function generateRandomNumber(){
    return getRandomInt(0,9);
}

function generateRandomLowercase(){
    return String.fromCharCode(getRandomInt(97,123));
}

function generateRandomUppercase(){
    return String.fromCharCode(getRandomInt(65,91));
}

function generateSymbol(){
    let symbol = "~`!@#$%^&*()_-+=][}{|:;'<,>.?/";
    let index = generateRandomNumber(0,symbol.length);
    return symbol[index];
}

function calStrenght()
{
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLen >=8)
    {
        setIndicator('#0f0');
    }
    else if((hasUpper || hasLower) && (hasNum || hasSym) && passwordLen >=6)
    {
        setIndicator('#ff0');
    }
    else{
        setIndicator('#f00');
    }
}


async function copyContent()
{
    try{
        await navigator.clipboard.writeText(passwordDispaly.value);
        copyMsg.innerText = "Copied";
    }
    catch(e)
    {
        copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add('active');

    setTimeout(() => copyMsg.classList.remove('active'),2000);
}


function shufflePassword(array)
{
    //fisher yates method
    for(let i= array.length-1;i>0;i--)
    {
        //find random index
        const j = Math.floor(Math.random() * (i+1));
        // swaping two values
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckboxChange()
{
    checkCount = 0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });

}

allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckboxChange);
})

inputSlider.addEventListener('input', (e)=> {
    passwordLen = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDispaly.value !=0){
        copyContent();
    }
})

generateBtn.addEventListener('click', ()=>{

    if(passwordLen<checkCount)
    {
        passwordLen = checkCount;
        handleSlider();
    }
    if(checkCount <= 0){
        return;
    }

    // let start to create new password
    // remove old password
    password = "";

    //let put the stuff mentioned by checkbox

    // if(uppercaseCheck.checked){
    //     password += generateRandomUppercase;
    // }

    // if(lowercaseCheck.checked){
    //     password += generateRandomLowercase;
    // }

    // if(numberCheck.checked){
    //     password += generateRandomNumber;
    // }
    // if(symbolCheck.checked){
    //     password += generateSymbol;
    // }

    let arr = [];
    if(uppercaseCheck.checked){
        arr.push(generateRandomUppercase);
    }
    if(lowercaseCheck.checked){
        arr.push(generateRandomLowercase);
    }
    if(numberCheck.checked){
        arr.push(generateRandomNumber);
    }
    if(symbolCheck.checked)
    {
        arr.push(generateSymbol);
    }

    //compalsery
    for(let i=0;i<arr.length;i++)
    {
        password += arr[i]();
    }
    //optional
    for(let i=0;i<passwordLen-arr.length;i++)
    {
        let randomIndex = getRandomInt(0,arr.length);
        password += arr[randomIndex]();
    }

    console.log(password);
    //suffle

    password = shufflePassword(Array.from(password));

    //dispaly password

    passwordDispaly.value = password;

    calStrenght();

})