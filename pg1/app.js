let list = document.getElementsByTagName("li");
for (let item of list) {
    item.onclick = (e)=> {
        console.log('click!');
    };
}