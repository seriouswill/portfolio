const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}


function startGame() {
    state = {}
    showTextNode(1)
}

// function nameGet() {

let playerName = prompt("Welcome to Millionaiiirrreee. What's your name!")
//     return playerName
// }




function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'A dark tunnel. cold. dark, very dark. There appears to be some strange goo.',

        options: [
            {
                text: 'Take the goo',
                setState: { blueGoo: true },
                nextText: 21
            },
            {
                text: 'Leave the goo',
                nextText: 21
            },

        ]
    },
    {
        id: 21,
        text: "Hey you. What's your name?",
        options: [
            {
                text: playerName,
                nextText: 2
            },
            {
                text: "Run!",
                nextText: 4
            }
        ],


    },
    {

        id: 2,
        text: "Hi. Sorry  its a little crazy here these days. Are you ready " + playerName + "?",
        options: [
            {
                text: "Hell Yes!",
                nextText: 31,
            },
            {
                text: "Nope, I'm out!",
                nextText: 99,
            },
        ]
    },
    {

        id: 31,
        text: 'the stranger turns you right and...         Dazzling lights, blind you. From all directions cheers and yell - You glance around you trying to take it all in, but before you can make sense of it all.. "PLEASE WELCOME ' + playerName + '!\"         A man in his 50s, white hair, smug grin is sat at a stool that simultaneously looks too tall and too small for him.         Music swells around you - lasers, greeen and red swing around the room causing hush amongst what you now see is .. an audience!         You look back to the man in the chair. You\'re nerves subside. Its millionaire. You fucking got this.         The man in the chair becons you forward. Go?',
        options: [
            {
                text: "Yes",
                nextText: 3,
            },
            {
                text: "No",
                nextText: 99,
            }
        ]

    },

    {
        id: 3,
        text: 'You venture forth in search of answers to where you are when you come across a merchant.',

        options: [
            {
                text: 'Trade the goo for a sword',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 13
            },
            {
                text: 'Trade the goo for a shield',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield: true },
                nextText: 13
            },
            {
                text: 'Ignore the merchant',
                nextText: 13
            },
            // {
            //     text: prompt("What's your name!"),
            //     nextText: 3
            // }
        ]
    },
    {
        id: 13,
        text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
        options: [
            {
                text: 'Explore the castle',
                nextText: 99
            },
            {
                text: 'Find a room to sleep at in the town',
                nextText: 5
            },
            {
                text: 'Find some hay in a stable to sleep in',
                nextText: 6
            }
        ]
    },
    {
        id: 99,
        text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
        options: [
            {
                text: 'Explore the castle',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'While exploring the castle you come across a horrible monster in your path.',
        options: [
            {
                text: 'Try to run',
                nextText: 8
            },
            {
                text: 'Attack it with your sword',
                requiredState: (currentState) => currentState.sword,
                nextText: 9
            },
            {
                text: 'Hide behind your shield',
                requiredState: (currentState) => currentState.shield,
                nextText: 10
            },
            {
                text: 'Throw the blue goo at it',
                requiredState: (currentState) => currentState.blueGoo,
                nextText: 11
            }
        ]
    },
    {
        id: 8,
        text: 'Your attempts to run are in vain and the monster easily catches.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: 'You foolishly thought this monster could be slain with a single sword.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: 'The monster laughed as you hid behind your shield and ate you.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 11,
        text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
        options: [
            {
                text: 'Congratulations. Play Again.',
                nextText: -1
            }
        ]
    }
]

startGame()