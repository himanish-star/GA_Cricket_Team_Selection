const player_stats = require("./data files/data.json")
const fs = require('fs');
let population_size = 10;
const t_players = 26;
const s_players = 11;
let t_generations = 1000;
function generateRandomChromosome() {
  let used = new Array(t_players);
  for(let i=0; i<t_players; i++)
    used[i]=0;

  let chromosome = new Array(s_players);
  for(let i=0; i<s_players; i++) {
    let randid = Math.floor(Math.random()*(t_players-1));
    if(!used[randid]) {
      chromosome[i] = randid+1;
      used[randid] = 1;
    } else {
      while(used[randid]) {
        randid = Math.floor(Math.random()*(t_players-1));
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
  array of size t_players,
  set bits represent member selected for team
  reset bits represent member not selected for team
  */
  return new Promise((resolve, reject) => {
    let population = [];
    let chromosomeNumber = new Array(population_size);
    for(let i=0; i<population_size; i++)
      chromosomeNumber[i] = 0;
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
    const LMW = data.prev_hist;
    const fit_val = (1-(GL/GP)+LMW)/(1+LMW);
    fitness_values[i] = fit_val;
    fitnessAvg += fit_val;
  }
  return fitnessAvg/16;
}

async function startProcess(gen, pop) {
  t_generations = gen;
  population_size = pop;
  //#step 1: initialize population of size population_size
  let population = await initializePopulation();

  let fitIndexesX = [], fitIndexesX2 = [];
  //#step 2: calculate fitness of each chromosome
  for(let generation = 0; generation < t_generations; generation++) {
    let fitnessIndexes = [];
    population.forEach(async (chromosome, i) => {
      await fitnessIndexes.push({
        crNum: i,
        fitIndex: calculateFitness(chromosome)
      });
    });
    await fitnessIndexes.sort((a, b) => {
      return a.fitIndex < b.fitIndex;
    })

    let avgFitIndex = 0;
    fitnessIndexes.forEach(e => {
      avgFitIndex += e.fitIndex;
    })
    fitIndexesX.push(fitnessIndexes[0].fitIndex);
    fitIndexesX2.push(avgFitIndex/population_size);
    //#step 3: selection for crossover and crossover
    let new_population = [];
    for(let i=0;i<population_size/2;i++) {
      const chromosomeP1 = population[fitnessIndexes[i].crNum];
      const chromosomeP2 = population[fitnessIndexes[population_size-i-1].crNum];
      //selecting the best and the worst population
      let used = new Array(t_players);
      for(let i=0; i<t_players; i++)
        used[i] = 0;
      //crossover
      let randPos = Math.floor(Math.random() * (s_players));
      let chromosomeOffSpring = [];
      for(let j=0; j<randPos; j++) {
        chromosomeOffSpring.push(chromosomeP1[j]);
        used[chromosomeP1[j]-1]=1;
      }
      let remainingCount = s_players - randPos - 1;
      for(let j=0; j<s_players, remainingCount!=0; j++) {
        if(!used[chromosomeP2[j]-1]) {
          chromosomeOffSpring.push(chromosomeP2[j]);
          used[chromosomeP2[j]-1]=1;
          remainingCount--;
        }
      }
      //mutation
      let randomGene = Math.floor(Math.random() * s_players);
      for(let i=0; i<t_players; i++) {
        if(!used[i]) {
          chromosomeOffSpring[randomGene] = i+1;
          used[i] = 1;
        }
      }
      new_population.push(chromosomeOffSpring);
    }
    for(let i=0; i<population_size/2; i++) {
      new_population.push(population[fitnessIndexes[i].crNum]);
    }
    population = new_population;
  }
  let genIndexesY = new Array(t_generations);
  for(let i=0; i<t_generations; i++)
    genIndexesY[i]=i+1;
  fs.writeFileSync(__dirname+'/data files/plot_data.json',
    JSON.stringify({
      "y_coords": fitIndexesX,
      "x_coords": genIndexesY
    }, null, 2));
  fs.writeFileSync(__dirname+'/data files/plot_data_2.json',
    JSON.stringify({
      "y_coords": fitIndexesX2,
      "x_coords": genIndexesY
    }, null, 1));
  return {
    data1: {
    "y_coords": fitIndexesX,
    "x_coords": genIndexesY
    },
    data2: {
    "y_coords": fitIndexesX2,
    "x_coords": genIndexesY
    }
  }
}

// start of the Genetic Approach
module.exports = { startProcess };
