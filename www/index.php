<!DOCTYPE html>
<html lang="de">
<?php 
    session_start();
?>
<head>
    <meta charset="UTF-8">
    <title>DumbTrump Quiz</title>
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
    
</head>
<body>
   <div class="container"> 
    <?php
        $rid = rand(1,3);
        $_SESSION['fid'] = $rid;
    ?>
       
   
        <h2>Herzlich Willkommen zum Dumbtrump-Quiz</h2>
    <br/>   
    <br/>
    <br/>
    
    
    <?php
        
        if ($rid == 1) {
            
            echo "
                
                <form action='process.php' method='post' class='quizForm' id='1'>
                <h2>Dies ist das Games-Quiz!</h2>
                
                <div class='ol'>
                <h3>Aus welchem Land kommt Tetris ursprünglich?</h3>
                    
                    <div class='radiocontainer'>
                        <div>    
                            <label for='answerOne1' class='radiobutton'>
                            <input type='radio' name='answerOne' id='answerOne1' value='A' required />
                            <span>A) Japan</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerOne2' class='radiobutton'>
                            <input type='radio' name='answerOne' id='answerOne2' value='B' />
                            <span>B) Sowjetunion</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerOne3' class='radiobutton'>
                            <input type='radio' name='answerOne' id='answerOne3' value='C'/>
                            <span>C) USA</span>
                            </label>
                        </div>    
                    </div> <!--radiocontainer-->
                    
                
                
                 <h3>Wie lautet der Name des Protagonisten in GTA Vice City?</h3>
                
                    
                    <div class='radiocontainer'>
                        <div>    
                            <label for='answerTwo1' class='radiobutton'>
                            <input type='radio' name='answerTwo' id='answerTwo1' value='A' required />
                            <span>A) Claude Speed</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerTwo2' class='radiobutton'>
                            <input type='radio' name='answerTwo' id='answerTwo2' value='B' />
                            <span>B) Carl Johnson</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerTwo3' class='radiobutton'>
                            <input type='radio' name='answerTwo' id='answerTwo3' value='C'/>
                            <span>C) Tommy Vercetti</span>
                            </label>
                        </div>    
                    </div> <!--radiocontainer-->
                    
                
                <h3>Wie lautet der Name der Stadt, welche die Magierakademie in The Elder Scrolls V: Skyrim beherbergt?</h3>
                
                    
                    <div class='radiocontainer'>
                        <div>    
                            <label for='answerThree1' class='radiobutton'>
                            <input type='radio' name='answerThree' id='answerThree1' value='A' required />
                            <span>A) Windhelm</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerThree2' class='radiobutton'>
                            <input type='radio' name='answerThree' id='answerThree2' value='B' />
                            <span>B) Winterfeste</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerThree3' class='radiobutton'>
                            <input type='radio' name='answerThree' id='answerThree3' value='C'/>
                            <span>C) Weißlauf</span>
                            </label>
                        </div>    
                    </div> <!--radiocontainer-->
                    
                
                <h3>Welches World Of Warcraft-Addon feierte 2012 release?</h3>
                
                    
                    <div class='radiocontainer'>
                        <div>    
                            <label for='answerFour1' class='radiobutton'>
                            <input type='radio' name='answerFour' id='answerFour1' value='A' required />
                            <span>A) Mists of Pandaria</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerFour2' class='radiobutton'>
                            <input type='radio' name='answerFour' id='answerFour2' value='B' />
                            <span>B) Cataclysm</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerFour3' class='radiobutton'>
                            <input type='radio' name='answerFour' id='answerFour3' value='C'/>
                            <span>C) Warlords of Draenor</span>
                            </label>
                        </div>    
                    </div> <!--radiocontainer-->
                    
                </div> <!-- ol -->
                <input type='submit' value='Give it a try, bitch!' class='button' />
              </form>  
            ";
        }
        
        if ($rid == 2) {
            
            echo "
                
                <form action='process.php' method='post' class='quizForm' id='1'>
                <h2>Dies ist das Film-Quiz!</h2>
                
                <div class='ol'>
                <h3>Aus welchem Film stammt das Zitat 'Ich hab ein Glas voll Dreck!'?</h3>
                   
                    <div class='radiocontainer'>
                        <div>    
                            <label for='answerOne1' class='radiobutton'>
                            <input type='radio' name='answerOne' id='answerOne1' value='A' required />
                            <span>A) Herr der Ringe</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerOne2' class='radiobutton'>
                            <input type='radio' name='answerOne' id='answerOne2' value='B' />
                            <span>B) Fluch der Karibik</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerOne3' class='radiobutton'>
                            <input type='radio' name='answerOne' id='answerOne3' value='C'/>
                            <span>C) Harry Potter</span>
                            </label>
                        </div>    
                    </div> <!--radiocontainer-->
                    
                
                
                 <h3>Wie viele Avengers gibt es? (Marvel's The Avengers)</h3>
                
                   
                    <div class='radiocontainer'>
                        <div>    
                            <label for='answerTwo1' class='radiobutton'>
                            <input type='radio' name='answerTwo' id='answerTwo1' value='A' required />
                            <span>A) Sieben</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerTwo2' class='radiobutton'>
                            <input type='radio' name='answerTwo' id='answerTwo2' value='B' />
                            <span>B) Acht</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerTwo3' class='radiobutton'>
                            <input type='radio' name='answerTwo' id='answerTwo3' value='C'/>
                            <span>C) Sechs</span>
                            </label>
                        </div>    
                    </div> <!--radiocontainer-->
                    
                
                <h3>Welcher Schauspieler hat bis zum Jahr 2016 keinen einzigen Oscar gewonnen?</h3>
                
                   
                    <div class='radiocontainer'>
                        <div>    
                            <label for='answerThree1' class='radiobutton'>
                            <input type='radio' name='answerThree' id='answerThree1' value='A' required />
                            <span>A) Julia Roberts</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerThree2' class='radiobutton'>
                            <input type='radio' name='answerThree' id='answerThree2' value='B' />
                            <span>B) Johnny Depp</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerThree3' class='radiobutton'>
                            <input type='radio' name='answerThree' id='answerThree3' value='C'/>
                            <span>C) Leonardo Di Caprio</span>
                            </label>
                        </div>    
                    </div> <!--radiocontainer-->
                    
                
                <h3>Wer war der Regisseur des letzten Bond-Filmes (Spectre)?</h3>
                
                   
                    <div class='radiocontainer'>
                        <div>    
                            <label for='answerFour1' class='radiobutton'>
                            <input type='radio' name='answerFour' id='answerFour1' value='A' required />
                            <span>A) Martin Campbell</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerFour2' class='radiobutton'>
                            <input type='radio' name='answerFour' id='answerFour2' value='B' />
                            <span>B) Sam Mendes</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerFour3' class='radiobutton'>
                            <input type='radio' name='answerFour' id='answerFour3' value='C'/>
                            <span>C) Marc Forster</span>
                            </label>
                        </div>    
                    </div> <!--radiocontainer-->
                    
                </div> <!-- ol -->
                <input type='submit' value='Give it a try, bitch!' class='button' />
              </form>  
            ";
        }
        
        if ($rid == 3) {
            
            echo "
                
                <form action='process.php' method='post' class='quizForm' id='1'>
                <h2>Dies ist das Serien-Quiz!</h2>
                
                <div class='ol'>
                <h3>Wie heißt die ständige Begleiterin Aangs in der Serie Avatar - The Last Airbender?</h3>
                   
                    <div class='radiocontainer'>
                        <div>    
                            <label for='answerOne1' class='radiobutton'>
                            <input type='radio' name='answerOne' id='answerOne1' value='A' required />
                            <span>A) Kathara</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerOne2' class='radiobutton'>
                            <input type='radio' name='answerOne' id='answerOne2' value='B' />
                            <span>B) Azula</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerOne3' class='radiobutton'>
                            <input type='radio' name='answerOne' id='answerOne3' value='C'/>
                            <span>C) Toph</span>
                            </label>
                        </div>    
                    </div> <!--radiocontainer-->
                    
                
                
                 <h3>Mit welcher Figur verbindet man die Worte 'Ich bin bereit!'?</h3>
                
                   
                    <div class='radiocontainer'>
                        <div>    
                            <label for='answerTwo1' class='radiobutton'>
                            <input type='radio' name='answerTwo' id='answerTwo1' value='A' required />
                            <span>A) Sheldon Cooper (Big Bang Theory)</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerTwo2' class='radiobutton'>
                            <input type='radio' name='answerTwo' id='answerTwo2' value='B' />
                            <span>B) Gregory House (Dr. House)</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerTwo3' class='radiobutton'>
                            <input type='radio' name='answerTwo' id='answerTwo3' value='C'/>
                            <span>C) Spongebob Schwammkopf </span>
                            </label>
                        </div>    
                    </div> <!--radiocontainer-->
                    
                
                <h3>Wie kommuniziert Hector Salamanca (Breaking Bad)?</h3>
                
                   
                    <div class='radiocontainer'>
                        <div>    
                            <label for='answerThree1' class='radiobutton'>
                            <input type='radio' name='answerThree' id='answerThree1' value='A' required />
                            <span>A) Klingeln</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerThree2' class='radiobutton'>
                            <input type='radio' name='answerThree' id='answerThree2' value='B' />
                            <span>B) Pfeifen</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerThree3' class='radiobutton'>
                            <input type='radio' name='answerThree' id='answerThree3' value='C'/>
                            <span>C) Gebärdensprache</span>
                            </label>
                        </div>    
                    </div> <!--radiocontainer-->
                    
                
                <h3>Welches Verbrechen will Jonathan Pine mit dem Aufgeben seines Berufes aufklären? (The Night Manager)</h3>
                
                   
                    <div class='radiocontainer'>
                        <div>    
                            <label for='answerFour1' class='radiobutton'>
                            <input type='radio' name='answerFour' id='answerFour1' value='A' required />
                            <span>A) Menschenhandel</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerFour2' class='radiobutton'>
                            <input type='radio' name='answerFour' id='answerFour2' value='B' />
                            <span>B) Mafiatätigkeiten</span>
                            </label>
                        </div>
                        <div>
                            <label for='answerFour3' class='radiobutton'>
                            <input type='radio' name='answerFour' id='answerFour3' value='C'/>
                            <span>C) Mord</span>
                            </label>
                        </div>    
                    </div> <!--radiocontainer-->
                    
                </div> <!-- ol -->
                <input type='submit' value='Give it a try, bitch!' class='button' />
            </form> 
            ";
        }
    ?>
    
    </div>
</body>
</html>       
