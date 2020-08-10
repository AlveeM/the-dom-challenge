const counter = document.getElementById('counter');
const plusB = document.getElementById('+');
const minusB = document.getElementById('-');
const timerToggleB = document.getElementById('pause');
const likeB = document.getElementById('<3');
const likesUl = document.querySelector('.likes');
const commentDiv = document.getElementById('list');
const commentSubmitB = document.getElementById('submit');
const commentForm = document.getElementById('comment-form');
let timer = setInterval(incrementCounter, 1000);

let paused = false;
const likeMap = {};
const commentMap = [];

plusB.addEventListener('click', incrementCounter);
minusB.addEventListener('click', decrementCounter);
likeB.addEventListener('click', addLike);
timerToggleB.addEventListener('click', toggleTimer);
commentForm.addEventListener('submit', addComment);

function addComment(e) {
  e.preventDefault();
  console.log(e);
  const commentText = e.target['comment-input'].value;
  commentMap.push(commentText);
  displayComments();
}

function displayComments() {
  commentDiv.innerHTML = "";
  for (let comment of commentMap) {
    const p = document.createElement('p');
    p.textContent = comment;
    commentDiv.append(p);
  }
}

function addLike(e) {
  const num = getCount();
  likeMap[num] === undefined ? likeMap[num] = 0 : likeMap[num] += 1;
  displayLikes();
}

function displayLikes() {
  likesUl.innerHTML = "";
  for (const key in likeMap) {
    const li = document.createElement('li');
    li.textContent = `${key} has been liked ${likeMap[key]} times`;
    likesUl.append(li);
  }
}

function toggleTimer(e) {
  if (paused) {
    paused = !paused;
    timer = setInterval(incrementCounter, 1000);
    timerToggleB.innerText = "pause";
    buttonDisabledToggle();
  } else {
    paused = !paused;
    clearInterval(timer);
    timerToggleB.innerText = "resume";
    buttonDisabledToggle();
  }
}

function incrementCounter(e) {
  counter.textContent = getCount() + 1;
}

function decrementCounter(e) {
  counter.textContent = getCount() - 1;
}

function buttonDisabledToggle() {
  plusB.disabled = paused;
  minusB.disabled = paused;
  likeB.disabled = paused;
  commentSubmitB.disabled = paused;
}

function getCount() {
  return parseInt(counter.textContent);
}