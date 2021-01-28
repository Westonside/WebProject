var quantity = 10;
var start = 0;
var end = start + quantity;

document.addEventListener('DOMContentLoaded', () =>{
    getPosts(start, end);
    //when the user pushes the new post button the pop up should come up
    document.getElementById('new_post').addEventListener('click', () =>{newPost()});
    //when the user wants to close the popup
    document.getElementById('close_popup').addEventListener('click', () =>{closePopup()});
    //when the user posts the post content
    document.getElementById('new_post_form').addEventListener('submit', ()=>{postPost();console.log('submited through func')});
});

stringtohtml = (str) =>{
    const parser = new DOMParser()
    return parser.parseFromString(str,"text/html").body.firstChild
}
function getPosts(start, end, section){
    //the user will increment the posts section when they reach the bottom of the page ex: 0:10 reaches bottom 11:21...
    console.log(start,end, section);
    //if a section is not specificed then go to all
    //the section allows for the user to see followed users or other users
    section = section == undefined ? "all" : section;
    fetch(`/getPost/${section}?start=${start}&end=${end}`)
    .then(response => response.json())
    .then(res =>{
        addPostDom(res);
    })
}


function addPostDom(data){
    //this function will take the json from the fetch and then add posts to the post ul
    let ul = document.getElementById('posts_list');
    data.forEach(val =>{
        console.log(val)
        // create a new li for each and add the content 
        let li = document.createElement('li');
        li.setAttribute('class', 'post');
        
        let div = document.createElement('div');
        div.setAttribute('class','post_container');
        div.setAttribute('id', val.pk);

        let coverImg = stringtohtml(`<img src=${val.coverImg}>`)

        let user = document.createElement('p');
        user.innerHTML = val.user;
        user.setAttribute('class', 'user_username')

        let title = document.createElement('p');
        title.innerHTML = val.title;
        title.setAttribute('class','post_title');

        let content = document.createElement('p');
        content.innerHTML = val.content;


        let timeEdit = document.createElement('p');
        timeEdit.setAttribute('class', 'time_edit');

        let timeSpan = document.createElement('span');
        timeSpan.setAttribute('class','time');
        timeSpan.innerHTML = val.timestamp;

        let editSpan = document.createElement('span');
        editSpan.setAttribute('class', 'edit');
    
        let editButton = document.createElement('button');
        editButton.setAttribute('class', 'editButton');
        editButton.innerHTML = 'Edit Post'

        editSpan.appendChild(editButton);

        timeEdit.appendChild(timeSpan);
        
        if(val.canedit){
            timeEdit.appendChild(editSpan); 
        }


        
        
        div.appendChild(user);
        div.appendChild(title);
        div.append(coverImg);
        div.appendChild(content);
        div.appendChild(timeEdit);
        li.appendChild(div);
        ul.appendChild(li);

    })
}

function newPost(){
    let popup = document.querySelector('#popup_post');
    popup.style.animationPlayState ='running';
    popup.style.display = 'block';
}

function closePopup(){
    let popup = document.querySelector('#popup_post');
    popup.style.display = 'none';

}

function postPost(e){
    let form = document.getElementById('new_post_form').elements;
    // console.log(form.elements);
    let title = document.getElementById('post_title');
    let content = document.getElementById('post_content');
    let coverImg = document.getElementById('post_cover_url');
    console.log(title.value )
    let success = title.value && content.value ? true : false;
    if(!success){
        title.style.borderColor = !email.value ? 'red' : 'none';
        contents.style.borderColor = !password.value ? 'red' : 'none';
    }
    else{
        fetch('/postPost', {
            method: 'POST',
            body: JSON.stringify({
                title: title.value,
                contents: content.value,
                coverImg: coverImg.value,
            })
        })
        .then(response => console.log(response.json()))
    }
    e.preventDefault();
    return false;
}