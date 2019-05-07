let getClickClassName = () => {
    let min=1, max=100;  
    let random = Math.random() * (+max - +min) + +min; 
    if (random > 50) {
        return 'click-left';        
    } else {
        return 'click-right';
    }
}

let ahrefs = document.getElementsByTagName("li");
for (let item of ahrefs) {
    item.onmouseover = (e)=> {
        let className = getClickClassName();
        e.target.classList.add(className);
        setTimeout(() => {
            if (e.target.classList.contains(className)) {
                e.target.classList.remove(className);
            }
        }, 1000);
    };

    item.onclick = (e)=> {
        let className = 'cl';
        e.target.classList.add(className);
        setTimeout(() => {
            if (e.target.classList.contains(className)) {
                e.target.classList.remove(className);
            }
        }, 1000);
    };

}