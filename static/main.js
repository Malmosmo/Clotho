var kvDict = {}
var addBtn = document.querySelector("#addBtn")
var submitBtn = document.querySelector("#submit")
var wrapper = document.querySelector("#grid")

// --------------------------------------------------

function load() {
    let url = wrapper.getAttribute("url")

    fetch(url).then(response => response.json()).then(json => {
        for (const entry of json.values) {
            console.log(entry)
            newElement(entry.name, Number(entry.value))
        }
    })
}

function newElement(name, value) {
    kvDict[name] = value

    let a = document.createElement("a")
    a.href = "javascript:;"
    a.classList.add("grid-item")
    a.setAttribute("name", name)
    a.setAttribute("value", value)

    let h4 = document.createElement("h4")
    h4.innerText = name
    a.appendChild(h4)

    let _h4 = document.createElement("h4")
    _h4.innerText = value
    _h4.classList.add("m-0")
    _h4.setAttribute("id", "value")
    a.appendChild(_h4)

    addClickEvent(a)

    wrapper.insertBefore(a, addBtn)
}

function addClickEvent(item) {
    item.addEventListener("click", () => {
        let name = item.getAttribute("name")
        let value = item.getAttribute("value")

        if (name in kvDict) {
            kvDict[name] += 1

            item.setAttribute("value", kvDict[name])
        }

        item.querySelector("#value").textContent = kvDict[name]

        send()
    })
}

function send() {
    let url = "/update?value="
    let list = []

    for (const [key, value] of Object.entries(kvDict)) {
        list.push(`${key}:${value}`)
    }

    fetch(url + list.join())
}

// --------------------------------------------------

submitBtn.addEventListener("click", () => {
    let name = document.querySelector("#name").value
    newElement(name, 0)
    send()
})

for (const item of document.querySelectorAll(".grid-item")) {
    addClickEvent(item)
}

load()