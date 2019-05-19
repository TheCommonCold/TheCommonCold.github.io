var data;
var currentlyDisplayed=0;
var maximumToDisplay=0;
var which="show all";

function loadData(){
    var request = new XMLHttpRequest();
    request.open('GET', 'http://www.splashbase.co/api/v1/images/search?query=tree', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            data = JSON.parse(this.response);
            console.log(data);
            display();
        }else {
            console.log('error')
        }
    };
    request.send();
}

function checkForMoreImages() {
    if (currentlyDisplayed < maximumToDisplay) {
        $("#show-more").show();
    } else $("#show-more").hide();
}

window.highlight= function (button) {
        if($(button).attr("class")!=="Highlight") {
            $("#loader").show();
            $(".Highlight").removeClass("Highlight");
            $(button).addClass("Highlight");
            $("#gallery").empty();
            currentlyDisplayed=0;
            which=$(button).text();
            $("#show-more").hide();
            display();
        }
};

window.showMore= function (button) {
    $(button).hide();
    $("#show-loader").show();
    display();
};


function validateGridLayout(selectedNumbers, bannedNumbers){
    var validated = 1;
    selectedNumbers.sort();
    for (var i = 0; i < selectedNumbers.length; i++) {
        if (bannedNumbers.includes(selectedNumbers[i])) {
            console.log("repeat");
            validated = 0;
            break;
        }
        for (var j = 0; j < bannedNumbers.length; j++) {
            if (bannedNumbers[j] > selectedNumbers[i]) {
                bannedNumbers[j]--;
            }
        }
    }
    return validated;
}

function generateGridLayout(maxPageFit, pageFit){
    var validated=0;
    while(validated===0){
        var selectedToStreach=[];
        validated = 1;
        for (i = 0; i < maxPageFit - pageFit; i++) {
            var selected = Math.floor(Math.random() * pageFit);
            if (!(selectedToStreach.includes(selected))) {
                selectedToStreach.push(selected);
            } else i--;
        }
        validated=validateGridLayout(selectedToStreach,[3, 7, 11]);
        console.log(selectedToStreach);
    }
    return selectedToStreach;
}

function populateGallery(pageFit, images,selectedNumbers ){
    var gridElements=[];
    var imagesContainer =document.createElement("div");
    imagesContainer.className ="grid-container";
    $("#gallery").append(imagesContainer);
    $("#gallery").children().last().hide();
    for(i=currentlyDisplayed; i<pageFit+currentlyDisplayed; i++){
        var div=document.createElement("div");
        div.className = "image animateright";
        var img = document.createElement("img");
        img.src = images[i];
        div.appendChild(img);
        div.className +=" col-3";
        div.style.animationDuration=(0.3+(i-currentlyDisplayed)/50).toString()+'s';
        gridElements.push(div);
        imagesContainer.appendChild(gridElements[i-currentlyDisplayed]);
    }
    for(i=0;i<selectedNumbers.length;i++){
        if((i===0 && selectedNumbers[i]%2!==0)||(i!==0 && (selectedNumbers[i]-selectedNumbers[i-1]-1)%2!==0)){
            gridElements[selectedNumbers[i]-1].className+= " mobile-streach";
        }
        gridElements[selectedNumbers[i]].className+= " col-6";
    }
    if((pageFit-selectedNumbers[selectedNumbers.length-1]-1)%2!==0 && (pageFit-selectedNumbers[selectedNumbers.length-1]-1)>0){
        gridElements[selectedNumbers[selectedNumbers.length-1]+1].className+= " mobile-streach";
    }
}

function display(){
    var images=[];
    var i;
    for(i = 0; i < data.images.length; i++){
        if(which==="show all"){
            images.push(data.images[i].url)
        }else{
            if(data.images[i].site===which){
                images.push(data.images[i].url)
            }
        }
    }
    maximumToDisplay=images.length;
    var maxPageFit=12;
    var pageFit=10;
    var imagesLength=images.length-currentlyDisplayed;
    if(imagesLength<2){
        maxPageFit=2;
    }else if(imagesLength<4){
        maxPageFit=4;
    }else if(imagesLength<6) {
        maxPageFit=8;
    }
    if(imagesLength<10) {
        pageFit=imagesLength;
    }
    console.log(maxPageFit,pageFit);
    selectedNumbers=generateGridLayout(maxPageFit,pageFit);
    populateGallery(pageFit,images,selectedNumbers);
    currentlyDisplayed+=pageFit;
    waitForImagesToLoad();
}

function waitForImagesToLoad(){
    var imagesLoaded = 0;
    var totalImages = $('img').length;
    $('img').each(function(idx, img) {
        $('<img>').on('load', imageLoaded).attr('src', $(img).attr('src'));
    });
    function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            allImagesLoaded();
        }
    }
    function allImagesLoaded() {
        $("#gallery").children().last().show();
        $("#loader").hide();
        $("#show-loader").hide();
        console.log('ALL IMAGES LOADED');
        checkForMoreImages();
    }
}

loadData();