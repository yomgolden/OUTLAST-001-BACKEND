module.exports = {
  id: "ajegunle_warzone",

  name: "Ajegunle Warzone",

  location: "Ajegunle",

  danger: "EXTREME",

  tagline: "AJ City does not produce survivors. It produces legends.",

  // ======================
  // INTRO SEQUENCE
  // ======================

  intro: [
    "🔴 AJEGUNLE WARZONE ACTIVE",
    "AJ City sealed all exits at midnight.",
    "20 entered. AJ City decides who leaves."
  ],

  // ======================
  // EVENT PACING
  // ======================

  roundConfig: {
    min: 6,
    max: 7,
    survivalChance: 0.08,
    funnyChance: 0.20
  },

  // ======================
  // ATMOSPHERE
  // ======================

  atmosphere: [
    "Ajegunle has been waiting for tonight.",
    "The water surrounding AJ City cut off every escape route.",
    "Orile bridge is blocked. Ajeromi is sealed. There is nowhere to go.",
    "In Ajegunle, even the walls have loyalty.",
    "AJ City does not produce survivors. It produces legends.",
    "The lagoon became strangely quiet around midnight.",
    "Nobody crossed the waterfront without permission tonight.",
    "A distant fight broke out near Orile bridge.",
    "The streets of Ajeromi emptied too quickly.",
    "People locked their gates early in AJ City."
  ],

  // ======================
  // NARRATION
  // ======================

  narration: [
    "The Ajegunle waterfront was completely silent. That was the warning.",
    "Someone blocked the road near Ajeromi junction before anyone noticed.",
    "The smell of the lagoon carried something different tonight.",
    "Old score sheets from Ajegunle do not expire.",
    "The sound of boats on the water stopped around midnight.",
    "A generator exploded near the waterfront. Nobody checked.",
    "The shadows near Orile bridge started moving differently.",
    "Nobody trusted outsiders in AJ City tonight.",
    "The lagoon breeze carried voices nobody could identify.",
    "Every shortcut in Ajegunle belonged to somebody dangerous."
  ],

  // ======================
  // ELIMINATIONS
  // ======================

  eliminations: [
    "{killer} chased {victim} from Ajeromi all the way to the waterfront. There was nowhere left to run.",
    "{victim} thought the crowd near Orile would protect them. {killer} knew the crowd.",
    "In AJ City, {killer} called in a favor. {victim} paid for it.",
    "{victim} tried to cross the waterfront. {killer} was faster on the water.",
    "The alley behind Ajegunle market has seen worse. Now it has seen {victim}.",
    "{killer} grew up in Ajegunle. Every shortcut. Every shadow. {victim} had no chance.",
    "{victim} made it to Ajeromi bridge. {killer} had been waiting there since Round 1.",
    "Nobody helped {victim} near the Ajegunle waterfront. AJ City keeps its own counsel.",
    "{killer} used {tool} near the waterfront to eliminate {victim}.",
    "{victim} trusted the wrong boat route in AJ City.",
    "{killer} trapped {victim} between the lagoon and the streets.",
    "The streets near Orile closed around {victim}. {killer} finished the rest.",
    "{victim} disappeared into an Ajegunle alley and never returned.",
    "{killer} understood AJ City better than {victim} ever could.",
    "{victim} picked the wrong side of the waterfront tonight."
  ],

  // ======================
  // FUNNY DEATHS
  // ======================

  funny: [
    "{victim} tried to reason with AJ City logic. AJ City disagreed.",
    "{victim} asked for directions in Ajegunle. The directions were wrong on purpose.",
    "{victim} thought being loud would protect them in Ajegunle. Incorrect.",
    "{victim} slipped into the lagoon edge near the waterfront. The lagoon kept them briefly.",
    "{victim} made a deal in Ajegunle and forgot the most important rule: honor the deal.",
    "{victim} shouted too confidently near Orile bridge.",
    "{victim} trusted free transport in AJ City at midnight.",
    "{victim} thought the crowd was cheering for them. It was not.",
    "{victim} tried to hide beside a boat that was already occupied.",
    "{victim} underestimated how fast rumors move in Ajegunle."
  ],

  // ======================
  // SURVIVAL EVENTS
  // ======================

  survival: [
    "{victim} knew a boat man near the Ajegunle waterfront. Old connection, new escape.",
    "{victim} went deep into Ajeromi and stayed quiet until the danger passed.",
    "{victim} survived by pretending to be from AJ City. Convincing accent.",
    "{victim} hid in a compound near Orile that nobody else knew about.",
    "{victim} moved through the waterfront routes only locals know. Every round.",
    "{victim} escaped using an abandoned fishing route near the lagoon.",
    "{victim} survived by staying invisible in the waterfront crowd.",
    "{victim} blended into the chaos near Ajeromi unnoticed.",
    "{victim} hid inside a locked mechanic yard until sunrise.",
    "{victim} survived another round by respecting AJ City rules."
  ]
};
