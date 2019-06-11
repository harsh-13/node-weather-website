console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() 

    const location = search.value  // IMP
    m1.textContent = 'Loading...'

    fetch('/weather?address=' + location).then((Response) => {
        Response.json().then((data) => {
            if(data.error) {
                m1.textContent = data.error
                return
            }
        m1.textContent = 'Location: ' + data.Location
        m2.textContent = 'Todays forecast: ' + data.weatherForecast 
        })
    })
})