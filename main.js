const player_stats = require("./data.json")

function generateRandomChromosome() {
  let used = new Array(26);
  for(let i=0; i<26; i++)
    used[i]=0;

  let chromosome = new Array(16);
  for(let i=0; i<16; i++) {
    let randid = Math.floor(Math.random()*25)+1;
    if(!used[randid]) {
      chromosome[i] = randid+1;
      used[randid] = 1;
    } else {
      while(used[randid]) {
        randid = Math.floor(Math.random()*25)+1
      }
      chromosome[i] = randid+1;
      used[randid] = 1;
    }
  }
  return chromosome;
}

function initializePopulation() {
  /*
  chromosome structure
  array of size 26,
  set bits represent member selected for team
  reset bits represent member not selected for team
  */
  return new Promise((resolve, reject) => {
    let population = [];
    let chromosomeNumber = new Array(0,1,2,3,4,5,6,7,8,9);
    chromosomeNumber.forEach(async num => {
      await population.push(generateRandomChromosome());
    });
    resolve(population);
  })
}

function calculateFitness(chromosome) {
  let fitness_values = new Array(chromosome.length);
  let fitnessAvg = 0;
  for(let i=0; i<chromosome.length; i++) {
    const pid = chromosome[i]-1;
    const data = player_stats[pid];
    const GP = data.played;
    const GL = data.lost;
    const LMW = data.won;
    const fit_val = (1 - (GL/GP) + LMW)/(1 + LMW);
    fitness_values[i] = fit_val;
    fitnessAvg += fit_val;
  }
  return fitnessAvg/16;
}

async function startProcess() {
  //#step 1: initialize population of size 10
  let population = await initializePopulation();

  //#step 2: calculate fitness of each chromosome
  let fitnessIndexes = [];
  population.forEach(async (chromosome, i) => {
    await fitnessIndexes.push({
      crNum: i,
      fitIndex: calculateFitness(chromosome)
    });
  });
  fitnessIndexes.sort((a, b) => {
    return a.fitIndex < b.fitIndex;
  })
  //population sorted on their basis of fitnessIndexes
  console.log(fitnessIndexes);
}

// start of the Genetic Approach
startProcess();
