import React, { useState, useEffect } from 'react'


function App(){
    const [calculation, setCalculation] = useState('')
    const [result, setResult] = useState('')
    const [history, setHistory] = useState('')
    const operators = ["/","*","-","+","."]
    const operator = ["/","*","-","+"]
    const validDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    
    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown)
        return() => {
            document.removeEventListener('keydown', detectKeyDown)
        }
    })

    const detectKeyDown = (e) => {
        if(validDigits.includes(e.key)){
            appendDigits(e.key)
        }
        else if(operator.includes(e.key)){
            appendOperators(e.key)
        }
        else if(e.key == "."){
            appendDot()
        }
        else if(e.key == "Backspace"){
            setCalculation(calculation.slice(0,-1))
        }
        else if(e.key == "Delete"){
            setCalculation("")
        }
        else if(e.key == "Enter"){
            calculateDigits()
        }          
    }
    
    const getDigits = () => {
        const digits = []
        for (let i = 1; i < 10; i++) {
            digits.push(<button key = {i} onClick = {() => appendDigits(i)}>{i}</button>)
        }
        return digits
    }
 
    function appendDigits(value){
        value = value.toString()
        const currentArray = arrangeDigits(value)
        if(currentArray[0] == 0){
            if(currentArray[1] == 0){
                return
            }
            else if(currentArray.length == 1 || currentArray[1] == "."){
                setCalculation(calculation+value)
            }
            else if(currentArray[1] != 0){
                setCalculation(calculation.slice(0,-1)+value)
            }
        }
        else{setCalculation(calculation + value)}       
    }

    function appendOperators(value){
        const arrayDigits = calculation.split(/[-,+,*,/]/)
        const arrayOperator = Array.from(arrayDigits[arrayDigits.length-1])
        if(calculation.slice(-1) == "." || calculation.length == 0){
            return
        }
        else if(arrayOperator.length == 0){
            setCalculation(calculation.slice(0,-1)+value)
        }
        else{setCalculation(calculation + value)}
    }

    function arrangeDigits(value){
        const currentDigit = calculation + value 
        const arrayDigits = currentDigit.split(/[-,+,*,/]/)
        return Array.from(arrayDigits[arrayDigits.length-1])
    }

    const appendDot = () => {
        let count = {}
        const arrayDigits = calculation.split(/[-,+,*,/]/)
        const arrayOperator = Array.from(arrayDigits[arrayDigits.length-1])
        arrangeDigits().forEach(function(x) { count[x] = (count[x] || 0)+1})
        if(operators.includes(calculation.slice(-1)) || count['.'] == 1 || arrayOperator.length == 0){
            return
        }
        else{
            setCalculation(calculation + ".")
        }
    }

    function decimalCount() {
        let countDecimal = []
        const countDigits = calculation.split(/[-,+,*,/]/)
        for(let i = 0; i < countDigits.length; i++){
            if(countDigits[i].includes('.')){
                countDecimal.push(countDigits[i].split('.')[1].length)
            }
            else{countDecimal.push(0)}
        }
        let findDecimal = countDecimal[0]
        for(let i = 0; i < countDecimal.length; i++){
            if(findDecimal < countDecimal[i]){
                findDecimal = countDecimal[i]
            }
        }
        return findDecimal+2
    }

    const calculateDigits = () => {
        if(operators.includes(calculation.slice(-1))){return}
        setResult(calculation)
        setHistory(eval(calculation).toFixed(decimalCount()))
        setCalculation("")
    }

    return(
        <div className = "App">
            <div className = "calculator">
                <div className = "display">
                    <span className = "label">{result ? result + ' = ' + history : '' || ''}</span>
                    <span className = "label">{calculation || 0}</span>
                </div>
                <div className = "operators">
                    <button onClick = {() => appendOperators('/')}>/</button>
                    <button onClick = {() => appendOperators('-')}>-</button>
                    <button onClick = {() => appendOperators('*')}>x</button>
                    <button onClick = {() => appendOperators('+')}>+</button>
                    <button onClick = {() => setCalculation(calculation.slice(0,-1))}>DEL</button>
                    <button onClick = {() => setCalculation("")}>CLR</button>
                </div>

                <div className = "digits" >
                    {getDigits()}
                </div>

                <div className = "digits">
                    <button onClick = {() => appendDigits(0)}>0</button>
                    <button onClick = {() => appendDot()}>.</button>
                    <button onClick = {() => calculateDigits()}>=</button>
                </div>
            </div>
        </div>
    );
}

export default App;