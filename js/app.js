var querty= document.getElementById("qwerty");
var input= document.getElementById("phrase");
var phrase=["i like cake","i have a cat","football","i study","police","computer","watermelon","the sun is yellow","i am coding","maths"];
var missed= 0;
var overlay=document.getElementById("overlay");
var start= document.querySelector(".btn__reset");
var ul= document.querySelector("ul");
var wrong=0;
var correct=0;
var img=document.querySelectorAll(".tries img");
var rst= document.createElement("button");


/*generate a random phrase from the "phrase" array */
function getRandomPhraseAsArray () {
    var result= phrase[Math.floor(Math.random() * phrase.length)]; 
    result = result.split("");
    return result;
}

/* display the phrase generated*/
function addPhraseToDisplay () {
    var letter=getRandomPhraseAsArray();
    for (var i= 0; i<letter.length; i++){
        if (letter[i] !== " "){
            var li=document.createElement("li");
            li.appendChild(document.createTextNode(letter[i]));
            li.classList.add("letter");
            ul.appendChild(li);
        } else {
            var li=document.createElement("li");
            li.appendChild(document.createTextNode(letter[i]));
            li.classList.add("space");
            ul.appendChild(li);
        }
    }
    return letter;
}

/*add event listner to the start button, when clicked remove the overlay section and apply the phrase*/
start.addEventListener("click", () =>{
    addPhraseToDisplay();
    overlay.style.transform="translateX(100%)";
    document.querySelector(".header").style.transform="scale(1.2)";
    document.querySelector("ul").classList.add("phrase");
});




var button= document.querySelectorAll(".keyrow button");

/*listener for the buttons */
for(var i = 0; i < button.length; i++) {
    button[i].addEventListener("click", bindClick(i));
}

/*function called everytime when a button is clicked*/
function bindClick(i) {
    return function () {

        /*generate a new array with the string splitted*/
        var final = document.querySelectorAll(".letter");
        var rei= [];
        for (var a=0; a<final.length; a++){
            rei.push(final[a].textContent);
        }
        /*check if the selected button's text is included in the phrase */
        for (var b=0; b<final.length; b++){
           if (rei[b] === button[i].textContent){
                final[b].classList.add("show");
                correct++;
                button[i].style.backgroundColor="var(--color-neutral)";
            } 
            
        }

        /*add the class "chosen" and disable the clicked keys */
        console.log(button[i].textContent);
        button[i].classList.add("chosen");
        button[i].setAttribute("disabled", true);
        
        


        /*if the button clicked is not included in the phrase change the hearths src, 
        increase the wrong variable and apply some animations*/
        if (!rei.includes(button[i].textContent)){
            img[wrong].src="images/lostHeart.png";
            wrong++;
        }

        /*if the phrase splitted array has same length as the elements with class "show" 
        the user won. apply the win overlay*/
        if(rei.length === document.getElementsByClassName("show").length){
            console.log("you won :)");
            var overlay=document.getElementById("overlay")
            overlay.style.transform="translateX(0)";
            overlay.classList.add("win");
            document.querySelector(".title").innerHTML="you won!";
            document.querySelector(".header").style.transform="scale(0.9)";
            document.querySelector("ul").classList.remove("phrase");
        }
        /*if the wrong counter>5 the user lost so we apply the lost overlay */
        if (wrong >= 5) {
            console.log("you lost :(");
            var overlay=document.getElementById("overlay")
            overlay.style.transform="translateX(0)";
            overlay.classList.add("lose");
            document.querySelector(".title").innerHTML="you lost!";
            document.querySelector(".header").style.transform="scale(0.9)";
            document.querySelector("ul").classList.remove("phrase");

        }
    };
}




/*i added a reset button under the virtual keyboard if the user want to reset the game 
and restart it without the need to lose and start a new game*/
rst.appendChild(document.createTextNode("reset"));
rst.classList.add("rst");
document.getElementById("qwerty").appendChild(rst);

rst.addEventListener("click", ()=>{

    var but= document.querySelectorAll(".chosen");

        for(var d=0; d<but.length; d++){
            but[d].removeAttribute("class");
            but[d].disabled=false;
        }

        ul.innerHTML="";  
        getRandomPhraseAsArray ();
        addPhraseToDisplay ();
        wrong=0;
        correct=0;
        overlay.removeAttribute("class");
        
        for(var e=0; e<5; e++){
            img[e].src="images/liveHeart.png";
        }

        for (var z=0; z<button.length; z++){
            button[z].style.backgroundColor="";
        }

});

 


/*if the user lost or won he can start a new game without the need to refresh the page,
this function add the listenere to the start button and reset all the game if clicked */
start.addEventListener("click", ()=>{

    var win= document.querySelector(".win");

    if(wrong >= 5 || win){

        var but= document.querySelectorAll(".chosen");

        for(var d=0; d<but.length; d++){
            but[d].removeAttribute("class");
            but[d].disabled=false;
        }

        ul.innerHTML="";  
        getRandomPhraseAsArray ();
        addPhraseToDisplay ();
        wrong=0;
        correct=0;
        overlay.removeAttribute("class");
        
        for(var e=0; e<5; e++){
            img[e].src="images/liveHeart.png";
        } 

        for (var z=0; z<button.length; z++){
            button[z].style.backgroundColor="";
        }
    }
});