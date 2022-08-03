"use strict";

const container = document.querySelector(".container");
const span = document.querySelectorAll(".menu__ul-li > li > a > span");
console.log(span[0]);
const addPublication = (name,description) =>{
    const publication = document.createElement("DIV");
    const nameh1 = document.createElement("H1");
    const descriptionp = document.createElement("P");

    publication.classList.add("publication");
    nameh1.classList.add("name");
    descriptionp.classList.add("description");

    nameh1.textContent = name;
    descriptionp.textContent = description;
    publication.appendChild(nameh1);
    publication.appendChild(descriptionp);

    return publication
}
const objectObserve = (entry) =>{
    for(let i = 0;i <entry.length; i++){
        if(entry[i].isIntersecting){
            // console.log(entry[i].target.classList[0])
            if(entry[i].target.classList[0]=="home") span[0].classList.add("hover");
            else span[0].classList.contains("hover")?span[0].classList.remove("hover"): ""
            
            if(entry[i].target.classList[0]=="contact")span[1].classList.add("hover");
            else span[1].classList.contains("hover")?span[1].classList.remove("hover"): ""

            if(entry[i].target.classList[0]=="about")span[2].classList.add("hover");
            else span[2].classList.contains("hover")?span[2].classList.remove("hover"): ""
        }
    }
    
}
const objIn = (entry) =>{
    for(let i = 0;i <entry.length; i++){
        if(entry[i].isIntersecting){
            setComent(1);
            console.log(entry[i].isIntersecting)
        }
    }
}
const ob = new IntersectionObserver(objIn)
const observer = new IntersectionObserver(objectObserve);
const arr = [];
const sectionObserver = () =>{
    arr[0] = document.querySelector(".home"); 
    arr[1] = document.querySelector(".contact"); 
    arr[2] = document.querySelector(".about");
    for(let i = 0;i < arr.length; i++){
        observer.observe(arr[i]);
    } 
} 
sectionObserver();

const fragment = document.createDocumentFragment();
const setComent  = async (num) =>{
    const req = await fetch("publication.json");
    const convertRes = await req.json();
    const res =  convertRes.content;
    for(let i = 0 ; i < num ; i++){
        const newPubli = addPublication(res[i].name,res[i].description);
        console.log(newPubli);
        fragment.appendChild(newPubli);
        ob.observe(newPubli);
        console.log(fragment);
    }
    container.appendChild(fragment);
}

setComent(2);






