const dropArea = document.querySelector('.container');//1
let file;
const dragText = dropArea.querySelector('header');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('input');


dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('active');
})
dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('active');
})
dropArea.addEventListener('drop', (e) => {
    e.preventDefault();

    file = e.dataTransfer.files[0]; // getting user select file and [0] this means if user select multiple files then we will select only the first one
    showFile();
})

button.onclick = () => {
    input.click(); // if user click on the button then the input also clicked
}

input.addEventListener('change', function() {
    file = this.files[0]
    showFile();
    dropArea.classList.add('active');
})

function showFile() {
    let fileType = file.type;
    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];// adding some valid image extensions to array
    if (validExtensions.includes(fileType)) { // if user selected file is an image file
        let fileReader = new FileReader();// passing file source in fileURL variable
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}">`;
            dropArea.innerHTML = imgTag
        }
        fileReader.readAsDataURL(file);
    }else{
        alert('This is not an image file format');
        dropArea.classList.remove('active');
    }
}