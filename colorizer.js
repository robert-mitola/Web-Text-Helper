
function generateGradient(r1, g1, b1, r2, g2, b2, alpha, width, index){
    var transition = Math.floor(index / width) % 4;
    var r = 0, g = 0, b = 0;
    var percentFill = (index % width) / width;
    switch(transition){
        case 0: // black to color 1
            r = 0 + Math.ceil(r1 * percentFill);
            g = 0 + Math.ceil(g1 * percentFill);
            b = 0 + Math.ceil(b1 * percentFill);
            break;
        case 1: // color 1 to black
            r = r1 - Math.ceil(r1 * percentFill);
            g = g1 - Math.ceil(g1 * percentFill);
            b = b1 - Math.ceil(b1 * percentFill);
            break;
        case 2: // black to color 2
            r = 0 + Math.ceil(r2 * percentFill);
            g = 0 + Math.ceil(g2 * percentFill);
            b = 0 + Math.ceil(b2 * percentFill);
            break;
        case 3: // color 2 to black
            r = r2 - Math.ceil(r2 * percentFill);
            g = g2 - Math.ceil(g2 * percentFill);
            b = b2 - Math.ceil(b2 * percentFill);
            break;
    }
    return "rgba("+r+","+g+","+b+","+alpha+")";
}

function changeColor(element){
    //var element = document.getElementById("demo");
    var newText = Array.prototype.map.call(element.textContent || element.innerText, function(letter, index){
        return "<span style='color: " + generateGradient(255, 0, 0, 0, 0, 255, 1, 50, index) + ";'>" + letter + "</span>";
    }).join('');
    element.innerHTML = newText;
}

var ps = document.getElementsByTagName("p");
for(var i = 0; i < ps.length; ++i){
    changeColor(ps[i]);
}