<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>DumpTrump Quiz</title>
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
</head>
<?php
    session_start();
    $quizid = $_SESSION['fid']; 
?> 
<body>
    <div id="processwrapper">
        
        <?php
            $score=0;
            if($quizid == 1) {
            $answer1= $_POST['answerOne'];
            $answer2= $_POST['answerTwo'];
            $answer3= $_POST['answerThree'];
            $answer4= $_POST['answerFour'];
        
            if($answer1== "B") {$score++;}
                else {
                    echo "<p>Frage 1 wurde falsch beantwortet.</p>";
                }
            if($answer2== "C") {$score++;}
                else {
                    echo "<p>Frage 2 wurde falsch beantwortet.</p>";
                }
            if($answer3== "B") {$score++;}
                else {
                    echo "<p>Frage 3 wurde falsch beantwortet.</p>";
                }
            if($answer4== "A") {$score++;}
                else {
                    echo "<p>Frage 4 wurde falsch beantwortet.</p>";
                }
        
            echo "<center>Your Score is <br> <span class='score'>$score/4</span></center>";
            }

            elseif($quizid == 2) {
            $answer1= $_POST['answerOne'];
            $answer2= $_POST['answerTwo'];
            $answer3= $_POST['answerThree'];
            $answer4= $_POST['answerFour'];
        
            if($answer1== "B") {$score++;}
                else {
                    echo "<p>Frage 1 wurde falsch beantwortet.</p>";
                }
            if($answer2== "A") {$score++;}
                else {
                    echo "<p>Frage 2 wurde falsch beantwortet.</p>";
                }
            if($answer3== "C") {$score++;}
                else {
                    echo "<p>Frage 3 wurde falsch beantwortet.</p>";
                }
            if($answer4== "B") {$score++;}
                else {
                    echo "<p>Frage 4 wurde falsch beantwortet.</p>";
                }
        
            echo "<center>Your Score is <br><span class='score'>$score/4</span></center>";
            }

            else {
            $answer1= $_POST['answerOne'];
            $answer2= $_POST['answerTwo'];
            $answer3= $_POST['answerThree'];
            $answer4= $_POST['answerFour'];
        
            if($answer1== "A") {$score++;}
                else {
                    echo "<p>Frage 1 wurde falsch beantwortet.</p>";
                }
            if($answer2== "C") {$score++;}
                else {
                    echo "<p>Frage 2 wurde falsch beantwortet.</p>";
                }
            if($answer3== "A") {$score++;}
                else {
                    echo "<p>Frage 3 wurde falsch beantwortet.</p>";
                }
            if($answer4== "C") {$score++;}
                else {
                    echo "<p>Frage 4 wurde falsch beantwortet.</p>";
                }
        
            echo "<center>Your Score is <br><span class='score'>$score/4</span></center>";
            }

            if ($score < 3) {
                echo "
                    <p>Nicht genug Punkte gesammelt, bitte das <a href='index.php'>Quiz</a> wiederholen!</p>
                    ";
            }
            else {
                echo "
                    <p>Du darfst nun das <a href='../mpr_game/index.php'>Spiel</a> spielen, oder das <a href='index.php'>Quiz</a> wiederholen!</p>
                    ";
            }
        ?>
        
    </div>
    
</body>
</html>