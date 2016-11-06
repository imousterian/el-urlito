
(function(){
    document.querySelector('input[name=url-field]').value = "";
    document.querySelector('button').addEventListener('click', function(e){
        e.preventDefault();
        var url = document.querySelector('input[name=url-field]').value;
        if(url){
            encodeUrl(url);
        }else{
            displayError("Please input some url first");
        }  
    })
})();

function encodeUrl(url){
    fetch('/new/' + url, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        }).then(function(resp) {
            if (!resp.ok) {
                displayError(resp.statusText);
                return false;
            }
            return resp.json();
        }).then(function(data){
            if(data) displayResults(data);
        }).catch(function(err){
            // console.log('err', err)
        })
}

function redirectTo(url){
    fetch('/' + url.split('/').pop(), {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        }).then(function(resp) {
            if (!resp.ok) {
                displayError(resp.statusText);
                return false;
            }
            return resp.json();
        }).then(function(data){
            if(data) window.location = data.url;
        }).catch(function(err){
            // console.log('err', err)
        })        
}

function displayResults(data){
    document.querySelector('#long_url').innerHTML = data.original_url;
    var resultHTML = "<button id='link'>"+ "<code>" + data.short_url + "</code></button>";
    document.querySelector('#short_url').innerHTML = resultHTML;
    document.getElementById("link").addEventListener('click', function(event){
        event.preventDefault();
        redirectTo(data.short_url);
    })
}

function displayError(err){
    document.querySelector('#error-message').innerHTML = err;
    document.querySelector('#error-message').classList.add('alert-danger');
    setTimeout(function() {
        document.querySelector('#error-message').innerHTML = "";
        document.querySelector('#error-message').classList.remove('alert-danger');
    }, 5000);
}