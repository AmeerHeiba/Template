let apiQuotes = [];
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote-Btn");
const TweetBtn = document.getElementById("twitter");
const loaderView = document.getElementById("loader");
const divContainer = document.getElementById("quote-container");

function newQuote(){

    loading();

    const quote = apiQuotes [Math.floor(Math.random()*apiQuotes.length)];
    

    if (!quote.author)
    {
        authorText.textContent = 'Unkowen';
    } else{
        authorText.textContent = quote.author;
    }

    if (quote.text.length > 50)
    {
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    
    console.log(quote.author);
    
    complete();

}

async function getQuotes(){

    loading();
    const apiUrl = 'https://type.fit/api/quotes';


    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) 
    {
        console.log(error);
        
    }

    complete();

}

function tweetQuote() {

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

function loading (){

    loaderView.hidden = false;
    divContainer.hidden = true;

}

function complete() {

    loaderView.hidden = true;
    divContainer.hidden = false;
}

//On Load

getQuotes();

// Upon Clicking new Quote Btn

newQuoteBtn.addEventListener('click', getQuotes);

// Upon Clicking Tweet Btn 

TweetBtn.addEventListener('click', tweetQuote);
