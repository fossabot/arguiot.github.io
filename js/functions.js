class Menu {
    constructor() {
        this.state = false
        this.toggle = document.querySelector(".menu-icon")
        this.ul = document.querySelector('.nav__list-item')

        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.swap = this.swap.bind(this)

        this._addEventListeners()
    }

    _addEventListeners() {
        this.toggle.addEventListener('click', this.swap)
    }

    open() {
        document.body.classList.add('nav-active')
        this.state = true
    }

    close() {
        document.body.classList.remove('nav-active')
        this.state = false
    }

    swap() {
        if (this.state == true) this.close()
        else if (this.state == false) this.open()
    }
}

const m = new Menu()

class Parralax {
    constructor() {
        this.els = [...arguments]
        this._addEventListeners()
        this.f = this.genFactor()[0]
		this.m = this.genFactor()[1]
    }
    append() {
        this.els.push(...arguments)
    }
    _addEventListeners() {
        window.addEventListener("scroll", () => {
            window.requestAnimationFrame(() => {
                this.render(window.scrollY);
            })
        })
    }
    genFactor() {
        let f = []
		let m = []
        for (let i = 0; i < this.els.length; i++) {
            f.push(parseFloat(this.els[i].getAttribute("f")))
			m.push(isNaN(parseFloat(this.els[i].getAttribute("m"))) ? 0 : parseFloat(this.els[i].getAttribute("m")))
        }
        return [f, m]
    }
    isInView(el) {
        const rect = el.getBoundingClientRect();
        return !(rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight)
    }
    render(y) {
        for (let i = 0; i < this.els.length; i++) {
            const wH = window.innerHeight
            const elY = this.els[i].scrollTop
            const diff = elY - y;
            const percent = diff / wH;
            const f = this.f[i]
			const m = this.m[i]
            this.els[i].style.transform = `translate3d(0, ${percent * 1000 * f + (wH / 100 * m)}px, 0)`
        }
    }
}

const p = new Parralax(
    ...document.querySelectorAll(".header > *"),
    ...document.querySelectorAll("section > *"),
    ...document.querySelectorAll(".row"),
	document.querySelector(".container")
)
