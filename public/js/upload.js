const form =document.getElementById('uploadFile');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const body = new FormData(event.target);
    // Handle API call
    const url = '/api/upload';
    fetch(url, { method: 'POST', body })
    .then((resp) => {
        if(resp.status  < 200 || resp.status > 300) {
            throw new Error('Something went wrong');
        }
        return resp.json();
    })
    .then((result) => {
        console.log({ result });
    })
    .catch((err) => {
        console.log({ err });
    });
});