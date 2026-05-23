let maxShapes = 5;
let shapeMaxSize = 40;
const shapes = ["square", "rectangle", "circle", "oval", "triangle", "trapezoid", "parallelogram"]
const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink"]
let bigCard = false;
let active;

const GenerateCard = (card, num) => {
    let width = parseInt(window.getComputedStyle(card).width) ;
    let height = parseInt(window.getComputedStyle(card).height) ;
    const placedShapes = [];
    const usedShapes = [];
    const pad = 35;

    for (let i = 0; i < num; i++) {
        let newShape;
        let touching = true;
        let tries = 0;

        while (touching && tries < 500) {
            newShape = {
                x: Math.random() * (width - shapeMaxSize),
                y: Math.random() * (height - shapeMaxSize),
                w: shapeMaxSize,
                h: shapeMaxSize
            };

            touching = placedShapes.some(OldShape => {
                return !(
                    newShape.x + newShape.w + pad < OldShape.x ||
                    newShape.x > OldShape.x + OldShape.w + pad ||
                    newShape.y + newShape.h + pad < OldShape.y ||
                    newShape.y > OldShape.y + OldShape.h + pad
                )
            })

            tries++;
        }

        if (tries < 500) {
            placedShapes.push(newShape)
            let chosenShape = "square";
            while (usedShapes.includes(chosenShape)) {
                chosenShape = shapes[Math.floor(Math.random() * shapes.length)]
            }
            usedShapes.push(chosenShape);
            placeShape(card, newShape, chosenShape)
        }

    }

    card.style.visibility = "visible";
    // console.log(card)
}

const placeShape = (card, pos, shapeShape) => {
    const shape = document.createElement('div')
    shape.classList.add(shapeShape);
    shape.style.position = "absolute";
    shape.style.left = `${pos.x}px`
    shape.style.top = `${pos.y}px`
    shape.classList.add("shape")
    let color = colors[Math.floor(Math.random() * colors.length)]
    shape.style.backgroundColor = color;
    shape.style.borderLeftColor = color;
    shape.style.borderRightColor = color;
    shape.style.borderTopColor = color;
    shape.style.borderBottomColor = color;
    card.appendChild(shape);
    shape.addEventListener("click", (e) => {
        if (!active) {
            document.querySelectorAll(".active").forEach(ele => {
                if (e.target != ele) {
                    ele.classList.remove("active")
                }
            })
            shape.classList.toggle("active")
            active = shape;
            console.log(active)
        } else {
            if (active.parentElement.parentElement == shape.parentElement.parentElement) {
                 document.querySelectorAll(".active").forEach(ele => {
                if (e.target != ele) {
                    ele.classList.remove("active")
                }
            })
            shape.classList.toggle("active")
            active = shape;
            console.log(active)
            } else {
                if (active.classList.contains(shapeShape) && active.style.backgroundColor == shape.style.backgroundColor) {
                        shape.classList.add("active");
            } else {
                active.classList.add("wrong")
                shape.classList.add("wrong")
            }
        }
    }
    })
}

const makeCard = () => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.style.visibility = "hidden";
    document.getElementById("main").appendChild(card);
    card.style.width = "200px";
    card.style.height = "40vh";
    GenerateCard(card, 5);
}

makeCard();

makeCard();

makeCard();

makeCard();
makeCard();

makeCard();

const makeBigCard = () => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.style.visibility = "hidden";
    document.getElementById("bigCard").appendChild(card);
    card.style.width = "35vw";
    card.style.height = "70vh";
    GenerateCard(card, 7);
}

makeBigCard()