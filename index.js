const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const API_KEY = 'df2c9f78-845b-491f-b7df-4ce5b72fdd2b'

const getUrl = (type) => `https://holidayapi.com/v1/${type}?pretty&key=${API_KEY}`

const getList = async (typeData) => {
    try {
        const response = await fetch(getUrl(typeData))
        if (response.ok) {
            const data = await response.json()
            const lists = data[typeData]
            return lists
        }
    } catch (error) {
        console.log(error)
        return []
    }
}

const getHolidaysList = async () => {
    try {
        let queryString = ''
        if ($('.day').value) {
            queryString += `&day=${$('.day').value}`
        }
        if ($('.year').value) {
            queryString += `&year=${$('.year').value}`
        }
        if ($('.month').value) {
            queryString += `&month=${$('.month').value}`
        }
        if ($('.search').value) {
            queryString += `&search=${$('.search').value}`
        }
        if ($('.country-code').value) {
            queryString += `&country=${$('.country-code').value}`
        }
        if ($('.language-code').value) {
            queryString += `&language=${$('.language-code').value}`
        }

        const holidaysUrl = `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}${queryString}`
        const response = await fetch(holidaysUrl)
        
        if (response.ok) {
            const data = await response.json()
            const lists = data.holidays
            return lists
        }
    } catch (error) {
        console.log(error)
        return []
    }
}

const createList = (data, index, holiday) => {
    const list = document.createElement('li')
        list.className = 'list'
        if (!holiday) {
            list.innerHTML = `
            <div class="list-order">${index + 1}</div>
            <div class="list-content">
                <p class="list-title">${data.name}</p>
                <p class="list-sub-title">Code: ${data.code}</p>
            </div>
            `    
        } else {
            list.innerHTML = `
            <div class="list-order">${index + 1}</div>
            <div class="list-content">
                <p class="list-title">${data.name}</p>
                <p class="list-sub-title">${data.weekday.date.name} - ${data.date}</p>
            </div>
            `
        }
    return list
}

const renderList = async (typeData, buttonNumber, holiday) => {
    try {
        if (!holiday) {
            const data = await getList(typeData)
            data.forEach((value, index) => {
                const list = createList(value, index)
                $$('.container-lists')[buttonNumber].appendChild(list)
            })
        } else {
            $$('.container-lists')[buttonNumber].innerHTML = ''
            const holidaysList = await getHolidaysList()
            holidaysList.forEach((data, index) => {
                const list = createList(data, index, 'holiday')
                $$('.container-lists')[buttonNumber].appendChild(list)
            })    
        }
    } catch (error) {
        console.log(error)
    }
}

$('.render-holiday-lists').addEventListener('click', () => renderList('', 0, 'holiday'))

$('.render-country-lists').addEventListener('click', () => renderList('countries', 1))

$('.render-language-lists').addEventListener('click', () => renderList('languages', 2))