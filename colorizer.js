
function generateGradient(r1, g1, b1, r2, g2, b2, alpha, letterInfo){
    var r = 0, g = 0, b = 0;
    switch(letterInfo.gradientID){
        case 0: // black to color 1
            r = 0 + Math.ceil(r1 * letterInfo.percentFill);
            g = 0 + Math.ceil(g1 * letterInfo.percentFill);
            b = 0 + Math.ceil(b1 * letterInfo.percentFill);
            break;
        case 1: // color 1 to black
            r = r1 - Math.ceil(r1 * letterInfo.percentFill);
            g = g1 - Math.ceil(g1 * letterInfo.percentFill);
            b = b1 - Math.ceil(b1 * letterInfo.percentFill);
            break;
        case 2: // black to color 2
            r = 0 + Math.ceil(r2 * letterInfo.percentFill);
            g = 0 + Math.ceil(g2 * letterInfo.percentFill);
            b = 0 + Math.ceil(b2 * letterInfo.percentFill);
            break;
        case 3: // color 2 to black
            r = r2 - Math.ceil(r2 * letterInfo.percentFill);
            g = g2 - Math.ceil(g2 * letterInfo.percentFill);
            b = b2 - Math.ceil(b2 * letterInfo.percentFill);
            break;
    }
    return "rgba("+r+","+g+","+b+","+alpha+")";
}

function changeColor(element){
    var newText = Array.prototype.map.call(element.textContent || element.innerText, function(letter, index){
        return "<span>" + letter + "</span>";
    }).join('');
    element.innerHTML = newText;
    
    var letterSpans = element.getElementsByTagName("span");
    var lineDict = new Object();
    
    for(var i = 0; i < letterSpans.length; ++i){
        const topPos = letterSpans[i].getBoundingClientRect().top;
        lineDict[topPos] = lineDict[topPos] === undefined ? 1 : ++lineDict[topPos];
    }

    var letterInfo = [];
    var keyIndex = 0;
    
    for(var key in lineDict){
        const lineGradientID = keyIndex++ % 4;
        for(var i = 0; i < lineDict[key]; ++i){
            letterInfo.push({
                gradientID: lineGradientID,
                percentFill: i / lineDict[key]
            });
        } 
    }
    
    for(var i = 0; i < letterSpans.length; ++i){
        letterSpans[i].style.color = generateGradient(255, 0, 0, 0, 0, 255, 1, letterInfo[i]);
    }
}

function changeElements(){
    var ps = document.getElementsByTagName("p");
    for(var i = 0; i < ps.length; ++i){
        changeColor(ps[i]);
    }
}

window.onresize = changeElements;
changeElements();

