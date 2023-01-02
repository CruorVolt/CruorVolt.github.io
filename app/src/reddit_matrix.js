/*
 * @author Anders Lundgren
 *
 * Inspired by Ryan Henszey's demo of canvas animation at http://timelessname.com/sandbox/matrix.html.
 */

import { v4 as uuid } from 'uuid';
import { useEffect, useRef, useState } from 'react';

class DisplayMessage {

    constructor(message, row, key) {

        this.text = message + "   ";
        this.currentIdx = 0;

        this.row = row;
        this.key = key;

    }

    current() {
        return this.text[this.currentIdx % this.text.length];
    }

    next() {
        this.currentIdx = (this.currentIdx + 1);
        return this.current();
    }

    getIdx() {
        return this.currentIdx;
    }

}

const size = 7;
const alpha = size / 200

//How many messages may display at once as a multiple of the number of display rows
const maxMessageDensity = 1.5;

//How many new messages may begin displaying in a single tic as a multiple of the number of display rows
const maxNewMessagePercentagePerTic = 0.01;

//How many trailing "fade-out" characters to display before clearing the message
const cleanupLagNumberOfChars = 10;

//How many messages to store in the buffer queue as a multiple of the total possible displayed messages
const messageBufferPercentage = 2.0;

//How far across the pane a message must reach before its line is available for a new message as a multiple of the pane size
const messageMinFollowDistance = 0.5;

//Display streaming after receiving this many messages
const minimumDisplayMessages = 10;

function RedditMatrix() {

    var vertical = true;  //Whether to scroll vertically or horizontally

    //Messages currently displaying
    const currentDisplayMessages = useRef(new Map());

    //Locations that new messages may start painting
    const availableNewDisplayRows = useRef(new Set());

    const canvas = useRef(null);
    const dialIndex = useRef(0);    //The current character displayed by dialing animation

    const paintInterval = useRef(null);

    const [numberOfDisplayRows, setNumberOfDisplayRows] = useState(100);
    const [maxIdx, setMaxIdx] = useState(100);

    //get the hex string for a random shade of light green
    const getGreen = () => {
        var hex = "ABCDEF".split("");
        return "#5" + hex[Math.floor(Math.random() * hex.length)]+"5";
    }

    const paintNextCharacter = (displayMessage, context) => {
        if (vertical) {
            context.fillStyle = "#000"; //black
            context.fillRect(displayMessage.row*size - size + 1, (displayMessage.getIdx()-cleanupLagNumberOfChars)*size,size, size);
            context.fillStyle = getGreen(); //green
            context.fillText(displayMessage.current(), displayMessage.row*size, (displayMessage.getIdx() * size) + size); //Rewrite previous char in green
            context.fillStyle = "#FFF"; //white
            context.fillText(displayMessage.next(), displayMessage.row*size, (displayMessage.getIdx() * size) + size); //Write newest char illuminated
        } else {
            context.fillStyle = "#000"; //black
            context.fillRect((displayMessage.getIdx()-cleanupLagNumberOfChars)*size, displayMessage.row*size - size + 1, size, size);
            context.fillStyle = getGreen(); //green
            context.fillText(displayMessage.current(), (displayMessage.getIdx())*size, displayMessage.row*size); //Rewrite previous char in green
            context.fillStyle = "#FFF"; //white
            context.fillText(displayMessage.next(), displayMessage.getIdx()*size, displayMessage.row*size); //Write newest char illuminated
        }
    }

    const stream = () => {
        let context = canvas.current.getContext("2d");

        //Background is colored and translucent
        context.fillStyle = "rgba(0, 0, 0, " + alpha + ")"; //Background color and fadeout speed
        context.fillRect(0, 0, canvas.current.width, canvas.current.height);
        
        context.fillStyle = "#0F0"; //green
        context.font = size + "px monospace";

        //Check available lines and add new messages
        let i = 0;
        let availableRows = ((availableNewDisplayRows.current.size > 0) && (currentDisplayMessages.current.size < Math.floor(numberOfDisplayRows * maxMessageDensity)));
        let percentageFull = currentDisplayMessages.current.size / Math.floor(numberOfDisplayRows * maxMessageDensity);

        //availableRows = availableRows && Math.random() > (-Math.pow( percentageFull - 1, 2 ) + 1);
        availableRows = availableRows && Math.random() > percentageFull;

        while ((availableRows) && (i < Math.ceil(numberOfDisplayRows * maxNewMessagePercentagePerTic))) {
            let rowIdx = Array.from(availableNewDisplayRows.current)[
                Math.floor(Math.random() * availableNewDisplayRows.current.size) 
            ];
            availableNewDisplayRows.current.delete(rowIdx);

            let length = Math.floor(Math.random() * 100);
            let messageText = "";
            for (let i = 0; i <= length; i++ ) {
                let charCode = Math.floor(Math.random() * 25) + 65;
                messageText += String.fromCharCode(charCode);
            }
            if (messageText) {
                let messageKey = uuid();
                let displayMessage = new DisplayMessage(messageText, rowIdx, messageKey);
                currentDisplayMessages.current.set(messageKey, displayMessage);
            }
            i++;
        }

        for (let [key,message] of currentDisplayMessages.current) {

            paintNextCharacter(message, context);

            if (message.getIdx() === Math.floor(maxIdx * messageMinFollowDistance)) {
                availableNewDisplayRows.current.add(message.row);
            }

            if (message.getIdx() >= (maxIdx + cleanupLagNumberOfChars)) {
                currentDisplayMessages.current.delete(key);
            }
            
        };

    };

    useEffect(() => {

        canvas.current = document.getElementById("displayCanvas");

        canvas.current = document.getElementById("displayCanvas");

        canvas.current.height = 200;
        canvas.current.width = 200;

        let rows = canvas.current.width / size;
        let cols = canvas.current.height / size;
        let canvasSize = Math.floor(vertical ? rows : cols);
        let maxIdx = Math.floor(vertical ? cols : rows);

        currentDisplayMessages.current = new Map();

        setNumberOfDisplayRows(canvasSize);
        setMaxIdx(maxIdx);

        for (let i = 0; i < canvasSize; i++) {
            availableNewDisplayRows.current.add(i); //All rows start available
        }

        paintInterval.current && clearInterval(paintInterval.current);
        paintInterval.current = setInterval(stream, 65);

        return () => { 
            clearInterval(paintInterval.current);
        };

    }, [numberOfDisplayRows]);


    return <canvas id='displayCanvas'/>;
}

export default RedditMatrix;