const notif = document.querySelector(".notif");

let inpA0=false;
let inpA1=false;
const done=document.querySelector(".btn");
const h=  document.querySelectorAll(".inp");

  const apiKey="AIzaSyBVRPZL75aHfciuWDUK9xFs-qKzWO5CAIA";


// Initialize Firebase

 async function signIn() {
  const email = h[0].value;
  const password = h[1].value;

  try {
                const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    // Successful login
                    notif.textContent = "Login successful"; 
                  notif.classList.remove("err"); localStorage.setItem("toKey", data.idToken);
                  localStorage.setItem("email", email);
                    notif.classList.add("succ");
                    window.location.href="./dashboard.html"
                } else {
                    // Handle errors here
                    notif.textContent = "Error!";
                    notif.classList.remove("succ");
                    notif.classList.add("err");
                }
            } catch (error) {
                console.error("Error:", error);
                
            }
}





h[0].addEventListener("input", (e) => {
  const txtPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const v =  txtPattern.test(e.target.value);
  e.target.value.length>6&& v?inpA0=true:inpA0=false;
  if(inpA0&&inpA1){
    done.classList.add("active");
  }else{
    done.classList.remove("active");
  }
});
h[1].addEventListener("input", (event) => {
  event.target.value.length>7?inpA1=true:inpA1=false;
  if(inpA0&&inpA1){
    done.classList.add("active");
  }else{
    done.classList.remove("active");
  }
});
done.addEventListener("click",e=>{if(inpA0&&inpA1){
  done.children[0].textContent ="Connexion";
    done.children[1].classList.toggle("rot");
done.parentElement.classList.toggle("con");
  done.textContent="Connexion";
  signIn();
}
});
document.addEventListener("keydown",e=>{
  if(inpA0&&inpA1&&e.keyCode==13){
    h[1].blur();
    done.children[0].textContent ="Connexion";
    done.children[1].classList.toggle("rot");
    done.parentElement.classList.toggle("con");
    signIn();
  }
  
});

// Firebase API URL for sending a password reset email
const API_URL = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key="+apiKey;

// Function to send the password reset email
async function sendPasswordResetEmail (email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const valid =  emailPattern.test(email);
  if(!valid){
    notif.textContent = "Invalid email!";
    notif.classList.remove("succ");
        notif.classList.add("err");
        return;
  }
    const data = {
        requestType: "PASSWORD_RESET",
        email: email
    };
    
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
          notif.textContent = "Error sending password reset email.";
          notif.classList.remove("succ");
        notif.classList.add("err");
            throw new Error("Failed to send password reset email.");
        }

        const result = await response.json();
        
        notif.textContent = "Password reset email sent successfully.";
        notif.classList.remove("err");
                    notif.classList.add("succ");
    } catch (error) {
        console.error("Error:", error);
        notif.textContent = "Error sending password reset email.";
        notif.classList.remove("succ");
        notif.classList.add("err");
    }
}

const resetPwd = document.querySelector(".resetPwd");
resetPwd.addEventListener("click",e=>{
  document.querySelector(".rpD").children[1].focus();
  document.querySelector(".rpD").classList.add("show");
  document.querySelector(".rpD").children[0].value= h[0].value;
});

document.querySelector(".rpD").children[1].addEventListener("click",e=>{
  sendPasswordResetEmail(document.querySelector(".rpD").children[0].value);
});

const ca = document.querySelector(".newAcc");
ca.addEventListener("click", e => {
  document.querySelector(".caD").children[2].focus();
  document.querySelector(".caD").classList.add("show");
  document.querySelector(".caD").children[0].value = h[0].value;
});
let inpA2=false;
let inpA3=false;
document.querySelector(".caD").children[2].addEventListener("click",async (e) => {


            const email = document.querySelector(".caD").children[0].value;
            const password = document.querySelector(".caD").children[1].value;

            try {
          const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    // Successful account creation
                    notif.textContent = "User created successfully"; 
                  notif.classList.remove("err");
       notif.classList.add("succ");
                    
                  
                } else {
                    // Handle errors
                    notif.textContent = "signupError"; 
                  notif.classList.add("err");
       notif.classList.remove("succ");
                    
                }
            } catch (error) {
                
                notif.textContent = "An error occurred. Please try again."; 
                  notif.classList.add("err");
       notif.classList.remove("succ");
            }
});

document.querySelector(".caD").children[0].addEventListener("input", e => {
  
  const txtPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const v =  txtPattern.test(e.target.value);
 e.target.value.length>6&& v?inpA2=true:inpA2=false;
  if(inpA3&& inpA2){
    document.querySelector(".caD").children[2].classList.add("on")
  }else{
    document.querySelector(".caD").children[2].classList.remove("on")
  }
});

document.querySelector(".caD").children[1].addEventListener("input", e => {
  e.target.value.length>7?inpA3=true:inpA3=false;
  if(inpA3&& inpA2){
    document.querySelector(".caD").children[2].classList.add("on")
  }else{
    document.querySelector(".caD").children[2].classList.remove("on")
  }
});
function repoSize(){
// Replace with your GitHub username, repository name, and personal access token
const username = 'Pgeniebox';
const repo = 'drepo';
const token = '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';

// GitHub API endpoint for repository details
const url = `https://api.github.com/repos/${username}/${repo}`;

// Fetch repository details
fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json'
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log("Repository Details:", data);

    // Example: Calculate the ratio of repository size to GitHub's 2 GB limit
    const repoSizeKB = data.size; // Size in KB
    const maxRepoSizeKB = 2 * 1024 * 1024; // 2 GB in KB
    const sizeRatio = (repoSizeKB / maxRepoSizeKB) * 100;

    console.log(`Repository Size: ${repoSizeKB} KB`);
    console.log(`Usage of 2 GB limit: ${sizeRatio.toFixed(2)}%`);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

async function fetchWithAuthToken(token) {
  // URL to the specific key you want to access
  const url = `https://downloadr-s-default-rtdb.firebaseio.com/name.json?auth=${token}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");

    const value = await response.json();
    console.log("Fetched Value:", value);
    return value;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Example usage with an existing token
const token = localStorage.getItem("toKey"); // replace this with the actual token
fetchWithAuthToken(token);