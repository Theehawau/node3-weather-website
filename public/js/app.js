console.log('Client side javascript is loadeddd!!')


// http://puzzle.mead.io/puzzle
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location) ).then((response) => {
    response.json().then((data) =>{
        if (data.error) {
            console.log(data.error);
            messageOne.textContent =  data.error
        }else{
            console.log(data);
            messageOne.textContent = data.location
            // messageTwo.textContent = 'Address: ' + data.Address + ' Location: ' + data.location + ' Forecast:' +data.Forecast
            messageTwo.textContent = data.Forecast
        }
        
    })
    })
})







