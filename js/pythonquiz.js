const questions = [
    {
      question: 'What is Python?',
      optionA: "High-level programming \nlanguage",
      optionB: "High Text Making Language",
      optionC: "Home tool make up language",
      optionD: "Hyperlink and Text Markup language",
      correctOption: "optionA"
    },
  
    {
      question: "What is the output of 'hello there'[0:3]",
      optionA: "ello",
      optionB: "hello",
      optionC: "the",
      optionD: "hel",
      correctOption: "optionD"
    },
  
    {
      question: "Which of the following will produce ('a', 'b','c')",
      optionA: "list(['a','b','c'])",
      optionB: "tuple(['a','b','c'])",
      optionC: "set(['a','b','c'])",
      optionD: "None of the above",
      correctOption: "optionB"
    },
  
    {
      question: "What will the output of print(type(-0.4)) be?",
      optionA: "class 'int'",
      optionB: "class 'float'",
      optionC: "class 'str'",
      optionD: "NameError: '-0.4' not defined.",
      correctOption: "optionB"
    },
  
    {
      question: "Which of the following is used to create an object?",
      optionA: "class",
      optionB: "function",
      optionC: "method",
      optionD: "constructor",
      correctOption: "optionA"
    },
  
    {
      question: "If L = ['a','b','c','d'], what is the output of print(''.join(L))?",
      optionA: "None",
      optionB: "['a','b','c','d']",
      optionC: "abcd",
      optionD: "a-b-c-d",
      correctOption: "optionC"
    },
  
    {
      question: "if y = 8 and z = lambda x : x * y print (z(6)), what is the output of print(z(6))",
      optionA: "64",
      optionB: "32",
      optionC: "14",
      optionD: "48",
      correctOption: "optionD"
    },
  
    {
      question: "If ls1 = [24, 67, 13, 25, 4, 5, 8], then what is ls1 after ls.pop(2), ls.extend[9,17]?",
      optionA: "[24, 67, 25, 4, 5, 17]",
      optionB: "[24, 67, 25, 4, 5, 8, 9, 17]",
      optionC: "[24, 67, 13, 25, 4, 5, 8, 9, 17]",
      optionD: "[24, 67, 25, 4, 5, 8, 13, 9, 17]",
      correctOption: "optionB"
    },
  
    {
      question: "i = 0; while i < 3: print i; i += 1 will output what result?",
      optionA: "0\n1\n2",
      optionB: "0\n1\n2\n3",
      optionC: "1\n2\n3",
      optionD: "0\n1\n2\n3",
      correctOption: "optionA"
    },
  
    {
      question: "user_input = input('enter number: '); if user_input = 2: print('correct'). How do you fix this code?",
      optionA: "if user_input == 2: print('correct')",
      optionB: "It is correct as is.",
      optionC: "if int(user_input) == 2: print('correct')",
      optionD: "if int(user_input) = 2: print('correct')",
      correctOption: "optionC"
    },
  
  ];
  
  let shuffledQuestions = []; //empty array to hold shuffled selected questions out of all available questions
  
  function handleQuestions() {
    //function to shuffle and push 10 questions to shuffledQuestions array
    //app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
      const random = questions[Math.floor(Math.random() * questions.length)];
      if (!shuffledQuestions.includes(random)) {
        shuffledQuestions.push(random);
      }
    }
  }
  
  let questionNumber = 1; //holds the current question number
  let playerScore = 0; //holds the player score
  let wrongAttempt = 0; //amount of wrong answers picked by player
  let indexNumber = 0; //will be used in displaying next question
  
  // function for displaying next question in the array to dom
  //also handles displaying players and quiz information to dom
  function NextQuestion(index) {
    handleQuestions();
    const currentQuestion = shuffledQuestions[index];
    document.getElementById("question-number").innerHTML = questionNumber;
    document.getElementById("player-score").innerHTML = playerScore;
    document.getElementById("display-question").innerHTML =
      currentQuestion.question;
    document.getElementById("option-one-label").innerHTML =
      currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML =
      currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML =
      currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML =
      currentQuestion.optionD;
  }
  
  function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]; //gets current Question
    const currentQuestionAnswer = currentQuestion.correctOption; //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null;
  
    options.forEach(option => {
      if (option.value === currentQuestionAnswer) {
        //get's correct's radio input with correct answer
        correctOption = option.labels[0].id;
      }
    });
  
    //checking to make sure a radio input has been checked or an option being chosen
    if (
      options[0].checked === false &&
      options[1].checked === false &&
      options[2].checked === false &&
      options[3].checked == false
    ) {
      document.getElementById("option-modal").style.display = "flex";
    }
  
    //checking if checked radio button is same as answer
    options.forEach(option => {
      if (option.checked === true && option.value === currentQuestionAnswer) {
        document.getElementById(correctOption).style.backgroundColor = "green";
        playerScore++; //adding to player's score
        indexNumber++; //adding 1 to index so has to display next question..
        //set to delay question number till when next question loads
        setTimeout(() => {
          questionNumber++;
        }, 1000);
      } else if (option.checked && option.value !== currentQuestionAnswer) {
        const wrongLabelId = option.labels[0].id;
        document.getElementById(wrongLabelId).style.backgroundColor = "red";
        document.getElementById(correctOption).style.backgroundColor = "green";
        wrongAttempt++; //adds 1 to wrong attempts
        indexNumber++;
        //set to delay question number till when next question loads
        setTimeout(() => {
          questionNumber++;
        }, 1000);
      }
    });
  }
  
  //called when the next button is called
  function handleNextQuestion() {
    checkForAnswer(); //check if player picked right or wrong option
    unCheckRadioButtons();
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
      if (indexNumber <= 9) {
        //displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
        NextQuestion(indexNumber);
      } else {
        handleEndGame(); //ends game if index number greater than 9 meaning we're already at the 10th question
      }
      resetOptionBackground();
    }, 1000);
  }
  
  //sets options background back to null after display the right/wrong colors
  function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach(option => {
      document.getElementById(option.labels[0].id).style.backgroundColor = "";
    });
  }
  
  // unchecking all radio buttons for next question(can be done with map or foreach loop also)
  function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
      options[i].checked = false;
    }
  }
  
  // function for when all questions being answered
  function handleEndGame() {
    let remark = null;
    let remarkColor = null;
  
    // condition check for player remark and remark color
    if (playerScore <= 3) {
      remark = "Bad Grades, Keep Practicing.";
      remarkColor = "red";
    } else if (playerScore >= 4 && playerScore < 7) {
      remark = "Average Grades, You can do better.";
      remarkColor = "orange";
    } else if (playerScore >= 7) {
      remark = "Excellent, Keep the good work going.";
      remarkColor = "green";
    }
    const playerGrade = (playerScore / 10) * 100;
  
    //data to display to score board
    document.getElementById("remarks").innerHTML = remark;
    document.getElementById("remarks").style.color = remarkColor;
    document.getElementById("grade-percentage").innerHTML = playerGrade;
    document.getElementById("wrong-answers").innerHTML = wrongAttempt;
    document.getElementById("right-answers").innerHTML = playerScore;
    document.getElementById("score-modal").style.display = "flex";
  }
  
  //closes score modal, resets game and reshuffles questions
  function closeScoreModal() {
    questionNumber = 1;
    playerScore = 0;
    wrongAttempt = 0;
    indexNumber = 0;
    shuffledQuestions = [];
    NextQuestion(indexNumber);
    document.getElementById("score-modal").style.display = "none";
  }
  
  //function to close warning modal
  function closeOptionModal() {
    document.getElementById("option-modal").style.display = "none";
  }
  
