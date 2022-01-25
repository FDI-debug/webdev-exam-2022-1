var slideIndex = 1;
showSlide(slideIndex);
function plusSlides(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1
    }

    if (n < 1) {
        slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += "";
}

const btns_econom = document.querySelectorAll('.counter_btn_econom');

btns_econom.forEach(btn => {
    btn.addEventListener('click', function() {
        const direction = this.dataset.direction;
        const inp = this.parentElement.querySelector('.counter_value_econom');
        const currentValue = +inp.value;
        let newValue;

        if (direction === 'plus') {
            newValue = currentValue + 1;
        } else {
            newValue = currentValue - 1 > 0 ? currentValue - 1 : 0;
        }

        inp.value = newValue;

    })
})

const btns_buisness = document.querySelectorAll('.counter_btn_business');

btns_buisness.forEach(btn => {
    btn.addEventListener('click', function() {
        const direction = this.dataset.direction;
        const inp = this.parentElement.querySelector('.counter_value_business');
        const currentValue = +inp.value;
        let newValue;

        if (direction === 'plus') {
            newValue = currentValue + 1;
        } else {
            newValue = currentValue - 1 > 0 ? currentValue - 1 : 0;
        }

        inp.value = newValue;
    })
})

const btns_vip = document.querySelectorAll('.counter_btn_vip');

btns_vip.forEach(btn => {
    btn.addEventListener('click', function() {
        const direction = this.dataset.direction;
        const inp = this.parentElement.querySelector('.counter_value_vip');
        const currentValue = +inp.value;
        let newValue;

        if (direction === 'plus') {
            newValue = currentValue + 1;
        } else {
            newValue = currentValue - 1 > 0 ? currentValue - 1 : 0;
        }

        inp.value = newValue;
    })
})


let admarea = [];
let district = [];
let typeObject = [];
let content;


async function getResponse() {
    let response = await fetch('http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=cbb7c956-4279-466a-a6dc-213718505902')
    let content = await response.json()
    let key;
    for (key in content) {
        if (admarea.indexOf(content[key].admArea) === -1 && content[key].admArea !== null) {
            admarea.push(content[key].admArea);
            let option = document.createElement('option');
            option.value = content[key].admArea;
            option.innerHTML = content[key].admArea;
            document.querySelector('.form-select1').append(option);
        };
        if (district.indexOf(content[key].district) === -1 && content[key].district !== null) {
            district.push(content[key].district);
            let option = document.createElement('option');
            option.value = content[key].district
            option.innerHTML = content[key].district
            document.querySelector('.form-select2').append(option);
        };
        if (typeObject.indexOf(content[key].typeObject) === -1 && content[key].typeObject !== null) {
            typeObject.push(content[key].typeObject);
            let option = document.createElement('option');
            option.value = content[key].typeObject;
            option.innerHTML = content[key].typeObject;
            document.querySelector('.form-select3').append(option);
        };
        
        //document.querySelector('.json_out').innerHTML += `<li class="json_out"><h1>${content[key].address}</h1></li>`;
    };

    return content;
    
};

content = getResponse();


async function check_select(admarea, district, typeObject, discount) {
    let response = await fetch('http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=cbb7c956-4279-466a-a6dc-213718505902')
    let content = await response.json()
    let key;
    for (key in content) {
        if (content[key].admArea === admarea && content[key].district === district && content[key].typeObject === typeObject && String(content[key].socialPrivileges) === discount) {
            document.querySelector('.name').innerHTML = `<th class="1.name">${content[key].name}</th>`;
            document.querySelector('.type').innerHTML = `<td class="1.name">${content[key].typeObject}</td>`;
            document.querySelector('.address').innerHTML = `<td class="1.name">${content[key].address}</td>`;
        };
    };
};


async function check_prices(admarea, district, typeObject, discount) {
    let response = await fetch('http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=cbb7c956-4279-466a-a6dc-213718505902')
    let content = await response.json()
    let key;
    for (key in content) {
        if (content[key].admArea === admarea && content[key].district === district && content[key].typeObject === typeObject && String(content[key].socialPrivileges) === discount) {
            document.querySelector('.econom_price').innerHTML = `<p class="econom_price" style="text-align: center;">${content[key].set_1}</p>`;
            document.querySelector('.business_price').innerHTML = `<p class="business_price" style="text-align: center;">${content[key].set_2}</p>`;
            document.querySelector('.vip_price').innerHTML = `<p class="vip_price" style="text-align: center;">${content[key].set_3}</p>`;
        };
    };
};


async function check_discounts(admarea, district, typeObject, discount) {
    let response = await fetch('http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=cbb7c956-4279-466a-a6dc-213718505902')
    let content = await response.json()
    let key;
    for (key in content) {
        if (content[key].admArea === admarea && content[key].district === district && content[key].typeObject === typeObject && String(content[key].socialPrivileges) === discount) {
            return content[key].socialDiscount;
        };
    };
};


document.querySelector('.btn-found').addEventListener('click', () => {
    let admarea = document.querySelector('.form-select1').value;
    let district = document.querySelector('.form-select2').value;
    let typeObject = document.querySelector('.form-select3').value;
    let discount = document.querySelector('.form-select4').value;
    check_select(admarea, district, typeObject, discount);
});


document.querySelector('.btn-add-first').addEventListener('click', () => {
    let admarea = document.querySelector('.form-select1').value;
    let district = document.querySelector('.form-select2').value;
    let typeObject = document.querySelector('.form-select3').value;
    let discount = document.querySelector('.form-select4').value;
    check_prices(admarea, district, typeObject, discount);
});


document.querySelector('.make_an_order').addEventListener('click', () => {
    let admarea = document.querySelector('.form-select1').value;
    let district = document.querySelector('.form-select2').value;
    let typeObject = document.querySelector('.form-select3').value;
    let discount = document.querySelector('.form-select4').value;
    let data_econom = document.querySelector('.counter_value_econom').value;
    let data_business = document.querySelector('.counter_value_business').value;
    let data_vip = document.querySelector('.counter_value_vip').value;
    let econom_price = document.querySelector('.econom_price').value;
    let business_price = document.querySelector('.business_price').value;
    let vip_price = document.querySelector('.vip_price').value;
    console.log(econom_price);
    let result = Number(data_econom) * Number(econom_price) + Number(data_business) * Number(business_price) + Number(data_vip) * Number(vip_price);
    let social_discount = check_discounts(admarea, district, typeObject, discount);
    if (document.querySelector('.student').checked) {
        result *= Number(social_discount) / 100;
    };
    if (document.querySelector('.fast_delivery').checked) {
            result *= 1.2;
    };
    document.querySelector('.out').innerHTML = result;
});