// Start coding here
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 1024

function left() {
    velocity = velocity == -2 ? 0 : -2
}
function right() {
    velocity = velocity == 2 ? 0 : 2
}

var frame = 0
var position = 0
var velocity = 0
var direction = 2
var refreshOpacity = 0.1
var lastDone = 0
var last = Date.now()
var interval = 150
function animate() {
    requestAnimationFrame(animate)

    refreshOpacity = Math.sign(direction) < 0 ? 1 : 0.1

    position = Math.min(Math.max(0, position + 0.4 * velocity * 60 / (1000 / (Date.now() - last))), number * interval)
    blue = `rgba(0, 0, 255, ${refreshOpacity})`
    white = `rgba(255, 255, 255, ${refreshOpacity})`

    last = Date.now()

    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);

    grad.addColorStop(0, "black");
    grad.addColorStop(0.1, "transparent");
    grad.addColorStop(0.9, "transparent");
    grad.addColorStop(1, "black");

    const grad2 = ctx.createLinearGradient(0, 0, 0, canvas.height);

    grad2.addColorStop(0, "black");
    grad2.addColorStop(0.1, "transparent");
    grad2.addColorStop(0.9, "transparent");
    grad2.addColorStop(1, "black");

    ctx.shadowColor = "blue";

    ctx.fillStyle = `rgba(0, 0, 20, ${refreshOpacity})`
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let ycoord = canvas.height - 100 + Math.sin(position / 10) * 10
    ctx.filter = `drop-shadow(0px 0px 10px ${white}) drop-shadow(0px 0px 20px ${white})`
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.arc(canvas.width / 2, ycoord, 5 * Math.sin(frame / 20) * (1 - Math.abs(Math.sign(velocity))) + 15, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
    ctx.filter = "none"

    let claimed = false
    for (let i = -100; i <= -100 + number * interval; i += interval) {
        let xc = canvas.width / 2 + i - position
        if (i < position) {
            ctx.filter = `drop-shadow(0px -10px 10px ${white}) drop-shadow(0px 10px 10px ${white})`
            ctx.fillStyle = "white"
            if (i != -100) {
                ctx.beginPath()
                ctx.moveTo(xc - interval, canvas.height - 100)
                ctx.lineTo(xc, canvas.height - 100)
                ctx.closePath()
                ctx.strokeStyle = "white"
                ctx.stroke()
            }
        } else {
            ctx.filter = `drop-shadow(0px -10px 10px ${blue}) drop-shadow(0px 10px 10px ${blue})`
            ctx.fillStyle = "blue"
            if (!claimed) {
                lastDone = i - interval
                ctx.beginPath()
                ctx.moveTo(xc - interval, canvas.height - 100)
                ctx.lineTo(canvas.width / 2, ycoord)
                ctx.closePath()
                ctx.strokeStyle = "white"
                ctx.stroke()
                claimed = true
            }
        }
        ctx.fillRect(xc - 4, canvas.height - 100, 8, 100)
        ctx.font = "24px Arial"
        if (i != -100) {
            ctx.fillText(dates[(i + 100) / interval - 1], xc - 4, canvas.height - 120)
        }
    }
    if (!claimed) {
        lastDone = -100 + number * interval
    }

    if ((lastDone + 100) / interval == number) {
        document.getElementById("go").style.top = "20%"
    }

    document.getElementById("content").innerHTML = allContent[(lastDone + 100) / interval]

    ctx.filter = "none"

    ctx.fillStyle = grad
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = grad2
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    frame++
}
animate()

function go(htmlTitle) {
    document.getElementById("canvas").style.scale = "45"
    document.getElementById("content").style.scale = "45"
    document.getElementById("content").style.color = "black"
    document.getElementById("content").style.backgroundColor = "black"
    document.getElementById("go").style.top = "-20%"
    setTimeout(() => {
        window.location.href = htmlTitle + ".html"
    }, 2000)
}
onload = () => {
    document.getElementById("canvas").style.scale = "1"
    document.getElementById("content").style.scale = "1"
}