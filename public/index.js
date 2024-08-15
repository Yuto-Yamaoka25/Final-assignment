// public/index.js
window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.user-name').forEach((elem) => {
      elem.addEventListener('click', (event) => {
        alert(event.target.innerHTML);
      });
    });
    document.querySelector('.send-button').addEventListener('click', (event) => {
      const text = document.querySelector('.input-text').value;
      fetch('/api/user', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: text }) })
      window.location.reload()
    });

    document.querySelector(".delete-button").addEventListener("click",(event) =>{
        const dltext =document.querySelector(".dl-text").value;
        fetch("/api/user",{method:"DELETE",headers:{ 'Content-Type': 'application/json' },body: JSON.stringify({ name: dltext }) })
        window.location.reload()
    });

    document.querySelector(".image-button").addEventListener("click", (event) => {
        const userList = document.querySelector('.user-list');

        const img = document.createElement('img')
        img.src = '/static/node_log.png'
        img.alt = 'User Image'
        img.className = 'user-image'
        const li = document.createElement('li');
        li.appendChild(img);
        userList.appendChild(li);
    });
    
});
