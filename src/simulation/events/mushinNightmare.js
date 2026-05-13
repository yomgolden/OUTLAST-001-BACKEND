module.exports = {
  id: "mushin_nightmare",

  name: "Mushin Nightmare",

  location: "Mushin",

  danger: "HIGH",

  tagline: "The streets do not forgive hesitation.",

  // ======================
  // INTRO SEQUENCE
  // ======================

  intro: [
    "⚠ MUSHIN NIGHTMARE INITIATED",
    "20 survivors entered Mushin.",
    "The streets are already watching."
  ],

  // ======================
  // EVENT PACING
  // ======================

  roundConfig: {
    min: 5,
    max: 6,
    survivalChance: 0.10,
    funnyChance: 0.25
  },

  // ======================
  // ATMOSPHERE
  // ======================

  atmosphere: [
    "Mushin has no mercy tonight.",
    "The streets of Mushin remember every face.",
    "Darkness spreads from Idi-Oro to Mushin 2.",
    "Nobody calls the police in Mushin.",
    "The area boys have been paid. To do what, nobody knows.",
    "A generator exploded somewhere in Mushin. Nobody reacted.",
    "The streets became quieter. That was more dangerous.",
    "A danfo passed slowly through the road. Nobody inside looked alive.",
    "The night market suddenly packed up early.",
    "Somebody screamed near Mushin bus stop. Nobody checked."
  ],

  // ======================
  // NARRATION
  // ======================

  narration: [
    "Something shifted in the air around Mushin bus stop.",
    "A danfo engine died at the wrong moment.",
    "Three exits. All of them watched.",
    "The smell of smoke from Mushin 1 carried a warning.",
    "The checkpoint at Papa Ajao was abandoned. That was worse.",
    "Streetlights failed one after another across Mushin.",
    "The sound of running footsteps echoed through the market.",
    "Nobody trusted anybody after midnight in Mushin.",
    "A fight started in the distance. Then suddenly stopped.",
    "Mushin was too quiet tonight. Quiet never meant safety."
  ],

  // ======================
  // ELIMINATIONS
  // ======================

  eliminations: [
    "{killer} cornered {victim} behind the Mushin motor park. Nobody intervened.",
    "{victim} trusted the wrong person at the Mushin junction. {killer} was waiting.",
    "{killer} followed {victim} from Idi-Oro all the way to their death.",
    "The crowd at Mushin market swallowed {victim}. Only {killer} came out.",
    "{victim} made noise at the wrong time. {killer} made sure it was the last time.",
    "{killer} had been watching {victim} since Round 1. Mushin taught patience.",
    "{victim} ran toward Mushin bus stop. {killer} was already there.",
    "There was a shortcut through Mushin 2. {victim} took it. {killer} knew it.",
    "{killer} baited {victim} into a dead-end alley behind the market.",
    "{victim} thought the crowd would protect them. Mushin crowds protect nobody.",
    "{killer} waited inside a silent compound for {victim} to walk in.",
    "{victim} heard footsteps behind them in Mushin. Too late.",
    "{killer} used {tool} to finish {victim} near Idi-Oro.",
    "Nobody saw {victim} again after entering the Mushin underbridge.",
    "{victim} picked the wrong shortcut. {killer} already owned that route."
  ],

  // ======================
  // FUNNY DEATHS
  // ======================

  funny: [
    "{victim} stopped to argue about the Mushin vs Oshodi rivalry. Did not finish the argument.",
    "{victim} thought they recognized someone. They did not. Fatal mistake.",
    "{victim} paused to eat moi moi from the wrong mama put. That was all.",
    "{victim} slipped on something in Mushin market. The ground finished what it started.",
    "{victim} was eliminated by someone they had just insulted on the bus.",
    "{victim} shouted 'Do you know who I am?' Nobody cared.",
    "{victim} stopped running to answer a phone call. Historic mistake.",
    "{victim} trusted free transport at 2AM in Mushin.",
    "{victim} tried to hide inside the wrong danfo.",
    "{victim} attempted Mushin street diplomacy with the wrong person."
  ],

  // ======================
  // SURVIVAL EVENTS
  // ======================

  survival: [
    "{victim} hid inside a broken-down molue behind Mushin motor park.",
    "{victim} talked their way out of danger. Classic Mushin street diplomacy.",
    "{victim} disappeared into the night market crowd and resurfaced elsewhere.",
    "{victim} bribed a checkpoint. Survival of the most liquid.",
    "{victim} found an unlocked compound and stayed quiet until the round ended.",
    "{victim} blended into a crowd leaving the bus stop unnoticed.",
    "{victim} survived by pretending to know dangerous people.",
    "{victim} escaped through a flooded alley only locals knew about.",
    "{victim} hid inside a dark mechanic workshop until sunrise.",
    "{victim} survived another round by saying less and observing more."
  ]
};
