# GA_Cricket_Team_Selection
Genetic Approach to making a team selection, based on previous performance

live demo: https://cricket-selection-ga.herokuapp.com/

### Steps used:
1. Initialize population
2. Calculate fitness values for each `chromosome`
3. Apply `roulette selection` or `stable selection` for selecting `chromosomes` for crossover in the next step
4. Select a random `gene` for crossover
5. Implement mutation for a `chromosome`
6. Create new population with half of them produced by crossover and the other half by selection of the fittest
7. Repeat steps `2 to 6` while the stop condition is not met or until user intervention of the process 

### Todos (for personal reference)
 - More data to be used for implementation. Also provide team selection stats for various game formats and for this
   the APIs that can be used are:
   - [Roaunaz cricket API](https://www.cricketapi.com/)
   - [Kaggle](https://www.kaggle.com/cclayford/cricinfo-statsguru-data#ODIs%20-%20Bowling.csv)
   - [NDTV](https://sports.ndtv.com/cricket/players/a)
   - [HowzStat](http://cricket-stats.net/)
   - [RPubs](https://rpubs.com/dgolicher/cricket_download)
   - [Cricksheet](https://cricsheet.org/downloads/)
   - [CricketCountry](http://www.cricketcountry.com/players/)
   - [HowStat](http://www.howstat.com/cricket/Statistics/Batting/BattingAverages.asp?Stat=1)
   - [ESPN](http://www.espncricinfo.com/india/content/player/country.html?country=6)
 - Fitness function to be improved
 - `d3.js` and `plotly.js` to be used for graphical representation
 
 ### Steps to download and run code locally
 
 ```Shell
 $ git clone https://github.com/himanish-star/GA_Cricket_Team_Selection.git
 $ cd GA_Cricket_Team_Selection
 $ npm start
 ```
 open http://localhost:3000/
