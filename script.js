
// ---- text scramble on buttons shout out to OnlineTutorials on YT : https://www.youtube.com/watch?v=yr7t7zvPtLI ---- //
document.querySelectorAll(".button, .button-green").forEach(element => 
    {
        let randomChars = "ABCDEFGHIJKLMOPQRSTUV!@#$%^&*()_+";
        let originalText = element.textContent.trim();
    element.addEventListener('mouseover', () => 
        {
            let iterations = 0;
            let interval = setInterval(() => {
                element.textContent = originalText.split("").map((char, index) => {
                    if (index < iterations) return char;
                    return randomChars.charAt(Math.floor(Math.random() * randomChars.length));
                }).join("");
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    }
                iterations += 1 / 2;
            }, 50);
        });
    });



// const buttons = document.querySelector('.button-green')
// const form = document.querySelector('#contact-form')
//     buttons.addEventListener('click', (event) => {
//         //form.style.display = 'block';
//     });


// http request to hard-coded repos (must update these as more projects come to life) takes the promise and maps it into an array
async function getData(){
    const entries = [];
    const REPOS = [
        'mwalgren/Battle_for_ascendancy','mwalgren/OSRS-roguelike-game','mwalgren/MW-Personal-Portfolio'];
    try { 
        for (const repo of REPOS){
            const url = `https://api.github.com/repos/${repo}/commits?per_page=5`;
            const response = await fetch(url);
            const commits = await response.json();
            for(const c of commits){
            const title = c.commit.message.split('\n')[0];    
            const dateFormatted = new Date(c.commit.author.date).toISOString().split('T')[0];
            entries.push({date: dateFormatted, title, repo});
            }

        }

    } catch (error) {
        console.error(error.message);
    }
    entries.reverse();
    //entries.splice(5); leaving this here in case I want to limit the # of results later//
    return entries;

}

// I'm using the array that I constructed from the http request to map list items into the system-log ul//
function getLog(entries){
const container = document.querySelector(".log-list");

 if (!Array.isArray(entries)) {
    console.error("Expected an array for entries");
    return;
 }
container.innerHTML = entries.map(e => `<li> <span class='log-date'> ${e.date} </span> ${e.title}</li>`).join('');

}

//run the function duh // 
getData().then(getLog);