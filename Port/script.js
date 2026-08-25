document.querySelectorAll('a[href]').forEach(element => 
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
